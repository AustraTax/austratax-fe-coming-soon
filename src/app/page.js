import Hero from "@/components/Hero";
import { getMeta } from "@/lib/seo";

export const metadata = getMeta({
  title: "AustraTax – Smarter Australian Tax Return Calculator",
  description:
    "Instantly calculate your Australian tax return, claim deductions, and estimate your refund. Perfect for students, residents, backpackers, and ABN holders.",
  keywords:
    "Australian tax calculator, tax refund, ATO, deductions, ABN, student tax",
  url: "https://austratax.com.au/",
  image: "/taximage.png", // relative to public/
});

export default function Home() {
  return <Hero />;
}
