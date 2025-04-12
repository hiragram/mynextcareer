import fs from 'fs/promises';
import path from 'path';
import { loadYamlFile } from '../utils/yaml';
import { getCareerById } from '../lib/yaml/careers';

// プロジェクトのルートディレクトリ
const ROOT_DIR = path.resolve(__dirname, '..');

describe('ディレクトリ構造のテスト', () => {
  // 必要なディレクトリが存在することを確認
  test('必要なディレクトリが存在する', async () => {
    const directories = [
      'data/careers',
      'app/careers/[id]',
      'components/ui',
      'components/layout',
      'lib/yaml',
      'types',
      '__tests__'
    ];
    
    for (const dir of directories) {
      const dirPath = path.join(ROOT_DIR, dir);
      try {
        const stat = await fs.stat(dirPath);
        expect(stat.isDirectory()).toBe(true);
      } catch (error) {
        fail(`ディレクトリが存在しません: ${dir}`);
      }
    }
  });
  
  // 必要なファイルが存在することを確認
  test('必要なファイルが存在する', async () => {
    const files = [
      'app/careers/[id]/page.tsx',
      'data/careers/ios-engineer.yaml',
      'lib/yaml/careers.ts',
      'types/career.ts'
    ];
    
    for (const file of files) {
      const filePath = path.join(ROOT_DIR, file);
      try {
        const stat = await fs.stat(filePath);
        expect(stat.isFile()).toBe(true);
      } catch (error) {
        fail(`ファイルが存在しません: ${file}`);
      }
    }
  });
  
  // サンプルYAMLファイルが正しく読み込めることを確認
  test('サンプルYAMLファイルが正しく読み込める', async () => {
    const filePath = path.join(ROOT_DIR, 'data/careers/ios-engineer.yaml');
    const data = await loadYamlFile(filePath);
    
    // 基本的なフィールドが正しく読み込まれていることを確認
    expect(data.id).toBe('ios-engineer');
    expect(data.title).toBe('iOSアプリエンジニア');
    expect(data.last_update).toBe('2025-04-13');
    
    // セクションが正しく読み込まれていることを確認
    expect(data.sections).toHaveLength(3);
    expect(data.sections[0].title).toBe('技術について');
    expect(data.sections[0].items).toHaveLength(4);
    
    // 必須項目が正しく設定されていることを確認
    expect(data.sections[0].items[0].key).toBe('Objective-Cがない');
    expect(data.sections[0].items[0].value).toBe(true);
    expect(data.sections[0].items[0].must_have).toBe(true);
    
    // 連絡先情報が正しく読み込まれていることを確認
    expect(data.contact).toBeDefined();
    expect(data.contact?.email).toBe('yamada@example.com');
  });
  
  // getCareerById関数でサンプルYAMLファイルが取得できることを確認
  test('getCareerById関数でサンプルYAMLファイルが取得できる', async () => {
    const career = await getCareerById('ios-engineer');
    
    // ファイルが正しく取得できることを確認
    expect(career).not.toBeNull();
    if (career) {
      expect(career.id).toBe('ios-engineer');
      expect(career.title).toBe('iOSアプリエンジニア');
      
      // セクション数を確認
      expect(career.sections).toHaveLength(3);
      
      // 各セクションのタイトルを確認
      const sectionTitles = career.sections.map(section => section.title);
      expect(sectionTitles).toEqual(['技術について', '組織について', '会社/事業について']);
    }
  });
});
