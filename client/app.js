import { createListingCard } from './components/card.js';
import { showLoading, hideLoading, showError, hideError } from './components/loader.js';
import { attachSearch } from './components/search.js';

const API_BASE = 'http://localhost:5000/api';
const listingsGrid = document.getElementById('listingsGrid');

let cachedListings = [];

async function loadListings() {
  try {
    hideError();
    showLoading();

    const res = await fetch(`${API_BASE}/listings`);
    if (!res.ok) throw new Error("Failed to fetch listings");

    cachedListings = await res.json();

    renderListings(cachedListings);
    attachSearch(cachedListings, renderListings);

  } catch (err) {
    showError(err.message);
  } finally {
    hideLoading();
  }
}

function renderListings(listings) {
  listingsGrid.innerHTML = "";

  if (!listings.length) {
    listingsGrid.innerHTML = `
      <p class="col-span-full text-gray-400 text-center">
        No matching listings found.
      </p>`;
    return;
  }

  listings.forEach(listing => {
    listingsGrid.innerHTML += createListingCard(listing);
  });
}

loadListings();
