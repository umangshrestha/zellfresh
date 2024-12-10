export type Token =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | {
      guestToken: string;
    }
  | null;
