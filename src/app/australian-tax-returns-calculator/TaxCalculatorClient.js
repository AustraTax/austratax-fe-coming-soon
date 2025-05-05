"use client";
import React, { useState, useEffect } from "react";
import TaxForm from "../../components/TaxForm";
import SummaryPanel from "../../components/SummaryPanel";
import { calculateHelpRepayment } from "../../lib/taxUtils";
import taxConfig from "../data/taxConfig.json";
import Disclaimer from "@/components/Disclaimer";

export default function SimplePage() {
  const [state, setState] = useState({
    clientName: "",
    income: "",
    taxPaid: "",
    deductions: [],
    newCategory: "Work from home",
    newAmount: "",
    year: "this",
    isResident: "yes",
    visaStatus: "",
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
    setIncome: (v) => setState((s) => ({ ...s, income: v })),
    setTaxPaid: (v) => setState((s) => ({ ...s, taxPaid: v })),
    setNewCategory: (v) => setState((s) => ({ ...s, newCategory: v })),
    setNewAmount: (v) => setState((s) => ({ ...s, newAmount: v })),
    removeDeduction: (i) =>
      setState((s) => ({
        ...s,
        deductions: s.deductions.filter((_, j) => j !== i),
      })),
    setYear: (v) => setState((s) => ({ ...s, year: v })),
    setIsResident: (v) => setState((s) => ({ ...s, isResident: v })),
    setVisaStatus: (v) =>
      setState((s) => {
        if (v === "student" || v === "subclass485") {
          alert("You are an Australian resident for tax purposes.");
          return { ...s, visaStatus: v, isResident: "yes" };
        }
        return { ...s, visaStatus: v };
      }),
    setZoneOffset: (v) => setState((s) => ({ ...s, zoneOffset: v })),
    setZoneDays: (v) => setState((s) => ({ ...s, zoneDays: v })),
    setUseKmVehicle: (v) => setState((s) => ({ ...s, useKmVehicle: v })),
    setVehicleKm: (v) => setState((s) => ({ ...s, vehicleKm: v })),
    setVehicleRate: (v) => setState((s) => ({ ...s, vehicleRate: v })),
    setVehicleManual: (v) => setState((s) => ({ ...s, vehicleManual: v })),
    setRemoteOffsetFlag: (v) =>
      setState((s) => ({ ...s, remoteOffsetFlag: v })),
    setHelpFlag: (v) => setState((s) => ({ ...s, helpFlag: v })),
    setMedicareExemptFlag: (v) =>
      setState((s) => ({ ...s, medicareExemptFlag: v })),
    setPrivateHealthFlag: (v) =>
      setState((s) => ({ ...s, privateHealthFlag: v })),
    setHasDependants: (v) => setState((s) => ({ ...s, hasDependants: v })),
    setNumDependants: (v) => setState((s) => ({ ...s, numDependants: v })),
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

  const [summary, setSummary] = useState({});

  useEffect(() => {
    const s = state;
    const gross = parseFloat(s.income) || 0;
    const paid = parseFloat(s.taxPaid) || 0;
    const sumD = s.deductions.reduce((a, d) => a + d.amount, 0);

    // Zone offset
    const days = Math.min(parseInt(s.zoneDays) || 0, 365);
    const zoneRates = { A: 338, B: 57, S: 1173 };
    const zoneD = s.zoneOffset
      ? ((zoneRates[s.zoneOffset] || 0) * days) / 365
      : 0;

    // Vehicle deduction
    const vehD =
      s.useKmVehicle === "yes"
        ? (parseFloat(s.vehicleKm) || 0) * (parseFloat(s.vehicleRate) || 0)
        : parseFloat(s.vehicleManual) || 0;

    const remoteD = s.remoteOffsetFlag === "yes" ? 500 : 0;
    const totalDeductions = sumD + zoneD + vehD + remoteD;
    const taxableBefore = Math.max(gross - totalDeductions, 0);

    // Determine bracket config
    const FY = s.year === "this" ? "2024-25" : "2023-24";
    const visaRec = taxConfig.visaOptions.find((v) => v.key === s.visaStatus);
    const cat =
      s.isResident === "yes" ? "resident" : visaRec?.residency || "nonResident";
    const cfg = taxConfig[FY][cat];

    // Income tax by bracket
    let bracketTax = 0;
    for (const b of cfg.brackets) {
      if (taxableBefore <= b.min) continue;
      const inBracket = Math.min(taxableBefore, b.max || Infinity) - b.min;
      bracketTax += inBracket * b.rate;
    }

    // LITO (residents only)
    const threshold = cat === "resident" ? 18200 : 0;
    const afterThreshold = Math.max(taxableBefore - threshold, 0);
    const lito =
      cat === "resident" && cfg.lito
        ? (() => {
            const { maxOffset, phaseOutStart, phaseOutEnd, rate } = cfg.lito;
            if (afterThreshold <= phaseOutStart) return maxOffset;
            if (afterThreshold >= phaseOutEnd) return 0;
            return Math.max(
              0,
              maxOffset - (afterThreshold - phaseOutStart) * rate
            );
          })()
        : 0;

    // HELP repayment
    const helpRep =
      s.helpFlag === "yes" ? calculateHelpRepayment(afterThreshold) : 0;

    // Medicare levy (with exemption & phase-in)
    const medCfg = taxConfig[FY].medicare;
    let medicare = 0;
    if (cat !== "nonResident" && s.medicareExemptFlag === "no") {
      if (taxableBefore <= medCfg.threshold) {
        medicare = 0;
      } else if (taxableBefore <= medCfg.phaseInEnd) {
        medicare = (taxableBefore - medCfg.threshold) * medCfg.phaseInRate;
      } else {
        medicare = taxableBefore * medCfg.rate;
      }
    }

    // Medicare levy surcharge (1% if no private cover & >90k)
    const surcharge =
      s.privateHealthFlag === "no" && taxableBefore > 90000
        ? taxableBefore * 0.01
        : 0;

    // Total tax & net income
    const totalTax =
      Math.max(0, bracketTax - lito) + helpRep + medicare + surcharge;
    const netIncome = gross - totalTax;

    // Marginal rate (last bracket)
    const lastB =
      cfg.brackets
        .slice()
        .reverse()
        .find((b) => taxableBefore >= b.min) || cfg.brackets[0];
    const marginalRate = lastB.rate * 100;

    // Refund or owing
    const refundMessage =
      paid > totalTax
        ? `🟢 Refund: $${(paid - totalTax).toFixed(2)}`
        : paid < totalTax
        ? `🔴 Owe:   $${(totalTax - paid).toFixed(2)}`
        : "✅ No balance owing";

    // Set everything in one go
    setSummary({
      gross,
      totalDeductions,
      taxableBefore,
      netIncome,
      zoneD,
      vehD,
      remoteD,
      bracketTax,
      totalTax,
      lito,
      help: helpRep,
      medicare,
      surcharge,
      marginalRate,
      refundMessage,
    });
  }, [state]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <Disclaimer />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Left: Tax Form */}
        {/* Tax Form: Smaller width */}
        <div className="md:col-span-3">
          <TaxForm
            state={state}
            handlers={handlers}
            addDeduction={addDeduction}
          />
        </div>

        {/* Summary Panel: Bigger */}
        <div className="md:col-span-2 relative">
          <div className="sticky top-6">
            <SummaryPanel data={summary} state={state} />
          </div>
        </div>
      </div>
    </main>
  );
}
