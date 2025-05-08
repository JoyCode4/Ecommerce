declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_JWTSECRETKEY: string;
        NEXT_PUBLIC_STRIPESECRETKEY: string;
        NEXT_PUBLIC_STRIPEPUBLICKEY: string;
        NEXT_PUBLIC_STRIPEENDPOINTSERCET: string;
        NEXT_PUBLIC_MONGODBURL: string;
    }
  }