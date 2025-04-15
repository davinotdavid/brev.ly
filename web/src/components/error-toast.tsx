import { Toast } from "react-hot-toast";
import { WarningCircle } from "@phosphor-icons/react";

interface ErrorToastProps {
  t: Toast;
  title: string;
  description: string;
}

export function ErrorToast({ t, title, description }: ErrorToastProps) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-xs w-full bg-red-100 shadow-lg rounded-lg pointer-events-auto flex`}
    >
      <div className="flex gap-2 flex-1 w-0 p-4">
        <WarningCircle size={24} className="text-danger" weight="fill" />
        <div>
          <p className="text-md text-danger mb-1">{title}</p>
          <p className="text-sm text-danger">{description}</p>
        </div>
      </div>
    </div>
  );
}
