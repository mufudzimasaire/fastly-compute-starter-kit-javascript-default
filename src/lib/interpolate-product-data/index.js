import * as cheerio from 'cheerio';
import { productMarkup } from './product';

export async function interpolateProductData(html, productData) {
  const $ = cheerio.load(html);
  const products = productData?.hits || []
  const placeholderProducts = $('[data-container="products_container"]').children()
  const numberOfProducts = products.length
  const numberOfPlaceholders = placeholderProducts.length

  /**
   * When there are no placeholders
   */
  if (numberOfPlaceholders === 0) return $.html()

  /**
   * When no data is returned from Algolia,
   * remove all placeholders
   */
  if (numberOfProducts === 0) {
    placeholderProducts.remove()
    return $.html();
  }

  /**
   * When there are more products than placeholders
   */
   if (numberOfProducts > numberOfPlaceholders) {
    const numberOfExtraProducts = (numberOfProducts - numberOfPlaceholders)
    products.splice(-numberOfExtraProducts)
  }

  /**
   * When there are less products than placeholders
   */
  if (numberOfProducts < numberOfPlaceholders) {
    placeholderProducts.each((index, child) => {
      if (index >= numberOfProducts) {
        $(child).remove();
      }
    });
  }

  /**
   * Replace placeholders with Algolia products
   */
  products.forEach((hit, index) => {
    placeholderProducts
      .eq(index)
      .replaceWith(productMarkup(hit));
  });

  return $.html();
};

