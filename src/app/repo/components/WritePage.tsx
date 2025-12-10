'use client';

import { useState } from 'react';
import {
  button,
  container,
  input,
  page,
  textarea,
  title,
} from './WritePage.css';

export default function WritePage() {
  const [titleText, setTitleText] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!titleText.trim() || !content.trim()) return;
  };

  return (
    <main className={page}>
      <div className={container}>
        <h1 className={title}>새 기록 작성</h1>

        <input
          className={input}
          type="text"
          placeholder="제목을 입력하세요"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
        />

        <textarea
          className={textarea}
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
        />

        <button
          className={button}
          onClick={handleSubmit}
          disabled={!titleText.trim() || !content.trim()}
        >
          저장
        </button>
      </div>
    </main>
  );
}
