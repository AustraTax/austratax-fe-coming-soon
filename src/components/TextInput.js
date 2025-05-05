'use client';
import React from 'react';

export default function TextInput({ label, value, onChange, ...rest }) {
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        {...rest}
      />
    </div>
  );
}
