"use client";

import React from "react";
import { PhoneNumberFieldProps } from "./types";

export default function PhoneNumberField({
  inputRef,
  rawNumber,
  phoneLength,
  onChange,
}: PhoneNumberFieldProps) {
  return (
    <div className="relative flex-1 flex items-center">
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        placeholder={`${"X".repeat(phoneLength)}`}
        maxLength={phoneLength}
        value={rawNumber}
        onChange={onChange}
        className="
                    w-full py-3 px-4 bg-transparent
                    text-xs sm:text-sm font-medium
                    focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600
                    text-slate-900 dark:text-white rounded-r-2xl
                "
      />
      {/* Digit counter badge */}
      {rawNumber.length > 0 && (
        <span
          className={`absolute right-3 text-[10px] font-bold tabular-nums shrink-0 transition-colors ${
            rawNumber.length === phoneLength
              ? "text-emerald-500 dark:text-emerald-400"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {rawNumber.length}/{phoneLength}
        </span>
      )}
    </div>
  );
}
