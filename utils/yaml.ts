import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { CareerData } from '../types/career';

/**
 * YAMLファイルを読み込み、CareerData型に変換する
 * @param filePath YAMLファイルのパス
 * @returns CareerDataオブジェクト
 * @throws エラー（ファイルが存在しない、YAMLの形式が不正、必須フィールドが欠けている場合など）
 */
export async function loadYamlFile(filePath: string): Promise<CareerData> {
  try {
    // ファイルを読み込む
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // YAMLをパースする
    const data = yaml.load(fileContent) as Record<string, any>;
    
    // 必須フィールドの検証
    validateRequiredFields(data);
    
    // ファイル名からIDを生成
    const id = path.basename(filePath, path.extname(filePath));
    
    // CareerData型に変換して返す
    return {
      id,
      title: data.title,
      last_update: data.last_update,
      sections: data.sections.map((section: any) => ({
        title: section.title,
        items: section.items.map((item: any) => ({
          key: item.key,
          value: item.value,
          must_have: item.must_have
        }))
      })),
      contact: data.contact
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`YAMLファイルの読み込みに失敗しました: ${error.message}`);
    }
    throw error;
  }
}

/**
 * 必須フィールドが存在するか検証する
 * @param data パースされたYAMLデータ
 * @throws 必須フィールドが欠けている場合にエラーをスロー
 */
function validateRequiredFields(data: Record<string, any>): void {
  // 必須フィールドのリスト
  const requiredFields = ['title', 'last_update', 'sections'];
  
  // 必須フィールドの存在チェック
  for (const field of requiredFields) {
    if (data[field] === undefined) {
      throw new Error(`必須フィールド '${field}' が見つかりません`);
    }
  }
  
  // sectionsの各要素に必須フィールドがあるか検証
  if (!Array.isArray(data.sections)) {
    throw new Error('sections フィールドは配列である必要があります');
  }
  
  data.sections.forEach((section: any, index: number) => {
    if (!section.title) {
      throw new Error(`sections[${index}] に title フィールドがありません`);
    }
    
    if (!Array.isArray(section.items)) {
      throw new Error(`sections[${index}].items フィールドは配列である必要があります`);
    }
    
    section.items.forEach((item: any, itemIndex: number) => {
      if (!item.key) {
        throw new Error(`sections[${index}].items[${itemIndex}] に key フィールドがありません`);
      }
      
      if (item.value === undefined) {
        throw new Error(`sections[${index}].items[${itemIndex}] に value フィールドがありません`);
      }
    });
  });
}
