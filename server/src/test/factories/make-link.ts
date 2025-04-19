import { fakerPT_BR as faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { InferInsertModel } from "drizzle-orm";

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const result = await db
    .insert(schema.links)
    .values({
      slug: `test-slug-${randomUUID()}`,
      remoteURL: faker.internet.url(),
      ...overrides,
    })
    .returning();

  return result[0];
}
