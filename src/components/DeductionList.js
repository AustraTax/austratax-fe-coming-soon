'use client';
import React from 'react';

export default function DeductionList({ deductions, onRemove }) {
  return (
    <ul className="list-disc list-inside mt-2">
      {deductions.map((d, i) => (
        <li key={i} className="flex justify-between">
          <span>{d.category}: ${d.amount.toFixed(2)}</span>
          <button onClick={() => onRemove(i)} className="text-red-500">
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
