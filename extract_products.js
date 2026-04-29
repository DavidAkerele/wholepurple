const fs = require('fs');

const dataStr = fs.readFileSync('/Users/davidakerele/.gemini/antigravity/brain/565b1c18-0723-4d25-9cdb-b55437889b9a/scratch/site_data.txt', 'utf8');

const match = dataStr.match(/window\.mcPixel\.data\s*=\s*({.*?}?})\s*;/);

if (match) {
  try {
    const rawData = JSON.parse(match[1]);
    const products = rawData.products || [];
    
    const uniqueMap = new Map();
    products.forEach(p => {
      uniqueMap.set(p.productId, {
        name: p.title,
        slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        price: p.price,
        categoryName: p.categories[0] || 'Uncategorized',
        image: p.imageUrl ? p.imageUrl.split('/').pop() : ''
      });
    });
    
    const finalProducts = Array.from(uniqueMap.values());
    fs.writeFileSync('/Users/davidakerele/.gemini/antigravity/brain/565b1c18-0723-4d25-9cdb-b55437889b9a/scratch/extracted_products.json', JSON.stringify(finalProducts, null, 2));
    console.log(`Extracted ${finalProducts.length} unique products.`);
  } catch (e) {
    console.error("Parse error:", e.message);
  }
} else {
  console.log("Could not find mcPixel data.");
}
