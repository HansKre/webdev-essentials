# Styled-Components

- [basics](https://styled-components.com/docs/basics)
- [styling-components](https://styled-components.com/docs/api#styling-components)
- [api](https://styled-components.com/docs/api)

## Setting up with `next.js` and `typescript`

Steps deducted from [official example repository](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-styled-components):

1. install: `npm install styled-components`
2. install types: `npm install --save-dev @types/styled-components`
3. create `.babelrc` in project root with following content:

   ```json
   {
     "presets": ["next/babel"],
     "plugins": [["styled-components", { "ssr": true }]]
   }
   ```

4. create `./pages/_document.tsx` and copy & paste [`document.tsx`](https://github.com/vercel/next.js/blob/canary/examples/with-typescript-styled-components/pages/_document.tsx) from the version from repo. This enables proper handling of dynamically created `CSS-Classnames` for `styled-components` even server-side.

## Theming

- import `ThemeProvider`: `import styled, { ThemeProvider } from 'styled-components';`
- Wrap content with `<ThemeProvider>`your react stuff here`</ThemeProvider>`

### Usage Examples

- Simple usage: `background-color: ${(props) => props.theme.backgroundColor};`
- Complex example with `css`:

  ```tsx
  import styled, { css } from 'styled-components';

  export const Button = styled.div<{ role: keyof typeof Role }>`
    font-weight: bold;

    ${(props) =>
      props.theme &&
      css`
        font-size: ${props.theme.typography.h1};
        color: ${props.theme.warningColor};
      `}
  `;
  ```
