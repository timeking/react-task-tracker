const url = "http://localhost:3001";

const taskService = {
  getAllTasks : async () => {
    let data = await fetch(`${url}/tasks`);
    return await data.json() ?? [];
  }
}


export default taskService;