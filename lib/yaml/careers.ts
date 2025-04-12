import fs from 'fs/promises';
import path from 'path';
import { loadYamlFile } from '@/utils/yaml';
import { CareerData } from '@/types/career';

const CAREERS_DIR = path.join(process.cwd(), 'data', 'careers');

/**
 * すべてのキャリアデータを取得する
 * @returns CareerDataの配列
 */
export async function getAllCareers(): Promise<CareerData[]> {
  try {
    // data/careersディレクトリ内のすべてのYAMLファイルを取得
    const files = await fs.readdir(CAREERS_DIR);
    const yamlFiles = files.filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
    
    // 各ファイルを読み込んでCareerDataの配列に変換
    const careersPromises = yamlFiles.map(async (file) => {
      const filePath = path.join(CAREERS_DIR, file);
      try {
        return await loadYamlFile(filePath);
      } catch (error) {
        console.error(`Error loading career file ${file}:`, error);
        return null;
      }
    });
    
    // nullでない結果のみをフィルタリング
    const careers = (await Promise.all(careersPromises)).filter((career): career is CareerData => career !== null);
    
    return careers;
  } catch (error) {
    console.error('Error loading careers:', error);
    return [];
  }
}

/**
 * IDに基づいてキャリアデータを取得する
 * @param id キャリアID（ファイル名）
 * @returns CareerDataオブジェクト、見つからない場合はnull
 */
export async function getCareerById(id: string): Promise<CareerData | null> {
  try {
    // ファイルパスを構築
    const filePath = path.join(CAREERS_DIR, `${id}.yaml`);
    
    // ファイルが存在するか確認
    try {
      await fs.access(filePath);
    } catch {
      // .ymlの拡張子も試す
      const ymlPath = path.join(CAREERS_DIR, `${id}.yml`);
      try {
        await fs.access(ymlPath);
        return await loadYamlFile(ymlPath);
      } catch {
        return null; // どちらの拡張子のファイルも見つからない
      }
    }
    
    // ファイルを読み込む
    return await loadYamlFile(filePath);
  } catch (error) {
    console.error(`Error loading career with id ${id}:`, error);
    return null;
  }
}
