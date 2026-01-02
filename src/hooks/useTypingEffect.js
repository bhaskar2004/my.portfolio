import { useState, useEffect } from 'react'

const useTypingEffect = (text, speed = 100, startDelay = 0) => {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (currentIndex === 0 && startDelay > 0) {
            const delayTimer = setTimeout(() => {
                setCurrentIndex(1)
            }, startDelay)
            return () => clearTimeout(delayTimer)
        }

        if (currentIndex > 0 && currentIndex <= text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, currentIndex))
                setCurrentIndex(currentIndex + 1)
            }, speed)

            return () => clearTimeout(timer)
        } else if (currentIndex > text.length) {
            setIsComplete(true)
        }
    }, [currentIndex, text, speed, startDelay])

    return { displayedText, isComplete }
}

export default useTypingEffect
