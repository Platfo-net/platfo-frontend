namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    BASE_URL: string;
    FACEBOOK_ID: string;
    FACEBOOK_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
