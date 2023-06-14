const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');

const rewrites = require('./rewrites');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  async rewrites() {
    return rewrites;
  },

  sentry: {},
};

const withTM = require('next-transpile-modules')(['antd-mobile', '@portkey/did-ui-react']);

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
// export
module.exports = withTM(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
