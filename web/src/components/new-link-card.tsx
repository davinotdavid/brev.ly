import { Button } from "./button";
import { Input } from "./input";

export function NewLinkCard() {
  return (
    <div className="bg-gray-100 rounded-lg p-8 max-w-[380px]">
      <h2 className="text-lg text-gray-600 mb-5">Novo link</h2>
      <form className="flex flex-col gap-4">
        <Input
          id="original-link"
          label="Link Original"
          placeholder="www.exemplo.com.br"
        />

        <Input id="short-link" label="Link Encurtado" fixedString="brev.ly/" />

        <Button type="submit" className="mt-1">
          Salvar link
        </Button>
      </form>
    </div>
  );
}
