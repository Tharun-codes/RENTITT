import { createListingCard } from './components/card.js';

const API_BASE = "http://localhost:5000/api";
const listingsGrid = document.getElementById("listingsGrid");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

let allListings = [];

function showLoading() {
  listingsGrid.innerHTML = `
    <div class="empty-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 1rem;">
      <div class="loading" style="margin-bottom: 1rem;"></div>
      <p style="color: #94a3b8;">Loading properties...</p>
    </div>
  `;
}

async function loadListings() {
  showLoading();
  try {
    const res = await fetch(`${API_BASE}/listings`);
    if (!res.ok) throw new Error('Failed to load listings');
    allListings = await res.json();
    renderListings(allListings);
  } catch (error) {
    listingsGrid.innerHTML = `
      <div class="empty-state">
        <svg style="width: 64px; height: 64px; margin: 0 auto 1rem; color: #f87171; opacity: 0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p style="color: #f87171; font-size: 1.125rem; font-weight: 500; margin-bottom: 0.5rem;">Failed to load listings</p>
        <p style="color: #64748b; font-size: 0.875rem; margin-bottom: 1rem;">Please check your connection and try again</p>
        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
          Retry
        </button>
      </div>
    `;
  }
}

function renderListings(listings) {
  listingsGrid.innerHTML = "";

  if (listings.length === 0) {
    listingsGrid.innerHTML = `
      <div class="empty-state">
        <svg style="width: 64px; height: 64px; margin: 0 auto 1rem; opacity: 0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p style="color: #94a3b8; font-size: 1.125rem; font-weight: 500; margin-bottom: 0.5rem;">No listings found</p>
        <p style="color: #64748b; font-size: 0.875rem;">Try adjusting your search criteria or check back later</p>
      </div>
    `;
    return;
  }

  listings.forEach(l => {
    listingsGrid.innerHTML += createListingCard(l);
  });
}

searchBtn.addEventListener("click", () => {
  const search = searchInput.value.toLowerCase().trim();
  const type = typeFilter.value;

  let filtered = allListings.filter(l => {
    const locationMatch = l.location.toLowerCase().includes(search);
    const titleMatch = l.title?.toLowerCase().includes(search);
    return locationMatch || titleMatch;
  });

  if (type !== "all") {
    filtered = filtered.filter(l => l.transaction_type === type);
  }

  renderListings(filtered);
});

// Allow Enter key to trigger search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

loadListings();
