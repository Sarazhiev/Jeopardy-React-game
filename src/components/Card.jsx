import React, {useEffect, useRef, useState} from 'react';
import CardMUI from "./Mui/CardMUI";
import ButtonCard from "./Mui/CardMUI";
import ButtonUi from "./Mui/Button";
import InputUi from "./Mui/Input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getMyStatistics} from "../redux/myStat";
import {useDispatch} from "react-redux";
import {getTrue, getFalse} from "../redux/myStat";

const Card = ({ question, answers, setAnswerBool, setAnswerValue, answerBool, answerValue}) => {
    let intervalFunc;
    const dispatch = useDispatch()
    const [userAnswer, setUserAnswer] = useState('');
    const [display, setDisplay] = useState(false);
    const [disable, setDisable] = useState(false)
    const [correct, setCorrect] = useState('transParent')
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
                setTimerValue((prev) => prev - 1);
            }
        }, 1000);

        setTimeout(() => {
            timerFunc(intervalFunc)
        }, 60000);
    };

    useEffect(() => {
        const arr = []
        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * (answers.length - 1))
            arr.push(answers[random])
        }
        arr.push(question.answer)
        setRandomAnswers(arr)
    }, [])

    const sendAnswer = (e) => {
        e.preventDefault()
        timerFunc(intervalFunc);
        if (userAnswer === question.answer) {
            setCorrect('green')
            setAnswerBool(true);
            setAnswerValue(question.value)
            setUserAnswer('')
            dispatch(getTrue(1))

        } else {
            setCorrect('red')
            setAnswerBool(false)
            setAnswerValue(-question.value)
            setUserAnswer('')
            dispatch(getFalse(1))
        }
    };

    return (
        <>
            <ButtonCard style={{border: `2px solid ${correct}`, width: '150px', height: '100px', marginBottom: '10px'}} disabled={disable} onClick={() => {
                setDisplay(true)
                timer()
                setDisable(true)
            }}>
                {
                    question.value
                }
            </ButtonCard>
            {/*onClick={(e) => e.target.className.includes('active') ? setDisplay(false) : ''}*/}
            <div  className={`display ${display ? 'display_active' : ''}`} style={{display: display ? 'block' : 'none'}}>
                <div className='popup'>
                    <form onSubmitCapture={sendAnswer} className='popup__content'>
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
                            <ButtonUi type='submit' >Ответить</ButtonUi>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Card;