'use client';
import React from 'react';

export default function YesNoSelect({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select className="w-full p-2 border rounded" value={value} onChange={e=>onChange(e.target.value)}>
        <option value="yes">Yes</option>
        <option value="no">No</option>
        <option value="maybe">Maybe</option>
      </select>
    </div>
  );
}
