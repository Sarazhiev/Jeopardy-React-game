import React from 'react';
import {isActive} from "../redux/gameSlice";
import {useDispatch} from "react-redux";

const Item = ({el}) => {
    const dispatch = useDispatch()
    return (
        <td onClick={() => dispatch(isActive(true))}>{el.value}</td>
    );
};

export default Item;