import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  fixedString?: string;
}

export function Input({ id, label, fixedString, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="uppercase text-xs text-gray-500 pb-2">
        {label}
      </label>
      <div className="border-[1px] border-gray-300 rounded-lg px-4 py-[15px] active:text-gray-800 active:border-blue-base placeholder:text-gray-400">
        {fixedString && <span>{fixedString}</span>}
        <input
          id={id}
          type="text"
          className="active:text-gray-800 active:border-blue-base placeholder:text-gray-400 ring-0"
          {...props}
        />
      </div>
    </div>
  );
}
