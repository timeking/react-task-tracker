import { instance } from './api.config'

const TaskService = {
  getAllTasks: async () => {
    const resp = await instance.get("/api/tasks");
    return resp.data;
  }
}

export default TaskService;