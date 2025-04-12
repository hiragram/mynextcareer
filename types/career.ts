/**
 * キャリアデータの型定義
 */

/**
 * キャリアアイテムの型定義
 */
export interface CareerItem {
  key: string;
  value: string | boolean | number | string[];
  must_have?: boolean;
}

/**
 * キャリアセクションの型定義
 */
export interface CareerSection {
  title: string;
  items: CareerItem[];
}

/**
 * 連絡先情報の型定義
 */
export interface CareerContact {
  email?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

/**
 * キャリアデータの型定義
 */
export interface CareerData {
  id: string; // ファイル名から自動生成
  title: string;
  last_update: string; // YYYY-MM-DD形式
  sections: CareerSection[];
  contact?: CareerContact;
}
