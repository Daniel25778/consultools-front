/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_NODE_ENV: string;
  readonly VITE_CRYPTO_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
