'use client';
import React from 'react';
import FinancialYearSelect from './FinancialYearSelect';
import YesNoSelect from './YesNoSelect';
import NumberInput from './NumberInput';
import DeductionList from './DeductionList';

export default function TaxForm({ state, handlers, addDeduction }) {
  const {
    income,
    taxPaid,
    deductions,
    newCategory,
    newAmount,
    year,
    taxFreeFlag,
    hasZoneOffset,
    zoneOffset,
    zoneDays,
    useKmVehicle,
    vehicleKm,
    vehicleRate,
    vehicleManual,
    remoteOffsetFlag,
    helpFlag,
    medicareExemptFlag,
    privateHealthFlag,
    hasDependants,
    numDependants
  } = state;

  const {
    setIncome,
    setTaxPaid,
    setNewCategory,
    setNewAmount,
    removeDeduction,
    setYear,
    setTaxFreeFlag,
    setHasZoneOffset,
    setZoneOffset,
    setZoneDays,
    setUseKmVehicle,
    setVehicleKm,
    setVehicleRate,
    setVehicleManual,
    setRemoteOffsetFlag,
    setHelpFlag,
    setMedicareExemptFlag,
    setPrivateHealthFlag,
    setHasDependants,
    setNumDependants
  } = handlers;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Australian income tax calculator</h2>
      <div className="space-y-4">
        <FinancialYearSelect year={year} onChange={setYear} />

        <YesNoSelect label="Tax Free Threshold?" value={taxFreeFlag} onChange={setTaxFreeFlag} />

        <NumberInput label="Gross Income" value={income} onChange={setIncome} min="0" />

        <NumberInput label="Tax Paid" value={taxPaid} onChange={setTaxPaid} min="0" />

        <div>
          <label className="block font-medium mb-1">Deductions</label>
          <div className="flex space-x-2">
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="flex-1 p-2 border rounded"
            >
              <option>Work from home</option>
              <option>Clothing & Laundry</option>
              <option>Uniforms</option>
              <option>Tools & Equipment</option>
              <option>Other</option>
            </select>
            <NumberInput value={newAmount} onChange={setNewAmount} min="0" />
            <button onClick={addDeduction} className="px-4 bg-orange-500 text-white rounded">
              Add
            </button>
          </div>
          <DeductionList deductions={deductions} onRemove={removeDeduction} />
        </div>

        {/* Zone selector */}
<div>
  <label className="block font-medium mb-1">Zone</label>
  <select
    value={zoneOffset}
    onChange={e => setZoneOffset(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">None</option>
    <option value="A">Zone A</option>
    <option value="B">Zone B</option>
    <option value="S">Special Zone</option>
  </select>
</div>

{/* Days in zone only if a zone is selected */}
{zoneOffset && (
  <NumberInput
    label="Days in Zone"
    value={zoneDays}
    onChange={setZoneDays}
    min="0"
    max="365"
  />
)}


        <YesNoSelect label="Vehicle Claim?" value={useKmVehicle} onChange={setUseKmVehicle} />
        {useKmVehicle === 'yes' ? (
          <>
            <NumberInput label="Kilometres travelled" value={vehicleKm} onChange={setVehicleKm} min="0" />
            <NumberInput label="Rate per km" value={vehicleRate} onChange={setVehicleRate} min="0" step="0.01" />
          </>
        ) : (
          <NumberInput label="Amount to claim" value={vehicleManual} onChange={setVehicleManual} min="0" />
        )}

        <YesNoSelect label="Remote Housing?" value={remoteOffsetFlag} onChange={setRemoteOffsetFlag} />

        <YesNoSelect label="HELP Debt?" value={helpFlag} onChange={setHelpFlag} />

        <YesNoSelect label="Medicare Exempt?" value={medicareExemptFlag} onChange={setMedicareExemptFlag} />

        <YesNoSelect label="Private Health?" value={privateHealthFlag} onChange={setPrivateHealthFlag} />

        <YesNoSelect label="Dependants?" value={hasDependants} onChange={setHasDependants} />
        {hasDependants === 'yes' && (
          <NumberInput label="Number of Dependants" value={numDependants} onChange={setNumDependants} min="0" />
        )}
      </div>
    </div>
  );
}
