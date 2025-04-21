// app/contact/page.js

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Contact Us
      </h1>

      <p className="text-center text-gray-600">
        Got questions, feedback, or just wanna say hi? Drop us a message below.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            rows="5"
            className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936]"
            placeholder="What’s on your mind?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#ed8936] text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
