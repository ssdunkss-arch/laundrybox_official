
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const filterButtons = Array.from(document.querySelectorAll('.price-filter button'));
const priceGroups = Array.from(document.querySelectorAll('.price-group'));
const priceSearch = document.getElementById('priceSearch');

let activeGroup = 'all';

function applyPriceFilters() {
  const query = (priceSearch?.value || '').trim().toLowerCase();

  priceGroups.forEach((group) => {
    const groupName = group.dataset.group;
    const matchesGroup = activeGroup === 'all' || groupName === activeGroup;
    const matchesSearch = !query || group.textContent.toLowerCase().includes(query);

    group.classList.toggle('hidden-by-filter', !matchesGroup);
    group.classList.toggle('hidden-by-search', !matchesSearch);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeGroup = button.dataset.target;
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    applyPriceFilters();
  });
});

if (priceSearch) {
  priceSearch.addEventListener('input', applyPriceFilters);
}
