import React, { useState } from 'react'


const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");


  async function remoteLogin(login, password) {
    let url = "http://localhost:4000/api/login";
    let data = { login, password };
    const resp = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await resp.json().token;
  }

  const onSubmit = (event, login, password) => {
    event.preventDefault();

    remoteLogin(login, password).then((response) => {
      setResult(
        (<p>Попытка залогиниться '{login}' под паролем '{password}': {response}</p>)
      );
    }).catch((e) => 
      setResult(
        (<p>Ошибка сервера:</p>)
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

export default Login