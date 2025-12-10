'use client';

import { useState } from 'react';
import { useWriteDiary } from '../hooks/mutation/useWriteDiary';
import {
  button,
  container,
  description,
  input,
  page,
  textarea,
  title,
  titleSection,
} from './WritePage.css';

export default function WritePage() {
  const [titleText, setTitleText] = useState('');
  const [content, setContent] = useState('');

  const {
    mutate: writeDiary,
    isPending,
    isError,
    error,
    isSuccess,
  } = useWriteDiary();

  const handleSubmit = () => {
    if (!titleText.trim() || !content.trim()) return;

    writeDiary(
      { title: titleText.trim(), content: content.trim() },
      {
        onSuccess: () => {
          setTitleText('');
          setContent('');
        },
      },
    );
  };

  return (
    <main className={page}>
      <div className={container}>
        <div className={titleSection}>
          <h1 className={title}>✨ Write Diary</h1>
          <p className={description}>
            일기를 저장하면 2025-12-05와 같이 오늘 날짜 폴더 안에
            제목.md 파일이 생성돼요. <br />
            내용에는 마크다운을 사용할 수 있어요.
          </p>
        </div>

        <input
          className={input}
          type="text"
          placeholder="제목을 입력하세요"
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          disabled={isPending}
        />

        <textarea
          className={textarea}
          placeholder="오늘은 무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          disabled={isPending}
        />

        {isError && <p>{(error as Error).message}</p>}

        {isSuccess && <p>저장 완료! ✨</p>}

        <button
          className={button}
          onClick={handleSubmit}
          disabled={!titleText.trim() || !content.trim() || isPending}
        >
          {isPending ? '저장 중...' : '저장'}
        </button>
      </div>
    </main>
  );
}
