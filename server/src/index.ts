import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { Context as ContextInterface } from "./context/types";
import context from "./context";

const IS_PROD = process.env.NODE_ENV === "production";

console.log(process.env.GOOGLE_CLIENT_SECRET)
const server = new ApolloServer<ContextInterface>({
  schema,
  introspection: !IS_PROD,
  ...(IS_PROD ? { plugins: [ApolloServerPluginLandingPageDisabled()] } : {}),
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
}).then(({ url }) => console.log(`🚀 Server ready at ${url}`));