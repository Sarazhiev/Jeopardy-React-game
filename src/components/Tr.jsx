import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isActive, setGameValue} from "../redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../redux/gameSlice";
import Item from "./Item";

const Tr = ({item}) => {
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])
    const {gameValue} = useSelector(state => state.reducer.myGame)
    useEffect( () => {
         axios(`https://jservice.io/api/category?id=${item.category_id}`)
             .then(({data}) => setCategory(data.clues.slice(0,5)))
    },[])
    // useEffect(() => {
    //     dispatch(getCategory(item))
    // }, [])
    console.log(category)
    return (
            <tbody>
            <tr>
                <td>{item.category.title}</td>
                {
                    category && category.map((el) => (
                        <Item key={el.id} el={el}/>
                    ))
                }
            </tr>
            </tbody>
    );
};

export default Tr;