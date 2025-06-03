import "@testing-library/jest-dom";

let storage = {};

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');
  jest.spyOn(window.localStorage.__proto__, 'removeItem');
  window.localStorage.__proto__.setItem.mockImplementation((key, value) => {
    storage[key] = value;
    const event = new Event("storage");
    Object.assign(event, { key, newValue: value });
    window.dispatchEvent(event);
  });
  window.localStorage.__proto__.getItem.mockImplementation((key) => storage[key] || null);
  window.localStorage.__proto__.removeItem.mockImplementation((key) => {
    delete storage[key];
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});