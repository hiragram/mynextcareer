import React from 'react';
import { notFound } from 'next/navigation';
import { getCareerById, getAllCareers } from '@/lib/yaml/careers';
import { CareerData } from '@/types/career';
import { Metadata } from 'next';
import Link from 'next/link';
import CareerSection from '@/components/ui/CareerSection';

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
      {career.contact && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">連絡先</h2>
          <div className="space-y-2">
            {career.contact.email && (
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${career.contact.email}`} className="text-blue-600 hover:underline">
                  {career.contact.email}
                </a>
              </p>
            )}
            {career.contact.twitter && (
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <a href={`https://twitter.com/${career.contact.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  @{career.contact.twitter}
                </a>
              </p>
            )}
            {career.contact.linkedin && (
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href={`https://www.linkedin.com/in/${career.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </p>
            )}
            {career.contact.github && (
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <a href={`https://github.com/${career.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
