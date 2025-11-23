export function createListingCard(listing) {
  const transactionBadge = listing.transaction_type === 'rent' 
    ? '<span class="card-badge badge-rent">For Rent</span>'
    : '<span class="card-badge badge-sale">For Sale</span>';

  const propertyTypeIcon = listing.property_type === 'apartment' ? '🏢' : 
                               listing.property_type === 'house' ? '🏠' : 
                               listing.property_type === 'villa' ? '🏡' : '🏘️';

  return `
    <div class="listing-card">
      <div style="position: relative; overflow: hidden;">
        <img src="${listing.image_url || 'https://via.placeholder.com/400x300?text=Property'}" 
             alt="${listing.title}"
             onerror="this.src='https://via.placeholder.com/400x300?text=Property'"/>
        ${transactionBadge}
      </div>

      <div class="listing-card-content">
        <div>
          <h2>${listing.title}</h2>
          <p class="meta">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            ${listing.location}
          </p>
        </div>

        <div class="price-section">
          <div>
            <span class="price">
              ₹${parseInt(listing.price).toLocaleString('en-IN')}
            </span>
            ${listing.transaction_type === 'rent' ? '<span style="font-size: 0.75rem; color: #64748b; margin-left: 0.25rem;">/month</span>' : ''}
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem;">
          <div class="meta" style="gap: 0.75rem;">
            <span class="meta">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              ${listing.bedrooms} BHK
            </span>
            <span class="meta">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
              </svg>
              ${listing.area_sqft} sqft
            </span>
          </div>
          <span style="color: #64748b;">
            ${propertyTypeIcon} ${listing.property_type}
          </span>
        </div>
      </div>
    </div>
  `;
}
