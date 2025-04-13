import type { Icon } from "@phosphor-icons/react";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  Icon: Icon;
}

export function IconButton({ text, Icon, ...props }: IconButtonProps) {
  return (
    <button
      className="flex gap-1.5 p-2 text-sm cursor-pointer font-semibold bg-gray-200 border-[1px] border-transparent rounded-sm hover:border-blue-base disabled:opacity-50 disabled:hover:border-transparent disabled:hover:cursor-not-allowed"
      {...props}
    >
      <Icon color="var(--color-gray-600)" size={16} />
      {text && <span className="text-gray-500">{text}</span>}
    </button>
  );
}
