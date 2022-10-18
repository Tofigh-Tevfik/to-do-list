import { IUser, ITask } from "../reduxInterface";

export const register = (user: IUser) => {
    let register: {
      type: string,
      user: IUser
    } = {
      type: "REGISTER",
      user
    }
  
    return register;
}

export const addTask = (task: ITask) => {
    let addedTask: {
      type: string,
      task: ITask
    } = {
      type: 'ADD',
      task
    }
  
    return addedTask;
}

export const deleteTask = (task: ITask) => {
  let deletedTask: {
    type: string,
    task: ITask
  } = {
    type: 'DELETE',
    task
  }

  return deletedTask;
}

export const doneTask = (task: ITask, username: string) => {
  let done: {
    type: string,
    task: ITask,
    username: string
  } = {
    type: "DONE",
    task,
    username
  }

  return done;
}

export const undoneTask = (task: ITask, username: string) => {
  let undone: {
    type: string,
    task: ITask
    username:string
  } = {
    type: 'UNDONE',
    task,
    username
  }

  return undone;
}