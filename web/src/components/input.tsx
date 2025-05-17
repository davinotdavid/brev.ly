import type { InputHTMLAttributes } from "react";
import { Warning } from "@phosphor-icons/react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  fixedString?: string;
  errorMessage?: string;
}

export function Input({
  id,
  label,
  fixedString,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col group">
      <label htmlFor={id}>
        <span
          className={`uppercase text-xs pb-2 ${
            errorMessage ? "text-danger" : "text-gray-500"
          } group-focus-within:text-blue-base`}
        >
          {label}
        </span>

        <div
          className={`border-[1px] rounded-lg px-4 py-[15px] active:text-gray-800 active:border-blue-base placeholder:text-gray-400 mb-2 ${
            errorMessage ? "border-danger" : "border-gray-300"
          } focus-within:border-blue-base`}
        >
          {fixedString && <span className="text-sm">{fixedString}</span>}
          <input
            id={id}
            type="text"
            className="text-sm active:text-gray-800 active:border-blue-base placeholder:text-gray-400 outline-none ring-0"
            {...props}
          />
        </div>
      </label>

      {errorMessage && (
        <div className="flex gap-2 items-center">
          <Warning color="var(--color-danger)" size={16} />
          <span className="text-gray-500 text-sm">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
