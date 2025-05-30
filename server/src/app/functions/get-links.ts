import { z } from "zod";
import { ilike, asc, desc, count, or } from "drizzle-orm";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/shared/either";

const getLinksInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(["createdAt"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
});

type GetLinksInput = z.input<typeof getLinksInput>;

type GetLinksOutput = {
  links: {
    id: string;
    slug: string;
    accessCount: number | null;
    remoteURL: string;
    createdAt: Date;
  }[];
  total: number;
};

export async function getLinks(
  input: GetLinksInput
): Promise<Either<never, GetLinksOutput>> {
  const { page, pageSize, searchQuery, sortBy, sortDirection } =
    getLinksInput.parse(input);

  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        slug: schema.links.slug,
        accessCount: schema.links.accessCount,
        remoteURL: schema.links.remoteURL,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .where(
        searchQuery
          ? or(
              ilike(schema.links.slug, `%${searchQuery}%`),
              ilike(schema.links.remoteURL, `%${searchQuery}%`)
            )
          : undefined
      )
      .orderBy((fields) => {
        if (sortBy && sortDirection === "asc") {
          return asc(fields[sortBy]);
        }

        if (sortBy && sortDirection === "desc") {
          return desc(fields[sortBy]);
        }

        return desc(fields.createdAt);
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize),

    db
      .select({ total: count(schema.links.id) })
      .from(schema.links)
      .where(
        searchQuery ? ilike(schema.links.slug, `%${searchQuery}%`) : undefined
      ),
  ]);

  return makeRight({ links, total });
}
