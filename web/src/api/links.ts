import axios from "axios";
import type { ShortLink } from "../types/link";

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_URL
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
  return axios.post(`${BASE_URL}/links`, {
    remoteURL,
    slug,
  });
}

export function deleteLink(slug: string) {
  return axios.delete(`${BASE_URL}/links/${slug}`);
}

export function incrementAccessLink(slug: string) {
  return axios.post(`${BASE_URL}/links/${slug}/accessed`);
}

export function generateReport() {
  return axios.post(`${BASE_URL}/links/generate_report`)
}
