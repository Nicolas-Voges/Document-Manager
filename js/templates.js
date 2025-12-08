function createCategoryRow(category, subcategoriesCount, filesCount) {
  return `
    <tr class="category-row" onclick="renderView({ categoryId: ${category.id} })">
      <td>
        <div class="category-label">
          <span class="color-dot" style="background:${category.color}"></span>
          ${category.name}
        </div>
      </td>
      <td>${category.updatedAt || "-"}</td>
      <td>${category.createdAt || "-"}</td>
      <td>${subcategoriesCount}</td>
      <td>${filesCount}</td>
      <td onclick="event.stopPropagation(); editCategory(${category.id});">edit</td>
    </tr>
  `;
}

function createFileRow(file) {
  return `
    <tr class="file-row" onclick="fileClicked(${file.id})">
      <td>${file.name}</td>
      <td>${file.createdAt || "-"}</td>
      <!-- <td>${file.originals || "-"}</td> -->
      <td>${file.docDate || "-"}</td>
      <td>${file.text ? file.text.slice(0, 60) + "…" : "-"}</td>
      <td onclick="event.stopPropagation(); editFile(${file.id});">edit</td>
    </tr>
  `;
}

function getOption(cat) {
  return `
    <option value="${cat.id}">${getCategoryPath(cat)}</option>
  `;
}

function getEditFile(file) {
  return `
    <form onsubmit="updateFile(${file.id}); return false;" onclick="event.stopPropagation();" class="overlayForm">
      <div class="flexColumn">
        <label for="editNameInput">Name</label>
        <input id="editNameInput" type="text" value="${file.name}">
      </div>
      <div class="flexColumn">
        <label for="editDocDateInput">Document date</label>
        <input id="editDocDateInput" type="date" value="${file.docDate}">
      </div>
      <div class="flexColumn">
        <label for="editSearchValuesInput">Search terms separated by commas</label>
        <input id="editSearchValuesInput" type="text" value="${file.searchValues.toString()}">
      </div>
      <div class="flexColumn">
        <label for="textarea">Text</label>
        <textarea id="textarea" rows="10" cols="50">${file.text}</textarea>
      </div>
      <div class="flexColumn">
        <label for="catEditSelect">Select category:</label>
        <select id="catEditSelect">
          <!-- dynamic category options -->
        </select>
      </div>
      <div class="editBtnBox">
        <button type="button" onclick="closeOverlay()">Cancel</button>
        <button>Update file</button>
        <button class="deleteBtn" type="button" onclick="deleteFile(${file.id})"><strong>Delete</strong></button>
      </div>
    </form>
  `;
}

function getEditCategory1(cat) {
  return `
    <form onsubmit="updateCategory(${cat.id}); return false;" onclick="event.stopPropagation();" class="overlayForm">
      <div class="flexColumn">
        <label for="editNameInput">Name</label>
        <input id="editNameInput" type="text" value="${cat.name}">
      </div>
      <div class="flexColumn">
        <label for="editColorInput">Color</label>
        <input id="editColorInput" type="color" value="${cat.color}">
      </div>
      <div class="flexColumn">
        <label for="catEditParentSelect">Select category:</label>
        <select id="catEditParentSelect">
          <!-- dynamic category options -->
        </select>
      </div>
      <div class="editBtnBox">
        <button type="button" onclick="closeOverlay()">Cancel</button>
        <button>Update file</button>
        <button class="deleteBtn" type="button" onclick="deleteCategory(${cat.id})"><strong>Delete</strong></button>
      </div>
    </form>
  `;
}

function getEditCategory() {
  return `
    <form class="overlayForm">
      <div class="flexColumn">
        <h2>Noch in Arbeit...</h2>
      </div>
    </form>
  `;
}