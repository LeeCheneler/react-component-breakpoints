# react-compoennt-breakpoints

React to component level breakpoints.

## Why

Utilising the `useBreakpoints` React hook allows you to build components that can respond to their own width rather than the page's width.

## Installing

```sh
yarn add react-component-breakpoints
```

## Getting started

A simple example of a component reacting to its size changes.

```js
import { useBreakpoints } from "../main";

const Component = () => {
  const [ref, br, [wide, widest]] = useBreakpoints(500, 900);

  const breakpointValue = br("default", "wide", "widest");
  return (
    <div ref={ref}>
      <p>Breakpoint value: {breakpointValue}</p>
      <p>Wide: {wide.toString()}</p>
      <p>Widest: {widest.toString()}</p>
    </div>
  );
};
```

## API

### `useBreakpoints`

```js
const [ref, br, [hit]] = useBreakpoints(...breakpoints);
```

Takes breakpoint numbers (`...breakpoints`) as arguments.

Returns an array with:

- A React Ref (`ref`) to pass to a JSX element to measure.

- A function (`br`) that returns the corresponding value according to the current breakpoint, the first argument is the default value if no breakoint is hit.

- An array of booleans (`[hit]`) indicating which breakpoints have been hit. The number of booleans in the array always matches the number of breakpoints you gave.
