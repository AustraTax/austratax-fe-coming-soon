"use client";
import React from "react";
import { Users, Globe, ShieldCheck, CheckCircle } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-orange-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#ed8936] mb-4 leading-tight">
              About AustraTax
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Helping Australians file smarter, simpler, faster — whether you're
              a student, visa holder, or working resident.
            </p>
          </div>
          <div>
            <img
              src="/mainimage.png"
              alt="Tax illustration"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Why We Created */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why We Created AustraTax
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Filing tax returns shouldn’t require a dictionary or a degree. We
            built this tool to simplify everything — especially for visa
            holders, students, and casual workers.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            No jargon. No paperwork panic. Just step-by-step guidance, accurate
            calculations, and faster refunds.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="text-[#ed8936] w-6 h-6" />,
                text: "Tailored questions based on your visa, income, and location",
              },
              {
                icon: <Globe className="text-[#ed8936] w-6 h-6" />,
                text: "Zone offset calculator that auto-detects based on postcode",
              },
              {
                icon: <ShieldCheck className="text-[#ed8936] w-6 h-6" />,
                text: "Simple, secure, and easy to use — even for first-timers",
              },
              {
                icon: <CheckCircle className="text-[#ed8936] w-6 h-6" />,
                text: "Specifically built for students, travellers, and casual workers",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-5 shadow-sm flex flex-col items-center text-center"
              >
                <div className="mb-3">{item.icon}</div>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">Who We Help</h2>
          <p className="text-gray-700 text-lg">
            Our tools are built for people with real-life work setups and visa
            complexity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
              🎓 Students
            </span>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
              🧳 Backpackers
            </span>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
              💼 Freelancers
            </span>
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
              🏡 Remote Workers
            </span>
          </div>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="bg-orange-50 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <blockquote className="italic text-gray-700 text-lg leading-relaxed">
            “Our mission is to make Australian tax filing feel human, helpful,
            and hassle-free.”
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
            Ready to File Smarter?
          </h2>
          <p className="text-gray-700 mb-6">
            Start estimating your tax refund in minutes — no signup needed.
          </p>
          <a
            href="/australian-tax-returns-calculator"
            className="inline-block bg-[#ed8936] text-white text-base font-semibold px-8 py-3 rounded-lg hover:scale-105 hover:opacity-90 transition"
          >
            Calculate Your Tax
          </a>
        </div>
      </section>
    </main>
  );
}
