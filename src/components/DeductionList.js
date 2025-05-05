'use client';
import React from 'react';

export default function DeductionList({ deductions, onRemove }) {
  if (!deductions.length) return null;
  return (
    <ul className="mt-2 list-disc list-inside">
      {deductions.map((d,i)=>(
        <li key={i} className="flex justify-between">
          <span>{d.category}: ${d.amount.toFixed(2)}</span>
          <button onClick={()=>onRemove(i)} className="text-red-500">Remove</button>
        </li>
      ))}
    </ul>
  );
}
