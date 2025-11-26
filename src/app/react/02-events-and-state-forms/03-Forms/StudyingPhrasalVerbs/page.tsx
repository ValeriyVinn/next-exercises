"use client";

import React, { useState, useEffect } from "react";
import Modal from "../../../01-components-and-collections/02-props-and-children/Modal/Modal";
import css from "./page.module.css";
import phrasalVerbsData from "../../../../../../public/data/phrasal-verbs.json";

export interface PhrasalVerb {
  derivatives?: string[];
  descriptions?: string[];
  examples?: string[];
  frequency?: number;
  synonyms?: string[];
  translations?: {
    [key: string]: {
      [lang: string]: string[];
    };
  };
}
export interface PhrasalVerbsData {
  [key: string]: PhrasalVerb;
}

// type PhrasalVerbsData = Record<string, PhrasalVerb>;

const typedData = phrasalVerbsData as PhrasalVerbsData;

const PhrasalVerbs: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [verbsToLearn, setVerbsToLearn] = useState<string[]>([]);

  useEffect(() => {
    const savedVerbs = JSON.parse(localStorage.getItem("verbsToLearn") || "[]");
    setVerbsToLearn(savedVerbs);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  };

  const openModal = (verb: string) => {
    setSelectedVerb(verb);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVerb(null);
  };

  const addToLearn = () => {
    if (!selectedVerb || verbsToLearn.includes(selectedVerb)) return;

    const updated = [...verbsToLearn, selectedVerb];
    setVerbsToLearn(updated);
    localStorage.setItem("verbsToLearn", JSON.stringify(updated));
    closeModal();
  };

  const removeFromLearn = () => {
    if (!selectedVerb) return;

    const updated = verbsToLearn.filter((verb) => verb !== selectedVerb);
    setVerbsToLearn(updated);
    localStorage.setItem("verbsToLearn", JSON.stringify(updated));
    closeModal();
  };

  const filteredVerbs = Object.keys(typedData).filter((key) =>
    key.toLowerCase().startsWith(filter)
  );

  // універсальний рендерер поля JSON
const renderDefinition = (definition: unknown): React.ReactNode => {
  if (Array.isArray(definition)) {
    return (
      <ul>
        {definition.map((item, index) => (
          <li key={index}>{renderDefinition(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof definition === "object" && definition !== null) {
    return (
      <div style={{ marginLeft: "10px" }}>
        {Object.entries(definition).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {renderDefinition(value)}
          </div>
        ))}
      </div>
    );
  }

  return <span>{String(definition)}</span>;
};


  return (
    <div className={css.article}>
      <div className={css.choose_a_word}>
        <form className={css.form}>
          <label className={css.filter_words}>
            Choose a verb
            <input
              type="text"
              name="filter"
              placeholder="put on spell on verb"
              className={css.input}
              value={filter}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>

      {/* ⭐ PLACE TO LEARN */}
      <div className={css.article}>
        <h2 className={css.pleaceToLearnHeader}>Place to learn</h2>
        {verbsToLearn.length > 0 &&
          verbsToLearn.map((verb) => (
            <button
              key={verb}
              type="button"
              className={css.btn_phrasal_verbs}
              onClick={() => openModal(verb)}
            >
              {verb}
            </button>
          ))}
      </div>

      {/* ⭐ FILTERED VERBS */}
      {filter &&
        filteredVerbs.map((key) => (
          <button
            key={key}
            type="button"
            className={css.btn_phrasal_verbs}
            onClick={() => openModal(key)}
          >
            {key}
          </button>
        ))}

      {/* ⭐ MODAL */}
      {isModalOpen && selectedVerb && (
        <Modal closeModal={closeModal}>
          <h2>{selectedVerb}</h2>

          {/* Add/Remove Button */}
          {verbsToLearn.includes(selectedVerb) ? (
            <button className={css.addToLearnButton} onClick={removeFromLearn}>
              Remove from &quot;Place to learn&quot;
            </button>
          ) : (
            <button className={css.addToLearnButton} onClick={addToLearn}>
              Add to &quot;Place to learn&quot;
            </button>
          )}

          <dl className={css.phrasalVerbsModal}>
            {Object.entries(typedData[selectedVerb]).map(([key, value]) => (
              <React.Fragment key={key}>
                <dt>{key}</dt>
                <dd>{renderDefinition(value)}</dd>
              </React.Fragment>
            ))}
          </dl>
        </Modal>
      )}
    </div>
  );
};

export default PhrasalVerbs;
