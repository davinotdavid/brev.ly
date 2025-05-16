import { Download, Link, Spinner } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { IconButton } from "./icon-button";
import { MyLinkItem } from "./my-link-item";
import { generateReport, getLinks } from "../api/links";
import { downloadUrl } from "../utils/download-url";

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 mt-8 mb-6">
      <Link size={32} color="#74798B" />
      <p className="text-xs text-gray-500 text-center uppercase">
        Ainda não existem links cadastrados
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-3 mt-8 mb-6">
      <Spinner size={32} color="#74798B" className="animate-spin" />
      <p className="text-xs text-gray-500 text-center uppercase">
        Carregando links...
      </p>
    </div>
  );
}

export function MyLinksCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  const downloadCSVMutation = useMutation({
    mutationFn: generateReport,
  })

  const downloadCSV = () => {
    downloadCSVMutation.mutate(undefined, {
      onSuccess: (response) => {
        if (response.data.report_link) {
          downloadUrl(response.data.report_link);
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 max-w-[580px] sm:w-[580px] md:self-start">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg text-gray-600">Meus links</h2>
        <IconButton
          Icon={Download}
          text="Baixar CSV"
          disabled={data?.length === 0}
          onClick={downloadCSV}
        />
      </div>

      <hr className="text-gray-200 h-[1px] w-full mb-4" />

      {isLoading ? (
        <LoadingState />
      ) : data?.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="flex flex-col gap-3 overflow-y-scroll scrollbar scrollbar-track-gray-100 scrollbar-thumb-blue-base scrollbar-w-3 max-h-[300px] sm:max-h-[450px] pr-1">
          {data?.map(({ slug, remoteURL, accessCount }) => (
            <MyLinkItem
              key={slug}
              slug={slug}
              remoteURL={remoteURL}
              accessCount={accessCount}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
