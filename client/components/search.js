// client/components/search.js

/**
 * Filters listings by location text
 * @param {Array} listings - All listings array
 * @param {String} query - Search text
 * @returns {Array} Filtered listings
 */
export function filterByLocation(listings, query) {
  if (!query || !query.trim()) return listings;

  const lowerQuery = query.toLowerCase().trim();

  return listings.filter(listing =>
    listing.location.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Attaches search functionality to input & button
 * @param {Array} listings - All listings
 * @param {Function} renderFn - Function to render listings
 */
export function attachSearch(listings, renderFn) {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  if (!searchInput || !searchBtn) {
    console.warn("Search input or button not found");
    return;
  }

  // Button click search
  searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    const filtered = filterByLocation(listings, query);
    renderFn(filtered);
  });

  // Press Enter to search
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value;
      const filtered = filterByLocation(listings, query);
      renderFn(filtered);
    }
  });
}
