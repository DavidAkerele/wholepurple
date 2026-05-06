const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Re-styling all product descriptions to match the premium 'Avocado' standard...");

  const updates = [
    // Fruits
    { slug: "avocado", description: "The creamy, forest-green king of the superfood world. Our avocados are picked at the precise moment of perfection, offering a buttery, melt-in-your-mouth texture that is rich in heart-healthy fats and essential nutrients. Whether smashed on sourdough, tossed in a vibrant salad, or enjoyed with a simple pinch of sea salt, it's the ultimate clean-energy fuel for your harvest journey. It's not just a fruit; it's a lifestyle." },
    { slug: "watermelon", description: "The ruby-red hydration hero of the summer harvest. Every watermelon is tested for peak sugar content and a deep, crisp interior that delivers an immediate explosion of cooling refreshment. Perfect for sun-soaked afternoon snacks, chilled fruit platters, or a revitalizing post-workout boost. It's the ultimate natural thirst-quencher that brings the spirit of the harvest to your table." },
    { slug: "pineapple", description: "The golden, sun-drenched icon of tropical luxury. Our Nigerian pineapples are prized for their low acidity and honey-like sweetness, harvested only when their fragrance fills the air. Rich in natural enzymes and Vitamin C, they are as good for your digestion as they are for your taste buds. Slice them for a fresh snack, grill them to caramelize their sugars, or blend them into the ultimate morning smoothie." },
    { slug: "passion-fruit", description: "A tiny, purple capsule of concentrated tropical intensity. Beneath its wrinkled exterior lies a bright, tart pulp that offers one of the most aromatic experiences in the fruit world. High in fiber and Vitamin A, it's the sophisticated flavor booster your morning yogurt or weekend mocktails have been waiting for. A little goes a long way, but a lot is never enough." },
    { slug: "imported-tangerine", description: "The bright, seedless gems of the citrus world. Sourced for their vibrant color and easy-to-peel skin, these tangerines deliver a concentrated burst of sweet, juice-filled sunshine. They are the perfect on-the-go fuel for busy days, packed with Vitamin C and a refreshing acidity that wakes up your palate. It's the cleanest, most convenient snack nature ever designed." },
    { slug: "blueberries", description: "The deep-blue, antioxidant powerhouses of the berry patch. Each blueberry is a tiny explosion of tart-sweet juice, offering a sophisticated flavor profile that is as complex as it is satisfying. Known for their brain-boosting properties and vibrant color, they are the ultimate upgrade for your harvest breakfast bowls, baking projects, or simple handful-at-a-time snacking." },

    // Vegetables
    { slug: "zucchini", description: "The forest-green chameleon of the healthy kitchen. Harvested young to ensure a tender skin and a nutty, subtle flavor, our zucchinis are a low-calorie masterpiece of versatility. Whether you're spiralizing them into clean noodles, roasting them into golden coins, or adding them to your favorite bakes, they provide a nutrient-dense foundation for any creative meal. It's the ultimate wingman for your clean-eating goals." },
    { slug: "white-sweet-potato", description: "The sophisticated, starchy heart of the Nigerian harvest. Unlike traditional yams, our white sweet potatoes offer a dense texture and a subtle, chestnut-like sweetness that roasts to a perfect golden crisp. They are a complex-carb powerhouse, providing steady energy and a rich dose of minerals. Mash them, roast them, or fry them—they are the premium foundation for any hearty, healthy meal." },
    { slug: "ube-african-pear", description: "The legendary 'butter of the gods' from the heart of the harvest. These purple-skinned treasures transform when roasted into a creamy, slightly tart delicacy that is rich in healthy fats and traditional heritage. They are the ultimate nutrient-dense companion for roasted corn or a warm morning porridge, offering a satisfying, savory experience that is truly unique to the African palate." },
    { slug: "kale", description: "The dark-green, curly-leafed champion of the superfood world. Grown in mineral-rich soil to ensure maximum nutrient density, our kale is as sturdy as it is vibrant. It's the ultimate source of Vitamin K and iron, offering a satisfying crunch whether massaged for a salad, baked into crispy chips, or blended into a high-octane green smoothie. It's the cornerstone of a high-performance harvest diet." },
    { slug: "cauliflower", description: "The ivory-white, low-carb canvas of your culinary dreams. Our cauliflower is hand-selected for its tight florets and mild, buttery flavor, making it the perfect base for creative, clean cooking. From 'rice' and steaks to creamy purees, it absorbs flavors beautifully while providing a massive dose of fiber and Vitamin C. It's the versatile hero that proves healthy eating is never boring." },
    { slug: "broccoli", description: "The vibrant green, tree-like towers of nutritional power. Each floret is a concentrated source of fiber, vitamins, and antioxidants, harvested at the height of its freshness. Whether you're steaming it to preserve its crunch or roasting it for a smoky, charred finish, it's the reliable green giant that brings a sense of vitality to every plate. It's the essential green staple for a balanced harvest life." },

    // Teas
    { slug: "belly-brew", description: "The botanical peace treaty your digestive system has been waiting for. This sophisticated blend combines the warming heat of Nigerian ginger with the cooling breeze of peppermint and the soft, floral embrace of chamomile. Designed to settle post-meal storms and promote a sense of lightness, it's the ultimate post-dinner ritual for those who value comfort and calm. No bloating, no fuss—just pure, harvested peace in a cup." },
    { slug: "fire-quench", description: "A vibrant, ruby-red shield against the heat of the day. We've blended the tart, antioxidant-rich petals of hibiscus with aromatic lemongrass and field-fresh mint to create the ultimate cooling infusion. It's a liquid air conditioner that hits your palate with a citrusy brightness and a clean, refreshing finish. Pour it over ice, find a patch of shade, and let the world cool down around you." },

    // Spices
    { slug: "suya-spice-premium", description: "The smoky, nutty soul of the Northern Nigerian harvest. Our premium Suya spice is an authentic tribute to tradition, made with hand-roasted groundnuts and a precise, aromatic blend of ginger and garlic. It's the ultimate dry rub that transforms any protein into a savory masterpiece, offering a complex, satisfying flavor profile that lingers on the palate. It's not just a spice; it's a heritage experience." },
    { slug: "epic-suya", description: "The extra-bold, maximalist evolution of our classic Suya blend. We've taken the authentic groundnut base and intensified it with extra smoked peppers and a touch of fermented depth for a flavor that is truly 'Epic'. It's designed for those who believe that more is always more when it comes to flavor, delivering a deeply savory, smoky punch that elevates every roast to a whole new level." }
  ];

  for (const update of updates) {
    await prisma.product.update({
      where: { slug: update.slug },
      data: { description: update.description }
    });
  }

  console.log("All descriptions successfully re-styled to the 'Avocado' standard!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
