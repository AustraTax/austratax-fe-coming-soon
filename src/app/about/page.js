// app/about/page.js

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-[#ed8936] mb-4">
          What is Austratax?
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Austratax is your personal tax assistant — built to simplify the
          Australian tax process for residents, visa holders, and working
          students. No jargon. No guesswork. Just clean, step-by-step guidance
          that actually makes sense.
        </p>
      </section>

      <section className="bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Why we built it
        </h2>
        <p className="text-gray-700">
          Tax returns in Australia can get confusing — especially when you're
          dealing with visa conditions, regional offsets, or casual jobs.
          Austratax was built to make this easier.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Smart questions tailored to your visa and work type</li>
          <li>Postcode-based logic to help calculate zone offsets</li>
          <li>Clear interface — no government-speak</li>
        </ul>
      </section>
    </div>
  );
}
