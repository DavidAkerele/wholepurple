import MealBuilder from "@/components/MealBuilder";
import { notFound } from "next/navigation";

export default async function BuilderPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const type = resolvedParams.type;

  if (type !== "stir-fry" && type !== "salad") {
    notFound();
  }

  const builders = {
    "stir-fry": {
      title: "Stir-Fry",
      description: "Customize your perfect stir-fry bowl with fresh local vegetables and premium proteins.",
      basePrice: 4500,
      image: "/images/scraped/stir-fry-vegetables-in-a-bowl-isolated-on-transparent-background-png.webp",
      categories: [
        {
          id: "veggies",
          name: "Fresh Vegetables",
          minItems: 3,
          maxItems: 6,
          items: [
            { id: "sweet-corn", name: "Sweet Corn", image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png" },
            { id: "red-pepper", name: "Red Bell Pepper", image: "Green-Bell-Pepper-hero@2x.png" }, // Using green placeholder if red is missing
            { id: "green-pepper", name: "Green Bell Pepper", image: "Green-Bell-Pepper-hero@2x.png" },
            { id: "yellow-pepper", name: "Yellow Bell Pepper", image: "Green-Bell-Pepper-hero@2x.png" },
            { id: "spinach", name: "Fresh Spinach", image: "pngimg.com-spinach_PNG33.png" },
            { id: "zucchini", name: "Zucchini", image: "zucchini-transparent-background-png.webp" },
            { id: "onions", name: "Red Onions", image: "fresh-red-onions-arranged-on-a-clean-transparent-background-perfect-for-culinary-use-or-food-photography-red-onion-on-transparent-background-free-png.webp" },
            { id: "carrots", name: "Sliced Carrots", image: "ai-generated-fresh-carrot-isolated-free-png.webp" }
          ]
        },
        {
          id: "protein",
          name: "Premium Protein",
          minItems: 1,
          maxItems: 2,
          items: [
            { id: "chicken", name: "Marinated Chicken", image: "marinated-chicken-cutout.png", price: 1500 },
            { id: "beef", name: "Tender Beef Cuts", image: "beef-strips-cutout.png", price: 2000 },
            { id: "shrimp", name: "Tiger Shrimp", image: "tiger-shrimp-cutout.png", price: 3000 }
          ]
        }
      ]
    },
    "salad": {
      title: "Salad",
      description: "Design your crisp, organic salad bowl. Fresh, raw, and full of nutrients.",
      basePrice: 3500,
      image: "/images/scraped/fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp",
      categories: [
        {
          id: "base",
          name: "Greens Base",
          minItems: 1,
          maxItems: 2,
          items: [
            { id: "kale", name: "Organic Kale", image: "fresh-kale-leaves-on-a-clean-transparent-background-ready-to-be-used-in-healthy-cooking-and-salads-kale-transparent-background-free-png.webp" },
            { id: "spinach", name: "Baby Spinach", image: "pngimg.com-spinach_PNG33.png" },
            { id: "cabbage", name: "Pointed Cabbage", image: "fresh-pointed-cabbage-isolated-on-a-transparent-background-showcasing-its-vibrant-green-leaves-and-natural-textures-pointed-cabbage-isolated-on-transparent-background-free-png.webp" }
          ]
        },
        {
          id: "toppings",
          name: "Toppings",
          minItems: 3,
          maxItems: 5,
          items: [
            { id: "avocado", name: "Creamy Avocado", image: "Layer1_1946x_bdece6b5-db92-4b57-8d7a-7771d6a5218e.webp" },
            { id: "onions", name: "Red Onions", image: "fresh-red-onions-arranged-on-a-clean-transparent-background-perfect-for-culinary-use-or-food-photography-red-onion-on-transparent-background-free-png.webp" },
            { id: "carrots", name: "Carrot Ribbons", image: "ai-generated-fresh-carrot-isolated-free-png.webp" },
            { id: "corn", name: "Sweet Corn", image: "pngtree-pile-of-sweet-corn-kernels-isolated-on-transparent-background-png-image_16574129.png" }
          ]
        },
        {
          id: "protein",
          name: "Protein Power",
          minItems: 1,
          maxItems: 1,
          items: [
            { id: "grilled-chicken", name: "Grilled Chicken", image: "marinated-chicken-cutout.png", price: 1200 },
            { id: "tofu", name: "Seared Tofu", image: "Layer1_1946x_bdece6b5-db92-4b57-8d7a-7771d6a5218e.webp", price: 1000 },
            { id: "shrimp", name: "Garlic Shrimp", image: "tiger-shrimp-cutout.png", price: 2500 }
          ]
        }
      ]
    }
  };

  const builderData = builders[type];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <MealBuilder 
        type={type as any}
        title={builderData.title}
        description={builderData.description}
        basePrice={builderData.basePrice}
        categories={builderData.categories as any}
        image={builderData.image}
      />
    </div>
  );
}
