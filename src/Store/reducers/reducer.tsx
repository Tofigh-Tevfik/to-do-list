import { IState } from "../reduxInterface";


const reducer = (state: IState = { users: [{ username: "Admin", password: "1234", role: 'admin'}], tasks: [{ taskName: 'Homework', deadline: 7, doneBy: []}, { taskName: "Chores", deadline: 2, doneBy:["Tofigh"]}]}, action: any ) => {
    switch(action.type) {
      case 'REGISTER':
        return {
          users: [...state.users, action.user],
          tasks: [...state.tasks]
        };
  
      case 'ADD':
        return {
          users: [...state.users],
          tasks: [...state.tasks, action.task]
        };

      case 'DELETE':
        return {
          users: [...state.users],
          tasks: [...state.tasks.filter((task) => { return task.taskName != action.task.taskName})]
        }

      case 'DONE':
        return {
          users: [...state.users],
          tasks: [...state.tasks.map((task) => {
            if (task.taskName === action.task.taskName && !task.doneBy.includes(action.username)) {
              task.doneBy.push(action.username)
            }
            return task;
          })]
        }

      case 'UNDONE':
        return {
          users: [...state.users],
          tasks: [...state.tasks.map((task) => {
            if (task.taskName === action.task.taskName && task.doneBy.includes(action.username)) {
              task.doneBy.splice(task.doneBy.indexOf(action.username), 1);
            }

            return task;
          })]
        }
  
      default:
        return state;
    }
  }

export default reducer;