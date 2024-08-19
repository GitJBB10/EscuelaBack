/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BASE_URL: string;
    // Agrega otras variables de entorno aquí si las tienes
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  