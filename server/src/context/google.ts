import { OAuth2Client } from "google-auth-library";
import {  User} from "../__generated__/types";

export const verifyGoogleIdToken = async (idToken: string) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
      email: payload.email,
      name: payload?.name,
      imageUrl: payload?.picture,
    } satisfies User;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid token");
  }
};
