import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";

import { incrementAccessLink } from "../api/links";

export function Slug() {
  const { slug } = useParams<{ slug: string }>();
  const { mutate: incrementAccessMutation } = useMutation({
    mutationFn: incrementAccessLink,
    onSuccess: (response) => {
      window.location.replace(response.data.remote_url)
    }
  });

  useEffect(() => {
    if (slug) {
      incrementAccessMutation(slug);
    }
  }, [slug, incrementAccessMutation]);

  return (
    <main className="h-dvh bg-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-lg p-12 sm:p-16 max-w-[580px] text-center mx-3">
        <img src="/logo-icon.svg" className="w-12 h-12 mx-auto" />
        <p className="my-6 text-xl text-gray-600">Redirecionando...</p>
        <p className="text-md text-gray-500">
          O link será aberto automaticamente em alguns instantes.
        </p>
        <p className="text-md text-gray-500">
          Não foi redirecionado?{" "}
          <a
            href="#"
            rel="noopener"
            target="_blank"
            className="text-blue-base underline"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </main>
  );
}
