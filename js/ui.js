const BTN_ADD_IMAGE = document.getElementById('btnAddFiles');
const INPUT_FILE = document.getElementById('fileInput');
const INPUT_API_KEY = document.getElementById("APIKeyInput")

function disableBtn(btn) {
  if (btn) {
    btn.disabled = true;
  }
}

function enableBtn(btn) {
  if (btn) {
    btn.disabled = false;
  }
}

function toggleSectionVisibility(sectionId) {
  closeAllpopupSections(sectionId);
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle('d-none');
  }
}

function closeAllpopupSections(sectionId) {
  const overlayIds = ["addDoc", "addCategorie", "APIKey"];
  let ids = overlayIds.filter(id => id !== sectionId);
  ids.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.classList.add('d-none');
    }
  });
}

function renderCategorySelect() {
  let selectCat = document.getElementById("docCategorySelect");
  let selectParentCat = document.getElementById("catParentSelect");
  selectCat.innerHTML = "";
  selectParentCat.innerHTML = "";

  selectParentCat.innerHTML += `<option value=""> - </option>`;

  CATEGORIES.forEach(cat => {
    selectCat.innerHTML += getOption(cat);
    selectParentCat.innerHTML += getOption(cat);
  });
}

function showText(fileId) {
  const file = FILES.find(f => f.id === fileId);
  fileContentElement = document.getElementById("fileContent");
  fileContentElement.innerHTML = file.text ? file.text : "<i>No text extracted.</i>";
}

function showImage(fileId) {
  const file = FILES.find(f => f.id === fileId);
  fileContentElement = document.getElementById("fileContent");
  fileContentElement.innerHTML = '';
  file.originals.forEach((b64) => {
    fileContentElement.innerHTML += `<img src="${b64}" alt="Original Image" style="width: 620px; height: 877px; margin-bottom: 10px;">`;
  });
}

function showHTML(fileId) {
  const file = FILES.find(f => f.id === fileId);
  fileContentElement = document.getElementById("fileContent");
  fileContentElement.innerHTML = file.html ? file.html : "<i>No html extracted.</i>";
}

function clearDocDetailView() {
  const fileContentElement = document.getElementById("fileContent");
  fileContentElement.innerHTML = "<i>Select a document to view its details.</i>";
  btnBox = document.getElementById("detailBtnBox");
  btnBox.innerHTML = "";
  document.getElementById('searchValues').innerHTML = "";
  document.getElementById('findByBox').classList.add("d-none");
}

function renderRootCategories() {
  const tbody = document.getElementById("categoriesBody");
  tbody.innerHTML = "";

  const roots = CATEGORIES.filter(c => c.parentId === null);

  for (const cat of roots) {
    const subCount = CATEGORIES.filter(c => c.parentId === cat.id).length;
    const fileCount = countFilesRecursively(cat.id);

    tbody.innerHTML += createCategoryRow(cat, subCount, fileCount);
  }

  showTable("categoriesTable");
  hideTable("filesTable");
}

function renderCategory(categoryId) {
  const subcats = CATEGORIES.filter(c => c.parentId === categoryId);
  const files = FILES.filter(f => f.categoryId === categoryId);

  const catBody = document.getElementById("categoriesBody");
  const fileBody = document.getElementById("filesBody");

  catBody.innerHTML = "";
  fileBody.innerHTML = "";

  for (const cat of subcats) {
    const subCount = CATEGORIES.filter(c => c.parentId === cat.id).length;
    const fileCount = countFilesRecursively(cat.id);

    catBody.innerHTML += createCategoryRow(cat, subCount, fileCount);
  }

  for (const file of files) {
    fileBody.innerHTML += createFileRow(file);
  }

  showTable("categoriesTable");
  showTable("filesTable");
}

function renderView(state) {
  updateBreadcrumb(state.categoryId);
  clearDocDetailView();
  document.getElementById('searchInput').value = "";
  if (state.categoryId === null) {
    renderRootCategories();
  } else {
    renderCategory(state.categoryId);
  }
}

function updateBreadcrumb(categoryId) {
  const bc = document.getElementById("breadcrumb");
  const bc2 = document.getElementById("breadcrumbInH2");
  bc.innerHTML = "";
  bc2.innerHTML = "";

  const rootItem = document.createElement("span");
  rootItem.textContent = "Root";
  rootItem.classList.add("breadcrumb-item");
  rootItem.setAttribute("onclick", "renderView({ categoryId: null })");
  const rootItem2 = rootItem.cloneNode(true);
  bc.appendChild(rootItem);
  bc2.appendChild(rootItem2);

  if (categoryId === null) return;

  let id = categoryId;
  const chain = [];
  while (id !== null) {
    const c = CATEGORIES.find(x => x.id === id);
    chain.push(c);
    id = c.parentId;
  }
  chain.reverse();

  for (const cat of chain) {
    const item = document.createElement("span");
    item.textContent = " / " + cat.name;
    item.classList.add("breadcrumb-item");
    item.setAttribute("onclick", `renderView({ categoryId: ${cat.id} })`);
    const item2 = item.cloneNode(true);
    bc.appendChild(item);
    bc2.appendChild(item2);
  }
}

function showTable(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = false;
}

function hideTable(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
}

function renderSearchResults(matchedCategories, catBody, fileBody, matchedFiles) {
  for (const cat of matchedCategories) {
    const subCount = CATEGORIES.filter(c => c.parentId === cat.id).length;
    const fileCount = countFilesRecursively(cat.id);
    catBody.innerHTML += createCategoryRow(cat, subCount, fileCount);
  }

  for (const file of matchedFiles) {
    fileBody.innerHTML += createFileRow(file);
  }

  showTable("categoriesTable");
  showTable("filesTable");
  clearDocDetailView();
}