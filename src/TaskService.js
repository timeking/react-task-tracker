import { instance } from './api.config'

const TaskService = {
  getAllTasks: async () => {
    return await instance.get("/api/tasks");
  }
}

export default TaskService;