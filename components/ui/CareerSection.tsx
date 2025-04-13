import React from 'react';
import { CareerSection as CareerSectionType } from '@/types/career';
import CareerItem from './CareerItem';

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
              <CareerItem key={index} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
