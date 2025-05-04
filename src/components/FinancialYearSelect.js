"use client";
import React from "react";

export default function FinancialYearSelect({ year, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        Financial Year
      </label>
      <select
        value={year}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      >
        <option value="this">2024–25</option>
        <option value="last">2023–24</option>
      </select>
    </div>
  );
}
