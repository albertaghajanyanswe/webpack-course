import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths, analyzer, platform } = options;

  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico') }),
    /**
     * haytararume neq popoxakanner voronq codum karanq ogtagorcenq
     * stugel nayev global.d.ts file@
     */
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode)
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    /**
     * stugum e ts type-er@ arandzin procesov
     * build@ ancnum e aveli arag ev hajox ete ka ts error
     * buildic heto arandzin cuyc e talis error
    */
    plugins.push(new ForkTsCheckerWebpackPlugin());
    /**
     * hot module replacement
     */
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }));
    plugins.push(
      new CopyPlugin({
        patterns: [
          { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
        ],
      }),
    )
  }

  if (analyzer) {
    /**
     * bacvum e arandzin patuhan karanq tesnenq bundle@ chaps@ time@ etc.
     */
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}