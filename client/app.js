import { createListingCard } from './components/card.js';

const API_BASE = "http://localhost:5000/api";
const listingsGrid = document.getElementById("listingsGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

let allListings = [];

async function loadListings() {
  const res = await fetch(`${API_BASE}/listings`);
  allListings = await res.json();
  renderListings(allListings);
}

function renderListings(listings) {
  listingsGrid.innerHTML = "";

  if (listings.length === 0) {
    listingsGrid.innerHTML = `
      <p class="text-slate-400 col-span-full text-center">
        No listings found.
      </p>
    `;
    return;
  }

  listings.forEach(l => {
    listingsGrid.innerHTML += createListingCard(l);
  });
}

searchBtn.addEventListener("click", () => {
  const search = searchInput.value.toLowerCase();
  const type = typeFilter.value;

  let filtered = allListings.filter(l =>
    l.location.toLowerCase().includes(search)
  );

  if (type !== "all") {
    filtered = filtered.filter(l => l.transaction_type === type);
  }

  renderListings(filtered);
});

loadListings();
