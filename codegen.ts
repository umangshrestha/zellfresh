import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/server/schema/schema.graphql',
  generates: {
    'apps/client/src/__generated__/types.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript'],
    },
  },
};

export default config;
