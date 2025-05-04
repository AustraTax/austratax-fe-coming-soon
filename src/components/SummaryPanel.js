'use client';
import React from 'react';

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
    refundMessage
  } = data;

  return (
    <div className="bg-white rounded shadow col-span-2">
      <div className="bg-orange-500 text-white p-6">
        <p>The estimated tax on your taxable income is</p>
        <p className="text-4xl font-bold mt-2">${tax.toFixed(0)}</p>
      </div>
      <div className="p-6 space-y-2">
        <div className="flex justify-between">
          <span>Taxable income:</span>
          <span>${taxableBefore.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Income tax payable:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Medicare levy:</span>
          <span>${medicareLevy.toFixed(2)}</span>
        </div>
        {medicareSurcharge > 0 && (
          <div className="flex justify-between">
            <span>Medicare surcharge:</span>
            <span>${medicareSurcharge.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>LITO offset:</span>
          <span>-${lito.toFixed(2)}</span>
        </div>
        {helpRepayment > 0 && (
          <div className="flex justify-between">
            <span>HELP repayment:</span>
            <span>${helpRepayment.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t my-2"></div>
        <div className="flex justify-between font-bold">
          <span>Net income:</span>
          <span>${netIncome.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Marginal tax rate:</span>
          <span>{marginalRate}%</span>
        </div>
        <div className="mt-2 font-semibold">{refundMessage}</div>
        <button
          onClick={() => window.print()}
          className="mt-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Print PDF
        </button>
      </div>
    </div>
  );
}
