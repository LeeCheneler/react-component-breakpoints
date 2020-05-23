import React from "react";
import ResizeObserver from "resize-observer-polyfill";

/**
 * Ref to assign to component you want to measure.
 */
export type MeasuredComponentRef = React.MutableRefObject<any>;

/**
 * Get value for current breakpoint.
 *
 * @param defaultValue Value below smallest breakpoint passed into hook
 * @param values Values to match to breakpoints
 */
export type GetBreakpointValueFunction = <T = any>(
  defaultValue: T,
  ...values: T[]
) => T;

/**
 * Booleans corresponding to breakpoints passed into hook denoting if they are hit or not.
 */
export type BreakpointsHitArray = boolean[];

/**
 * Result from the useBreakpoints hook.
 */
export type BreakpointsResult = [
  MeasuredComponentRef,
  GetBreakpointValueFunction,
  BreakpointsHitArray
];

/**
 * React hook to measure a component and provide breakpoint feedback.
 * @param breakpoints Breakpoints in px
 */
export const useBreakpoints = (...breakpoints: number[]): BreakpointsResult => {
  const elementRef = React.useRef<any>();
  const [breakpointFlags, setBreakpointFlags] = React.useState(
    breakpoints.map(() => false)
  );

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newBreakpointFlags = breakpoints.map((b) => {
          return entry.contentRect.width >= b;
        });

        setBreakpointFlags((previousBreakpointFlags) => {
          const changeLog = newBreakpointFlags.map(
            (f, i) => f === previousBreakpointFlags[i]
          );
          const flagsHaveChanged = !changeLog.every((f) => f);

          return flagsHaveChanged
            ? newBreakpointFlags
            : previousBreakpointFlags;
        });
      }
    });

    const elementRefCurrent = elementRef.current;
    resizeObserver.observe(elementRefCurrent);

    return () => {
      resizeObserver.unobserve(elementRefCurrent);
    };
  }, [breakpoints]);

  const getBreakpointValue = <T = any>(defaultValue: T, ...values: T[]): T => {
    return values.reduce((currentValue, possibleValue, index) => {
      return breakpointFlags[index] ? possibleValue : currentValue;
    }, defaultValue);
  };

  return [elementRef, getBreakpointValue, breakpointFlags];
};
