import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function Button({
  className,
  children,
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`px-5 h-12 cursor-pointer rounded-lg text-md bg-blue-base text-white hover:bg-blue-dark disabled:opacity-50} ${className}`}
    >
      {children}
    </button>
  );
}
