import { TaskForm } from "./components/TaskForm/TaskForm"
import type { TaskFormData } from "./types"

function App() {

const handleTaskSubmit = (task: TaskFormData) => {
  console.log("Task submitted: ", task);
}

  return (
    <>
   {/* <h2 className="text-3xl text-red-500">KaeTheDev is the GREATEST!</h2> */}
   <TaskForm onSubmit={handleTaskSubmit} />
    </>
  )
}

export default App