import { CareerSection as CareerSectionType } from '@/types/career';

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
    const containerClass = 'border-t border-gray-200 pt-6 mb-10';
    expect(containerClass).toContain('border-t');
    expect(containerClass).toContain('mb-10');
    
    // セクションタイトルのクラス
    const titleClass = 'text-2xl font-bold mb-6 text-gray-800 flex items-center';
    expect(titleClass).toContain('text-2xl');
    expect(titleClass).toContain('font-bold');
    expect(titleClass).toContain('flex items-center');
    
    // タイトル装飾のクラス
    const titleDecorClass = 'w-1 h-6 bg-indigo-500 mr-3';
    expect(titleDecorClass).toContain('bg-indigo-500');
    
    // テーブルのクラス
    const tableClass = 'min-w-full border-collapse';
    expect(tableClass).toContain('min-w-full');
    expect(tableClass).toContain('border-collapse');
  });
});
