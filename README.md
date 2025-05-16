# brev.ly

## Prerequisites
- [Node v20+](https://nodejs.org/en)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Cloudflare R2 Bucket](https://www.cloudflare.com/en-ca/developer-platform/products/r2/)

## `server` / Backend setup instructions

- Create a `.env` file in `server/.env` that follows the `server/.env.example` structure
- Run `docker compose up -d`
- Run `pnpm run db:generate`
- Run `pnpm run db:migrate`
- Run `pnpm install`
- Run `pnpm run dev`

## `web` / Frontend setup instructions
- Run `pnpm install`
- Run `pnpm run dev`
