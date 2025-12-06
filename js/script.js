function init() {
  checkAPIKey();
  FILES = loadObjFromStorage('FILES', 'local') || loadObjFromStorage('FILES', 'session') || dummyDataFiles;
  CATEGORIES = loadObjFromStorage('CATEGORIES', 'local') || loadObjFromStorage('CATEGORIES', 'session') || dummyDataCategories;
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
          { text: "Extrahiere nur den Text aus diesem Bild, ohne Erklärungen. Versuche die Formatierung beizubehalten, indem du es in HTML formatierst. Und ggf. Tabellen zu erkennen. Lorem-ipsum-text ersetze bitte sinnvoll mit fiktiven Daten, dass es zum Rest des Bildes passt." },
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
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
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
  let searchValuesInput = document.getElementById('searchValues').value;
  let searchValues = searchValuesInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const files = INPUT_FILE.files;
  let text = "";


  for (const file of files) {
    const fileText = await callGeminiOCR(file);
    text += fileText + "\n";
  }

  FILES.push({
    id,
    name,
    createdAt: new Date().toISOString(),
    categoryId,
    docDate,
    originals: await Promise.all(Array.from(files).map(f => fileToBase64(f))),
    text,
    searchValues
  });

  saveObjInStorage('FILES', FILES, 'local');
  renderView({ categoryId });
  toggleSectionVisibility('addDoc');
}


function fileClicked(fileId) {
  const file = FILES.find(f => f.id === fileId);
  fileContentElement = document.getElementById("fileContent");
  fileContentElement.innerHTML = file.text ? file.text : "<i>No text extracted.</i>";
  btnBox = document.getElementById("detailBtnBox");
  btnBox.innerHTML = `
    <button onclick="showImage(${file.id})">Originals</button>
    <button onclick="showText(${file.id})">Text</button>
  `;
}