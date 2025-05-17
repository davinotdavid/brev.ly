import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "./button";
import { Input } from "./input";
import { createLink } from "../api/links";
import { ErrorToast } from "./error-toast";

const linkFormSchema = z.object({
  remoteURL: z.string().url({ message: "Informe uma url válida." }),
  slug: z
    .string()
    .trim()
    .min(1, { message: "Não pode ser vazio" })
    .regex(/^[a-z0-9]+$/, {
      message: "Informe uma url minúscula e sem espaço/caracter especial.",
    }),
});

type LinkFormSchema = z.infer<typeof linkFormSchema>;

export function NewLinkCard() {
  const queryClient = useQueryClient();
  const createLinkMutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LinkFormSchema>({
    resolver: zodResolver(linkFormSchema),
    mode: "onChange",
  });

  const handleFormSubmit = async (data: LinkFormSchema) => {
    const { remoteURL, slug } = data;

    createLinkMutation.mutate(
      {
        remoteURL,
        slug,
      },
      {
        onSuccess: () => {
          reset();
        },
        onError: () => {
          toast.custom((t) => (
            <ErrorToast
              t={t}
              title="Erro no cadastro"
              description="Essa URL encurtada já existe."
            />
          ));
        },
      }
    );
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 w-full md:max-w-[380px] self-start">
      <h2 className="text-lg text-gray-600 mb-5">Novo link</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          id="remoteURL"
          label="Link Original"
          placeholder="www.exemplo.com.br"
          disabled={createLinkMutation.isPending}
          errorMessage={errors.remoteURL?.message}
          {...register("remoteURL")}
        />

        <Input
          id="slug"
          label="Link Encurtado"
          fixedString="brev.ly/"
          disabled={createLinkMutation.isPending}
          errorMessage={errors.slug?.message}
          {...register("slug")}
        />

        <Button
          type="submit"
          className="mt-1"
          disabled={createLinkMutation.isPending}
        >
          {createLinkMutation.isPending ? "Salvando..." : "Salvar link"}
        </Button>
      </form>
    </div>
  );
}
