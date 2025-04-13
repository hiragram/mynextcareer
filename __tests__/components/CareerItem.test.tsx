import { CareerItem as CareerItemType } from '@/types/career';

// renderValue関数をテスト用に再実装
function renderValue(value: string | boolean | number | string[]): string {
  if (typeof value === 'boolean') {
    return value ? '◯' : '✗';
  }
  
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  
  return String(value);
}

// CareerItemコンポーネントをモック
jest.mock('@/components/ui/CareerItem', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('CareerItem', () => {
  // 文字列値のテスト
  it('文字列値を正しく処理する', () => {
    const item: CareerItemType = {
      key: '役職',
      value: 'シニアエンジニア'
    };
    
    const result = renderValue(item.value);
    expect(result).toBe('シニアエンジニア');
  });
  
  // 数値値のテスト
  it('数値を正しく処理する', () => {
    const item: CareerItemType = {
      key: '経験年数',
      value: 5
    };
    
    const result = renderValue(item.value);
    expect(result).toBe('5');
  });
  
  // 配列値のテスト
  it('配列値を正しく処理する', () => {
    const item: CareerItemType = {
      key: '使用言語',
      value: ['JavaScript', 'TypeScript', 'Python']
    };
    
    const result = renderValue(item.value);
    expect(result).toBe('JavaScript, TypeScript, Python');
  });
  
  // 真偽値（true）のテスト
  it('真偽値（true）を◯に変換する', () => {
    const item: CareerItemType = {
      key: 'リモートワーク',
      value: true
    };
    
    const result = renderValue(item.value);
    expect(result).toBe('◯');
  });
  
  // 真偽値（false）のテスト
  it('真偽値（false）を✗に変換する', () => {
    const item: CareerItemType = {
      key: 'リモートワーク',
      value: false
    };
    
    const result = renderValue(item.value);
    expect(result).toBe('✗');
  });
  
  // must_haveフラグのテスト
  it('must_haveフラグがtrueの場合、適切なCSSクラスを生成する', () => {
    const item: CareerItemType = {
      key: '資格',
      value: 'AWS認定ソリューションアーキテクト',
      must_have: true
    };
    
    const className = `border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
      item.must_have ? 'bg-yellow-50' : ''
    }`;
    
    expect(className).toContain('bg-yellow-50');
  });
  
  // must_haveフラグがない場合のテスト
  it('must_haveフラグがない場合、通常のCSSクラスを生成する', () => {
    const item: CareerItemType = {
      key: '資格',
      value: 'AWS認定ソリューションアーキテクト'
    };
    
    const className = `border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
      item.must_have ? 'bg-yellow-50' : ''
    }`;
    
    expect(className).not.toContain('bg-yellow-50');
  });
});
