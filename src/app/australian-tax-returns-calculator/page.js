"use client";
import React, { useState, useEffect } from "react";
import TaxForm from "../../components/TaxForm";
import SummaryPanel from "../../components/SummaryPanel";
import { calculateHelpRepayment } from "../../lib/taxUtils";
import Disclaimer from "@/components/Disclaimer";

export default function SimplePage() {
  const [state, setState] = useState({
    income: "",
    taxPaid: "",
    deductions: [],
    newCategory: "Work from home",
    newAmount: "",
    year: "this",
    taxFreeFlag: "yes",
    hasZoneOffset: "no",
    zoneOffset: "",
    zoneDays: "",
    useKmVehicle: "yes",
    vehicleKm: "",
    vehicleRate: "0.78",
    vehicleManual: "",
    remoteOffsetFlag: "no",
    helpFlag: "no",
    medicareExemptFlag: "no",
    privateHealthFlag: "yes",
    hasDependants: "no",
    numDependants: "",
  });

  const handlers = {
    setIncome: (val) => setState((s) => ({ ...s, income: val })),
    setTaxPaid: (val) => setState((s) => ({ ...s, taxPaid: val })),
    setNewCategory: (val) => setState((s) => ({ ...s, newCategory: val })),
    setNewAmount: (val) => setState((s) => ({ ...s, newAmount: val })),
    removeDeduction: (idx) =>
      setState((s) => ({
        ...s,
        deductions: s.deductions.filter((_, i) => i !== idx),
      })),
    setYear: (val) => setState((s) => ({ ...s, year: val })),
    setTaxFreeFlag: (val) => setState((s) => ({ ...s, taxFreeFlag: val })),
    setHasZoneOffset: (val) => setState((s) => ({ ...s, hasZoneOffset: val })),
    setZoneOffset: (val) => setState((s) => ({ ...s, zoneOffset: val })),
    setZoneDays: (val) => setState((s) => ({ ...s, zoneDays: val })),
    setUseKmVehicle: (val) => setState((s) => ({ ...s, useKmVehicle: val })),
    setVehicleKm: (val) => setState((s) => ({ ...s, vehicleKm: val })),
    setVehicleRate: (val) => setState((s) => ({ ...s, vehicleRate: val })),
    setVehicleManual: (val) => setState((s) => ({ ...s, vehicleManual: val })),
    setRemoteOffsetFlag: (val) =>
      setState((s) => ({ ...s, remoteOffsetFlag: val })),
    setHelpFlag: (val) => setState((s) => ({ ...s, helpFlag: val })),
    setMedicareExemptFlag: (val) =>
      setState((s) => ({ ...s, medicareExemptFlag: val })),
    setPrivateHealthFlag: (val) =>
      setState((s) => ({ ...s, privateHealthFlag: val })),
    setHasDependants: (val) => setState((s) => ({ ...s, hasDependants: val })),
    setNumDependants: (val) => setState((s) => ({ ...s, numDependants: val })),
  };

  const addDeduction = () => {
    const amt = parseFloat(state.newAmount) || 0;
    if (state.newCategory && amt > 0) {
      setState((s) => ({
        ...s,
        deductions: [...s.deductions, { category: s.newCategory, amount: amt }],
        newAmount: "",
      }));
    }
  };

  const [summary, setSummary] = useState({
    tax: 0,
    taxableBefore: 0,
    taxable: 0,
    lito: 0,
    helpRepayment: 0,
    medicareLevy: 0,
    medicareSurcharge: 0,
    marginalRate: 0,
    netIncome: 0,
    refundMessage: "",
  });

  useEffect(() => {
    const s = state;
    const gross = parseFloat(s.income) || 0;
    const paid = parseFloat(s.taxPaid) || 0;
    const customSum = s.deductions.reduce((sum, d) => sum + d.amount, 0);
    const days = Math.min(parseInt(s.zoneDays) || 0, 365);
    const rates = { A: 338, B: 57, S: 1173 };
    const zoneVal =
      s.hasZoneOffset === "yes" ? ((rates[s.zoneOffset] || 0) * days) / 365 : 0;
    const vehDed =
      s.useKmVehicle === "yes"
        ? (parseFloat(s.vehicleKm) || 0) * (parseFloat(s.vehicleRate) || 0)
        : parseFloat(s.vehicleManual) || 0;
    const remoteDed = s.remoteOffsetFlag === "yes" ? 500 : 0;
    const totalDeduct = customSum + zoneVal + vehDed + remoteDed;
    const baseTaxable = Math.max(gross - totalDeduct, 0);
    const threshold = s.taxFreeFlag === "yes" ? 18200 : 0;
    const afterThreshold = Math.max(baseTaxable - threshold, 0);

    let bracketTax = 0;
    if (afterThreshold <= 37500) bracketTax = afterThreshold * 0.19;
    else if (afterThreshold <= 120000)
      bracketTax = 7125 + (afterThreshold - 37500) * 0.325;
    else if (afterThreshold <= 180000)
      bracketTax = 29467 + (afterThreshold - 120000) * 0.37;
    else bracketTax = 51667 + (afterThreshold - 180000) * 0.45;

    let lOff = 0;
    if (afterThreshold <= 37500) lOff = 700;
    else if (afterThreshold <= 66667)
      lOff = Math.max(0, 700 - (afterThreshold - 37500) * 0.05);

    const helpRep =
      s.helpFlag === "yes" ? calculateHelpRepayment(afterThreshold) : 0;
    const med = s.medicareExemptFlag === "yes" ? 0 : baseTaxable * 0.02;
    const surcharge =
      s.privateHealthFlag === "no" && baseTaxable > 140000
        ? baseTaxable * 0.01
        : 0;
    const totalTax = Math.max(0, bracketTax - lOff) + helpRep + med + surcharge;
    const net = gross - totalTax;

    let margin = 0;
    if (afterThreshold <= 37500) margin = 19;
    else if (afterThreshold <= 120000) margin = 32.5;
    else if (afterThreshold <= 180000) margin = 37;
    else margin = 45;

    setSummary({
      tax: bracketTax,
      taxableBefore: baseTaxable,
      taxable: afterThreshold,
      lito: lOff,
      helpRepayment: helpRep,
      medicareLevy: med,
      medicareSurcharge: surcharge,
      marginalRate: margin,
      netIncome: net,
      refundMessage:
        paid > totalTax
          ? `🟢 Refund: $${(paid - totalTax).toFixed(2)}`
          : paid < totalTax
          ? `🔴 Owe: $${(totalTax - paid).toFixed(2)}`
          : "✅ No balance owing",
    });
  }, [state]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <Disclaimer />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Tax Form */}
        <div className="md:col-span-2">
          <TaxForm
            state={state}
            handlers={handlers}
            addDeduction={addDeduction}
          />
        </div>

        {/* Right: Sticky Summary Panel */}
        <div className="relative">
          <div className="sticky top-6">
            <SummaryPanel data={summary} />
          </div>
        </div>
      </div>
    </main>
  );
}
