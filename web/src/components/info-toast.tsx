import { Toast } from "react-hot-toast";
import { Info } from "@phosphor-icons/react";

interface InfoToastProps {
  t: Toast;
  title: string;
  description: string;
}

export function InfoToast({ t, title, description }: InfoToastProps) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-xs w-full bg-blue-100 shadow-lg rounded-lg pointer-events-auto flex`}
    >
      <div className="flex gap-2 flex-1 w-0 p-4">
        <Info size={24} className="text-blue-600" weight="fill" />
        <div>
          <p className="text-md text-blue-500 mb-1">{title}</p>
          <p className="text-sm text-blue-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
