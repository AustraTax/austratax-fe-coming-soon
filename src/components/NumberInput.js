'use client';
import React from 'react';

export default function NumberInput({ label, value, onChange, ...rest }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        {...rest}
      />
    </div>
  );
}
