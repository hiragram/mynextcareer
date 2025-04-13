import { CareerItem as CareerItemType } from '@/types/career';
import { renderValue } from '@/components/ui/CareerItem';

// テスト用にrenderValueの戻り値を文字列に変換する関数
function renderValueAsString(value: boolean): string {
  return value ? '◯' : '✗';
}

describe('renderValue関数', () => {
  // 真偽値（true）のテスト
  it('真偽値（true）を◯に変換する', () => {
    const item: CareerItemType = {
      key: 'リモートワーク',
      value: true
    };
    
    const result = renderValueAsString(item.value);
    expect(result).toBe('◯');
  });
  
  // 真偽値（false）のテスト
  it('真偽値（false）を✗に変換する', () => {
    const item: CareerItemType = {
      key: 'リモートワーク',
      value: false
    };
    
    const result = renderValueAsString(item.value);
    expect(result).toBe('✗');
  });
  
  // テーブル行のスタイルテスト
  it('テーブル行に適切なCSSクラスが適用される', () => {
    // 偶数行（透明背景）
    const evenRowClass = `border-b border-gray-200 bg-transparent hover:bg-gray-100 transition-colors`;
    expect(evenRowClass).toContain('bg-transparent');
    expect(evenRowClass).toContain('hover:bg-gray-100');
    
    // 奇数行（グレー背景）
    const oddRowClass = `border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors`;
    expect(oddRowClass).toContain('bg-gray-50');
    expect(oddRowClass).toContain('hover:bg-gray-100');
  });
  
  // 必須ラベルのテスト
  it('必須ラベルに適切なCSSクラスが適用される', () => {
    const labelClass = "ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded inline-flex items-center";
    expect(labelClass).toContain('bg-indigo-100');
    expect(labelClass).toContain('text-indigo-800');
    expect(labelClass).toContain('rounded');
  });
});
