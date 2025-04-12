import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CareerList from '@/components/ui/CareerList';
import { CareerData } from '@/types/career';

// モックデータ
const mockCareers: CareerData[] = [
  {
    id: 'test-id-1',
    title: 'テストキャリア1',
    last_update: '2025-04-01',
    sections: [
      {
        title: 'テストセクション1',
        items: [
          { key: 'テストキー1', value: 'テスト値1' }
        ]
      },
      {
        title: 'テストセクション2',
        items: [
          { key: 'テストキー2', value: true }
        ]
      }
    ]
  },
  {
    id: 'test-id-2',
    title: 'テストキャリア2',
    last_update: '2025-04-02',
    sections: [
      {
        title: 'テストセクション3',
        items: [
          { key: 'テストキー3', value: 'テスト値3' }
        ]
      }
    ]
  }
];

// Next.jsのLinkコンポーネントをモック
jest.mock('next/link', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function Link({ children, href, className, ...props }: { children: React.ReactNode, href: string, className?: string, [key: string]: any }) {
      return React.createElement('a', { href, 'data-testid': 'mock-link', className, ...props }, children);
    }
  };
});

describe('CareerList Component', () => {
  test('キャリアリストが正しくレンダリングされる', () => {
    render(<CareerList careers={mockCareers} />);
    
    // 各キャリアカードが表示されていることを確認
    expect(screen.getByTestId('career-card-test-id-1')).toBeInTheDocument();
    expect(screen.getByTestId('career-card-test-id-2')).toBeInTheDocument();
    expect(screen.getByText('テストキャリア1')).toBeInTheDocument();
    expect(screen.getByText('テストキャリア2')).toBeInTheDocument();
  });
  
  test('キャリアデータが正しく表示される', () => {
    render(<CareerList careers={mockCareers} />);
    
    // タイトルが表示されていることを確認
    expect(screen.getByText('テストキャリア1')).toBeInTheDocument();
    expect(screen.getByText('テストキャリア2')).toBeInTheDocument();
    
    // 最終更新日が正しいフォーマットで表示されていることを確認
    expect(screen.getByText('最終更新: 2025年04月01日')).toBeInTheDocument();
    expect(screen.getByText('最終更新: 2025年04月02日')).toBeInTheDocument();
    
    // セクションタイトルが表示されていることを確認
    expect(screen.getByText('テストセクション1')).toBeInTheDocument();
    expect(screen.getByText('テストセクション2')).toBeInTheDocument();
    expect(screen.getByText('テストセクション3')).toBeInTheDocument();
  });
  
  test('リンクが正しいURLを持っている', () => {
    render(<CareerList careers={mockCareers} />);
    
    // リンクが正しいURLを持っていることを確認
    const link1 = screen.getByTestId('career-card-test-id-1');
    const link2 = screen.getByTestId('career-card-test-id-2');
    expect(link1).toHaveAttribute('href', '/careers/test-id-1');
    expect(link2).toHaveAttribute('href', '/careers/test-id-2');
  });
  
  test('空の配列が渡された場合は何も表示されない', () => {
    render(<CareerList careers={[]} />);
    
    // キャリアカードが表示されていないことを確認
    expect(screen.queryByTestId(/career-card/)).not.toBeInTheDocument();
  });
  
  test('グリッドレイアウトが適用されている', () => {
    render(<CareerList careers={mockCareers} />);
    
    // グリッドレイアウトが適用されていることを確認
    const link = screen.getByTestId('career-card-test-id-1');
    const gridContainer = link.parentElement;
    expect(gridContainer).toHaveClass('grid');
    expect(gridContainer).toHaveClass('grid-cols-1');
    expect(gridContainer).toHaveClass('md:grid-cols-2');
    expect(gridContainer).toHaveClass('lg:grid-cols-3');
  });
});
