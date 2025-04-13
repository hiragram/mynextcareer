import React from 'react';
import { notFound } from 'next/navigation';
import { getCareerById, getAllCareers } from '@/lib/yaml/careers';
import { CareerData } from '@/types/career';
import { Metadata } from 'next';
import Link from 'next/link';
import CareerSection from '@/components/ui/CareerSection';
import ContactInfo from '@/components/ui/ContactInfo';

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
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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
 * 日付を「YYYY年MM月DD日」の形式に変換する
 * @param dateString YYYY-MM-DD形式の日付文字列
 * @returns YYYY年MM月DD日形式の日付文字列
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${year}年${month}月${day}日`;
}

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

/**
 * キャリアページコンポーネント
 */
export default async function CareerPage({ params, searchParams }: PageProps) {
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
      {/* 戻るボタン */}
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          トップページに戻る
        </Link>
      </div>
      
      {/* ヘッダー */}
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{career.title}</h1>
        <p className="text-gray-600">最終更新: {formatDate(career.last_update)}</p>
      </header>
      
      {/* メインコンテンツ */}
      <main>
        {career.sections.map((section, sectionIndex: number) => (
          <CareerSection key={sectionIndex} section={section} />
        ))}
      </main>
      
      {/* 連絡先情報 */}
      <ContactInfo contact={career.contact} />
    </div>
  );
}
