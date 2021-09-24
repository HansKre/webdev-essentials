# Description

- viewport-fit=cover lets webpage scale to use notch-space on iOS when in
  landscape orientation
- maximum-scale=1 avoids automatic zoom on iOS when inputs
  are focused and focused element's font-size is less then 16px

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
/>
```
