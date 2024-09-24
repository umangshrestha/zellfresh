import { IncomingMessage } from "http";
import { verifyGoogleIdToken } from "./google";
import { Context } from "./types";

const context = async ({ req }: { req: IncomingMessage }): Promise<Context> => {
  const provider = req.headers.provider;
  const token = req.headers.authorization?.replace("Bearer ", "") || "";
  if (provider === "google") {
    const user = await verifyGoogleIdToken(token);
    return { user };
  }
  return {};
};

export default context;
