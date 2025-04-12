// Jest環境でのみ使用するBabel設定
module.exports = function (api) {
  // テスト環境でのみ適用
  const isTest = api.env('test');
  
  // テスト環境でのみ設定を適用
  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    };
  }
  
  // テスト環境以外では空の設定を返す（Next.jsのデフォルト設定を使用）
  return {};
};
