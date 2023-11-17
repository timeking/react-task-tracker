import React, { useEffect, useState } from 'react'



async function getAllTasks() {
  var serverUrl = "http://localhost:3001";
  let data = await fetch(`${serverUrl}/tasks`);
  return await data.json() ?? [];
}

const Tasks = () => {
  let isLoading = false;
  let hasError = false;
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTasks()
      .then((tasks) => {
        setTasks(tasks);
        hasError = false;
      })
      .catch((e) => hasError = true);
  }, []);

  return (
    <>
    <span className="form-control">
      <input type="text"
             placeholder="Введите текст для фильтра"
      />
    </span>
    {
      isLoading 
      ? (<p>Загрузка...</p>) 
      : hasError 
        ? (<p>Ошибка запроса сервера</p>)
        : tasks.map((task) => <p>{task.text}</p>)
    }
    </>
  )
}

export default Tasks