import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveUserName} from "../redux/modal";

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal)
    const x = new RegExp( '[а-яА-ЯЁё\]')    ///[a-zA-Z][a-zA-Z0-9-_\.]/g
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
        <div>
            <form onSubmit={saveNameHandler}>
                <input
                    minLength={2}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Ведите ваше имя"
                />
                <span>Пока только Русское имя</span>
                <button type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;