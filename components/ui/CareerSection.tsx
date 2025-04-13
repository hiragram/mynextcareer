import React from 'react';
import { CareerSection as CareerSectionType, CareerItem as CareerItemType } from '@/types/career';

/**
 * 値を表示形式に変換する
 * @param value 変換する値
 * @returns 変換された文字列または要素
 */
export function renderValue(value: boolean): React.ReactNode {
  return value ? (
    <span className="text-green-600 font-bold">◯</span>
  ) : (
    <span className="text-red-600 font-bold">✗</span>
  );
}

/**
 * キャリアセクションコンポーネント
 * - セクションタイトルを見出し（h2）として表示
 * - セクション内の各項目をテーブルとして表示
 */
export default function CareerSection({ section }: { section: CareerSectionType }) {
  return (
    <div className="border-t border-gray-200 pt-6 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="w-1 h-6 bg-indigo-500 mr-3"></span>
        {section.title}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-gray-700 font-medium">項目</th>
              <th className="py-3 px-4 text-right text-gray-700 font-medium">内容</th>
            </tr>
          </thead>
          <tbody>
            {section.items.map((item, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <span className="text-gray-800 font-medium">{item.key}</span>
                    {item.must_have && (
                      <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        必須
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  {renderValue(item.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
