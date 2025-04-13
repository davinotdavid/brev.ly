import { Download, Link } from "@phosphor-icons/react";
import { IconButton } from "./icon-button";

export function MyLinksCard() {
  return (
    <div className="bg-gray-100 rounded-lg p-8 max-w-[580px] md:w-[580px] md:self-start">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg text-gray-600">Meus links</h2>
        <IconButton Icon={Download} text="Baixar CSV" disabled />
      </div>

      <hr className="text-gray-200 h-[1px] w-full mb-4" />

      <div className="flex flex-col items-center gap-3 mb-6">
        <Link size={32} color="#74798B" />
        <p className="text-xs text-gray-500 text-center uppercase">
          Ainda não existem links cadastrados
        </p>
      </div>
    </div>
  );
}
