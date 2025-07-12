import '@testing-library/jest-dom'

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-expect-error -- jsdom doesn't implement ResizeObserver
global.ResizeObserver = global.ResizeObserver || ResizeObserver
