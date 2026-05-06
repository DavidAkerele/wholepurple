export function getProductImageUrl(imageField: string | null | undefined): string {
  if (!imageField) return '/images/scraped/woocommerce-placeholder.webp';

  try {
    const images = JSON.parse(imageField);
    const img = Array.isArray(images) ? images[0] : imageField;
    return img?.startsWith('http') ? img : `/images/scraped/${img || 'woocommerce-placeholder.webp'}`;
  } catch {
    // Not valid JSON, assume it's a direct URL or filename
    return imageField.startsWith('http') ? imageField : `/images/scraped/${imageField || 'woocommerce-placeholder.webp'}`;
  }
}

export function getAllProductImages(imageField: string | null | undefined): string[] {
  if (!imageField) return ['/images/scraped/woocommerce-placeholder.webp'];

  try {
    const images = JSON.parse(imageField);
    if (Array.isArray(images)) {
      return images.map(img => img.startsWith('http') ? img : `/images/scraped/${img}`);
    }
  } catch {
    // Not valid JSON
  }
  
  return [imageField.startsWith('http') ? imageField : `/images/scraped/${imageField}`];
}
