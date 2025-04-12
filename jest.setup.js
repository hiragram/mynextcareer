// jest.setup.js
require('@testing-library/jest-dom');

// Next.jsのメタデータをモック化
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return children;
    },
  };
});

// next/imageをモック化
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return Object.assign(document.createElement('img'), props);
  },
}));

// next/routerをモック化
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
}));

// メタデータをモック化
jest.mock('next/dist/lib/metadata/get-metadata-route', () => ({
  fillMetadataSegment: () => {},
}));

// 環境変数をモック化
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
