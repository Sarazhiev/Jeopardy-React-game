import React, {useEffect, useState} from 'react';
import CardMUI from "./Mui/CardMUI";
import ButtonCard from "./Mui/CardMUI";
import ButtonUi from "./Mui/Button";
import InputUi from "./Mui/Input";

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
        setAnswerBool(false);
        setAnswerValue(-question.value)

    }

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
            setUserAnswer('')
        } else {
            setAnswerBool(false);
            setAnswerValue(-question.value)
            setUserAnswer('')
        }
    };

    return (
        <>
            <ButtonCard onClick={() => {
                setDisplay(true)
                timer()
            }}>
                {
                    question.value
                }
            </ButtonCard>
            {/*onClick={(e) => e.target.className.includes('active') ? setDisplay(false) : ''}*/}
            <div  className={`display ${display ? 'display_active' : ''}`} style={{display: display ? 'block' : 'none'}}>
                <div className='popup'>
                    <div className='popup__content'>
                        <p className='popup__category'>{question.category && question.category.title}</p>
                        <span className='popup__value'>Value : {question.value}</span>
                        <p className='popup__question'>question :   {question.question}</p>
                        <ul className='popup__list'>
                            {randomAnswers && randomAnswers.map((randomA, idx) => (
                                <li className='popup__item' key={randomA + idx}>{randomA}</li>
                            ))}
                        </ul>
                        <InputUi label="Ваш ответ*"  className='login__input' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} type="text" placeholder="Ответ"/>
                        <div className='popup__under'>
                            <p className='popup__timer'>Осалось {timerValue} секунд</p>
                            <ButtonUi onClick={sendAnswer}>Ответить</ButtonUi>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;