import fs from 'fs/promises';
import path from 'path';
import { loadYamlFile } from '@/utils/yaml';
import { CareerData } from '@/types/career';

const CAREERS_DIR = path.join(process.cwd(), 'data', 'careers');

// テスト環境かどうかを判定
const isTestEnvironment = process.env.NODE_ENV === 'test';

/**
 * /data/careers/ディレクトリ内のすべてのYAMLファイル名（拡張子なし）を取得
 * @returns ファイル名（拡張子なし）の配列
 */
export async function getAllCareerIds(): Promise<string[]> {
  try {
    // data/careersディレクトリ内のすべてのYAMLファイルを取得
    const files = await fs.readdir(CAREERS_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    // 拡張子を除いたファイル名を返す
    return yamlFiles.map(file => path.basename(file, path.extname(file)));
  } catch (error) {
    // テスト環境ではエラーログを出力しない
    if (!isTestEnvironment) {
      console.error('キャリアIDの取得に失敗しました:', error);
    }
    return [];
  }
}

/**
 * 指定されたIDのYAMLファイルを読み込み、CareerData型に変換
 * @param id キャリアID（ファイル名、拡張子なし）
 * @returns CareerDataオブジェクト
 * @throws エラー（ファイルが存在しない、YAMLの形式が不正、必須フィールドが欠けている場合など）
 */
export async function getCareerData(id: string): Promise<CareerData> {
  // ファイルパスを構築
  const yamlPath = path.join(CAREERS_DIR, `${id}.yaml`);
  const ymlPath = path.join(CAREERS_DIR, `${id}.yml`);
  
  let data: CareerData | null = null;
  let fileExists = false;
  
  // .yamlファイルが存在するか確認
  try {
    await fs.access(yamlPath);
    fileExists = true;
    data = await loadYamlFile(yamlPath);
  } catch (error) {
    // .yamlが見つからない場合は.ymlを試す
    try {
      await fs.access(ymlPath);
      fileExists = true;
      data = await loadYamlFile(ymlPath);
    } catch {
      // どちらのファイルも見つからない場合
      throw new Error(`キャリアID '${id}' に対応するYAMLファイルが見つかりません`);
    }
  }
  
  // データが読み込めた場合は日付のフォーマットを検証
  if (data) {
    validateDateFormat(data.last_update);
    return data;
  }
  
  // ここには到達しないはずだが、TypeScriptのために追加
  throw new Error(`キャリアデータの読み込みに失敗しました`);
}

/**
 * すべてのYAMLファイルを読み込み、CareerData型の配列に変換
 * @returns CareerDataの配列
 */
export async function getAllCareersData(): Promise<CareerData[]> {
  try {
    // すべてのキャリアIDを取得
    const ids = await getAllCareerIds();
    
    // 各IDに対応するキャリアデータを取得
    const careersPromises = ids.map(async (id) => {
      try {
        return await getCareerData(id);
      } catch (error) {
        // テスト環境ではエラーログを出力しない
        if (!isTestEnvironment) {
          console.error(`キャリアID '${id}' のデータ読み込みに失敗しました:`, error);
        }
        return null;
      }
    });
    
    // nullでない結果のみをフィルタリング
    const careers = (await Promise.all(careersPromises)).filter((career): career is CareerData => career !== null);
    
    return careers;
  } catch (error) {
    // テスト環境ではエラーログを出力しない
    if (!isTestEnvironment) {
      console.error('すべてのキャリアデータの読み込みに失敗しました:', error);
    }
    return [];
  }
}

/**
 * 日付のフォーマットを検証（YYYY-MM-DD形式であることを確認）
 * @param dateString 検証する日付文字列
 * @throws 日付のフォーマットが不正な場合にエラーをスロー
 */
function validateDateFormat(dateString: string): void {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!dateRegex.test(dateString)) {
    throw new Error(`日付のフォーマットが不正です: '${dateString}' はYYYY-MM-DD形式である必要があります`);
  }
  
  // 日付として有効かどうかを確認
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`無効な日付です: '${dateString}'`);
  }
}
