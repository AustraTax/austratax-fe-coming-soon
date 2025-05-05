import Link from "next/link";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      {/* <section className="relative w-full bg-white min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <div className="w-[90vw] max-w-4xl aspect-square rounded-full overflow-hidden relative opacity-20">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="fadeMask" cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>

                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#ed8936"
                    strokeWidth="1"
                  />
                </pattern>

                <mask id="fadeMaskUse">
                  <rect width="100%" height="100%" fill="url(#fadeMask)" />
                </mask>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="url(#grid)"
                mask="url(#fadeMaskUse)"
              />
            </svg>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#ed8936] mb-6 leading-tight font-[serif]">
            Understand & Maximise Your Tax Return
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium">
            An easy-to-use calculator built for Australian residents and ABN
            holders. Instantly estimate your taxes, deductions, and refunds —
            all in one place.
          </p>
          <Link
            href="/australian-tax-returns-calculator"
            className="inline-block bg-[#ed8936] text-white text-base font-semibold px-8 py-3 rounded-lg hover:scale-105 hover:opacity-90 transition-all"
          >
            Calculate Your Tax
          </Link>
        </div>
      </section> */}

      {/* Mission Section */}
      <section className="w-full min-h-screen bg-gray-50 flex items-center py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
