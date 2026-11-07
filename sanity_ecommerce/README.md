# SPARQ Sanity Studio

Sanity Studio v2 for the SPARQ storefront.

- **Project ID:** `jruyr6l6`
- **Dataset:** `production`
- **Studio URL:** `http://localhost:3333`

## Schemas

- `schemas/product.js` — `image`, `name`, `slug`, `price`, `details`
- `schemas/banner.js` — `image`, `buttonText`, `product`, `desc`, `smallText`, `midText`, `largeText1`, `largeText2`, `discount`, `saleTime`
- `schemas/schema.js` — combines the document types

## Run Locally

```powershell
npm install --legacy-peer-deps
npm run start
```

On Node 17+ (including Node 24), if the Studio fails with `ERR_OSSL_EVP_UNSUPPORTED`:

```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run start
```

## Build

```powershell
npm run build
```

The storefront reads content from the hosted Sanity Content Lake. Publishing here updates the content that the Next.js app fetches; the Studio does not need to run for the storefront to work.
