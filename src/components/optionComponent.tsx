'use client'

import { Option } from '@/src/types';
import { useState } from 'react';
import styles from './optionComponent.module.css'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type OptionButtonData = {
    type: 'predicted' | 'voted',
    isSelected: boolean
}

type OptionComponentProps = {
    optionData: Option,
    onSendData: (button: OptionButtonData, data: string) => void
}

export default function OptionComponent({ optionData, onSendData }: OptionComponentProps) {
    const [isPredicted, setIsPredicted] = useState(false)
    const [isVoted, setIsVoted] = useState(false)

    const togglePredicted = () => {
        setIsPredicted(!isPredicted)
    }

    const toggleVoted = () => {
        setIsVoted(!isVoted)
    }

    let predictButtonClassName = cx({
        optionButton: true,
        isPredicted: isPredicted
    })

    let voteButtonClassName = cx({
        optionButton: true,
        isVoted: isVoted
    })

    const handlePredicted = () => {
        togglePredicted()
        onSendData({
            type: 'predicted',
            isSelected: !isPredicted
        }, optionData.option)
    }

    const handleVoted = () => {
        toggleVoted()
        onSendData({
            type: 'voted',
            isSelected: !isVoted
        }, optionData.option)
    }

    return (
        <div className={styles.optionBlock}>
            <div>
                <h2>{optionData.option}</h2>
                <h3>{optionData.details}</h3>
            </div>
            <div>
                <button className={predictButtonClassName} onClick={handlePredicted}>Predict</button>
                <button className={voteButtonClassName} onClick={handleVoted}>Vote</button>
            </div>
        </div>
    )
}