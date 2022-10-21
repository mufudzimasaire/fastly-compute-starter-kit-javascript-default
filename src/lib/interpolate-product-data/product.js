export function productMarkup(product) {
  return `
    <a href="${product.product_path}" class='algolia'>
      <div class="group relative">
        <div
          class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"
        >
          <img
            src="${product.thumbnail_url}"
            alt="${product.product_title}"
            class="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
            </h3>
            <p class="mt-1 text-sm text-gray-500">${product.title}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">Price: ${product.current_price}</p>
        </div>
      </div>
    </a>
    `;
};