import { url } from './api.config'

const taskService = {
  getAllTasks : async () => {
    let data = await fetch(`${url}/tasks`);
    return await data.json() ?? [];
  }
}

export default taskService;