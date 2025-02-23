/** @type {import('@storybook/react-webpack5').StorybookConfig} */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
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
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    // Return the altered config
    return config;
  },
};

export default config; 