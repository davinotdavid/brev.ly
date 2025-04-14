import { Link } from "react-router";
import { NotFoundLogo } from "../components/not-found-logo";

export function NotFound() {
  return (
    <main className="h-dvh bg-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-lg p-12 sm:p-16 max-w-[580px] text-center mx-3">
        <NotFoundLogo className="mx-auto w-[164px] sm:w-full" />
        <p className="my-6 text-xl text-gray-600">Link não encontrado</p>
        <p className="text-md text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{" "}
          <Link to="/" className="text-blue-base">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
