import React, { useState } from 'react'
import {observer} from "mobx-react-lite";
import authStore from "./AuthStore";
import {useNavigate} from "react-router-dom";


const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event, login, password) => {
    event.preventDefault();
    authStore.login(login, password).then((response) => {
      console.log(response);
      setResult(
        (<>
          <p>Авторизация успешна</p>
        </>)
      );
      navigate("/");
    }).catch((e) => 
      setResult(
        (<p>Ошибка сервера: {e}</p>)
      )
    );

  }

  return (
    <div>
      <form onSubmit={(event) => onSubmit(event, login, password)}>
        <span className='form-control'>  
          <label>
            Логин
            <input type='text' value={login} 
              onChange={(e) => setLogin(e.target.value)}/>
          </label>
        </span>
        <span className='form-control'>  
          <label>
            Пароль
            <input type='password' value={password} 
              onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </span>
        <span className='form-control'>
          <button type='submit' className='btn btn-block'>Авторизоваться</button>
        </span>
      </form>
      {result}
    </div>
  )
}

export default observer(Login)