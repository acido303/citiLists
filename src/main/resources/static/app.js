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
  list.innerHTML = '';
  countries.forEach(c => {
    const el = document.createElement('div');
    el.className = 'item';
    el.id = `c-${c.id}`;
    el.textContent = c.name;
    el.addEventListener('click', () => selectCountry(c.id));
    list.appendChild(el);
  });
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
  list.innerHTML = '';

  if (data.content.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'empty';
    msg.textContent = 'No cities found.';
    list.appendChild(msg);
    document.getElementById('pagination').classList.add('hidden');
    return;
  }

  data.content.forEach(c => {
    const el = document.createElement('div');
    el.className = 'item';
    el.id = `city-${c.id}`;
    el.textContent = c.name;
    el.addEventListener('click', () => selectCity(c.id));
    list.appendChild(el);
  });

  const pg = document.getElementById('pagination');
  pg.classList.remove('hidden');
  document.getElementById('page-info').textContent = `${currentPage + 1} / ${totalPages}`;
  document.getElementById('btn-prev').disabled = currentPage === 0;
  document.getElementById('btn-next').disabled = currentPage >= totalPages - 1;
}

async function selectCity(id) {
  document.querySelectorAll('#city-list .item').forEach(el => el.classList.remove('active'));
  document.getElementById(`city-${id}`).classList.add('active');

  const city = await get(`${BASE}/cities/${id}`);
  const country = countries.find(c => c.id === city.countryId);

  const detail = document.getElementById('detail-content');
  detail.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'detail';

  const h2 = document.createElement('h2');
  h2.textContent = city.name;

  const sub = document.createElement('div');
  sub.className = 'country-name';
  sub.textContent = country ? country.name : '';

  wrapper.appendChild(h2);
  wrapper.appendChild(sub);
  wrapper.appendChild(makeField('City ID', city.id));
  wrapper.appendChild(makeField('Country ID', city.countryId));
  detail.appendChild(wrapper);
}

function makeField(label, value) {
  const row = document.createElement('div');
  row.className = 'field';
  const l = document.createElement('span');
  l.className = 'label';
  l.textContent = label;
  const v = document.createElement('span');
  v.textContent = value;
  row.appendChild(l);
  row.appendChild(v);
  return row;
}

document.getElementById('btn-prev').addEventListener('click', () => { currentPage--; loadCities(); });
document.getElementById('btn-next').addEventListener('click', () => { currentPage++; loadCities(); });

loadCountries();
