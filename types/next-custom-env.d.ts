declare namespace NodeJS {
  export interface ProcessEnv {
    NEX_SERVER_URL?: string;

    NEXTAUTH_SECRET: string;

    GITHUB_ID: string;
    GITHUB_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    NEXT_PUBLIC_CLOUDINARY_PRESEST_NAME: string;

    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string;

    NEXT_PUBLIC_API_BASE_URL?: string;
  }
}
