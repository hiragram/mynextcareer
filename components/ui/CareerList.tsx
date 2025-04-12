'use client';

import React from 'react';
import Link from 'next/link';
import { CareerData } from '@/types/career';

interface CareerListProps {
  careers: CareerData[];
}

/**
 * キャリアリストコンポーネント
 * @param careers キャリアデータの配列
 */
export default function CareerList({ careers }: CareerListProps) {
  /**
   * 日付を「YYYY年MM月DD日」の形式に変換する
   * @param dateString YYYY-MM-DD形式の日付文字列
   * @returns YYYY年MM月DD日形式の日付文字列
   */
  const formatDate = (dateString: string): string => {
    try {
      const [year, month, day] = dateString.split('-');
      return `${year}年${month}月${day}日`;
    } catch (error) {
      console.error('日付の変換に失敗しました:', error);
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {careers.map((career) => (
        <Link 
          href={`/careers/${career.id}`} 
          key={career.id}
          className="block"
          data-testid={`career-card-${career.id}`}
        >
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 p-6 h-full">
            <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
            <p className="text-gray-600 text-sm mb-4">最終更新: {formatDate(career.last_update)}</p>
            
            <div className="space-y-2">
              {career.sections.map((section, index) => (
                <div key={index} className="text-sm text-gray-500">
                  {section.title}
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
