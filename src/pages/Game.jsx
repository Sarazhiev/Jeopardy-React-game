import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories} from "../redux/gameSlice";
import Card from "../components/Card";
import {useNavigate} from "react-router-dom";
import {saveUserName, saveTotalValue, getAllPlayers} from "../redux/modal";
import ButtonUi from "../components/Mui/Button";

function Game() {
    const dispatch = useDispatch();
    const [category, setCategory] = React.useState([])
    const [cards, setCards] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [answerValue, setAnswerValue] = useState(0)
    const [answerTotal, setAnswerTotal] = useState(0)
    const [answerBool, setAnswerBool] = React.useState(false)
    const {categories} = useSelector((state) => state.sidebarSlice)
    const name = useSelector((state) => state.modal.userName)
    const navigate = useNavigate()
    React.useEffect(() => {
        axios
            .get('https://jservice.io/api/clues')
            .then(({data}) => {
                dispatch(setCategories(data));
            });
    }, [])
    useEffect(() => {
        if (!name) {
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
        dispatch(getAllPlayers({name: name, answerTotal: answerTotal}))
        
        navigate('/statistics');
    };

    return (
        <div className='game'>
            <h1 className='game__title'>Своя Игра</h1>
            <div className='game__content'>
                <div className='game__col'>
                    {
                        category && category.map((cat, idx) => (
                            <div className='game__play' key={cat}>
                                <h2 className='game__category'>{cat}</h2>
                                {
                                    cards && cards.map(val => val.category && val.category.title === cat ? (
                                                <Card
                                                    key={val.id}
                                                    setAnswerBool={setAnswerBool}
                                                    answers={answers} question={val}
                                                    setAnswerValue={setAnswerValue}
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
                    <p className='game__check'>{answerBool ? 'Ответ правильный!' : 'Не Верно!'}</p>
                    <p className='game__check'>{answerValue}</p>
                </div>
                <div className='game__right'>
                    <p className='game__total'>{answerTotal}</p>
                    <ButtonUi className='game__end' onClick={endGameHandler}>Завершить игру</ButtonUi>
                </div>
            </div>
        </div>
    );
}

export default Game;
