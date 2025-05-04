"use client";
import React from "react";

export default function DeductionList({ deductions, onRemove }) {
  return (
    <ul className="mt-3 space-y-2">
      {deductions.map((d, i) => (
        <li
          key={i}
          className="flex justify-between items-center p-2 bg-gray-50 border rounded-md"
        >
          <span className="text-sm text-gray-800">
            {d.category}: ${d.amount.toFixed(2)}
          </span>
          <button
            onClick={() => onRemove(i)}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
