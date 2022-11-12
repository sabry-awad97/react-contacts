/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CONTACTS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
