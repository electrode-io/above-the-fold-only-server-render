#  (above-the-fold-only-server-render)

A React component wrapper for optionally skipping SSR.


## AboveTheFoldOnlyServerRender

A component for configurable skip loading.

### Properties

| Property | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| *contextKey* | string | Tell AboveTheFoldOnlyServerRender to read context in order to skip server side rendering | 
| *placeholder* | element | Pass in another element to render when skipping server side rendering | 
| *placeholderClassName* | string | Sets the className of the default placeholder | 
| *placeholderStyle* | object | Sets the style of the default placeholder | 
| *skip* | bool | Tell AboveTheFoldOnlyServerRender to skip server side rendering | `false`

### import

```jsx
import {AboveTheFoldOnlyServerRender} from "above-the-fold-only-server-render";
```

<hr/>
