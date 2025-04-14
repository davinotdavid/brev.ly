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

export async function createLink({
  slug,
  remoteURL,
}: {
  remoteURL: string;
  slug: string;
}): Promise<ShortLink> {
  const response = await fetch(`${BASE_URL}/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      remoteURL,
      slug,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create link");
  }

  return response.json();
}

export async function deleteLink(slug: string) {
  const response = await fetch(`${BASE_URL}/links/${slug}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete link");
  }

  return response.json();
}

export async function incrementAccessLink(slug: string) {
  const response = await fetch(`${BASE_URL}/links/${slug}/accessed`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to increment link access");
  }

  return response.json();
}
