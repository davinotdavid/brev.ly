import { describe, expect, it, test } from "vitest";
import { faker } from "@faker-js/faker";

import { getLinks } from "@/app/functions/get-links";
import { makeLink } from "@/test/factories/make-link";
import { isRight, unwrapEither } from "@/shared/either";

describe("get links", () => {
  it("should be able to get the links", async () => {
    const remoteURLPattern = faker.internet.url();

    const link1 = await makeLink({ remoteURL: remoteURLPattern });
    const link2 = await makeLink({ remoteURL: remoteURLPattern });
    const link3 = await makeLink({ remoteURL: remoteURLPattern });
    const link4 = await makeLink({ remoteURL: remoteURLPattern });

    const sut = await getLinks({
      searchQuery: remoteURLPattern,
    });

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).total).toEqual(4);
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ]);
  });
});
