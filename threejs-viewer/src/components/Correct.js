import React from 'react';
import ToHomeButton from './buttons/ToHomeButton';
import MainCanvas from './canvas/MainCanvas';
import TextForm from './canvas/TextForm';

function Correct() {
  return (
    <div className="flex flex-col items-center">
      <h1>誤り修正ページ</h1>
      <MainCanvas imagePath="./drawing/monkeyFalse.png" />
      <TextForm />
      <div className="mt-4">
        <ToHomeButton buttonText="Home画面に戻る" />
      </div>
    </div>
  );
}

export default Correct;
