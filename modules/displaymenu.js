const sections = document.querySelectorAll('section');
const pageTitle = document.querySelector('#page-title');
const listLink = document.querySelector('#m-list a');
const addLink = document.querySelector('#m-add a');
const contactLink = document.querySelector('#m-contact a');

export const displaySection = (sectionToDisp) => {
  sections.forEach((section) => {
    if (sectionToDisp === 'book-list') {
      pageTitle.style.display = 'block';
      if (!listLink.classList.contains('active')) {
        listLink.classList.add('active');
      }
      addLink.classList.remove('active');
      contactLink.classList.remove('active');
    } else if (sectionToDisp === 'add-book') {
      if (!addLink.classList.contains('active')) {
        addLink.classList.add('active');
      }

      listLink.classList.remove('active');
      contactLink.classList.remove('active');
      pageTitle.style.display = 'none';
    } else {
      if (!contactLink.classList.contains('active')) {
        contactLink.classList.add('active');
      }

      addLink.classList.remove('active');
      listLink.classList.remove('active');
      pageTitle.style.display = 'none';
    }

    if (section.id === sectionToDisp) {
      section.classList.remove('hide-section');
      section.classList.add('show-section');
    } else {
      section.classList.remove('show-section');
      section.classList.add('hide-section');
    }
  });
};

export const addMenuLinks = () => {
  listLink.onclick = function name() { displaySection('book-list'); };
  addLink.onclick = function name() { displaySection('add-book'); };
  contactLink.onclick = function name() { displaySection('contact'); };
};
