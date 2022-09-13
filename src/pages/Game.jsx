import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories} from "../redux/gameSlice";
import Card from "../components/Card";
import {useNavigate} from "react-router-dom";
import {saveUserName, saveTotalValue, getAllPlayers} from "../redux/modal";
import {getTrue, getFalse, removeTrue, removeFalse} from '../redux/myStat'
import ButtonUi from "../components/Mui/Button";
import 'react-toastify/dist/ReactToastify.css';

function Game() {
    const dispatch = useDispatch();
    const [category, setCategory] = React.useState([])
    const [cards, setCards] = React.useState([])
    const [active, setActive] = useState(false)
    const [answers, setAnswers] = React.useState([])
    const [answerValue, setAnswerValue] = useState(0)
    const [answerTotal, setAnswerTotal] = useState(0)
    const [answerBool, setAnswerBool] = React.useState(null)
    const {categories} = useSelector((state) => state.sidebarSlice)
    const {userName, totalValue} = useSelector((state) => state.modal)
    const {tru, fal} = useSelector((state) => state.myState)
    const allPlayers = useSelector((state) => state.modal.allPlayers)
    const navigate = useNavigate()
    console.log(tru)
    React.useEffect(() => {
        axios
            .get('https://jservice.io/api/clues')
            .then(({data}) => {
                dispatch(setCategories(data));
            });
    }, [])
    useEffect(() => {
        if (!userName) {
            navigate('/')
        }
    }, [])


    React.useEffect(() => {
        if (categories) {
            const qRes = categories.filter((q) => q.value);
            const cAll = Array.from(new Set(qRes.map((q) => q.category.title)));

            const cEqualFive = cAll.map((cr) => {
                let count = 0;
                qRes.map((qr) => {
                    if (qr.category.title === cr) {
                        count += 1;
                    }
                });
                if (+count === 5) {
                    return cr;
                }
            });
            const cRes = cEqualFive.filter((c) => c).slice(0, 5);

            setCategory(cRes);
            setCards(qRes);

            const answerList = qRes.map(everyAnswer => {
                return everyAnswer.answer
            })
            setAnswers(answerList)
        }

    }, [categories])



    useEffect(() => {
        setAnswerTotal((prevState) => prevState + answerValue);
    }, [answerValue]);

    useEffect(() => {
        dispatch(saveTotalValue(answerTotal))
    }, [answerTotal]);


    const endGameHandler = () => {
        dispatch(getAllPlayers({name: userName, answerTotal: answerTotal}))
        dispatch(removeTrue([]))
        dispatch(removeFalse([]))
        navigate('/statistics');
    };


    return (
               <div className='game'>
                    <h1 className='game__title'>Своя Игра</h1>
                    <div className='game__content'>
                        <div className='game__person'>
                            <h2  onClick={() => setActive(true)}>Посмотреть мою статистику</h2>
                            <h2>Имя - {userName}</h2>
                            <div  className={`game__list ${active ? 'game__list_active' : ''}`}>
                                <p>Количество верных ответов : {tru.length}</p>
                                <p>Количество неверных ответов : {fal.length}</p>
                                <p>Сумма : {totalValue}</p>
                            </div>
                        </div>
                        <div className='game__col'>
                            {
                                category && category.map((cat, idx) => (
                                    <div className='game__play' key={cat}>
                                        <h2 className='game__category'>{cat}</h2>
                                        {
                                            cards && cards.map(val => val.category && val.category.title === cat ? (
                                                        <Card
                                                            key={val.id}
                                                            answerValue={answerValue}
                                                            setAnswerBool={setAnswerBool}
                                                            answers={answers} question={val}
                                                            setAnswerValue={setAnswerValue}
                                                            answerBool={answerBool}
                                                        />
                                                    )
                                                    : ("")
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='game__info'>
                        <div className='game__left'>
                            <p className='game__check'>{answerBool ? 'Ответ правильный!' : answerBool === false ? 'Неправильно!' : ''}</p>
                            <p className='game__check'>Счет : {answerValue}</p>
                        </div>
                        <div className='game__right'>
                            <p>{totalValue}</p>
                            <ButtonUi className='game__end' onClick={endGameHandler}>Завершить игру</ButtonUi>
                        </div>
                    </div>
                   <div onClick={(e) => e.target.className.includes('active') ? setActive(false) : ''} className={`overlay ${active ? 'overlay_active' : ''}`}></div>
               </div>
    );
}

export default Game;
