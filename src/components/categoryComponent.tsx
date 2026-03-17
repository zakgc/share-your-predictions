'use client'

import { Category, Option } from '@/src/types';
import { useState } from 'react';
import styles from './categoryComponent.module.css'
import OptionComponent from './optionComponent';

type CategoryComponentProps = {
    categoryData: Category
}

type OptionButtonData = {
    type: 'predicted' | 'voted',
    isSelected: boolean
}

export default function CategoryComponent({ categoryData }: CategoryComponentProps) {
    const [categoryResults, setCategoryResults] = useState({
        category: categoryData.name,
        predicted: '',
        voted: ''
    })

    const handleData = (button: OptionButtonData, data: string) => {
        if (button.isSelected === true) {
            if (button.type === 'predicted') {
                setCategoryResults({
                    category: categoryData.name,
                    predicted: data,
                    voted: categoryResults.voted
                })
            }
    
            if (button.type === 'voted') {
                setCategoryResults({
                    category: categoryData.name,
                    predicted: categoryResults.predicted,
                    voted: data
                })
            }
        } else {
            if (button.type === 'predicted') {
                setCategoryResults({
                    category: categoryData.name,
                    predicted: '',
                    voted: categoryResults.voted
                })
            }
    
            if (button.type === 'voted') {
                setCategoryResults({
                    category: categoryData.name,
                    predicted: categoryResults.predicted,
                    voted: ''
                })
            }
        }
    }
    
    return (
        <div className={styles.categoryBlock}>
            <h1>{categoryData.name}</h1>
            <h2>{JSON.stringify(categoryResults)}</h2>
            {categoryData.options.map((option: Option, optionIndex: number) => {
                return (
                    <OptionComponent
                        key={optionIndex}
                        optionData={option}
                        onSendData={handleData}
                    />
                )
            })}
        </div>
    )
}
