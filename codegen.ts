import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/server/schema/schema.graphql',
  documents: ['packages/api-client/src/**/*.{ts,tsx}'],
  generates: {
    'packages/api-client/src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        useIndexSignature: true,
      },
      plugins: [],
    },
    'packages/api-client/src/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;
