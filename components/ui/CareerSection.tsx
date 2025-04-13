import React from 'react';
import { CareerSection as CareerSectionType } from '@/types/career';
import CareerItem from './CareerItem';

/**
 * キャリアセクションコンポーネント
 * - セクションタイトルを見出し（h2）として表示
 * - セクション内の各項目をリストとして表示
 */
export default function CareerSection({ section }: { section: CareerSectionType }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 border-l-4 border-blue-500 pl-3">
        {section.title}
      </h2>
      <div className="space-y-4">
        {section.items.map((item, index) => (
          <CareerItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
