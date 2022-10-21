# Development and testing locally a `npm`-module

- We first need to create a symbolic link in the global `node_modules` folder (the folder where packages are added with `npm install -g <package>`)
- To find out the currently configured global `node_modules` folder, run: `npm prefix -g`
- Packages are installed at `<prefix>/lib/node_modules`, e.g. `/opt/homebrew/lib/node_modules`
- To create a symlink to your new module under development, run following command from inside the module's root folder: `npm link`
- Check if the symlink has been created: `ll /opt/homebrew/lib/node_modules`
  - output should at least contain the new symlink: `webdev-essentials -> ../../../../Users/hans/git/webdev-essentials`
- To use this module in another project, navigate to the other project's root and run: `npm link webdev-essentials`
  - this should update dependencies in `package.json` and use the locale version of the module (instead of the npm-hosted package, even if there is)
- import it as usual, e.g.: `import * from 'webdev-essentials'`
- To kill the link, go back to your local version and at root type `npm unlink --no-save webdev-essentials`. Then run `npm install`

### Troubleshooting

If `npm link webdev-essentials` does not work, you can install it by running: `npm install ../../webdev-essentials`.

### Comparison

| Command                             | Dependency in package.json                          |
| ----------------------------------- | --------------------------------------------------- |
| npm install ../../webdev-essentials | "webdev-essentials": "file:../../webdev-essentials" |
| npm link webdev-essentials          | "webdev-essentials": "^1.0.0"                       |

[Reference](https://benjaminwfox.com/blog/tech/why-isnt-npm-link-working)

## Publishing a TypeScript package to NPM

- init new `npm`-package: `npm init -y`
- install TypeScript-compiler: `npm i typescript --save-dev`
- init TypeScript: `npx tsc --init`
- add two scripts to `package.json`:

  - the `build`-script compiles all the files, whereas the `build:check` command only checks compileability without actually compiling and creating the js-files.

  ```json
  "scripts": {
      "build": "tsc",
      "build:check": "tsc --noEmit"
    },
  ```

- Add `"declaration": true` to the `compilerOptions` of your `tsconfig.json`. This tells TypeScript to emit an `.d.ts` definitions file along with your compiled JavaScript.
- Add `"types": "index.d.ts"` to your `package.json`. When other people import your library, this tells the TypeScript compiler where to look for your library’s types. The filename of your `.d.ts` file will be the same as your main entry point. So, for example in your `package.json` you’ll want to have something like this in there:

  - Add

  ```json
    "main": "dist/index.js",
    "types": "index.d.ts"
  ```

- Set `outDir` in `tsconfig.jsin` to `"outDir": "./dist"`. This specifies an output folder for all emitted files.
- `.gitignore` and `.npmignore`
  - We don’t want to track compiled JavaScript files in our git repository, so add `dist` to the `.gitignore` file.
  - We do, however, want them sent to NPM when we publish, so create an empty `.npmignore` file (maybe add `/node_modules` there, or simply make it a copy of your `.gitignore` file just without the ignore for the `dist` folder).
  - If you don’t have an `.npmignore`, NPM will automatically exclude gitignored files from being published. Having an npmignore file overwrites this behavior.
- Add `"exclude"` object, if you want to exclude folders from the compilation process:

  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "lib": ["es2017", "es7", "es6", "dom"],
      "declaration": true,
      "outDir": "dist",
      "strict": true,
      "esModuleInterop": true
    },
    "exclude": ["node_modules", "dist", "utils/userLanguage.ts"]
  }
  ```

- To locally generate a tarball of everything that will get sent to and published on NPM to really verify and make sure it matches your expectation: `npm pack`
- To locally test
  - in you package root: `npm link`
  - in other project: `npm link <yourpackagename>` and in code `import <yourpackagename>`
  - to unlink from the other project: `npm unlink --no-save <yourpackagename>`

[Source: The 30-second guide to publishing a TypeScript package to NPM](https://cameronnokes.com/blog/the-30-second-guide-to-publishing-a-typescript-package-to-npm/)

## Rest in TypeScript

- Example-Interface-Definition:

```ts
interface Options {
  timeout?: number;
  [rest: string]: any;
}
```

- Here, `[rest:string]: any` defines an `index-structure` of `string`-`keys`

  - all keys give access to any-type members
  - access to members: options.foo, options.bar, ...
  - With the `spread`-operator: `fetch(url, ...options);` or const `{ timeout, ...rest} = options;`

- On the contrary, `rest: any[];` defines an `array` named 'rest'
  - access to members: `options.rest[0];` or `options.rest[1];`
