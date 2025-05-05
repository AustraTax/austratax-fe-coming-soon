"use client";
import React from "react";
import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="w-full mb-6">
      <div className="bg-orange-50 border border-orange-200 text-orange-800 text-xs rounded-md px-4 py-3 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Disclaimer
          </h2>
        </div>
        <p className="leading-relaxed">
          These tools are intended for general informational purposes only and
          do not constitute professional financial or taxation advice. You
          acknowledge that the estimates provided do not guarantee exact tax
          outcomes or entitlements. You are encouraged to consult a registered
          tax agent or the Australian Taxation Office (ATO) for formal advice or
          lodgement.
        </p>
      </div>
    </div>
  );
}
