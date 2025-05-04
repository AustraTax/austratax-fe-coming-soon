'use client';
import React from 'react';

export default function YesNoSelect({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  );
}
