function init() {
  checkSavePermanent()
  checkAPIKey();
  FILES = loadObjFromStorage('FILES') || [];
  CATEGORIES = loadObjFromStorage('CATEGORIES') || [];
  setDummyData();
  renderCategorySelect();
  renderView({ categoryId: null })
  if (!APIKeyInStorage) {
    BTN_ADD_IMAGE.disabled = true;
  }
}


async function callGeminiOCR(file) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  const base64 = await fileToBase64(file);

  const body = {
    contents: [
      {
        parts: [
          { text: "Extrahiere nur den Text aus diesem Bild, ohne Erklärungen. gib mir ein JSON zurück das so aussieht: {text: '', html: ''}. Versuche die Formatierung beizubehalten, indem du es in HTML formatierst. Und ggf. Tabellen zu erkennen. In dem JSON soll unter text nur der reine Text zurückgegeben werden und unter html soll das Schreiben als html formatiert sein, aber ohne img-Tags oder Ähnliche Dinge, die im html Fehler werfen könnten, weil eine src angegeben werden müsste." },
          {
            inlineData: {
              data: base64.split(',')[1],
              mimeType: file.type
            }
          }
        ]
      }
    ]
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error: ${err}`);
  }

  const result = await resp.json();

  let rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const cleanedText = rawText.trim().replace(/^```(?:json)?\s*|\s*```$/gm, "");

  let parsedJson;

  try {
    parsedJson = JSON.parse(cleanedText);
  } catch (err) {
    console.error("JSON konnte nicht geparst werden:", err, cleanedText);
    throw err;
  }

  return parsedJson;
}


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


async function processAllFiles() {
  let id = getNewId(FILES)
  let name = document.getElementById('docNameInput').value;
  let docDate = document.getElementById('docDateInput').value;
  let categoryId = parseInt(document.getElementById('docCategorySelect').value);
  let searchValuesInput = document.getElementById('inputSearchValues').value;
  let searchValues = searchValuesInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const files = INPUT_FILE.files;
  let text = "";
  let html = "";


  for (const file of files) {
    const fileJSON = await callGeminiOCR(file);

    text += fileJSON.text + "<br><br>";
    html += fileJSON.html + "<br><hr><br>";
  }

  FILES.push({
    id,
    name,
    createdAt: new Date().toISOString(),
    categoryId,
    docDate,
    originals: await Promise.all(Array.from(files).map(f => fileToBase64(f))),
    text,
    html,
    searchValues
  });
  const userFiles = FILES.filter(cat => cat.id > 100);
  saveObjInStorage('FILES', userFiles);
  renderView({ categoryId });
  toggleSectionVisibility('addDoc');
}


function fileClicked(fileId) {
  const file = FILES.find(f => f.id === fileId);
  const fileContentElement = document.getElementById("fileContent");
  fileContentElement.innerHTML = file.text ? file.text : "<i>No text extracted.</i>";
  const btnBox = document.getElementById("detailBtnBox");
  btnBox.innerHTML = `
    <button onclick="showImage(${file.id})">Original(s)</button>
    <button onclick="showText(${file.id})">Text</button>
    <button onclick="showHTML(${file.id})">HTML</button>
  `;
  const searchBox = document.getElementById('searchValues');
  searchBox.innerHTML = "";
  document.getElementById('findByBox').classList.remove("d-none");
  for (let i = 0; i < file.searchValues.length; i++) {
    searchBox.innerHTML += `<span class="searchValue" title="delete" onclick="deleteSearchValue(${file.id}, '${file.searchValues[i]}')">${file.searchValues[i]}</span>`;
  }
}


function changeStorage() {
  let keyValue = null;
  let fileValue = null;
  let categoryValue = null;
  let dummyValue = null;
  if (document.getElementById('savePermanently').checked) {
    keyValue = loadVariableFromStorage('KEY');
    dummyValue = loadVariableFromStorage('useDummyData');
    fileValue = loadObjFromStorage('FILES');
    categoryValue = loadObjFromStorage('CATEGORIES');
    savePermanent = true;
    if (keyValue) saveVariableInStorage('KEY', keyValue);
    if (dummyValue) saveVariableInStorage('useDummyData', dummyValue);
    if (fileValue) saveObjInStorage('FILES', fileValue);
    if (categoryValue) saveObjInStorage('CATEGORIES', categoryValue);
    saveVariableInStorage('savePermanent', savePermanent);
  } else {
    const keys = ['KEY', 'FILES', 'CATEGORIES', 'useDummyData']
    savePermanent = true;
    keyValue = loadVariableFromStorage('KEY');
    dummyValue = loadVariableFromStorage('useDummyData');
    fileValue = loadObjFromStorage('FILES');
    categoryValue = loadObjFromStorage('CATEGORIES');
    savePermanent = false;
    if (keyValue) saveVariableInStorage('KEY', keyValue);
    if (dummyValue) saveVariableInStorage('useDummyData', dummyValue);
    if (fileValue) saveObjInStorage('FILES', fileValue);
    if (categoryValue) saveObjInStorage('CATEGORIES', categoryValue);
    for (let i = 0; i < keys.length; i++) {
      localStorage.removeItem(keys[i]);
    }
    localStorage.removeItem('savePermanent');
  }
}

function checkSavePermanent() {
  if (localStorage.getItem('savePermanent')) {
    loadFromLocalDtorage = true;
    document.getElementById('savePermanently').checked = true;
    savePermanent = true;
  }
}


function searchAll() {
  const catBody = document.getElementById("categoriesBody");
  const fileBody = document.getElementById("filesBody");
  const rawInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const searchTerms = rawInput.split(",").map(s => s.trim()).filter(s => s.length > 0);

  catBody.innerHTML = "";
  fileBody.innerHTML = "";

  if (searchTerms.length === 0) {
    renderView({ categoryId: null });
    return;
  }

  const matchedFiles = findFiles(searchTerms);
  const catsByName = findCategories(searchTerms);
  const fileMatchedCategoryIds = matchedFiles.map(f => f.categoryId);
  const catsByFiles = fileMatchedCategoryIds.flatMap(id => getParentChainIds(id));
  const matchedCategoryIds = [...new Set([
    ...catsByName.map(c => c.id),
    ...catsByFiles
  ])];
  const matchedCategories = CATEGORIES.filter(cat =>
    matchedCategoryIds.includes(cat.id)
  );

  renderSearchResults(matchedCategories, catBody, fileBody, matchedFiles);
}