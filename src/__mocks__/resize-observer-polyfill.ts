let callback: any;

export const setTestWidth = (width: number) => {
  callback([{ contentRect: { width } }]);
};

export const observeMock = jest.fn();
export const unobserveMock = jest.fn();

class MockResizeObserver {
  observe = observeMock;
  unobserve = unobserveMock;

  constructor(cb: any) {
    callback = cb;
  }
}

export default MockResizeObserver;
