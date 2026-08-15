import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = [
  nextPlugin.flatConfig.coreWebVitals,
  {
    ignores: [".next/*", "out/*", "build/*", "next-env.d.ts"],
  },
];

export default eslintConfig;
