
export interface IUser {
    username: string;
    password: string;
    role: string
}
  
export interface ITask {
    taskName: string;
    deadline: number;
    doneBy: string[];
}
  
export interface IState {
    users: IUser[];
    tasks: ITask[];
}