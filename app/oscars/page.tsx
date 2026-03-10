"use client"

const oscarsData = require('../../oscars.json')
import { Category, Option } from "@/types";
import { shareTextToWhatsApp } from "share-text-to-whatsapp";

export default function Home() {
  let predictions = 'Nothing'
  return (
    <main>
      <h1>What are your predicitons for the Oscars</h1>
      <br/>
      {oscarsData.categories.map((category: Category, index: number) => {
        let categoryKey = `${category.name}-${index}`
        return (
          <div key={categoryKey}>
            <h1>{category.name}</h1>
            <br/>
            {category.options.map((option: Option, index: number) => {
              let optionKey = `${category.name}-${option.option}-${index}`
              return (
                <div key={optionKey}>
                  <h2>{option.option}</h2>
                  <h3>{option.details}</h3>
                </div>
              )
            })}
            <br/>
          </div>
        )
      })}

      <button onClick={() => {shareTextToWhatsApp(predictions)}}>
        Share to Whatsapp
      </button>
    </main>
  );
}
