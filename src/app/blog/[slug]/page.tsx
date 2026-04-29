import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Hardcoded for demo purposes since we don't have a blog DB model
  const postMap: Record<string, any> = {
    "why-chemical-free-farming-matters": {
      title: "Why Chemical-Free Farming Matters",
      date: "October 12, 2026",
      category: "Sustainability",
      content: `Chemical-free farming isn't just a buzzword; it's a fundamental shift in how we interact with our environment and our food. By eliminating synthetic pesticides and fertilizers, we preserve the microbial life in the soil, which in turn produces crops that are more resilient and nutritionally dense.\n\nAt Whole Purple, we partner strictly with farms that prioritize natural pest control and organic compost. This means the vegetables and fruits you receive aren't just better for the planet—they taste significantly better, carrying the true, unadulterated flavor of the earth.`
    },
    "5-quick-stir-fry-recipes": {
      title: "5 Quick Stir-Fry Recipes for Busy Evenings",
      date: "October 05, 2026",
      category: "Recipes",
      content: `We know that after a long day, the last thing you want to do is spend hours in the kitchen. That's why our Stir-Fry Builders are designed to cut your prep time in half.\n\nHere is our favorite 10-minute recipe:\n\n1. Heat 2 tablespoons of sesame oil in a wok or large pan.\n2. Toss in one pack of our classic Stir-Fry Builder medley.\n3. Add 200g of your favorite protein (chicken, tofu, or beef).\n4. Splash in some soy sauce and a pinch of our Gourmet Garlic Pepper.\n5. Stir continuously for 5-7 minutes until the vegetables are tender but still crisp.\n\nServe over a bed of warm jasmine rice and enjoy!`
    },
    "ultimate-guide-to-marinated-proteins": {
      title: "The Ultimate Guide to Marinated Proteins",
      date: "September 28, 2026",
      category: "Guides",
      content: `Marination is the secret to tender, flavorful meats, but doing it right takes time. Our pre-marinated protein packs take the guesswork and the waiting out of the equation.\n\n**Storage Tips:**\nKeep the packs in the coldest part of your refrigerator if you plan to consume them within 48 hours. For longer storage, freeze them immediately upon delivery. \n\n**Cooking Tips:**\nAlways let your marinated proteins sit at room temperature for 15-20 minutes before cooking. This ensures even heat distribution, whether you are grilling, baking, or pan-frying.`
    }
  };

  const post = postMap[resolvedParams.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen pt-32 pb-20">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1 text-[var(--primary-purple)] font-bold mb-8 hover:underline">
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 bg-green-50 text-[var(--accent-green)] text-xs font-bold uppercase tracking-wider rounded-lg mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-gray-500 font-medium">Published on {post.date}</div>
        </div>

        <div className="aspect-video bg-[#F5F1ED] rounded-3xl mb-12 flex items-center justify-center text-gray-400">
          <span className="font-medium">Hero Image</span>
        </div>

        <div className="prose prose-lg prose-purple max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
}
