export default function TermsPage() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="bg-[var(--section-bg)] py-16 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-[var(--primary-purple)] mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: October 2026</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto prose prose-purple">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            By accessing or using the Whole Purple website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. Freshness Guarantee & Returns</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Due to the perishable nature of our products, we offer a 2-hour window from the time of delivery to report any issues with freshness or damage. Refunds or replacements are issued at our discretion based on photographic evidence.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to create an account and make purchases on our platform.
          </p>
        </div>
      </section>
    </div>
  );
}
