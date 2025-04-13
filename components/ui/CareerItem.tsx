import React from 'react';
import { CareerItem as CareerItemType } from '@/types/career';

/**
 * 値を表示形式に変換する
 * @param value 変換する値
 * @returns 変換された文字列
 */
export function renderValue(value: string | boolean | number | string[]): string {
  if (typeof value === 'boolean') {
    return value ? '◯' : '✗';
  }
  
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  
  return String(value);
}

/**
 * キャリア項目コンポーネント
 * - キー（項目名）と値を表示
 * - Boolean値の表示: true は ◯（緑色）、false は ✗（赤色）
 * - must_haveフラグがtrueの項目は「必須」ラベルを表示し、項目全体を強調表示
 */
export default function CareerItem({ item }: { item: CareerItemType }) {
  // 値の表示形式を決定
  const renderValueElement = () => {
    const { value } = item;
    
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-green-600 font-bold">◯</span>
      ) : (
        <span className="text-red-600 font-bold">✗</span>
      );
    }
    
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside">
          {value.map((val, i) => (
            <li key={i}>{val}</li>
          ))}
        </ul>
      );
    }
    
    return <span>{value}</span>;
  };
  
  // must_haveフラグがtrueの場合のスタイルを適用
  const itemClassName = `border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
    item.must_have ? 'bg-yellow-50' : ''
  }`;
  
  return (
    <div className={itemClassName}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <h3 className="text-lg font-medium mb-2 sm:mb-0">
          {item.key}
          {item.must_have && (
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
              必須
            </span>
          )}
        </h3>
        <div className="sm:text-right">
          {renderValueElement()}
        </div>
      </div>
    </div>
  );
}
