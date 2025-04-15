import { Copy, Trash } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IconButton } from "./icon-button";
import { deleteLink } from "../api/links";

interface MyLinkItemProps {
  slug: string;
  remoteURL: string;
  accessCount: number;
}

export function MyLinkItem({ slug, remoteURL, accessCount }: MyLinkItemProps) {
  const queryClient = useQueryClient();
  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const onCopyClicked = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
  };

  const onDeleteClicked = () => {
    if (confirm(`Você realmente quer apagar o link ${slug}?`)) {
      deleteLinkMutation.mutate(slug);
    }
  };

  return (
    <li className="flex items-center justify-between [&:not(:last-child)]:pb-4 [&:not(:last-child)]:border-b-[1px] [&:last-child]:pb-4 border-gray-200">
      <div>
        <a
          className="text-md text-blue-base"
          href={`${window.location.origin}/${slug}`}
          rel="noopener"
          target="_blank"
        >
          {window.location.origin}/{slug}
        </a>
        <p className="text-sm text-gray-500">{remoteURL}</p>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-gray-500 mr-5">
          {accessCount} acesso{accessCount !== 1 && "s"}
        </p>
        <div className="flex gap-1">
          <IconButton Icon={Copy} onClick={onCopyClicked} />
          <IconButton Icon={Trash} onClick={onDeleteClicked} />
        </div>
      </div>
    </li>
  );
}
