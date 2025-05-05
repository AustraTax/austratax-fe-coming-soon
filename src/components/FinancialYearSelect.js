'use client';
import React from 'react';

export default function FinancialYearSelect({ year, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">Financial Year</label>
      <select className="w-full p-2 border rounded" value={year} onChange={e=>onChange(e.target.value)}>
        <option value="this">2024-25</option>
        <option value="last">2023-24</option>
      </select>
    </div>
  );
}
