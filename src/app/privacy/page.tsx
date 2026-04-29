export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-16 pb-20">
      <section className="bg-[var(--section-bg)] py-16 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-[var(--primary-purple)] mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: October 2026</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto prose prose-purple">
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We collect personal information that you provide to us when registering an account, placing an order, or contacting us. This includes your name, email address, phone number, and delivery address.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We use the information we collect to fulfill your orders, communicate with you about your account, and improve our services. We may also use your email to send you promotional content if you have opted in to receive it.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We do not sell, rent, or trade your personal information to third parties. We only share information with trusted third-party service providers (such as delivery partners and payment gateways like Paystack) strictly to fulfill your orders.
          </p>
        </div>
      </section>
    </div>
  );
}
