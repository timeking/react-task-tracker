import React, {
  Fragment,
  useEffect,
  useState
} from 'react'
import TaskItem from './TaskItem';
import TaskService from './TaskService';


export async function loader() {
  const tasks = await TaskService.getAllTasks();
  return { tasks };
}

const Tasks = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [hasError, setHasError] = useState(false);
  let [tasks, setTasks] = useState([]);

  useEffect(() => {
    ;(async () => {
      setIsLoading(true);
      try {
        const tasks = await TaskService.getAllTasks();
        setTasks(tasks);
        setHasError(false);
      } catch(e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  let items;
  if (isLoading) { 
    items = (<p>Загрузка...</p>); 
  } else if (hasError) {
    items = (<p>Ошибка запроса сервера</p>);
  } else {
    console.log(tasks);
    items = tasks.map((task) =>
        <TaskItem key={task.id} task={task}/>
    );
  }

  return (
    <>
      <span className="form-control">
        <input type="text"
              placeholder="Введите текст для фильтра"
        />
      </span>
      {items}
    </>
  )
}

export default Tasks