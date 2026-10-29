// Thrift Shop: small, student-friendly interactions for the course work demo.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const categoryToggle = document.getElementById('categoryToggle');
const categoryMenu = document.getElementById('categoryMenu');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
}

if (categoryToggle && categoryMenu) {
  categoryToggle.addEventListener('click', () => {
    const open = categoryMenu.classList.toggle('show');
    categoryToggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('#mainNav a').forEach(link => {
  link.addEventListener('click', () => {
    if (mainNav) mainNav.classList.remove('open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }
    if (categoryMenu) categoryMenu.classList.remove('show');
  });
});

function filterProducts(category) {
  document.querySelectorAll('.filter').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === category);
  });
  document.querySelectorAll('.product-card').forEach(card => {
    card.hidden = category !== 'All' && card.dataset.category !== category;
  });
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => filterProducts(button.dataset.filter));
});

document.querySelectorAll('[data-category]').forEach(link => {
  link.addEventListener('click', () => {
    const category = link.dataset.category;
    if (document.querySelector('.product-card')) filterProducts(category);
    try { sessionStorage.setItem('thriftShopCategory', category); } catch (e) {}
  });
});

if (document.querySelector('.product-card')) {
  try {
    const requestedCategory = sessionStorage.getItem('thriftShopCategory');
    if (requestedCategory) {
      filterProducts(requestedCategory);
      sessionStorage.removeItem('thriftShopCategory');
    }
  } catch (e) {}
}

document.querySelectorAll('.heart').forEach(button => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(saved));
  });
});

document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    window.location.href = 'contact.html?product=' + encodeURIComponent(product);
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const product = params.get('product');
  const contactMessage = document.getElementById('message');
  if (product && contactMessage) {
    contactMessage.value = `Hello Thrift Shop! I'm interested in the ${product}. Is it still available?`;
  }
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const note = document.getElementById('formNote');
    if (note) {
      note.textContent = 'Thanks! This demo form works locally, but sending messages needs a backend or form service.';
      note.classList.add('form-success');
    }
  });
}
