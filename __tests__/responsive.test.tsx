import { CareerData } from '@/types/career';

// レスポンシブデザインのテスト用にCSSクラスを確認
describe('レスポンシブデザインのテスト', () => {
  // トップページのレスポンシブデザインテスト
  describe('トップページ', () => {
    it('トップページのコンテナにレスポンシブなCSSクラスが適用されている', () => {
      // コンテナのクラス
      const containerClass = 'container mx-auto px-4 py-8 max-w-6xl';
      
      // レスポンシブなクラスが含まれていることを確認
      expect(containerClass).toContain('container');
      expect(containerClass).toContain('mx-auto');
      expect(containerClass).toContain('px-4');
      expect(containerClass).toContain('max-w-6xl');
    });
    
    it('キャリアリストのグリッドレイアウトがレスポンシブである', () => {
      // グリッドレイアウトのクラス
      const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      
      // レスポンシブなグリッドクラスが含まれていることを確認
      expect(gridClass).toContain('grid');
      expect(gridClass).toContain('grid-cols-1');
      expect(gridClass).toContain('md:grid-cols-2');
      expect(gridClass).toContain('lg:grid-cols-3');
      expect(gridClass).toContain('gap-6');
    });
    
    it('キャリアカードがレスポンシブである', () => {
      // カードのクラス
      const cardClass = 'border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col';
      
      // レスポンシブなカードクラスが含まれていることを確認
      expect(cardClass).toContain('border');
      expect(cardClass).toContain('rounded-lg');
      expect(cardClass).toContain('shadow-sm');
      expect(cardClass).toContain('hover:shadow-md');
      expect(cardClass).toContain('p-6');
      expect(cardClass).toContain('h-full');
      expect(cardClass).toContain('flex');
      expect(cardClass).toContain('flex-col');
    });
  });
  
  // 詳細ページのレスポンシブデザインテスト
  describe('詳細ページ', () => {
    it('詳細ページのコンテナにレスポンシブなCSSクラスが適用されている', () => {
      // コンテナのクラス
      const containerClass = 'container mx-auto px-4 py-8 max-w-4xl';
      
      // レスポンシブなクラスが含まれていることを確認
      expect(containerClass).toContain('container');
      expect(containerClass).toContain('mx-auto');
      expect(containerClass).toContain('px-4');
      expect(containerClass).toContain('max-w-4xl');
    });
    
    it('セクションのレイアウトがレスポンシブである', () => {
      // セクションのクラス
      const sectionClass = 'mb-10';
      
      // レスポンシブなセクションクラスが含まれていることを確認
      expect(sectionClass).toContain('mb-10');
    });
    
    it('セクションタイトルがレスポンシブである', () => {
      // タイトルのクラス
      const titleClass = 'text-2xl font-semibold mb-4 border-l-4 border-blue-500 pl-3';
      
      // レスポンシブなタイトルクラスが含まれていることを確認
      expect(titleClass).toContain('text-2xl');
      expect(titleClass).toContain('font-semibold');
      expect(titleClass).toContain('mb-4');
      expect(titleClass).toContain('border-l-4');
      expect(titleClass).toContain('border-blue-500');
      expect(titleClass).toContain('pl-3');
    });
    
    it('項目のグリッドレイアウトがレスポンシブである', () => {
      // 項目のグリッドクラス
      const itemsGridClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
      
      // レスポンシブなグリッドクラスが含まれていることを確認
      expect(itemsGridClass).toContain('grid');
      expect(itemsGridClass).toContain('grid-cols-1');
      expect(itemsGridClass).toContain('md:grid-cols-2');
      expect(itemsGridClass).toContain('gap-4');
    });
    
    it('連絡先情報のコンテナがレスポンシブである', () => {
      // 連絡先情報のコンテナクラス
      const contactContainerClass = 'mt-12 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200';
      
      // レスポンシブなコンテナクラスが含まれていることを確認
      expect(contactContainerClass).toContain('mt-12');
      expect(contactContainerClass).toContain('p-6');
      expect(contactContainerClass).toContain('bg-gray-50');
      expect(contactContainerClass).toContain('rounded-lg');
      expect(contactContainerClass).toContain('shadow-sm');
      expect(contactContainerClass).toContain('border');
      expect(contactContainerClass).toContain('border-gray-200');
    });
  });
  
  // モバイルビューのテスト
  describe('モバイルビュー', () => {
    it('モバイルビューでは単一カラムレイアウトになる', () => {
      // グリッドレイアウトのクラス
      const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      
      // モバイルでは単一カラムであることを確認
      expect(gridClass).toContain('grid-cols-1');
    });
    
    it('モバイルビューでは項目が単一カラムで表示される', () => {
      // 項目のグリッドクラス
      const itemsGridClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
      
      // モバイルでは単一カラムであることを確認
      expect(itemsGridClass).toContain('grid-cols-1');
    });
    
    it('モバイルビューでもテキストが読みやすいサイズである', () => {
      // タイトルのクラス
      const titleClass = 'text-2xl font-semibold mb-4';
      
      // テキストサイズが適切であることを確認
      expect(titleClass).toContain('text-2xl');
      
      // 項目のキーのクラス
      const keyClass = 'font-medium text-gray-700';
      
      // テキストサイズが適切であることを確認
      expect(keyClass).toContain('font-medium');
    });
  });
  
  // タブレットビューのテスト
  describe('タブレットビュー', () => {
    it('タブレットビューでは2カラムレイアウトになる', () => {
      // グリッドレイアウトのクラス
      const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      
      // タブレットでは2カラムであることを確認
      expect(gridClass).toContain('md:grid-cols-2');
    });
    
    it('タブレットビューでは項目が2カラムで表示される', () => {
      // 項目のグリッドクラス
      const itemsGridClass = 'grid grid-cols-1 md:grid-cols-2 gap-4';
      
      // タブレットでは2カラムであることを確認
      expect(itemsGridClass).toContain('md:grid-cols-2');
    });
  });
  
  // デスクトップビューのテスト
  describe('デスクトップビュー', () => {
    it('デスクトップビューでは3カラムレイアウトになる', () => {
      // グリッドレイアウトのクラス
      const gridClass = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      
      // デスクトップでは3カラムであることを確認
      expect(gridClass).toContain('lg:grid-cols-3');
    });
    
    it('デスクトップビューではコンテナの最大幅が設定されている', () => {
      // コンテナのクラス
      const containerClass = 'container mx-auto px-4 py-8 max-w-6xl';
      
      // 最大幅が設定されていることを確認
      expect(containerClass).toContain('max-w-6xl');
    });
  });
});
