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