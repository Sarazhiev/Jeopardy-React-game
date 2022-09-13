import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveUserName} from "../redux/modal";

import ButtonUi from "../components/Mui/Button";
import InputUi from "../components/Mui/Input";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userName} = useSelector(state => state.modal)
    const x = new RegExp(/^[a-zA-Zа-яА-Я0-9_]{2,}$/)    ///[a-zA-Z][a-zA-Z0-9-_\.]/g
    const [name, setName] = useState('')
    let postalResult = x.test(name)

    const saveNameHandler = (e) => {
        e.preventDefault()
        if (postalResult) {
            dispatch(saveUserName(name))
            navigate('/game')
        } else {
            alert('Веедите имя правильно!')
        }
    }

    return (
        <div className="login">
            <form className="login__form" onSubmitCapture={saveNameHandler}>
                <InputUi minLength={2}
                         required
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         type="text"
                         setName={setName}
                         name={name}
                         label="Ведите ваше имя"
                />
                <span className="login__info">Имя может состоять из Кирилицы, Латиницы и цифр</span>
                <ButtonUi type='submit' children={'Войти'}/>
            </form>
        </div>
    );
};

export default Login;