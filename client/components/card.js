// client/components/card.js

export function createListingCard(listing) {
  const {
    title,
    location,
    price,
    property_type,
    transaction_type,
    bedrooms,
    area_sqft,
    image_url
  } = listing;

  const imgSrc = image_url || 'https://via.placeholder.com/600x400';

  return `
    <article class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col">
      <img
        src="${imgSrc}"
        alt="${title}"
        class="h-40 w-full object-cover"
      />
      <div class="p-3 flex flex-col gap-1 flex-1">
        <h2 class="font-semibold text-sm line-clamp-1">${title}</h2>
        <p class="text-[11px] text-slate-400 line-clamp-1">${location}</p>

        <p class="mt-1 text-base font-bold text-emerald-400">
          ₹ ${Number(price).toLocaleString('en-IN')}
          <span class="text-[11px] text-slate-400 font-normal">
            ${transaction_type === 'rent' ? '/month' : ''}
          </span>
        </p>

        <p class="text-[11px] text-slate-400">
          ${property_type} • ${bedrooms || '-'} BHK • ${area_sqft} sqft
        </p>

        <button
          class="mt-2 w-full text-xs px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500"
        >
          View Details
        </button>
      </div>
    </article>
  `;
}
