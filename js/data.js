let API_KEY = null;
let FILES = [];
let CATEGORIES = [];
let APIKeyInStorage = false;
let savePermanent = false;

/**
 * This function saves a variable to local storage.
 * 
 * @param {string} key 
 * @param {number, string or boolean} variable 
 */
function saveVariableInStorage(key, variable) {
  if (savePermanent) {
    localStorage.setItem(key, variable)
  } else{
    sessionStorage.setItem(key, variable)
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
    return localStorage.getItem(key)
  } else {
    return sessionStorage.getItem(key)
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
  toggleSectionVisibility('APIKey')
}

function getNewId(array) {
  if (array.length === 0) return 1;
  return Math.max(...array.map(f => f.id)) + 1;
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