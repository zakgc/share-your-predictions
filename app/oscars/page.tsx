'use client';

const oscarsData = require('../../oscars.json');
import { useState } from 'react';
import { Category, Option, UserPrediction } from '@/types';
import styles from './page.module.css';
import classNames from 'classnames/bind';
import { shareTextToWhatsApp } from 'share-text-to-whatsapp';

const cx = classNames.bind(styles);

type stateObject = {
  [Key: string]: boolean[];
};

const intitialOptionsState = () => {
  let optionsState: stateObject = {};

  oscarsData.categories.forEach((category: Category, categoryIndex: number) => {
    let categoryKey = `c${categoryIndex}`;
    Object.assign(optionsState, {
      [categoryKey]: category.options.map((option) => false),
    });
  });

  return optionsState;
};

export default function Home() {
  const [optionsState, setOptionsState] = useState(intitialOptionsState);
  let userPredicitons: UserPrediction[] = [];

  oscarsData.categories.forEach((category: Category) => {
    userPredicitons.push({
      category: category.name,
      prediction: '',
    });
  });

  const updateOptionState = (categoryIndex: number, optionIndex: number) => {
    let newOptionsState = optionsState;
    let categoryKey = `c${categoryIndex}`;
    newOptionsState[categoryKey] = newOptionsState[categoryKey].map(
      () => false,
    );
    newOptionsState[categoryKey][optionIndex] = true;

    setOptionsState(newOptionsState);
  };

  const addPrediction = (categoryName: string, prediction: string) => {
    let predicitonIndex = userPredicitons.findIndex(
      (prediction) => prediction.category === categoryName,
    );

    userPredicitons[predicitonIndex] = {
      category: categoryName,
      prediction: prediction,
    };
  };

  const formatPredicitions = (): string => {
    let filteredUserPredictions = userPredicitons.filter((prediction) => {
      return prediction.prediction !== '';
    });

    let formattedPredicitions = 'Oscars 2026 Predictions';

    filteredUserPredictions.forEach((prediction) => {
      let predictionText = `\n*${prediction.category}*\n${prediction.prediction}`;

      formattedPredicitions += predictionText;
    });

    return formattedPredicitions;
  };

  const sharePredicitions = () => {
    let text = formatPredicitions();

    shareTextToWhatsApp(text);
  };

  const jumpToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <main>
      <h1>What are your predicitons for the Oscars</h1>
      <br />
      {oscarsData.categories.map(
        (category: Category, categoryIndex: number) => {
          let categoryKey = `${category.name}-${categoryIndex}`;
          return (
            <div className={styles.categoryBox} key={categoryKey}>
              <h1 id={`c${categoryIndex}`}>{category.name}</h1>
              <br />
              {category.options.map((option: Option, optionIndex: number) => {
                let optionKey = `${category.name}-${option.option}-${optionIndex}`;
                let optionId = `${categoryIndex}-${optionIndex}`;

                let optionClassName = cx({
                  option: true,
                  selected: optionsState[`c${categoryIndex}`][optionIndex],
                });
                return (
                  <div
                    id={optionId}
                    key={optionKey}
                    className={optionClassName}
                    onClick={() => {
                      addPrediction(category.name, option.option);
                      updateOptionState(categoryIndex, optionIndex);
                      jumpToCategory(`c${categoryIndex + 1}`);
                    }}
                  >
                    <h2>{option.option}</h2>
                    <h3>{option.details}</h3>
                  </div>
                );
              })}
              <button
                onClick={() => {
                  jumpToCategory(`c${categoryIndex + 1}`);
                }}
              >
                Skip
              </button>
              <br />
            </div>
          );
        },
      )}

      <button
        className={styles.shareButton}
        onClick={() => {
          sharePredicitions();
        }}
      >
        Share to Whatsapp
      </button>
    </main>
  );
}
