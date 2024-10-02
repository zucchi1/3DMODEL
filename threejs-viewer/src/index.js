import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // CSSの読み込み
import App from './App'; // メインのAppコンポーネントをインポート

// ReactのルートDOMに対してAppコンポーネントをレンダリング
const root = ReactDOM.createRoot(document.getElementById('root'));

// Reactアプリケーションをレンダリング
root.render(
  <React.StrictMode>
    <App /> {/* Appコンポーネントをルートとして描画 */}
  </React.StrictMode>
);
