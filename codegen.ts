import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/server/schema/schema.graphql',
  documents: ['apps/client/src/**/*.{ts,tsx}'],
  generates: {
    'apps/client/src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },

      config: {
        useIndexSignature: true,
      },
      plugins: [
      ],
    },
  },
};

export default config;
