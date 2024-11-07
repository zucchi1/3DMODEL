import React, { useState } from 'react';

function TextForm() {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでバックエンドにテキストを送信する処理を追加
    console.log('送信されたテキスト:', text);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        placeholder="100文字以内でテキストを入力してください"
        className="border w-full p-2"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        送信
      </button>
    </form>
  );
}

export default TextForm;
