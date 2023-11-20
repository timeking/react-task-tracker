import React, { useState } from 'react'


const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const onSubmit = (event, login, password) => {
    event.preventDefault();
    setResult(
      (<p>Попытка залогиниться '{login}' под паролем '{password}'</p>)
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

export default Login