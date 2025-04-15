import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function Button({
  className,
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`px-5 h-12 cursor-pointer rounded-lg text-md bg-blue-base text-white hover:bg-blue-dark disabled:opacity-50} disabled:hover:initial disabled:opacity-50 disabled:hover:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
