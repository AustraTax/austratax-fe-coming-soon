import TaxStepper from "@/components/tax/TaxStepper";

export const metadata = {
  title: "Tax Calculator | AustraTax",
  description:
    "Estimate your Australian income tax or business tax easily. Supports PAYG and ABN calculations, superannuation, and deductions.",
  keywords:
    "Australia tax calculator, income tax estimator, ABN tax, PAYG, GST, deductions, refund estimate",
  openGraph: {
    title: "Tax Calculator | AustraTax",
    description:
      "Easily calculate your Australian tax return. Ideal for individuals and ABN holders.",
    url: "https://austratax.com/tax-calculator",
    siteName: "AustraTax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Calculator | AustraTax",
    description: "Accurate tax estimation for individuals and ABN holders.",
  },
};

export default function TaxCalculatorPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <TaxStepper />
    </main>
  );
}
