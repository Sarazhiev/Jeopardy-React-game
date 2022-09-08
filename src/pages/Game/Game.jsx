import axios from 'axios';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCategories} from "../../redux/gameSlice";
import Question from "../../components/Question";
import Popup from "../../components/Popup";

function Game() {
    const dispatch = useDispatch();
    const {categories} = useSelector((state) => state.sidebarSlice);

    React.useEffect(() => {
        axios
            .get('https://jservice.io/api/categories?count=5&offset=10')
            .then(({data}) => {
                dispatch(setCategories(data));
            });
    }, []);

    return (
        <>
            <table>
                <tbody>
                {categories.map((cat) => (
                    <tr key={cat.id}>
                        <td>{cat.title}</td>
                        <Question categoryId={cat.id}/>
                    </tr>
                ))}
                </tbody>
            </table>
            <Popup/>

        </>
    );
}

export default Game;
