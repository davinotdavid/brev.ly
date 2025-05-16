import { PassThrough, Transform } from "node:stream"
import { pipeline } from "node:stream/promises"
import { stringify } from "csv-stringify"

import { Either, makeRight } from "@/shared/either"
import { db, pg } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage"

type GenerateReportOutput = {
  reportUrl: string
}

export async function generateReport(): Promise<Either<never, GenerateReportOutput>> {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      remoteUrl: schema.links.remoteURL,
      slug: schema.links.slug,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt
    })
    .from(schema.links)
    .toSQL()

    const cursor = pg.unsafe(sql, params as string[]).cursor(2)

    const csv = stringify({
      delimiter: ',',
      header: true,
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'remote_url', header: 'Original URL' },
        { key: 'slug', header: 'Short URL' },
        { key: 'created_at', header: 'Created at' },
      ],
    })
  
    const uploadToStorageStream = new PassThrough()

    const convertToCSVPipeline = pipeline(
      cursor,
      new Transform({
        objectMode: true,
        transform(chunks: unknown[], encoding, callback) {
          for (const chunk of chunks) {
            this.push(chunk)
          }

          callback()
        },
      }),
      csv,
      uploadToStorageStream
    );

    const uploadToStorage = uploadFileToStorage({
      contentType: 'text/csv',
      folder: 'downloads',
      fileName: "report.csv",
      contentStream: uploadToStorageStream
    })

    const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

    return makeRight({ reportUrl: url })
}