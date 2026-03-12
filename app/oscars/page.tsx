"use client"

const oscarsData = require('../../oscars.json')
import { Category, Option, UserPrediction } from "@/types";
import { shareTextToWhatsApp } from "share-text-to-whatsapp";

export default function Home() {
  let userPredicitons: UserPrediction[] = []
  
  oscarsData.categories.forEach((category: Category) => {
    userPredicitons.push({
      category: category.name,
      prediction: ''
    })
  });

  const addPrediction = (categoryName: string, prediction: string) => {
    let predicitonIndex = userPredicitons
      .findIndex((prediction) => prediction.category === categoryName)

    userPredicitons[predicitonIndex] = {
      category: categoryName,
      prediction: prediction
    }
  }

  const formatPredicitions = (): string => {
    let filteredUserPredictions = userPredicitons.filter((prediction) => {
      return prediction.prediction !== ''
    })

    let formattedPredicitions = 'Oscars 2026 Predictions'

    filteredUserPredictions.forEach((prediction) => {
      let predictionText = `\n*${prediction.category}*\n${prediction.prediction}`

      formattedPredicitions += predictionText
    })

    return formattedPredicitions
  }

  const sharePredicitions = () => {
    let text = formatPredicitions()

    shareTextToWhatsApp(text)
  }

  const jumpToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView()
  }

  return (
    <main>
      <h1>What are your predicitons for the Oscars</h1>
      <br/>
      {oscarsData.categories.map((category: Category, categoryIndex: number) => {
        let categoryKey = `${category.name}-${categoryIndex}`
        return (
          <div key={categoryKey}>
            <h1 id={`c${categoryIndex}`}>{category.name}</h1>
            <br/>
            {category.options.map((option: Option, optionIndex: number) => {
              let optionKey = `${category.name}-${option.option}-${optionIndex}`
              let optionId = `${categoryIndex}-${optionIndex}`
              return (
                <div
                  id={optionId}
                  key={optionKey}
                  onClick={() => {
                    addPrediction(category.name, option.option)
                    jumpToCategory(`c${categoryIndex + 1}`)
                  }}
                >
                  <h2>{option.option}</h2>
                  <h3>{option.details}</h3>
                </div>
              )
            })}
            <button
              onClick={() => {
                jumpToCategory(`c${categoryIndex + 1}`)
              }}
            >Skip</button>
            <br/>
          </div>
        )
      })}

      <button onClick={() => {sharePredicitions()}}>
        Share to Whatsapp
      </button>
    </main>
  );
}
