import path from 'path';
import fs from 'fs/promises';
import { loadYamlFile } from '../utils/yaml';
import { getCareerById, getAllCareers } from '../lib/yaml/careers';

// プロジェクトのルートディレクトリ
const ROOT_DIR = path.resolve(__dirname, '..');

describe('サンプルデータのテスト', () => {
  // サンプルYAMLファイルが存在することを確認
  test('サンプルYAMLファイルが存在する', async () => {
    const files = [
      'data/careers/ios-engineer.yaml',
      'data/careers/frontend-engineer.yaml',
      'data/careers/backend-engineer.yaml'
    ];
    
    for (const file of files) {
      const filePath = path.join(ROOT_DIR, file);
      try {
        const stat = await fs.stat(filePath);
        expect(stat.isFile()).toBe(true);
      } catch (error) {
        throw new Error(`ファイルが存在しません: ${file}`);
      }
    }
  });
  
  // iOSエンジニアのYAMLファイルが正しく読み込めることを確認
  test('iOSエンジニアのYAMLファイルが正しく読み込める', async () => {
    const filePath = path.join(ROOT_DIR, 'data/careers/ios-engineer.yaml');
    const data = await loadYamlFile(filePath);
    
    // 基本的なフィールドが正しく読み込まれていることを確認
    expect(data.id).toBe('ios-engineer');
    expect(data.title).toBe('iOSアプリエンジニア');
    expect(data.last_update).toBe('2025-04-13');
    
    // セクションが正しく読み込まれていることを確認
    expect(data.sections).toHaveLength(3);
    expect(data.sections[0].title).toBe('技術について');
    
    // 必須項目が正しく設定されていることを確認
    expect(data.sections[0].items[0].key).toBe('Objective-Cを使用していない');
    expect(data.sections[0].items[0].value).toBe(true);
    expect(data.sections[0].items[0].must_have).toBe(true);
    
    // 連絡先情報が正しく読み込まれていることを確認
    expect(data.contact).toBeDefined();
    expect(data.contact?.email).toBe('yamada@example.com');
  });
  
  // フロントエンドエンジニアのYAMLファイルが正しく読み込めることを確認
  test('フロントエンドエンジニアのYAMLファイルが正しく読み込める', async () => {
    const filePath = path.join(ROOT_DIR, 'data/careers/frontend-engineer.yaml');
    const data = await loadYamlFile(filePath);
    
    // 基本的なフィールドが正しく読み込まれていることを確認
    expect(data.id).toBe('frontend-engineer');
    expect(data.title).toBe('フロントエンドエンジニア');
    expect(data.last_update).toBe('2025-04-13');
    
    // セクションが正しく読み込まれていることを確認
    expect(data.sections).toHaveLength(3);
    expect(data.sections[0].title).toBe('技術について');
    
    // 必須項目が正しく設定されていることを確認
    expect(data.sections[0].items[0].key).toBe('Reactを使用している');
    expect(data.sections[0].items[0].value).toBe(true);
    expect(data.sections[0].items[0].must_have).toBe(true);
    
    // 連絡先情報が正しく読み込まれていることを確認
    expect(data.contact).toBeDefined();
    expect(data.contact?.email).toBe('tanaka@example.com');
    expect(data.contact?.github).toBe('tanaka-frontend');
  });
  
  // バックエンドエンジニアのYAMLファイルが正しく読み込めることを確認
  test('バックエンドエンジニアのYAMLファイルが正しく読み込める', async () => {
    const filePath = path.join(ROOT_DIR, 'data/careers/backend-engineer.yaml');
    const data = await loadYamlFile(filePath);
    
    // 基本的なフィールドが正しく読み込まれていることを確認
    expect(data.id).toBe('backend-engineer');
    expect(data.title).toBe('バックエンドエンジニア');
    expect(data.last_update).toBe('2025-04-13');
    
    // セクションが正しく読み込まれていることを確認
    expect(data.sections).toHaveLength(3);
    expect(data.sections[0].title).toBe('技術について');
    
    // 必須項目が正しく設定されていることを確認
    expect(data.sections[0].items[1].key).toBe('マイクロサービスアーキテクチャを採用している');
    expect(data.sections[0].items[1].value).toBe(true);
    expect(data.sections[0].items[1].must_have).toBe(true);
    
    // 連絡先情報が正しく読み込まれていることを確認
    expect(data.contact).toBeDefined();
    expect(data.contact?.email).toBe('suzuki@example.com');
    expect(data.contact?.twitter).toBe('suzuki_backend');
    expect(data.contact?.github).toBe('suzuki-dev');
  });
  
  // 実際のデータディレクトリからすべてのキャリアIDが取得できることを確認
  test('実際のデータディレクトリからすべてのキャリアIDが取得できる', async () => {
    // 実際のデータディレクトリ内のファイルを直接確認
    const files = await fs.readdir(path.join(ROOT_DIR, 'data/careers'));
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    const ids = yamlFiles.map(file => path.basename(file, path.extname(file)));
    
    // 3つのIDが取得できることを確認
    expect(ids).toContain('ios-engineer');
    expect(ids).toContain('frontend-engineer');
    expect(ids).toContain('backend-engineer');
  });
  
  // getCareerById関数で各キャリアデータが取得できることを確認
  test('getCareerById関数で各キャリアデータが取得できる', async () => {
    const iosEngineer = await getCareerById('ios-engineer');
    const frontendEngineer = await getCareerById('frontend-engineer');
    const backendEngineer = await getCareerById('backend-engineer');
    
    // 各キャリアデータが正しく取得できることを確認
    expect(iosEngineer).not.toBeNull();
    expect(frontendEngineer).not.toBeNull();
    expect(backendEngineer).not.toBeNull();
    
    if (iosEngineer) {
      expect(iosEngineer.title).toBe('iOSアプリエンジニア');
    }
    
    if (frontendEngineer) {
      expect(frontendEngineer.title).toBe('フロントエンドエンジニア');
    }
    
    if (backendEngineer) {
      expect(backendEngineer.title).toBe('バックエンドエンジニア');
    }
  });
  
  // getAllCareers関数ですべてのキャリアデータが取得できることを確認
  test('getAllCareers関数ですべてのキャリアデータが取得できる', async () => {
    const careers = await getAllCareers();
    
    // 少なくとも3つのキャリアデータが取得できることを確認
    expect(careers.length).toBeGreaterThanOrEqual(3);
    
    // 各キャリアデータが含まれていることを確認
    const titles = careers.map(career => career.title);
    expect(titles).toContain('iOSアプリエンジニア');
    expect(titles).toContain('フロントエンドエンジニア');
    expect(titles).toContain('バックエンドエンジニア');
  });
});
