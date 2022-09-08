import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addQuestions, changeActive} from "../redux/gameSlice";
import Popup from "./Popup";

const Question = ({ categoryId }) => {
    const dispatch = useDispatch();
    const { questions } = useSelector(state => state.sidebarSlice);
    React.useEffect(() => {
        axios
            .get(`https://jservice.io/api/category?id=${categoryId}`)
            .then(({ data }) => {
                dispatch(addQuestions(data.clues.slice(0, 5)));
            });
    }, []);

    return (
        questions.filter((q) => q.category_id === categoryId)
            .map((el,idx,array) => (
                <>
                    <td onClick={() => dispatch(changeActive(true))} key={el.id}>{el.value}</td>
                </>
            ))
    )
}

export default Question;
