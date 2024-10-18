import React from 'react';
import ToHomeButton from './buttons/ToHomeButton';
import DrawingCanvas from '../features/DrawingCanvas';
import TextForm from '../features/TextForm';

function Correct() {
    
    console.log("Correct is working");

    //imagePath,を引数とする関数①を定義し，実現したい仕様1を別途ファイルでコーディングし，ここでインスタンス化．その際のimagePathは"./drawing/monkeyFalse.png" 
    //Form機能
    
    //HOME画面に戻るボタン
    return(
        <div className="flex flex-col items-center">
        <h1>誤り修正ページ</h1>
  
        {/* 赤ペンと消しゴム機能を持つキャンバス */}
        <DrawingCanvas imagePath="./drawing/monkeyFalse.png" />
  
        {/* フォーム機能 */}
        <TextForm />
  
        {/* HOME画面に戻るボタン */}
        <div className="mt-4">
          <ToHomeButton buttonText="Home画面に戻る" />
        </div>
      </div>
    )
    
}

export default Correct;
    /*
    実現したい仕様
    1 指定された画像に赤ペンで書き込める機能
    1-1 以下の3つのボタンを画像の横につけること
    1-1-1:赤ペンボタン：クリックすれば，画像の上にカーソルが置かれ，ドラッグすれば赤ペンで画像に書き込められる.ボタン再度クリックすれば機能は解除．トグルにして
    1-1-2:消しゴムボタン:赤ペンボタンと同じ要領で赤ペンの内容をドラッグで消せる機能
    1-1-3:DLボタン:赤ペンで書き込まれた画像をDLする機能
    
    2 Form機能
    1-1　100文字程度の日本語が打ち込まれ，バックエンドに渡したい
    
    全体の注意それぞれの機能内でも必要に応じてコンポーネント分割する
    */