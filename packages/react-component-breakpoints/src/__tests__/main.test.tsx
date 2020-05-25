import React from "react";
import { act, render } from "@testing-library/react";
import { useBreakpoints } from "../main";
import {
  // @ts-ignore
  observeMock,
  // @ts-ignore
  unobserveMock,
  // @ts-ignore
  setTestWidth,
} from "resize-observer-polyfill";

describe("useBreakpoints", () => {
  const TestHarness = () => {
    const [ref, br, [wide, widest]] = useBreakpoints(100, 200);

    const value = br("default", "wide", "widest");
    return React.useMemo(
      () => (
        <div ref={ref} data-testid="measured">
          <div data-testid={`value-${value}`} />
          {wide && <div data-testid="wide" />}
          {widest && <div data-testid="widest" />}
        </div>
      ),
      [ref, value, wide, widest]
    );
  };

  it("should render return the correct breakpoint values", () => {
    const { queryByTestId, unmount } = render(<TestHarness />);

    // Begins observing
    const measured = queryByTestId("measured");
    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(measured);

    // 0 width
    expect(queryByTestId("value-default")).toBeInTheDocument();
    expect(queryByTestId("wide")).not.toBeInTheDocument();
    expect(queryByTestId("widest")).not.toBeInTheDocument();

    // 100 width
    act(() => {
      setTestWidth(100);
    });
    expect(observeMock).toHaveBeenCalledTimes(2);
    expect(unobserveMock).toHaveBeenCalledTimes(1);
    expect(queryByTestId("value-wide")).toBeInTheDocument();
    expect(queryByTestId("wide")).toBeInTheDocument();
    expect(queryByTestId("widest")).not.toBeInTheDocument();

    // 200 width
    act(() => {
      setTestWidth(200);
    });
    expect(observeMock).toHaveBeenCalledTimes(3);
    expect(unobserveMock).toHaveBeenCalledTimes(2);
    expect(queryByTestId("value-widest")).toBeInTheDocument();
    expect(queryByTestId("wide")).toBeInTheDocument();
    expect(queryByTestId("widest")).toBeInTheDocument();

    // Stops observing
    unmount();
    expect(observeMock).toHaveBeenCalledWith(measured);
    expect(unobserveMock).toHaveBeenCalledTimes(3);
  });
});
