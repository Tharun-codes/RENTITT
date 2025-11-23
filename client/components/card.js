export function createListingCard(listing) {
  return `
    <div class="listing-card">
      <img src="${listing.image_url}" class="h-48 sm:h-52 w-full object-cover"/>

      <div class="p-3 sm:p-4 space-y-1">
        <h2 class="text-base sm:text-lg font-semibold text-sky-400">
          ${listing.title}
        </h2>

        <p class="meta text-xs sm:text-sm">
          📍 ${listing.location}
        </p>

        <div class="flex justify-between mt-2">
          <span class="price text-sm sm:text-lg">
            ₹ ${listing.price}
          </span>

          <span class="meta text-xs sm:text-sm">
            ${listing.bedrooms} BHK • ${listing.area_sqft} sqft
          </span>
        </div>

        <p class="meta text-xs uppercase tracking-wider">
          ${listing.property_type} • ${listing.transaction_type}
        </p>
      </div>
    </div>
  `;
}
