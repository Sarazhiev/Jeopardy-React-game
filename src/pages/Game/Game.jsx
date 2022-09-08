import axios from 'axios';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories} from "../../redux/gameSlice";
import Question from "../../components/Question";
import Popup from "../../components/Popup";
import Card from "../../components/Card";

function Game() {
    const dispatch = useDispatch();
    const [category ,setCategory] = React.useState([])
    const [cards, setCards] = React.useState([])
    const [answers, setAnswers] = React.useState([])
    const [answerBool, setAnswerBool] = React.useState(false);
    const [answerValue, setAnswerValue] = React.useState(0);
    const {categories} = useSelector((state) => state.sidebarSlice);
    React.useEffect(() => {
        axios
            .get('https://jservice.io/api/clues')
            .then(({data}) => {
                dispatch(setCategories(data));
            });
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

    },[categories])

    return (
        <div>
            <h1>Своя Игра</h1>
            <div>
                <div>
                    {
                        category && category.map((cat, idx) => (
                            <div>
                                <p>{cat}</p>
                                {
                                    cards && cards.map(val => (
                                        <Card
                                            setAnswerBool={setAnswerBool}
                                            answers={answers} question={val}
                                            setAnswerValue={setAnswerValue}
                                        />

                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Game;
