import React from 'react';
import { notFound } from 'next/navigation';
import { getCareerById, getAllCareers } from '@/lib/yaml/careers';
import { CareerData } from '@/types/career';
import { Metadata } from 'next';

/**
 * 静的ページ生成のためのパラメータを生成する
 * @returns 静的ページ生成のためのパラメータ
 */
export async function generateStaticParams() {
  const careers = await getAllCareers();
  
  return careers.map((career) => ({
    id: career.id,
  }));
}

/**
 * ページのメタデータを生成する
 * @param params ページのパラメータ
 * @returns ページのメタデータ
 */
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = params;
  const career = await getCareerById(id);
  
  if (!career) {
    return {
      title: 'キャリアが見つかりません',
    };
  }
  
  return {
    title: career.title,
    description: `${career.title}のキャリア情報`,
  };
}

/**
 * キャリアページコンポーネント
 */
export default async function CareerPage({ params }: any) {
  const { id } = params;
  
  let career: CareerData | null;
  
  try {
    career = await getCareerById(id);
  } catch (error) {
    console.error(`Error loading career with id ${id}:`, error);
    return notFound();
  }
  
  if (!career) {
    return notFound();
  }

  // 日付をYYYY年MM月DD日に変換
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${year}年${month}月${day}日`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <a 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          戻る
        </a>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{career.title}</h1>
        <p className="text-gray-600">最終更新: {formatDate(career.last_update)}</p>
      </div>
      
      {career.sections.map((section, sectionIndex: number) => (
        <div key={sectionIndex} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 md:mb-6">{section.title}</h2>
          <div className="space-y-4 md:space-y-6">
            {section.items.map((item, itemIndex: number) => (
              <div key={itemIndex} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">
                    {item.key}
                    {item.must_have && <span className="text-red-500 ml-2">*</span>}
                  </h3>
                  <div className="text-right">
                    {typeof item.value === 'boolean' ? (
                      item.value ? '✅' : '❌'
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {career.contact && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">連絡先</h2>
          {career.contact.email && (
            <p>Email: <a href={`mailto:${career.contact.email}`} className="text-blue-600 hover:underline">
              {career.contact.email}
            </a></p>
          )}
        </div>
      )}
    </div>
  );
}
