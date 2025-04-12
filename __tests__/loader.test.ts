import path from 'path';
import fs from 'fs/promises';
import { getAllCareerIds, getCareerData, getAllCareersData } from '../lib/yaml/loader';
import { CareerData } from '../types/career';

// モックデータのパス
const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const VALID_YAML_PATH = path.join(FIXTURES_DIR, 'valid-career.yaml');
const INVALID_DATE_FORMAT_PATH = path.join(FIXTURES_DIR, 'invalid-date-format.yaml');

// fs/promisesのモック
jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('YAML Loader Functions', () => {
  // テスト前にモックをリセット
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllCareerIds', () => {
    test('正しくキャリアIDのリストを返す', async () => {
      // fs.readdirのモック
      mockedFs.readdir.mockResolvedValue([
        'ios-engineer.yaml',
        'frontend-developer.yml',
        'backend-engineer.yaml',
        'not-a-yaml-file.txt'
      ] as any);

      const ids = await getAllCareerIds();
      
      // YAMLファイルのみが処理され、拡張子が削除されていることを確認
      expect(ids).toEqual(['ios-engineer', 'frontend-developer', 'backend-engineer']);
      expect(mockedFs.readdir).toHaveBeenCalledTimes(1);
    });

    test('ディレクトリが空の場合は空の配列を返す', async () => {
      mockedFs.readdir.mockResolvedValue([] as any);
      
      const ids = await getAllCareerIds();
      
      expect(ids).toEqual([]);
      expect(mockedFs.readdir).toHaveBeenCalledTimes(1);
    });

    test('エラーが発生した場合は空の配列を返す', async () => {
      mockedFs.readdir.mockRejectedValue(new Error('ディレクトリが見つかりません'));
      
      const ids = await getAllCareerIds();
      
      expect(ids).toEqual([]);
      expect(mockedFs.readdir).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCareerData', () => {
    // 有効なYAMLファイルのモックデータ
    const mockValidYamlContent = `
title: "フロントエンドエンジニア"
last_update: "2025-04-13"
sections:
  - title: "スキル"
    items:
      - key: "プログラミング言語"
        value: ["JavaScript", "TypeScript", "HTML", "CSS"]
        must_have: true
`;

    test('正しくキャリアデータを読み込む（.yaml拡張子）', async () => {
      // fs.accessのモック
      mockedFs.access.mockImplementation(async (path) => {
        if (String(path).endsWith('test-id.yaml')) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('ファイルが見つかりません'));
      });
      
      // fs.readFileのモック
      mockedFs.readFile.mockResolvedValue(mockValidYamlContent as any);
      
      const data = await getCareerData('test-id');
      
      expect(data).toBeDefined();
      expect(data.id).toBe('test-id');
      expect(data.title).toBe('フロントエンドエンジニア');
      expect(data.last_update).toBe('2025-04-13');
      expect(mockedFs.access).toHaveBeenCalledTimes(1);
      expect(mockedFs.readFile).toHaveBeenCalledTimes(1);
    });

    test('正しくキャリアデータを読み込む（.yml拡張子）', async () => {
      // fs.accessのモック
      mockedFs.access.mockImplementation(async (path) => {
        if (String(path).endsWith('test-id.yaml')) {
          return Promise.reject(new Error('ファイルが見つかりません'));
        } else if (String(path).endsWith('test-id.yml')) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('ファイルが見つかりません'));
      });
      
      // fs.readFileのモック
      mockedFs.readFile.mockResolvedValue(mockValidYamlContent as any);
      
      const data = await getCareerData('test-id');
      
      expect(data).toBeDefined();
      expect(data.id).toBe('test-id');
      expect(data.title).toBe('フロントエンドエンジニア');
      expect(data.last_update).toBe('2025-04-13');
      expect(mockedFs.access).toHaveBeenCalledTimes(2); // .yamlと.ymlの両方を試す
      expect(mockedFs.readFile).toHaveBeenCalledTimes(1);
    });

    test('存在しないIDの場合はエラーをスロー', async () => {
      // fs.accessのモック（両方の拡張子でファイルが見つからない）
      mockedFs.access.mockRejectedValue(new Error('ファイルが見つかりません'));
      
      await expect(getCareerData('non-existent-id')).rejects.toThrow(/見つかりません/);
      expect(mockedFs.access).toHaveBeenCalledTimes(2); // .yamlと.ymlの両方を試す
    });

    test('不正な日付フォーマットの場合はエラーをスロー', async () => {
      // fs.accessのモック
      mockedFs.access.mockResolvedValue(undefined as any);
      
      // fs.readFileのモック（不正な日付フォーマット）
      mockedFs.readFile.mockImplementation(async (path) => {
        if (String(path).endsWith('test-id.yaml') || String(path).endsWith('test-id.yml')) {
          return `
title: "フロントエンドエンジニア"
last_update: "2025/04/13" # 不正なフォーマット（YYYY/MM/DD）
sections:
  - title: "スキル"
    items:
      - key: "プログラミング言語"
        value: ["JavaScript", "TypeScript", "HTML", "CSS"]
` as any;
        }
        return '';
      });
      
      await expect(getCareerData('test-id')).rejects.toThrow(/日付のフォーマットが不正です/);
      expect(mockedFs.access).toHaveBeenCalledTimes(1);
      expect(mockedFs.readFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllCareersData', () => {
    test('正しくすべてのキャリアデータを読み込む', async () => {
      // getAllCareerIdsのモック結果
      const mockIds = ['id1', 'id2', 'id3'];
      
      // モックデータ
      const mockCareerData1: CareerData = {
        id: 'id1',
        title: 'キャリア1',
        last_update: '2025-04-01',
        sections: [{ title: 'セクション1', items: [{ key: 'キー1', value: '値1' }] }]
      };
      
      const mockCareerData2: CareerData = {
        id: 'id2',
        title: 'キャリア2',
        last_update: '2025-04-02',
        sections: [{ title: 'セクション2', items: [{ key: 'キー2', value: '値2' }] }]
      };
      
      const mockCareerData3: CareerData = {
        id: 'id3',
        title: 'キャリア3',
        last_update: '2025-04-03',
        sections: [{ title: 'セクション3', items: [{ key: 'キー3', value: '値3' }] }]
      };
      
      // fs.readdirのモック
      mockedFs.readdir.mockResolvedValue(['id1.yaml', 'id2.yaml', 'id3.yaml'] as any);
      
      // fs.accessのモック
      mockedFs.access.mockResolvedValue(undefined as any);
      
      // fs.readFileのモック
      mockedFs.readFile.mockImplementation(async (path) => {
        if (String(path).includes('id1')) {
          return `
title: "キャリア1"
last_update: "2025-04-01"
sections:
  - title: "セクション1"
    items:
      - key: "キー1"
        value: "値1"
` as any;
        } else if (String(path).includes('id2')) {
          return `
title: "キャリア2"
last_update: "2025-04-02"
sections:
  - title: "セクション2"
    items:
      - key: "キー2"
        value: "値2"
` as any;
        } else {
          return `
title: "キャリア3"
last_update: "2025-04-03"
sections:
  - title: "セクション3"
    items:
      - key: "キー3"
        value: "値3"
` as any;
        }
      });
      
      const careers = await getAllCareersData();
      
      expect(careers).toHaveLength(3);
      expect(careers[0].id).toBe('id1');
      expect(careers[1].id).toBe('id2');
      expect(careers[2].id).toBe('id3');
      expect(careers[0].title).toBe('キャリア1');
      expect(careers[1].title).toBe('キャリア2');
      expect(careers[2].title).toBe('キャリア3');
    });

    test('一部のファイルが読み込めない場合は読み込めたファイルのみ返す', async () => {
      // fs.readdirのモック
      mockedFs.readdir.mockResolvedValue(['id1.yaml', 'id2.yaml', 'id3.yaml'] as any);
      
      // fs.accessのモック
      mockedFs.access.mockImplementation(async (path) => {
        if (String(path).includes('id2')) {
          return Promise.reject(new Error('ファイルが見つかりません'));
        }
        return Promise.resolve();
      });
      
      // fs.readFileのモック
      mockedFs.readFile.mockImplementation(async (path) => {
        if (String(path).includes('id1')) {
          return `
title: "キャリア1"
last_update: "2025-04-01"
sections:
  - title: "セクション1"
    items:
      - key: "キー1"
        value: "値1"
` as any;
        } else {
          return `
title: "キャリア3"
last_update: "2025-04-03"
sections:
  - title: "セクション3"
    items:
      - key: "キー3"
        value: "値3"
` as any;
        }
      });
      
      const careers = await getAllCareersData();
      
      expect(careers).toHaveLength(2);
      expect(careers[0].id).toBe('id1');
      expect(careers[1].id).toBe('id3');
    });

    test('すべてのファイルが読み込めない場合は空の配列を返す', async () => {
      // fs.readdirのモック
      mockedFs.readdir.mockResolvedValue(['id1.yaml', 'id2.yaml'] as any);
      
      // fs.accessのモック
      mockedFs.access.mockRejectedValue(new Error('ファイルが見つかりません'));
      
      const careers = await getAllCareersData();
      
      expect(careers).toEqual([]);
    });
  });
});
