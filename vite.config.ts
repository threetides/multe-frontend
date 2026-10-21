import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"
import { defineConfig, lazyPlugins } from "vite-plus"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  staged: {
    "*": "vp check --fix"
  },
  fmt: {
    semi: false,
    trailingComma: "none"
  },
  lint: {
    ignorePatterns: ["src/components/ui/**", "src/components/theme-provider.tsx"],
    plugins: ["react", "typescript", "oxc", "jsx-a11y"],
    rules: {
      "typescript/no-explicit-any": "error",
      "typescript/consistent-type-imports": "error",
      "typescript/prefer-nullish-coalescing": "error",
      "react/jsx-key": "error",
      "react/exhaustive-deps": "error",
      "react/rules-of-hooks": "error",
      eqeqeq: "error",
      "jsx-a11y/alt-text": "error",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true
        }
      ],
      "vite-plus/prefer-vite-plus-imports": "error"
    },
    options: {
      typeAware: true,
      typeCheck: true
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin"
      }
    ]
  },
  plugins: lazyPlugins(() => [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()]),
  resolve: {
    tsconfigPaths: true
  }
})
