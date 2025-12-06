let API_KEY = null;
let FILES = [];
let CATEGORIES = [];
let APIKeyInStorage = false;
let savePermanent = false;
let loadFromLocalStorage = false;
let useDummyData = true;

/**
 * This function saves a variable to local storage.
 * 
 * @param {string} key 
 * @param {number, string or boolean} variable 
 */
function saveVariableInStorage(key, variable) {
  if (savePermanent) {
    localStorage.setItem(key, variable);
  } else{
    sessionStorage.setItem(key, variable);
  }
}


/**
 * This function loads a variable from local storage.
 * 
 * 
 * @param {string} key 
 * @returns 
 */
function loadVariableFromStorage(key) {
  if (savePermanent) {
    return localStorage.getItem(key);
  } else {
    return sessionStorage.getItem(key);
  }
}


/**
 * This function saves an object to local storage.
 * 
 * @param {string} key
 * @param {object} obj
 */
function saveObjInStorage(key, obj) {
  if (savePermanent) {
    localStorage.setItem(key, JSON.stringify(obj));
  } else {
    sessionStorage.setItem(key, JSON.stringify(obj));
  }
}


/**
 * This function loads an object from local storage.
 * 
 * @param {string} key 
 * @returns 
 */
function loadObjFromStorage(key) {
  if (savePermanent) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

function saveKey() {
  const KEY = INPUT_API_KEY.value;
  if (!KEY || KEY.trim() === '') {
    alert("Please enter a valid API Key.");
    return;
  }
  API_KEY = KEY
  saveVariableInStorage('KEY', KEY);
  BTN_ADD_IMAGE.disabled = false;
  toggleSectionVisibility('APIKey');
}

function getNewId(array) {
  if (array.length === 0) return 101;
  let newId = Math.max(...array.map(f => f.id)) + 1;
  if (newId <= 100) newId = 101;
  return newId;
}

function checkAPIKey() {
  const KEY = loadVariableFromStorage('KEY');
  if (KEY) {
    APIKeyInStorage = true;
    API_KEY = KEY;
  } else {
    APIKeyInStorage = false;
    API_KEY = null;
  }
}

function getAllSubcategoryIds(categoryId) {
  const result = [];

  function recurse(id) {
    const children = CATEGORIES.filter(c => c.parentId === id);
    for (const child of children) {
      result.push(child.id);
      recurse(child.id);
    }
  }

  recurse(categoryId);
  return result;
}

function countFilesRecursively(categoryId) {
  const ids = [categoryId, ...getAllSubcategoryIds(categoryId)];

  return FILES.filter(f => ids.includes(f.categoryId)).length;
}

function getCategoryPath(cat) {
  const chain = [];
  let current = cat;

  while (current) {
    chain.push(current.name);
    current = CATEGORIES.find(c => c.id === current.parentId);
  }

  return chain.reverse().join(" / ");
}

function addCategorie() {
  const name = document.getElementById('catNameInput').value;
  const color = document.getElementById('catColorInput').value;
  let parentId = document.getElementById('catParentSelect').value;
  parentId = parentId ? parseInt(parentId) : null;
  const data = {
    name: name,
    createdAt: new Date().toISOString(),
    color: color,
    updatedAt: new Date().toISOString(),
    id: getNewId(CATEGORIES),
    parentId: parentId
  };
  CATEGORIES.push(data);
  const userCategories = CATEGORIES.filter(cat => cat.id > 100);
  saveObjInStorage('CATEGORIES', userCategories);
  renderView({categoryId: parentId});
  toggleSectionVisibility('addCategorie');
  renderCategorySelect()
}

function checkForDummyData() {
    if (document.getElementById('useDummyData').checked) {
        useDummyData = true;
        saveVariableInStorage('useDummyData', 'use');
        CATEGORIES.push(...dummyDataCategories);
        FILES.push(...dummyDataFiles);
        renderView({'categoryId': null});
    } else {
        CATEGORIES = CATEGORIES.filter(cat => cat.id > 100);
        FILES = FILES.filter(cat => cat.id > 100);
        useDummyData = false;
        saveVariableInStorage('useDummyData', 'notuse');
        renderView({'categoryId': null});
    }
}


function setDummyData() {
    const useDummy = loadVariableFromStorage('useDummyData');
    if (!useDummy || useDummy === 'use') {
        document.getElementById('useDummyData').checked = true;
        checkForDummyData();
    } else {
        document.getElementById('useDummyData').checked = false;
        checkForDummyData();
    }
}