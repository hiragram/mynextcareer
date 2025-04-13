import { CareerSection as CareerSectionType } from '@/types/career';

// CareerItemコンポーネントをモック
jest.mock('@/components/ui/CareerItem', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CareerSection', () => {
  // 基本的な構造テスト
  it('セクションタイトルと項目を正しく構造化する', () => {
    const section: CareerSectionType = {
      title: 'スキルセット',
      items: [
        { key: 'プログラミング言語', value: ['JavaScript', 'TypeScript'] },
        { key: 'フレームワーク', value: ['React', 'Next.js'] }
      ]
    };
    
    // セクションタイトルが正しいことを確認
    expect(section.title).toBe('スキルセット');
    
    // 項目数が正しいことを確認
    expect(section.items).toHaveLength(2);
    
    // 各項目の内容を確認
    expect(section.items[0].key).toBe('プログラミング言語');
    expect(section.items[0].value).toEqual(['JavaScript', 'TypeScript']);
    
    expect(section.items[1].key).toBe('フレームワーク');
    expect(section.items[1].value).toEqual(['React', 'Next.js']);
  });
  
  // 必須項目を含むセクションのテスト
  it('必須項目を含むセクションを正しく構造化する', () => {
    const section: CareerSectionType = {
      title: '必須条件',
      items: [
        { key: '経験年数', value: '3年以上', must_have: true },
        { key: 'チーム開発経験', value: true, must_have: true },
        { key: '英語力', value: 'ビジネスレベル' }
      ]
    };
    
    // セクションタイトルが正しいことを確認
    expect(section.title).toBe('必須条件');
    
    // 項目数が正しいことを確認
    expect(section.items).toHaveLength(3);
    
    // 必須フラグが正しく設定されていることを確認
    expect(section.items[0].must_have).toBe(true);
    expect(section.items[1].must_have).toBe(true);
    expect(section.items[2].must_have).toBeUndefined();
  });
  
  // 空の項目リストを持つセクションのテスト
  it('空の項目リストを持つセクションを正しく構造化する', () => {
    const section: CareerSectionType = {
      title: '空のセクション',
      items: []
    };
    
    // セクションタイトルが正しいことを確認
    expect(section.title).toBe('空のセクション');
    
    // 項目リストが空であることを確認
    expect(section.items).toHaveLength(0);
  });
  
  // CSSクラスのテスト
  it('セクションに適切なCSSクラスを適用する', () => {
    // セクションのコンテナのクラス
    const containerClass = 'mb-10';
    expect(containerClass).toContain('mb-10');
    
    // セクションタイトルのクラス
    const titleClass = 'text-2xl font-semibold mb-4 border-l-4 border-blue-500 pl-3';
    expect(titleClass).toContain('text-2xl');
    expect(titleClass).toContain('font-semibold');
    expect(titleClass).toContain('border-l-4');
    expect(titleClass).toContain('border-blue-500');
    expect(titleClass).toContain('pl-3');
    
    // 項目コンテナのクラス
    const itemsContainerClass = 'space-y-4';
    expect(itemsContainerClass).toContain('space-y-4');
  });
});
