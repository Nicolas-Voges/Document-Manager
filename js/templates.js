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
    </tr>
  `;
}

function getOption(cat) {
  return `
    <option value="${cat.id}">${getCategoryPath(cat)}</option>
  `;
}