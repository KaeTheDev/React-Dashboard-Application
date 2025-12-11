import { TaskForm } from "./components/TaskForm/TaskForm"
import type { TaskFormData } from "./types"

function App() {

const handleTaskSubmit = (task: TaskFormData) => {
  console.log("Task submitted: ", task);
}

  return (
    <>
   <TaskForm onSubmit={handleTaskSubmit} />
    </>
  )
}

export default App