const { render, screen } = require('@testing-library/react');
const Home = require('../app/page').default;
const RootLayout = require('../app/layout').default;
const { Metadata } = require('next');

// メタデータのモック
jest.mock('next/metadata', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// React要素をモック
global.React = {
  createElement: (component, props, ...children) => {
    return { component, props, children };
  }
};

describe('Home Page', () => {
  it('renders the header with site title and description', () => {
    render(<Home />);
    
    // ヘッダーのタイトルと説明が表示されていることを確認
    expect(screen.getByText('マイネクストキャリア')).toBeInTheDocument();
    expect(screen.getByText('エンジニアが次の職場に求める条件を掲載できるサイト')).toBeInTheDocument();
  });

  it('renders the main content with site description', () => {
    render(<Home />);
    
    // メインコンテンツのセクションタイトルが表示されていることを確認
    expect(screen.getByText('サイトについて')).toBeInTheDocument();
    
    // サイトの説明文が表示されていることを確認
    expect(screen.getByText(/マイネクストキャリア」は、エンジニアが次のキャリアに求める条件を明確にし/)).toBeInTheDocument();
  });

  it('renders the career list section', () => {
    render(<Home />);
    
    // キャリア一覧セクションが表示されていることを確認
    expect(screen.getByText('キャリア一覧')).toBeInTheDocument();
    expect(screen.getByText(/※ キャリア一覧は今後のタスクで実装予定です/)).toBeInTheDocument();
  });

  it('renders the footer with copyright', () => {
    render(<Home />);
    
    // フッターが表示されていることを確認
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} マイネクストキャリア`)).toBeInTheDocument();
    
    // フッターのリンクが表示されていることを確認
    expect(screen.getByText('プライバシーポリシー')).toBeInTheDocument();
    expect(screen.getByText('お問い合わせ')).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    render(<Home />);
    
    // ヘッダーのレスポンシブクラスを確認
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('py-8');
    expect(header).toHaveClass('md:py-12');
    
    // タイトルのレスポンシブクラスを確認
    const title = screen.getByText('マイネクストキャリア');
    expect(title).toHaveClass('text-center');
    expect(title).toHaveClass('md:text-left');
    
    // フッターのレスポンシブクラスを確認
    const footerContainer = screen.getByText(`© ${new Date().getFullYear()} マイネクストキャリア`).parentElement;
    expect(footerContainer).toHaveClass('flex-col');
    expect(footerContainer).toHaveClass('md:flex-row');
  });
});

describe('Root Layout', () => {
  it('has correct metadata', () => {
    // app/layout.tsxからメタデータをインポート
    const { metadata } = require('../app/layout');
    
    // メタデータが正しく設定されていることを確認
    expect(metadata.title).toBe('マイネクストキャリア');
    expect(metadata.description).toBe('エンジニアが次の職場に求める条件を掲載できるサイト');
  });

  it('sets the language to Japanese', () => {
    const { container } = render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>
    );
    
    // html要素のlang属性が'ja'に設定されていることを確認
    const html = container.parentElement;
    expect(html).toHaveAttribute('lang', 'ja');
  });
});
