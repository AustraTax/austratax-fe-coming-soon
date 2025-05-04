"use client";
import React from "react";

export default function YesNoSelect({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  );
}
