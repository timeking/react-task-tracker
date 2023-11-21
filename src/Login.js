import React, { useState } from 'react'


const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");


  async function remoteLogin(login, password) {
    const resp = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({login, password})
    });
    return await resp.json();
  }

  const onSubmit = (event, login, password) => {
    event.preventDefault();

    remoteLogin().then((response) => {
      setResult(
        (<p>Попытка залогиниться '{login}' под паролем '{password}': {response}</p>)
      );
    });

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