import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="w-full min-h-screen bg-gray-50 flex items-center py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
              Making Tax Simpler, Smarter, and Stress-Free
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At AustraTax, our mission is to make tax calculations accessible
              and easy for everyone — whether you're a salaried employee or a
              business owner with an ABN. We’re committed to helping Australians
              understand their tax position, claim all eligible deductions, and
              estimate refunds without needing a professional.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Instantly estimate your taxes, deductions, and refunds — all in
              one place.
            </p>

            <Link
              href="/australian-tax-returns-calculator"
              className="inline-block bg-[#ed8936] text-white text-base font-semibold px-8 py-3 rounded-lg hover:scale-105 hover:opacity-90 transition-all"
            >
              Calculate Your Tax Return Now
            </Link>
          </div>

          {/* Image */}
          <div className="w-full">
            <img
              src="/taximage.png"
              alt="Person using tax calculator"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </>
  );
}
