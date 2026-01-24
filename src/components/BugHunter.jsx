import { useState, useEffect } from 'react'
import { Bug, CheckCircle, RotateCcw, Trophy } from 'lucide-react'
import './BugHunter.css'

const BugHunter = () => {
    const [foundBugs, setFoundBugs] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [currentBugs, setCurrentBugs] = useState([])
    const [difficulty, setDifficulty] = useState('medium')
    const [streak, setStreak] = useState(0)
    const [bestStreak, setBestStreak] = useState(0)

    const allBugs = [
        { id: 1, element: 'button', label: 'Sbumit Form', hint: 'Check the spelling carefully', bugType: 'Typo Bug', difficulty: 'easy' },
        { id: 2, element: 'price', label: '$99.9', hint: 'Is this price format correct?', bugType: 'Data Format Bug', difficulty: 'medium' },
        { id: 3, element: 'date', label: '31/02/2024', hint: 'Does this date exist?', bugType: 'Validation Bug', difficulty: 'medium' },
        { id: 4, element: 'email', label: 'user@gmailcom', hint: 'Look at the email format', bugType: 'Format Bug', difficulty: 'easy' },
        { id: 5, element: 'password', label: '••••••', hint: 'Password strength shows "Strong" for 6 chars', bugType: 'Logic Bug', difficulty: 'hard' },
        { id: 6, element: 'phone', label: '(123) 456-78900', hint: 'Count the digits in this phone number', bugType: 'Validation Bug', difficulty: 'medium' },
        { id: 7, element: 'url', label: 'htps://website.com', hint: 'Protocol looks suspicious', bugType: 'Typo Bug', difficulty: 'easy' },
        { id: 8, element: 'time', label: '25:30 PM', hint: 'Is this a valid time?', bugType: 'Validation Bug', difficulty: 'medium' },
        { id: 9, element: 'percentage', label: '110%', hint: 'Can progress exceed 100%?', bugType: 'Logic Bug', difficulty: 'hard' },
        { id: 10, element: 'zip', label: '1234', hint: 'US ZIP codes have how many digits?', bugType: 'Format Bug', difficulty: 'easy' },
        { id: 11, element: 'credit-card', label: '4532-1234-5678-901', hint: 'Count the credit card digits', bugType: 'Format Bug', difficulty: 'medium' },
        { id: 12, element: 'age', label: 'Age: -5', hint: 'Can age be negative?', bugType: 'Validation Bug', difficulty: 'easy' },
        { id: 13, element: 'username', label: 'user name', hint: "Usernames usually don't have spaces", bugType: 'Format Bug', difficulty: 'medium' },
        { id: 14, element: 'rating', label: '⭐⭐⭐⭐⭐⭐', hint: 'How many stars is too many?', bugType: 'Logic Bug', difficulty: 'hard' },
        { id: 15, element: 'discount', label: 'Save 150%!', hint: 'Can you save more than 100%?', bugType: 'Logic Bug', difficulty: 'medium' }
    ]

    useEffect(() => {
        selectRandomBugs(difficulty)
    }, [])

    const selectRandomBugs = (level) => {
        const bugCount = level === 'easy' ? 4 : level === 'medium' ? 6 : 8
        const filteredBugs = level === 'easy'
            ? allBugs.filter(b => b.difficulty === 'easy' || b.difficulty === 'medium')
            : level === 'hard'
                ? allBugs
                : allBugs.filter(b => b.difficulty !== 'hard')
        const shuffled = [...filteredBugs].sort(() => Math.random() - 0.5)
        setCurrentBugs(shuffled.slice(0, bugCount))
    }

    const handleClick = (bugId) => {
        if (foundBugs.includes(bugId)) return
        setFoundBugs([...foundBugs, bugId])
        setAttempts(attempts + 1)
        if (foundBugs.length + 1 === currentBugs.length) {
            setShowResult(true)
            const newStreak = streak + 1
            setStreak(newStreak)
            if (newStreak > bestStreak) setBestStreak(newStreak)
        }
    }

    const resetGame = () => {
        setFoundBugs([])
        setShowResult(false)
        setAttempts(0)
        selectRandomBugs(difficulty)
    }

    const changeDifficulty = (level) => {
        setDifficulty(level)
        setFoundBugs([])
        setShowResult(false)
        setAttempts(0)
        setStreak(0)
        selectRandomBugs(level)
    }

    const getScore = () => {
        const accuracy = (currentBugs.length / attempts) * 100
        if (accuracy === 100) return { grade: 'S', message: 'PERFECT! You have eagle eyes! 🦅', color: '#ffd700' }
        if (accuracy >= 90) return { grade: 'A+', message: 'Outstanding! Near perfect! 🌟', color: '#4CAF50' }
        if (accuracy >= 80) return { grade: 'A', message: 'Excellent testing skills! ⭐', color: '#8BC34A' }
        if (accuracy >= 70) return { grade: 'B+', message: 'Very good! Keep it up! 💪', color: '#FFC107' }
        if (accuracy >= 60) return { grade: 'B', message: 'Good catch rate! Practice makes perfect! 👍', color: '#FF9800' }
        return { grade: 'C', message: 'Room for improvement! Keep practicing! 📚', color: '#FF5722' }
    }

    return (
        <section className="bug-hunter" id="bug-hunter">
            <div className="container">
                <div className="bh-header">
                    <div className="bh-title-row">
                        <Bug className="bh-icon" />
                        <h2>Bug Hunter Challenge</h2>
                    </div>
                    <p className="bh-subtitle">
                        Can you spot all the bugs? Click on the elements that contain errors!
                    </p>
                    <div className="bh-difficulty">
                        <button className={`bh-diff-btn ${difficulty === 'easy' ? 'active easy' : ''}`} onClick={() => changeDifficulty('easy')}>
                            Easy (4 bugs)
                        </button>
                        <button className={`bh-diff-btn ${difficulty === 'medium' ? 'active medium' : ''}`} onClick={() => changeDifficulty('medium')}>
                            Medium (6 bugs)
                        </button>
                        <button className={`bh-diff-btn ${difficulty === 'hard' ? 'active hard' : ''}`} onClick={() => changeDifficulty('hard')}>
                            Hard (8 bugs)
                        </button>
                    </div>
                </div>

                <div className="bh-stats">
                    <div className="bh-stat">
                        <span className="bh-stat-value">{foundBugs.length}</span>
                        <span className="bh-stat-label">Bugs Found</span>
                    </div>
                    <div className="bh-stat">
                        <span className="bh-stat-value">{currentBugs.length}</span>
                        <span className="bh-stat-label">Total Bugs</span>
                    </div>
                    <div className="bh-stat">
                        <span className="bh-stat-value">{attempts}</span>
                        <span className="bh-stat-label">Attempts</span>
                    </div>
                    <div className="bh-stat streak">
                        <span className="bh-stat-value">{streak}</span>
                        <span className="bh-stat-label">Streak 🔥</span>
                    </div>
                    <div className="bh-stat">
                        <span className="bh-stat-value best">{bestStreak}</span>
                        <span className="bh-stat-label">Best Streak</span>
                    </div>
                </div>

                <div className="bh-grid">
                    {currentBugs.map((bug) => (
                        <div
                            key={bug.id}
                            className={`bh-card ${foundBugs.includes(bug.id) ? 'found' : ''}`}
                            onClick={() => handleClick(bug.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && handleClick(bug.id)}
                        >
                            <div className="bh-element">
                                {bug.element === 'button' && <button className="fake-btn">{bug.label}</button>}
                                {bug.element === 'price' && <div className="fake-price">{bug.label}</div>}
                                {bug.element === 'date' && <div className="fake-date">📅 {bug.label}</div>}
                                {bug.element === 'email' && <div className="fake-email">✉️ {bug.label}</div>}
                                {bug.element === 'password' && (
                                    <div className="fake-password">
                                        <div className="pwd-dots">{bug.label}</div>
                                        <span className="pwd-strength">Strong</span>
                                    </div>
                                )}
                                {bug.element === 'phone' && <div className="fake-phone">📞 {bug.label}</div>}
                                {bug.element === 'url' && <div className="fake-url">🔗 {bug.label}</div>}
                                {bug.element === 'time' && <div className="fake-time">⏰ {bug.label}</div>}
                                {bug.element === 'percentage' && (
                                    <div className="fake-percentage">
                                        <div className="progress-bar"><div className="progress-fill"></div></div>
                                        <span>{bug.label} Complete</span>
                                    </div>
                                )}
                                {bug.element === 'zip' && <div className="fake-zip">📍 ZIP: {bug.label}</div>}
                                {bug.element === 'credit-card' && <div className="fake-cc">💳 {bug.label}</div>}
                                {bug.element === 'age' && <div className="fake-age">👤 {bug.label}</div>}
                                {bug.element === 'username' && <div className="fake-username">@{bug.label}</div>}
                                {bug.element === 'rating' && <div className="fake-rating">{bug.label}</div>}
                                {bug.element === 'discount' && <div className="fake-discount">🎉 {bug.label}</div>}
                            </div>

                            {foundBugs.includes(bug.id) ? (
                                <div className="bh-found">
                                    <CheckCircle className="check-icon" />
                                    <span>{bug.bugType}</span>
                                </div>
                            ) : (
                                <div className="bh-hint">💡 {bug.hint}</div>
                            )}
                        </div>
                    ))}
                </div>

                {showResult && (
                    <div className="bh-modal-overlay">
                        <div className="bh-modal">
                            <Trophy className="trophy-icon" style={{ color: getScore().color }} />
                            <h3>Challenge Complete!</h3>
                            <div className="score-grade" style={{ color: getScore().color }}>{getScore().grade}</div>
                            <p className="score-message">{getScore().message}</p>
                            <p className="score-details">Found {currentBugs.length} bugs in {attempts} attempts</p>
                            <p className="score-accuracy">Accuracy: {Math.round((currentBugs.length / attempts) * 100)}%</p>
                            {streak > 1 && <p className="score-streak">🔥 {streak} game streak!</p>}
                            <button className="bh-play-btn" onClick={resetGame}>
                                <RotateCcw size={18} />
                                New Challenge
                            </button>
                        </div>
                    </div>
                )}

                {!showResult && foundBugs.length > 0 && (
                    <div className="bh-reset-wrap">
                        <button className="bh-reset-btn" onClick={resetGame}>
                            <RotateCcw size={18} />
                            Reset Game
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BugHunter