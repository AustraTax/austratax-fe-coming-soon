'use client';
import React from 'react';
import FinancialYearSelect from './FinancialYearSelect';
import YesNoSelect         from './YesNoSelect';
import NumberInput         from './NumberInput';
import DeductionList       from './DeductionList';
import taxConfig           from '../app/data/taxConfig.json';

export default function TaxForm({ state, handlers, addDeduction }) {
  const {
    income, taxPaid,
    deductions, newCategory, newAmount,
    year, isResident, visaStatus,
    zoneOffset, zoneDays,
    useKmVehicle, vehicleKm, vehicleRate, vehicleManual,
    remoteOffsetFlag, helpFlag, medicareExemptFlag,
    privateHealthFlag, hasDependants, numDependants
  } = state;

  const h = handlers;
  const visaOpts = isResident!=='yes'
    ? taxConfig.visaOptions.filter(v=>!['citizen','permanent'].includes(v.key))
    : [];

  const medThr = taxConfig[ year==='this'?'2024-25':'2023-24' ].medicare.threshold;

  return (
    <div className="bg-white p-6 rounded shadow print:hidden">
      <h2 className="text-2xl font-semibold mb-4">Australian income tax calculator</h2>
      <div className="space-y-4">
        <FinancialYearSelect year={year} onChange={h.setYear}/>
        <YesNoSelect label="Resident for tax purposes?" value={isResident} onChange={h.setIsResident}/>
        {isResident!=='yes' && (
          <div>
            <label className="block font-medium mb-1">Visa Status</label>
            <select className="w-full p-2 border rounded" value={visaStatus} onChange={e=>h.setVisaStatus(e.target.value)}>
              <option value="">Select your visa…</option>
              {visaOpts.map(v=><option key={v.key} value={v.key}>{v.label}</option>)}
            </select>
          </div>
        )}
        <NumberInput label="Gross Income" value={income} onChange={h.setIncome} min="0"/>
        <NumberInput label="Tax Paid"     value={taxPaid} onChange={h.setTaxPaid} min="0"/>

        <div>
          <label className="block font-medium mb-1">Deductions</label>
          <div className="flex space-x-2">
            <select className="flex-1 p-2 border rounded" value={newCategory} onChange={e=>h.setNewCategory(e.target.value)}>
              <option>Work from home</option>
              <option>Clothing & Laundry</option>
              <option>Uniforms</option>
              <option>Tools & Equipment</option>
              <option>Other</option>
            </select>
            <NumberInput value={newAmount} onChange={h.setNewAmount} min="0" label=""/>
            <button onClick={addDeduction} className="px-4 bg-orange-500 text-white rounded">Add</button>
          </div>
          <DeductionList deductions={deductions} onRemove={h.removeDeduction}/>
        </div>

        <div>
          <label className="block font-medium mb-1">Zone Offset</label>
          <select className="w-full p-2 border rounded" value={zoneOffset} onChange={e=>h.setZoneOffset(e.target.value)}>
            <option value="">None</option>
            <option value="A">Zone A</option>
            <option value="B">Zone B</option>
            <option value="S">Special Zone</option>
          </select>
        </div>
        {zoneOffset&&<NumberInput label="Days in Zone" value={zoneDays} onChange={h.setZoneDays} min="0" max="365"/>}

        <div>
          <label className="block font-medium mb-1">Vehicle claim (kms)?</label>
          <select className="w-full p-2 border rounded" value={useKmVehicle} onChange={e=>h.setUseKmVehicle(e.target.value)}>
            <option value="yes">Yes</option><option value="no">No</option>
          </select>
        </div>
        {useKmVehicle==='yes' ? (
          <>
            <NumberInput label="Kilometres travelled" value={vehicleKm} onChange={h.setVehicleKm} min="0"/>
            <NumberInput label="Rate per km"         value={vehicleRate} onChange={h.setVehicleRate} min="0" step="0.01"/>
          </>
        ) : (
          <NumberInput label="Amount to claim"     value={vehicleManual} onChange={h.setVehicleManual} min="0"/>
        )}

        <YesNoSelect label={`Medicare Exempt (≤ $${medThr.toLocaleString()})`} value={medicareExemptFlag} onChange={h.setMedicareExemptFlag}/>
        <YesNoSelect label="HELP Debt?"                 value={helpFlag}           onChange={h.setHelpFlag}/>
        <YesNoSelect label="Remote Housing Offset?"     value={remoteOffsetFlag}   onChange={h.setRemoteOffsetFlag}/>
        <YesNoSelect label="Private Health Cover?"      value={privateHealthFlag}  onChange={h.setPrivateHealthFlag}/>
        <YesNoSelect label="Dependants?"                value={hasDependants}      onChange={h.setHasDependants}/>
        {hasDependants==='yes'&&<NumberInput label="Number of dependants" value={numDependants} onChange={h.setNumDependants} min="0"/>}
      </div>
    </div>
);
}
