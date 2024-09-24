import path from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";

const PATH_TO_SCHEMA = path.resolve(process.cwd(), "schema", "schema.graphql");

const schema = loadSchemaSync(PATH_TO_SCHEMA, {
  loaders: [new GraphQLFileLoader()],
});

export default addResolversToSchema({
  schema,
  resolvers,
});
