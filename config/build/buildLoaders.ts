import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions, runtime } from "webpack";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const cssLoaderWithModule = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModule,
      // Translates CSS into CommonJS
      // "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }
  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // }

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: isDev,
          /**
           * hot module replacement
          */
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        }
      }
    ]
  }

  const babelLoader = buildBabelLoader(options);

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  // const icoLoader = {
  //   test: /\.(ico)$/,
  //   exclude: /node_modules/,
  //   use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
  // }

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{
      loader: '@svgr/webpack', options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true
              }
            }
          ]
        }
      }
    }],
  }

  return [
    assetsLoader,
    scssLoader,
    // tsLoader,
    svgrLoader,
    babelLoader
  ]
}