import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import sass from 'rollup-plugin-sass';
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";
const input = "src/index.tsx";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

const BUILD_TARGET = process.env.TARGET;
// "build:dev": "rollup BUILD=dev rollup -c",
//  "build:min": "cross-env BUILD=minified rollup -c",


const babelPlugin = babel({
  exclude: [
    "node_modules/**",
    "**.stories.**",
    "**.old.**"
  ]
});
const typescriptPlugin = typescript({
  rollupCommonJSResolveHack: true,
  exclude: ["**/tests/**", "**.old**", "**.stories.**"],
  clean: true
});
const commonjsPlugin = commonjs({
  include: ["node_modules/**"],
  exclude: ["**/*.stories.js"],
  namedExports: {
    "node_modules/react/react.js": [
      "Children",
      "Component",
      "PropTypes",
      "createElement"
    ],
    "node_modules/esrever/esrever.js": ["reverse"],
    "node_modules/react-dom/index.js": ["render"]
  }
});
const sassPlugin = sass({
  insert: true
});

const builds = [
  { // CommonJS
    input,
    output: { file: pkg.main, format: "cjs", exports: "named", sourcemap: true },
    plugins: [
      babelPlugin,
      external(),
      resolve(),
      typescriptPlugin,
      commonjsPlugin,
      sassPlugin
    ]
  },
  { // CommonJS minified
    input,
    output: { file: minifyExtension(pkg.main), format: "cjs", exports: "named" },
    plugins: [
      babelPlugin,
      external(),
      resolve(),
      typescriptPlugin,
      commonjsPlugin,
      uglify()
    ]
  },
  { // Esnext
    input,
    output: { file: pkg.module, format: "es", exports: "named", sourcemap: true },
    plugins: [
      babelPlugin,
      external(),
      resolve(),
      typescriptPlugin,
      commonjsPlugin,
      sassPlugin
    ]
  },
  { // Esnext minified
    input,
    output: { file: minifyExtension(pkg.module), format: "es", exports: "named" },
    plugins: [
      babelPlugin,
      external(),
      resolve(),
      typescriptPlugin,
      commonjsPlugin,
      sassPlugin,
      terser()
    ]
  },
  { // UMD
    input,
    output: {file: pkg.browser, format: "umd",
      name: "agb-lib",
      globals: {
        react: "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core"
      }
    },
    plugins: [
      babelPlugin,
      external(),
      resolve(),
      typescriptPlugin,
      sassPlugin,
      commonjsPlugin
    ]
  },
  { // UMD
    input,
    output: {file: minifyExtension(pkg.browser), format: "umd",
      name: "agb-lib",
      globals: {
        react: "React",
        "@emotion/styled": "styled",
        "@emotion/core": "core"
      }
    },
    plugins: [
      babelPlugin,
      external(),
      resolve(),
      typescriptPlugin,
      sassPlugin,
      commonjsPlugin,
      terser()
    ]
  }
];

let default_builds = builds;
if(BUILD_TARGET && BUILD_TARGET === "dev") default_builds = [builds[0], builds[2]];
if(BUILD_TARGET && BUILD_TARGET === "minified") default_builds = [builds[1], builds[3], builds[5]];

export default default_builds;
/*
{  file: pkg.module,
  format: "es",
  exports: "named",
  sourcemap: true
}
],
*/
/*
let minified_builds = Object.assign({}, default_builds);
minified_builds.output = [
  { file: minifyExtension(pkg.main),
    format: "cjs",
    exports: "named",
    sourcemap: true
  },
  {  file: minifyExtension(pkg.module),
    format: "es",
    exports: "named",
    sourcemap: true
  }
];
*/
