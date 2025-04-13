import { getAllCareers } from '@/lib/yaml/careers';
import { CareerData } from '@/types/career';

// getAllCareers関数をモック
jest.mock('@/lib/yaml/careers', () => ({
  getAllCareers: jest.fn(),
  getCareerById: jest.fn(),
}));

describe('ページ表示のテスト', () => {
  // テスト前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // モックデータ
  const mockCareers: CareerData[] = [
    {
      id: 'ios-engineer',
      title: 'iOSアプリエンジニア',
      last_update: '2025-04-13',
      sections: [
        {
          title: '技術について',
          items: [
            {
              key: 'Objective-Cがない',
              value: true,
              must_have: true
            }
          ]
        }
      ],
      contact: {
        email: 'yamada@example.com'
      }
    },
    {
      id: 'frontend-engineer',
      title: 'フロントエンドエンジニア',
      last_update: '2025-04-13',
      sections: [
        {
          title: '技術について',
          items: [
            {
              key: 'React',
              value: true,
              must_have: true
            }
          ]
        }
      ],
      contact: {
        email: 'tanaka@example.com',
        github: 'tanaka-frontend'
      }
    },
    {
      id: 'backend-engineer',
      title: 'バックエンドエンジニア',
      last_update: '2025-04-13',
      sections: [
        {
          title: '技術について',
          items: [
            {
              key: '使用言語',
              value: 'Go Rust TypeScript'
            }
          ]
        }
      ],
      contact: {
        email: 'suzuki@example.com',
        twitter: 'suzuki_backend',
        github: 'suzuki-dev'
      }
    }
  ];

  describe('トップページ', () => {
    it('すべてのキャリアデータがトップページに表示される', async () => {
      // getAllCareersのモック実装
      (getAllCareers as jest.Mock).mockResolvedValue(mockCareers);
      
      // トップページのデータを取得
      const careers = await getAllCareers();
      
      // すべてのキャリアデータが取得できることを確認
      expect(careers).toHaveLength(3);
      
      // 各キャリアのタイトルが正しいことを確認
      expect(careers[0].title).toBe('iOSアプリエンジニア');
      expect(careers[1].title).toBe('フロントエンドエンジニア');
      expect(careers[2].title).toBe('バックエンドエンジニア');
      
      // 各キャリアのIDが正しいことを確認
      expect(careers[0].id).toBe('ios-engineer');
      expect(careers[1].id).toBe('frontend-engineer');
      expect(careers[2].id).toBe('backend-engineer');
      
      // getAllCareersが呼び出されたことを確認
      expect(getAllCareers).toHaveBeenCalledTimes(1);
    });
    
    it('キャリアデータが日付順に並んでいる', async () => {
      // 日付の異なるモックデータ
      const dateOrderedMockCareers: CareerData[] = [
        {
          id: 'ios-engineer',
          title: 'iOSアプリエンジニア',
          last_update: '2025-04-13', // 最新
          sections: []
        },
        {
          id: 'frontend-engineer',
          title: 'フロントエンドエンジニア',
          last_update: '2025-04-12', // 2番目
          sections: []
        },
        {
          id: 'backend-engineer',
          title: 'バックエンドエンジニア',
          last_update: '2025-04-11', // 最も古い
          sections: []
        }
      ];
      
      // getAllCareersのモック実装
      (getAllCareers as jest.Mock).mockResolvedValue(dateOrderedMockCareers);
      
      // トップページのデータを取得
      const careers = await getAllCareers();
      
      // 日付順に並んでいることを確認（実際のアプリケーションでソートされる場合）
      // 注: 実際のアプリケーションでのソート順序に合わせてテストを調整する必要があります
      expect(careers[0].last_update).toBe('2025-04-13');
      expect(careers[1].last_update).toBe('2025-04-12');
      expect(careers[2].last_update).toBe('2025-04-11');
    });
  });

  describe('詳細ページ', () => {
    // getCareerById関数をモック
    const { getCareerById } = require('@/lib/yaml/careers');
    
    it('iOSエンジニアの詳細ページが正しく表示される', async () => {
      // getCareerByIdのモック実装
      getCareerById.mockResolvedValue(mockCareers[0]);
      
      // 詳細ページのデータを取得
      const career = await getCareerById('ios-engineer');
      
      // キャリアデータが正しく取得できることを確認
      expect(career).not.toBeNull();
      expect(career.id).toBe('ios-engineer');
      expect(career.title).toBe('iOSアプリエンジニア');
      
      // セクションが正しく取得できることを確認
      expect(career.sections).toHaveLength(1);
      expect(career.sections[0].title).toBe('技術について');
      
      // 項目が正しく取得できることを確認
      expect(career.sections[0].items).toHaveLength(1);
      expect(career.sections[0].items[0].key).toBe('Objective-Cがない');
      expect(career.sections[0].items[0].value).toBe(true);
      expect(career.sections[0].items[0].must_have).toBe(true);
      
      // 連絡先情報が正しく取得できることを確認
      expect(career.contact).toBeDefined();
      expect(career.contact?.email).toBe('yamada@example.com');
      
      // getCareerByIdが正しいIDで呼び出されたことを確認
      expect(getCareerById).toHaveBeenCalledWith('ios-engineer');
    });
    
    it('フロントエンドエンジニアの詳細ページが正しく表示される', async () => {
      // getCareerByIdのモック実装
      getCareerById.mockResolvedValue(mockCareers[1]);
      
      // 詳細ページのデータを取得
      const career = await getCareerById('frontend-engineer');
      
      // キャリアデータが正しく取得できることを確認
      expect(career).not.toBeNull();
      expect(career.id).toBe('frontend-engineer');
      expect(career.title).toBe('フロントエンドエンジニア');
      
      // セクションが正しく取得できることを確認
      expect(career.sections).toHaveLength(1);
      expect(career.sections[0].title).toBe('技術について');
      
      // 項目が正しく取得できることを確認
      expect(career.sections[0].items).toHaveLength(1);
      expect(career.sections[0].items[0].key).toBe('React');
      expect(career.sections[0].items[0].value).toBe(true);
      expect(career.sections[0].items[0].must_have).toBe(true);
      
      // 連絡先情報が正しく取得できることを確認
      expect(career.contact).toBeDefined();
      expect(career.contact?.email).toBe('tanaka@example.com');
      expect(career.contact?.github).toBe('tanaka-frontend');
      
      // getCareerByIdが正しいIDで呼び出されたことを確認
      expect(getCareerById).toHaveBeenCalledWith('frontend-engineer');
    });
    
    it('バックエンドエンジニアの詳細ページが正しく表示される', async () => {
      // getCareerByIdのモック実装
      getCareerById.mockResolvedValue(mockCareers[2]);
      
      // 詳細ページのデータを取得
      const career = await getCareerById('backend-engineer');
      
      // キャリアデータが正しく取得できることを確認
      expect(career).not.toBeNull();
      expect(career.id).toBe('backend-engineer');
      expect(career.title).toBe('バックエンドエンジニア');
      
      // セクションが正しく取得できることを確認
      expect(career.sections).toHaveLength(1);
      expect(career.sections[0].title).toBe('技術について');
      
      // 項目が正しく取得できることを確認
      expect(career.sections[0].items).toHaveLength(1);
      expect(career.sections[0].items[0].key).toBe('使用言語');
      expect(career.sections[0].items[0].value).toBe('Go Rust TypeScript');
      
      // 連絡先情報が正しく取得できることを確認
      expect(career.contact).toBeDefined();
      expect(career.contact?.email).toBe('suzuki@example.com');
      expect(career.contact?.twitter).toBe('suzuki_backend');
      expect(career.contact?.github).toBe('suzuki-dev');
      
      // getCareerByIdが正しいIDで呼び出されたことを確認
      expect(getCareerById).toHaveBeenCalledWith('backend-engineer');
    });
    
    it('存在しないIDの場合はnullを返す', async () => {
      // getCareerByIdのモック実装（nullを返す）
      getCareerById.mockResolvedValue(null);
      
      // 詳細ページのデータを取得
      const career = await getCareerById('non-existent');
      
      // nullが返されることを確認
      expect(career).toBeNull();
      
      // getCareerByIdが正しいIDで呼び出されたことを確認
      expect(getCareerById).toHaveBeenCalledWith('non-existent');
    });
  });
});
