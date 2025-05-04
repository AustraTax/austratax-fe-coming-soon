"use client";

import { useState, useEffect } from "react";

export default function SimplePage() {
  const [income, setIncome] = useState("");
  const [taxPaid, setTaxPaid] = useState("");

  const [deductions, setDeductions] = useState([]);
  const [newCategory, setNewCategory] = useState("Work from home");
  const [newAmount, setNewAmount] = useState("");

  const [year, setYear] = useState("this");
  const [taxFreeFlag, setTaxFreeFlag] = useState("yes");
  const [hasZoneOffset, setHasZoneOffset] = useState("no");
  const [zoneOffset, setZoneOffset] = useState("");
  const [zoneDays, setZoneDays] = useState("");

  const [useKmVehicle, setUseKmVehicle] = useState("yes");
  const [vehicleKm, setVehicleKm] = useState("");
  const [vehicleRate, setVehicleRate] = useState("0.78");
  const [vehicleManual, setVehicleManual] = useState("");

  const [remoteOffsetFlag, setRemoteOffsetFlag] = useState("no");
  const [helpFlag, setHelpFlag] = useState("no");
  const [medicareExemptFlag, setMedicareExemptFlag] = useState("no");
  const [privateHealthFlag, setPrivateHealthFlag] = useState("yes");
  const [hasDependants, setHasDependants] = useState("no");
  const [numDependants, setNumDependants] = useState("");

  const [tax, setTax] = useState(null);
  const [lito, setLito] = useState(0);
  const [helpRepayment, setHelpRepayment] = useState(0);
  const [medicareLevy, setMedicareLevy] = useState(0);
  const [medicareSurcharge, setMedicareSurcharge] = useState(0);
  const [zoneAmount, setZoneAmount] = useState(0);
  const [vehicleDeduction, setVehicleDeduction] = useState(0);
  const [netIncome, setNetIncome] = useState(null);
  const [refundMessage, setRefundMessage] = useState("");

  const addDeduction = () => {
    const amt = parseFloat(newAmount) || 0;
    if (newCategory && amt > 0) {
      setDeductions([...deductions, { category: newCategory, amount: amt }]);
      setNewAmount("");
    }
  };

  const removeDeduction = (index) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const calculateHelpRepayment = (incomeVal) => {
    const thresholds = [
      { min: 151201, rate: 0.1 },
      { min: 125000, rate: 0.09 },
      { min: 110000, rate: 0.08 },
      { min: 100000, rate: 0.07 },
      { min: 90000, rate: 0.06 },
      { min: 83000, rate: 0.05 },
      { min: 75000, rate: 0.04 },
      { min: 68000, rate: 0.03 },
      { min: 59618, rate: 0.02 },
      { min: 51550, rate: 0.01 },
    ];
    for (const t of thresholds)
      if (incomeVal > t.min) return incomeVal * t.rate;
    return 0;
  };

  const calculateTax = () => {
    const gross = parseFloat(income) || 0;
    if (gross <= 0) {
      setTax(null);
      return;
    }
    const paid = parseFloat(taxPaid) || 0;

    const customSum = deductions.reduce((sum, d) => sum + d.amount, 0);

    const days = Math.min(parseInt(zoneDays) || 0, 365);
    let zoneVal = 0;
    if (hasZoneOffset === "yes") {
      const rates = { A: 338, B: 57, S: 1173 };
      zoneVal = ((rates[zoneOffset] || 0) * days) / 365;
    }
    setZoneAmount(zoneVal);

    let vehDed = 0;
    if (useKmVehicle === "yes")
      vehDed = (parseFloat(vehicleKm) || 0) * (parseFloat(vehicleRate) || 0);
    else vehDed = parseFloat(vehicleManual) || 0;
    setVehicleDeduction(vehDed);

    const remoteDed = remoteOffsetFlag === "yes" ? 500 : 0;
    const totalDeduct = customSum + zoneVal + vehDed + remoteDed;
    const taxableBefore = Math.max(gross - totalDeduct, 0);

    const threshold = taxFreeFlag === "yes" ? 18200 : 0;
    let taxable = Math.max(taxableBefore - threshold, 0);

    let bracketTax = 0;
    if (taxable <= 37500) bracketTax = taxable * 0.19;
    else if (taxable <= 120000) bracketTax = 7125 + (taxable - 37500) * 0.325;
    else if (taxable <= 180000) bracketTax = 29467 + (taxable - 120000) * 0.37;
    else bracketTax = 51667 + (taxable - 180000) * 0.45;
    setTax(bracketTax);

    let lOff = 0;
    if (taxable <= 37500) lOff = 700;
    else if (taxable <= 66667)
      lOff = Math.max(0, 700 - (taxable - 37500) * 0.05);
    setLito(lOff);

    const helpRep = helpFlag === "yes" ? calculateHelpRepayment(taxable) : 0;
    setHelpRepayment(helpRep);
    const med = medicareExemptFlag === "yes" ? 0 : taxableBefore * 0.02;
    setMedicareLevy(med);

    const surcharge =
      privateHealthFlag === "no" && taxableBefore > 140000
        ? taxableBefore * 0.01
        : 0;
    setMedicareSurcharge(surcharge);

    const totalTax = Math.max(0, bracketTax - lOff) + helpRep + med + surcharge;
    setNetIncome(gross - totalTax);

    if (paid > totalTax)
      setRefundMessage(`🟢 Refund: $${(paid - totalTax).toFixed(2)}`);
    else if (paid < totalTax)
      setRefundMessage(`🔴 Owe: $${(totalTax - paid).toFixed(2)}`);
    else setRefundMessage("✅ No balance owing");
  };

  useEffect(
    () => calculateTax(),
    [
      income,
      taxPaid,
      deductions,
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
      numDependants,
    ]
  );

  const yesNo = (v, s) => (
    <select
      value={v}
      onChange={(e) => s(e.target.value)}
      className="w-full p-2 border rounded"
    >
      <option value="no">No</option>
      <option value="yes">Yes</option>
    </select>
  );
  const Info = ({ text }) => (
    <span title={text} className="ml-1 text-blue-500 cursor-help">
      ℹ️
    </span>
  );

  const grossVal = parseFloat(income) || 0;
  const customSum = deductions.reduce((s, d) => s + d.amount, 0);
  const chartData = [
    { name: "Gross", value: grossVal },
    {
      name: "Deduct",
      value:
        customSum +
        zoneAmount +
        (remoteOffsetFlag === "yes" ? 500 : 0) +
        vehicleDeduction,
    },
    { name: "Tax", value: tax || 0 },
    { name: "Surcharge", value: medicareSurcharge || 0 },
    { name: "Net", value: netIncome || 0 },
  ];

  return (
    <main className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Simple Tax Calculator ({year === "this" ? "2024-25" : "2023-24"})
      </h1>
      <div className="space-y-2 mb-4">
        {chartData.map((d) => (
          <div key={d.name}>
            <div className="flex justify-between text-sm">
              <span>{d.name}</span>
              <span>${d.value.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-blue-200 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{
                  width: grossVal ? `${(d.value / grossVal) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block">
            Year
            <Info text="Tax year" />
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="this">This Year (2024-25)</option>
            <option value="last">Last Year (2023-24)</option>
          </select>
        </div>
        <div>
          <label className="block">
            Tax Free Threshold?
            <Info text="Apply 18,200 threshold?" />
          </label>
          {yesNo(taxFreeFlag, setTaxFreeFlag)}
        </div>
        <div>
          <label className="block">
            Gross Income
            <Info text="Total income before deductions" />
          </label>
          <input
            type="number"
            min="0"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block">
            Tax Paid
            <Info text="Already paid this year" />
          </label>
          <input
            type="number"
            min="0"
            value={taxPaid}
            onChange={(e) => setTaxPaid(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0"
          />
        </div>
        <h2 className="text-xl font-semibold mt-6">
          Add Deductions
          <Info text="Add deductible items" />
        </h2>
        <div className="flex space-x-2">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 p-2 border rounded"
          >
            <option>Work from home</option>
            <option>Clothing & Laundry</option>
            <option>Uniforms</option>
            <option>Tools & Equipment</option>
            <option>Other</option>
          </select>
          <input
            type="number"
            min="0"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="w-24 p-2 border rounded"
            placeholder="0"
          />
          <button
            onClick={addDeduction}
            className="px-4 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>
        <ul className="list-disc list-inside mt-2">
          {deductions.map((d, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {d.category}: ${d.amount.toFixed(2)}
              </span>
              <button
                onClick={() => removeDeduction(i)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div>
          <label className="block">
            Zone Offset?
            <Info text="Remote area offset" />
          </label>
          {yesNo(hasZoneOffset, setHasZoneOffset)}
        </div>
        {hasZoneOffset === "yes" && (
          <>
            <div>
              <label className="block">
                Zone
                <Info text="Select zone" />
              </label>
              <select
                value={zoneOffset}
                onChange={(e) => setZoneOffset(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="S">Special</option>
              </select>
            </div>
            <div>
              <label className="block">
                Days in Zone
                <Info text="Number of days" />
              </label>
              <input
                type="number"
                min="0"
                max="365"
                value={zoneDays}
                onChange={(e) => setZoneDays(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="0"
              />
            </div>
          </>
        )}
        <div>
          <label className="block">
            Vehicle Claim?
            <Info text="kms or amount" />
          </label>
          {yesNo(useKmVehicle, setUseKmVehicle)}
        </div>
        {useKmVehicle === "yes" ? (
          <>
            <input
              type="number"
              min="0"
              value={vehicleKm}
              onChange={(e) => setVehicleKm(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="0"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={vehicleRate}
              onChange={(e) => setVehicleRate(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="0"
            />
          </>
        ) : (
          <input
            type="number"
            min="0"
            value={vehicleManual}
            onChange={(e) => setVehicleManual(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="0"
          />
        )}
        <div>
          <label className="block">
            Remote Housing?
            <Info text="Fixed offset" />
          </label>
          {yesNo(remoteOffsetFlag, setRemoteOffsetFlag)}
        </div>
        <div>
          <label className="block">
            HELP Debt?
            <Info text="HECS repayment" />
          </label>
          {yesNo(helpFlag, setHelpFlag)}
        </div>
        <div>
          <label className="block">
            Medicare Exempt?
            <Info text="2% levy" />
          </label>
          {yesNo(medicareExemptFlag, setMedicareExemptFlag)}
        </div>
        <div>
          <label className="block">
            Private Health?
            <Info text="Surcharge applies" />
          </label>
          {yesNo(privateHealthFlag, setPrivateHealthFlag)}
        </div>
        <div>
          <label className="block">
            Dependants?
            <Info text="Claimed dependants" />
          </label>
          {yesNo(hasDependants, setHasDependants)}
        </div>
        {hasDependants === "yes" && (
          <div>
            <label className="block">
              Number
              <Info text="Number of dependants" />
            </label>
            <input
              type="number"
              min="0"
              value={numDependants}
              onChange={(e) => setNumDependants(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="0"
            />
          </div>
        )}
      </div>
      {tax !== null && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <p>
            <strong>Taxable Income:</strong> $
            {(
              parseFloat(income) -
              deductions.reduce((s, d) => s + d.amount, 0) -
              (hasZoneOffset === "yes" ? zoneAmount : 0) -
              vehicleDeduction -
              (remoteOffsetFlag === "yes" ? 500 : 0)
            ).toFixed(2)}
          </p>
          <p>
            <strong>Tax:</strong> ${tax.toFixed(2)}
          </p>
          <p>
            <strong>LITO:</strong> -${lito.toFixed(2)}
          </p>
          {helpFlag === "yes" && (
            <p>
              <strong>HELP:</strong> ${helpRepayment.toFixed(2)}
            </p>
          )}
          {medicareExemptFlag === "no" && (
            <p>
              <strong>Medicare:</strong> ${medicareLevy.toFixed(2)}
            </p>
          )}
          {medicareSurcharge > 0 && (
            <p>
              <strong>Surcharge:</strong> ${medicareSurcharge.toFixed(2)}
            </p>
          )}
          <p className="font-bold">
            <strong>Total Tax:</strong> $
            {(
              Math.max(0, tax - lito) +
              helpRepayment +
              medicareLevy +
              medicareSurcharge
            ).toFixed(2)}
          </p>
          <p>
            <strong>Net Income:</strong> ${netIncome.toFixed(2)}
          </p>
          <p className="mt-2 text-lg font-semibold">{refundMessage}</p>
        </div>
      )}
    </main>
  );
}
