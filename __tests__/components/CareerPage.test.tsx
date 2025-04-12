import React from 'react';
import { render, screen } from '@testing-library/react';
import CareerPage from '@/app/careers/[id]/page';
import { getCareerById } from '@/lib/yaml/careers';

// モックの設定
jest.mock('@/lib/yaml/careers', () => ({
  getCareerById: jest.fn(),
}));

describe('CareerPage', () => {
  const mockCareer = {
    id: 'frontend-engineer',
    title: 'フロントエンドエンジニア',
    last_update: '2025-04-13',
    sections: [
      {
        title: 'スキル',
        items: [
          {
            key: 'プログラミング言語',
            value: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
            must_have: true
          }
        ]
      }
    ],
    contact: {
      email: 'example@example.com'
    }
  };

  beforeEach(() => {
    (getCareerById as jest.Mock).mockResolvedValue(mockCareer);
  });

  it('タイトルが正しく表示される', async () => {
    render(await CareerPage({ params: { id: 'frontend-engineer' } }));
    expect(screen.getByText('フロントエンドエンジニア')).toBeInTheDocument();
  });

  it('最終更新日が正しい形式で表示される', async () => {
    render(await CareerPage({ params: { id: 'frontend-engineer' } }));
    expect(screen.getByText('最終更新: 2025年04月13日')).toBeInTheDocument();
  });

  it('戻るボタンが表示される', async () => {
    render(await CareerPage({ params: { id: 'frontend-engineer' } }));
    expect(screen.getByText('戻る')).toBeInTheDocument();
  });

  it('セクションタイトルが表示される', async () => {
    render(await CareerPage({ params: { id: 'frontend-engineer' } }));
    expect(screen.getByText('スキル')).toBeInTheDocument();
  });

  it('連絡先が表示される', async () => {
    render(await CareerPage({ params: { id: 'frontend-engineer' } }));
    expect(screen.getByText('連絡先')).toBeInTheDocument();
    expect(screen.getByText('Email: example@example.com')).toBeInTheDocument();
  });
});
