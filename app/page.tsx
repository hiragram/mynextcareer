import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">マイネクストキャリア</h1>
          <p className="mt-2 text-gray-600 text-center md:text-left">エンジニアが次の職場に求める条件を掲載できるサイト</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12">
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">サイトについて</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="mb-4">
              「マイネクストキャリア」は、エンジニアが次のキャリアに求める条件を明確にし、共有するためのプラットフォームです。
              自分の希望条件を整理して公開することで、条件にマッチする企業とのミスマッチを減らし、
              より良いキャリア選択をサポートします。
            </p>
            <p>
              技術スタック、勤務形態、報酬など、あなたが重視する条件を明確にして、
              理想的な次のキャリアへの一歩を踏み出しましょう。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">キャリア一覧</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-500 italic">
              ※ キャリア一覧は今後のタスクで実装予定です
            </p>
            {/* キャリアリスト表示領域（タスク6で実装） */}
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} マイネクストキャリア</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white mr-4">プライバシーポリシー</a>
              <a href="#" className="text-gray-300 hover:text-white">お問い合わせ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
