import { z } from "zod"

import { Either, makeLeft, makeRight } from "@/shared/either"
import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { SlugAlreadyExists } from "./errors/slug-already-exists"
import { eq } from "drizzle-orm"

const createLinkInput = z.object({
  remoteURL: z.string().url(),
  slug: z.string()
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: CreateLinkInput): Promise<Either<SlugAlreadyExists, null>> {
  const { remoteURL, slug } = createLinkInput.parse(input);

  const existingSlug = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.slug, slug))
    .limit(1)

  if (existingSlug.length > 0) {
    return makeLeft(new SlugAlreadyExists())
  }

  await db.insert(schema.links).values({
    slug,
    remoteURL,
  });

  return makeRight(null);
}