"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

type Phonetic = {
  text?: string;
  audio?: string;
};

type Definition = {
  definition: string;
  example?: string;
  synonyms?: string[];
};

type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

type DictionaryResponse = {
  word: string;
  phonetics?: Phonetic[];
  meanings: Meaning[];
};

const DictionaryTrainer: React.FC = () => {
  const [inputWord, setInputWord] = useState("");
  const [wordData, setWordData] = useState<DictionaryResponse | null>(null);

  // Таймери
  const [studyTime, setStudyTime] = useState(10); // сек
  const [restTime, setRestTime] = useState(10); // сек
  const [repeatCount, setRepeatCount] = useState(2);

  const [currentMode, setCurrentMode] = useState<"study" | "rest" | null>(null);
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [progress, setProgress] = useState(0);

  // Запит до DictionaryAPI.dev
  const fetchWord = async () => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
      );
      const data = await res.json();
      setWordData(data[0]);
      setCurrentRepeat(0);
      setCurrentMode(null); // таймери не стартують одразу
    } catch (err) {
      console.error("Error fetching word:", err);
    }
  };

  // Запуск таймерів
  const startStudy = () => {
    if (!wordData) return;
    setCurrentRepeat(0);
    setCurrentMode("study");
    setProgress(0);
  };

  // Логіка таймерів + прогрес бар
  useEffect(() => {
    if (!wordData || currentMode === null) return;
    if (currentRepeat >= repeatCount) return;

    const duration = currentMode === "study" ? studyTime : restTime;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(0);
      if (currentMode === "study") {
        setCurrentMode("rest");
      } else {
        setCurrentRepeat((prev) => prev + 1);
        if (currentRepeat + 1 < repeatCount) {
          setCurrentMode("study");
        } else {
          setCurrentMode(null); // завершення циклу
        }
      }
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentMode, currentRepeat, wordData, studyTime, restTime, repeatCount]);

  // Озвучка слова
  const playAudio = () => {
    if (wordData?.phonetics) {
      const audioUrl = wordData.phonetics.find((p) => p.audio)?.audio;
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Інпут + кнопки */}
      <div className={styles.controls}>
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder="Enter a word"
          className={styles.input}
        />
        <button onClick={fetchWord} className={styles.button}>
          Search
        </button>
        <button onClick={startStudy} className={styles.button}>
          Study
        </button>
      </div>

      {/* Поле 1: налаштування таймерів */}
      <div className={styles.settings}>
        <label>
          study
          <input
            type="number"
            min={10}
            max={60}
            value={studyTime}
            onChange={(e) => setStudyTime(Number(e.target.value))}
          />
        </label>
        <label>
          rest
          <input
            type="number"
            min={10}
            max={30}
            value={restTime}
            onChange={(e) => setRestTime(Number(e.target.value))}
          />
        </label>
        <label>
          repeat
          <input
            type="number"
            min={2}
            max={20}
            value={repeatCount}
            onChange={(e) => setRepeatCount(Number(e.target.value))}
          />
        </label>
      </div>
<div className={styles.studyDisplay}>
        {/* Поле 2: показ слова або "rest" */}
      <div className={styles.wordDisplay}>
        {currentMode === "study" && wordData ? wordData.word : currentMode === "rest" ? "-" : ""}

        
      </div>

      {/* Progress bar */}
      {currentMode && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
</div>


      {/* Поле 3: значення, приклади, синоніми, транскрипція + озвучка */}
      <div className={styles.definitions}>
        {wordData && (
          <>
            <h3>
              {wordData.word}{" "}
              {wordData.phonetics?.[0]?.text && (
                <span className={styles.phonetic}>
                  [{wordData.phonetics[0].text}]
                </span>
              )}
              {wordData.phonetics?.some((p) => p.audio) && (
                <button onClick={playAudio} className={styles.audioButton}>
                  🔊 Play
                </button>
              )}
            </h3>
            {wordData.meanings.map((m, i) => (
              <div key={i}>
                <p>
                  <b>{m.partOfSpeech}</b>:{" "}
                  {m.definitions[0]?.definition || "No definition"}
                </p>
                {m.definitions[0]?.example && (
                  <p>
                    <i>Example:</i> {m.definitions[0].example}
                  </p>
                )}
                {m.definitions[0]?.synonyms &&
                  m.definitions[0].synonyms.length > 0 && (
                    <p>
                      <i>Synonyms:</i> {m.definitions[0].synonyms.join(", ")}
                    </p>
                  )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DictionaryTrainer;