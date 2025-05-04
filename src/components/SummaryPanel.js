"use client";
import React from "react";

export default function SummaryPanel({ data }) {
  const {
    tax,
    taxableBefore,
    netIncome,
    lito,
    helpRepayment,
    medicareLevy,
    medicareSurcharge,
    marginalRate,
    refundMessage,
  } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 col-span-2">
      <div className="bg-[#ed8936] text-white p-6 rounded-t-2xl">
        <p className="text-sm">Estimated Tax Payable</p>
        <p className="text-4xl font-bold mt-2">${tax.toFixed(0)}</p>
      </div>

      <div className="p-6 space-y-3 text-sm text-gray-800">
        <SummaryItem label="Taxable Income" value={taxableBefore} />
        <SummaryItem label="Income Tax Payable" value={tax} />
        <SummaryItem label="Medicare Levy" value={medicareLevy} />

        {medicareSurcharge > 0 && (
          <SummaryItem label="Medicare Surcharge" value={medicareSurcharge} />
        )}

        <SummaryItem label="LITO Offset" value={lito} prefix="-" />

        {helpRepayment > 0 && (
          <SummaryItem label="HELP Repayment" value={helpRepayment} />
        )}

        <hr className="my-2 border-gray-300" />

        <SummaryItem label="Net Income" value={netIncome} bold />
        {/* <SummaryItem
          label="Marginal Tax Rate"
          value={`${marginalRate}%`}
          bold
        /> */}

        <div className="mt-4 font-semibold text-sm">{refundMessage}</div>

        <button
          onClick={() => window.print()}
          className="mt-6 w-full py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded-md transition"
        >
          Print as PDF
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, bold = false, prefix = "" }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-semibold" : ""}>{label}</span>
      <span className={bold ? "font-semibold" : ""}>
        {typeof value === "number" ? `${prefix}$${value.toFixed(2)}` : value}
      </span>
    </div>
  );
}
