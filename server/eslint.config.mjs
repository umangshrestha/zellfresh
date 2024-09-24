// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["**/dist/**", "src/__generated__/types.ts"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
