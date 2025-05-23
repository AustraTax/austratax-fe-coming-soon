import { Mail } from "lucide-react";
import { getMeta } from "@/lib/seo";

export const metadata = getMeta({
  title: "Contact Us – AustraTax",
  description:
    "Have questions about your tax return or using AustraTax? Get in touch with our team via email. We're happy to help students, visa holders, and Aussie workers alike.",
  keywords:
    "contact Austratax, tax help Australia, support, email tax calculator",
  url: "https://austratax.com.au/contact",
  image: "/logo2.png", // or use /taximage.png if preferred
});

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-10 text-center space-y-8">
        <h1 className="text-4xl font-bold text-[#ed8936]">Contact Us</h1>

        <p className="text-gray-700 text-lg">
          Got questions, feedback, or just want to say hi?
          <br />
          We’d love to hear from you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Mail className="w-6 h-6 text-[#ed8936]" />
          <a
            href="mailto:contact@austratax.com.au"
            className="text-lg font-medium text-[#ed8936] hover:underline"
          >
            contact@austratax.com.au
          </a>
        </div>

        <p className="text-sm text-gray-500">
          We typically respond within 1–2 business days.
        </p>
      </div>
    </main>
  );
}
