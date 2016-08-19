#  (skip-server-render)

A React component wrapper for optionally skipping SSR.


## SkipServerRender

A component for configurable skip loading.

### Properties

| Property | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| *contextKey* | string | Tell SkipServerRender to read context in order to skip server side rendering | 
| *placeholder* | element | Pass in another element to render when skipping server side rendering | 
| *placeholderClassName* | string | Sets the className of the default placeholder | 
| *placeholderStyle* | object | Sets the style of the default placeholder | 
| *skip* | bool | Tell SkipServerRender to skip server side rendering | `false`

### import

```jsx
import {SkipServerRender} from "skip-server-render";
```

<hr/>
