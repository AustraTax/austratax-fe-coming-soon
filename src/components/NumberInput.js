'use client';
import React from 'react';

export default function NumberInput({ label, value, onChange, min, max, step }) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        type="number"
        className="w-full p-2 border rounded"
        value={value}
        onChange={e=>onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
