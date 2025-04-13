import path from 'path';
import { loadYamlFile } from '../utils/yaml';

// テスト用ファイルのパス
const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const VALID_YAML_PATH = path.join(FIXTURES_DIR, 'valid-career.yaml');
const INVALID_YAML_SYNTAX_PATH = path.join(FIXTURES_DIR, 'invalid-yaml-syntax.yaml');
const INVALID_MISSING_REQUIRED_PATH = path.join(FIXTURES_DIR, 'invalid-career-missing-required.yaml');
const NON_EXISTENT_PATH = path.join(FIXTURES_DIR, 'non-existent.yaml');
const INVALID_VALUE_TYPE_PATH = path.join(FIXTURES_DIR, 'invalid-value-type.yaml');

describe('YAML Utility Functions', () => {
  describe('loadYamlFile', () => {
    // 有効なYAMLファイルが正しく読み込まれることを確認
    test('正しいYAMLファイルを読み込んでCareerData型に変換できる', async () => {
      const data = await loadYamlFile(VALID_YAML_PATH);
      
      // ファイル名からIDが正しく生成されていることを確認
      expect(data.id).toBe('valid-career');
      
      // 基本的なフィールドが正しく読み込まれていることを確認
      expect(data.title).toBe('フロントエンドエンジニア');
      expect(data.last_update).toBe('2025-04-13');
      
      // セクションが正しく読み込まれていることを確認
      expect(data.sections).toHaveLength(2);
      expect(data.sections[0].title).toBe('スキル');
      expect(data.sections[0].items).toHaveLength(3);
      
      // boolean型の値が正しく読み込まれていることを確認
      expect(data.sections[0].items[0].key).toBe('JavaScriptを使用している');
      expect(typeof data.sections[0].items[0].value).toBe('boolean');
      expect(data.sections[0].items[0].value).toBe(true);
      expect(data.sections[0].items[0].must_have).toBe(true);
      
      expect(data.sections[0].items[1].key).toBe('TypeScriptを使用している');
      expect(typeof data.sections[0].items[1].value).toBe('boolean');
      expect(data.sections[0].items[1].value).toBe(true);
      
      expect(data.sections[1].items[0].key).toBe('経験年数が5年以上ある');
      expect(typeof data.sections[1].items[0].value).toBe('boolean');
      expect(data.sections[1].items[0].value).toBe(false);
      
      // 連絡先情報が正しく読み込まれていることを確認
      expect(data.contact).toBeDefined();
      expect(data.contact?.email).toBe('example@example.com');
      expect(data.contact?.github).toBe('example');
    });
    
    // valueフィールドがboolean型以外の場合のバリデーションをテスト
    test('valueフィールドがboolean型以外の場合にエラーになる', async () => {
      await expect(loadYamlFile(INVALID_VALUE_TYPE_PATH)).rejects.toThrow(/value はboolean型である必要があります/);
    });
    
    // 不正なYAML構文のファイルに対するエラーハンドリングをテスト
    test('不正なYAML構文のファイルを読み込むとエラーになる', async () => {
      await expect(loadYamlFile(INVALID_YAML_SYNTAX_PATH)).rejects.toThrow();
    });
    
    // 必須フィールドが欠けている場合のバリデーションをテスト
    test('必須フィールドが欠けているYAMLファイルを読み込むとエラーになる', async () => {
      await expect(loadYamlFile(INVALID_MISSING_REQUIRED_PATH)).rejects.toThrow(/必須フィールド 'title' が見つかりません/);
    });
    
    // 存在しないファイルに対するエラーハンドリングをテスト
    test('存在しないファイルを読み込むとエラーになる', async () => {
      await expect(loadYamlFile(NON_EXISTENT_PATH)).rejects.toThrow();
    });
  });
});
