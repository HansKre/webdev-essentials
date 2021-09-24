# Description

A collection of code-snippets and useful info essential for web development.

## Development and testing locally a `npm`-module

- We first need to create a symbolic link in the global `node_modules` folder (the folder where packages are added with `npm install -g <package>`)
- To find out the currently configured globale `node_modules` folder, run: `npm prefix -g`
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
