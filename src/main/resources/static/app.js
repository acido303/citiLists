const BASE = '/api';
let currentCountryId = null;
let currentPage = 0;
let totalPages = 0;
let countries = [];

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

async function loadCountries() {
  countries = await get(`${BASE}/countries`);
  const list = document.getElementById('country-list');
  list.innerHTML = countries
    .map(c => `<div class="item" id="c-${c.id}" onclick="selectCountry(${c.id})">${c.name}</div>`)
    .join('');
}

async function selectCountry(id) {
  currentCountryId = id;
  currentPage = 0;
  document.querySelectorAll('#country-list .item').forEach(el => el.classList.remove('active'));
  document.getElementById(`c-${id}`).classList.add('active');
  document.getElementById('detail-content').innerHTML = '<p class="empty">Select a city to see its details.</p>';
  await loadCities();
}

async function loadCities() {
  const data = await get(`${BASE}/cities?countryId=${currentCountryId}&page=${currentPage}&size=5`);
  totalPages = data.totalPages;

  const list = document.getElementById('city-list');

  if (data.content.length === 0) {
    list.innerHTML = '<p class="empty">No cities found.</p>';
    document.getElementById('pagination').style.display = 'none';
    return;
  }

  list.innerHTML = data.content
    .map(c => `<div class="item" id="city-${c.id}" onclick="selectCity(${c.id})">${c.name}</div>`)
    .join('');

  const pg = document.getElementById('pagination');
  pg.style.display = 'flex';
  document.getElementById('page-info').textContent = `${currentPage + 1} / ${totalPages}`;
  document.getElementById('btn-prev').disabled = currentPage === 0;
  document.getElementById('btn-next').disabled = currentPage >= totalPages - 1;
}

async function changePage(delta) {
  currentPage += delta;
  await loadCities();
}

async function selectCity(id) {
  document.querySelectorAll('#city-list .item').forEach(el => el.classList.remove('active'));
  document.getElementById(`city-${id}`).classList.add('active');

  const city = await get(`${BASE}/cities/${id}`);
  const country = countries.find(c => c.id === city.countryId);

  document.getElementById('detail-content').innerHTML = `
    <div class="detail">
      <h2>${city.name}</h2>
      <div class="country-name">${country ? country.name : ''}</div>
      <div class="field"><span class="label">City ID</span><span>${city.id}</span></div>
      <div class="field"><span class="label">Country ID</span><span>${city.countryId}</span></div>
    </div>`;
}

loadCountries();
