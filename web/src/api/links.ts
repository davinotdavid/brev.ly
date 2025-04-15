import type { ShortLink } from "../types/link";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3333"
  : "TODO_PROD_URL";

export async function getLinks(): Promise<ShortLink[]> {
  const response = await fetch(`${BASE_URL}/links`);

  if (!response.ok) {
    throw new Error("Failed to fetch links");
  }

  return response.json();
}

export function createLink({
  slug,
  remoteURL,
}: {
  remoteURL: string;
  slug: string;
}): Promise<Response> {
  return fetch(`${BASE_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      remoteURL,
      slug,
    }),
  });
}

export function deleteLink(slug: string) {
  return fetch(`${BASE_URL}/links/${slug}`, {
    method: "DELETE",
  });
}

export function incrementAccessLink(slug: string) {
  return fetch(`${BASE_URL}/links/${slug}/accessed`, {
    method: "POST",
  });
}
