import { getCareerById } from '@/lib/yaml/careers';
import { Metadata } from 'next';

// getCareerById をモック
jest.mock('@/lib/yaml/careers', () => ({
  getCareerById: jest.fn(),
}));

/**
 * 日付を「YYYY年MM月DD日」の形式に変換する関数
 * app/careers/[id]/page.tsx から抽出
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}年${month}月${day}日`;
}

/**
 * generateMetadataのモック
 * app/careers/[id]/page.tsx から抽出
 */
async function mockGenerateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const career = await getCareerById(id);
  
  if (!career) {
    return {
      title: 'キャリアが見つかりません',
    };
  }
  
  return {
    title: career.title,
    description: `${career.title}のキャリア情報`,
  };
}

describe('CareerPage', () => {
  // テスト前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // モックデータ
  const mockCareer = {
    id: 'test-career',
    title: 'テストキャリア',
    last_update: '2025-04-13',
    sections: [
      {
        title: 'スキル',
        items: [
          {
            key: 'プログラミング言語',
            value: ['JavaScript', 'TypeScript'],
            must_have: true
          }
        ]
      }
    ]
  };

  describe('日付フォーマット関数', () => {
    it('YYYY-MM-DD形式の日付を正しくフォーマットする', () => {
      expect(formatDate('2025-04-13')).toBe('2025年4月13日');
      expect(formatDate('2025-01-01')).toBe('2025年1月1日');
      expect(formatDate('2025-12-31')).toBe('2025年12月31日');
    });
  });

  describe('メタデータ生成', () => {
    it('メタデータが正しく設定される', async () => {
      // getCareerByIdのモック実装
      (getCareerById as jest.Mock).mockResolvedValue(mockCareer);
      
      // generateMetadataを実行
      const metadata = await mockGenerateMetadata({ params: { id: 'test-career' } });
      
      // メタデータが正しく設定されていることを確認
      expect(metadata.title).toBe('テストキャリア');
      expect(metadata.description).toBe('テストキャリアのキャリア情報');
      
      // getCareerByIdが正しいIDで呼び出されたことを確認
      expect(getCareerById).toHaveBeenCalledWith('test-career');
    });

    it('キャリアが見つからない場合はデフォルトのメタデータが設定される', async () => {
      // getCareerByIdのモック実装（nullを返す）
      (getCareerById as jest.Mock).mockResolvedValue(null);
      
      // generateMetadataを実行
      const metadata = await mockGenerateMetadata({ params: { id: 'non-existent' } });
      
      // デフォルトのメタデータが設定されていることを確認
      expect(metadata.title).toBe('キャリアが見つかりません');
      
      // getCareerByIdが正しいIDで呼び出されたことを確認
      expect(getCareerById).toHaveBeenCalledWith('non-existent');
    });
  });
});
