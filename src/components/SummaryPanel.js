'use client';
import React from 'react';
import taxConfig from '../app/data/taxConfig.json';

export default function SummaryPanel({ data, state }) {
  const {
    gross, totalDeductions, taxableBefore, netIncome,
    zoneD, vehD, remoteD,
    bracketTax, totalTax, lito, help, medicare, surcharge,
    marginalRate, refundMessage
  } = data;

  const {
    clientName, year, isResident, visaStatus,
    helpFlag, medicareExemptFlag,
    privateHealthFlag, hasDependants, numDependants,
    income
  } = state;

  if (!income || parseFloat(income) <= 0) return null;

  const FY      = year==='this'?'2024-25':'2023-24';
  const visaRec = taxConfig.visaOptions.find(v=>v.key===visaStatus);
  const cat     = isResident==='yes'?'resident':visaRec?.residency||'nonResident';

  return (
    <div className="col-span-2 print:p-8">
      <div className="sticky top-8 bg-white rounded shadow overflow-hidden">
        <div className="bg-orange-500 text-white p-6">
          <p className="text-lg">Summary for <strong>{clientName||'—'}</strong></p>
          <p className="mt-2">Financial Year: <strong>{FY}</strong></p>
          <p className="mt-2">
            Resident? <strong>{isResident==='yes'?'Yes':'No'}</strong>
            {cat!=='resident'&&visaRec&&` (${visaRec.label})`}
          </p>
          <p className="mt-4 text-2xl">Estimated Tax: <strong>${totalTax.toFixed(2)}</strong></p>
        </div>
        <div className="p-6 space-y-2 bg-white">
          <div className="flex justify-between"><span>Gross Income:</span><span>${gross.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Total Deductions:</span><span>–${totalDeductions.toFixed(2)}</span></div>
          <div className="flex justify-between"><span> • Zone Offset:</span><span>–${zoneD.toFixed(2)}</span></div>
          <div className="flex justify-between"><span> • Vehicle Claim:</span><span>–${vehD.toFixed(2)}</span></div>
          <div className="flex justify-between"><span> • Remote Housing:</span><span>–${remoteD.toFixed(2)}</span></div>
          <div className="border-t my-2"/>
          <div className="flex justify-between"><span>Taxable Income:</span><span>${taxableBefore.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Income Tax Payable:</span><span>${bracketTax.toFixed(2)}</span></div>
          {lito>0 && <div className="flex justify-between"><span>LITO Offset:</span><span>–${lito.toFixed(2)}</span></div>}
          {helpFlag==='yes'&&<div className="flex justify-between"><span>HELP Repayment:</span><span>${help.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span>Medicare Levy{medicareExemptFlag==='yes'?' (exempt)':''}:</span><span>${medicare.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Private Health Surcharge:</span><span>${surcharge.toFixed(2)}</span></div>
          {hasDependants==='yes'&&<div className="flex justify-between"><span>Dependants:</span><span>{numDependants}</span></div>}
          <div className="border-t my-2"/>
          <div className="flex justify-between font-bold"><span>Net Income:</span><span>${netIncome.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold"><span>Marginal Rate:</span><span>{marginalRate}%</span></div>
          <div className="mt-2 font-semibold">{refundMessage}</div>

          <div className="mt-6 flex justify-end print:hidden">
            <button onClick={()=>window.print()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Print PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
