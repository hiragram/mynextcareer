/// <reference types="jest" />

/**
 * jest-domの拡張マッチャーの型定義
 */
declare namespace jest {
  interface Matchers<R> {
    // DOM要素の属性に関するマッチャー
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeEmpty(): R;
    toBeInTheDocument(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toBeVisible(): R;
    toContainElement(element: HTMLElement | null): R;
    toContainHTML(htmlText: string): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveClass(...classNames: string[]): R;
    toHaveFocus(): R;
    toHaveFormValues(expectedValues: Record<string, any>): R;
    toHaveStyle(css: string | Record<string, any>): R;
    toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
    toHaveValue(value?: string | string[] | number): R;
    
    // レスポンシブデザインのテスト用に追加
    toHaveComputedStyle(property: string, value: string): R;
    toMatchMediaQuery(mediaQuery: string): R;
  }
}
