import { useMutation } from "@tanstack/react-query";

import { Button } from "./button";
import { Input } from "./input";
import { createLink } from "../api/links";

interface FormElements extends HTMLFormControlsCollection {
  remoteURL: HTMLInputElement;
  slug: HTMLInputElement;
}

interface LinkForm extends HTMLFormElement {
  readonly elements: FormElements;
}

export function NewLinkCard() {
  const createLinkMutation = useMutation({ mutationFn: createLink });

  const handleFormSubmit = (e: React.FormEvent<LinkForm>) => {
    e.preventDefault();

    const { remoteURL, slug } = e.currentTarget.elements;

    createLinkMutation.mutate({
      remoteURL: remoteURL.value,
      slug: slug.value,
    });
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 max-w-[380px]">
      <h2 className="text-lg text-gray-600 mb-5">Novo link</h2>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <Input
          id="remoteURL"
          label="Link Original"
          placeholder="www.exemplo.com.br"
        />

        <Input id="slug" label="Link Encurtado" fixedString="brev.ly/" />

        <Button type="submit" className="mt-1">
          Salvar link
        </Button>
      </form>
    </div>
  );
}
