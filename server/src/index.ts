import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { Context as ContextInterface } from "./context/types";
import context from "./context";

const IS_PROD = process.env.NODE_ENV === "production";

if (!IS_PROD) {
  const dotenv = await import("dotenv");
  dotenv.config();
}


const server = new ApolloServer<ContextInterface>({
  schema,
  introspection: !IS_PROD,
  ...(IS_PROD ? { plugins: [ApolloServerPluginLandingPageDisabled()] } : {}),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
});

console.log(`🚀 Server ready at ${url}`);
