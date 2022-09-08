import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeActive} from "../redux/gameSlice";

const Popup = () => {
    const dispatch = useDispatch()
    const {isActive, questions } = useSelector(state => state.sidebarSlice)

    const popupClose = (e) => {
        if (e.target.className.includes('overlay')) {
            dispatch(changeActive(false))
        }
    }



    return (
        <div onClick={(e) => popupClose(e)} style={{display: isActive ? 'block' : 'none'}} className={`overlay ${isActive && 'overlay_active'}`}>
            <div className='popup'>
               <h2>test</h2>
                <input placeholder='Ответ..' className='popup__input' type="text"/>
            </div>
        </div>
    );
};

export default Popup;