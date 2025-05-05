import { getMeta } from "@/lib/seo";
import TaxCalculatorClient from "./TaxCalculatorClient";

export const metadata = getMeta({
  title: "Tax Return Estimator – AustraTax",
  description:
    "Use our fast, free Australian tax return calculator to estimate your tax refund. Perfect for students, visa holders, and working residents.",
  keywords:
    "Australian tax calculator, ATO refund estimator, tax deductions, working holiday, student visa, ABN tax, AustraTax tool",
  url: "https://austratax.com.au/australian-tax-returns-calculator",
  image: "/taximage.png",
});

export default function TaxCalculatorPage() {
  return <TaxCalculatorClient />;
}
