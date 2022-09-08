import React, {useEffect, useState} from 'react';

const Card = ({ question, answers, setAnswerBool, setAnswerValue}) => {
    let intervalFunc;
    const [userAnswer, setUserAnswer] = useState('');
    const [display, setDisplay] = useState(false);
    const [timerValue, setTimerValue] = useState(60);
    const [randomAnswers, setRandomAnswers] = useState([]);

    const timerFunc = (intervalFunc) => {
        clearInterval(intervalFunc);
        setDisplay(false);
        setTimerValue(60)
    };

    const timer = () => {
        intervalFunc = setInterval(() => {
            if (timerValue > 0) {
                setTimerValue((prev) => prev - 1)
            }
        }, 1000)
        setTimeout(() => {
            timerFunc(intervalFunc)
        }, 60000)
    }

    useEffect(() => {
        const arr = []
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * (answers.length - 1))
            arr.push(answers[random])
        }
        arr.push(question.answer)
        setRandomAnswers(arr)
    }, [])

    const sendAnswer = () => {
        timerFunc(intervalFunc);
        if (userAnswer === question.answer) {
            setAnswerBool(true);
            setAnswerValue(question.value)
        } else {
            setAnswerBool(false);
            setAnswerValue(-question.value)
        }
    };

    return (
        <>
            <button onClick={() => {
                setDisplay(true)
                timer()
            }}>
                {
                    question.value
                }
            </button>
            <div style={{display: display ? 'block' : 'none'}}>
                <div>
                    <div>
                        <p>{question.category && question.category.title}</p>
                        <span>{question.value}</span>
                        <p>{question.question}</p>
                        <ul>
                            {randomAnswers && randomAnswers.map((randomA, idx) => (
                                <li key={randomA + idx}>{randomA}</li>
                            ))}
                        </ul>
                        <input onChange={(e) => setUserAnswer(e.target.value)} type="text" placeholder="Ответ"/>
                        <div>
                            <p>Осалось {timerValue} секунд</p>
                            <button onClick={sendAnswer}>Ответить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;