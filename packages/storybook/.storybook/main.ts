import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    // Add support for workspace packages
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@app-monorepo/ui': require.resolve('../../../packages/ui/src'),
        '@app-monorepo/ui/tamagui.config': require.resolve('../../../packages/ui/tamagui.config.ts'),
      };
    }
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};

export default config; 