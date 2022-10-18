import { useState, useEffect } from 'react';
import { ITask } from '../Store/reduxInterface';
import { store } from '../Store/store';
import { doneTask, undoneTask } from '../Store/actions/actions'

interface Props1 {
    username: string
}

const UserLogin = ({ username }: Props1) => {

    const [taskList, setTaskList] = useState<ITask[]>([]);

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    }, [])

    const updateState = () => {
        const state = store.getState();
        setTaskList(state.tasks);
    }

    const clickDone = (task: ITask, username: string) => {
        store.dispatch(doneTask(task, username))
        updateState();
    }

    const clickUndone = (task: ITask, username: string) => {
        store.dispatch(undoneTask(task, username));
        updateState();
    }

    return (
        <div className="user-login" style={{ width: "80vw"}}>
            <h1 style={{ textAlign: "center" }}>Hello {username}</h1>
            <h2>Tasks for You :</h2>
            <ul className="tasks">
                {taskList.map((task: ITask, key: number) => {
                    return <li key={key}><DisplayTasksForUser clickUndone={clickUndone} isDone={task.doneBy.includes(username)} clickDone={clickDone} username={username} task={task}/></li>
                })}
            </ul>
            <button><a href="/login" style={{ color: 'black', textDecoration: 'none' }} onClick={() => { return false }}>Log Out</a></button>
        </div>
    );
}

interface Props2 {
    task: ITask;
    isDone: boolean;
    username: string;
    clickDone(task: ITask, username: string): void
    clickUndone(task: ITask, username: string): void
}

const DisplayTasksForUser = ({ task, isDone, clickDone, username, clickUndone }: Props2) => {

    return (
        <div className="task">
            <p>Task: {task.taskName}</p>
            <p>Deadline: {task.deadline}</p>
            <div className="checking-done">
                <button style={{ backgroundColor: "green"}} onClick={() => {clickDone(task, username)}} disabled={isDone ? true : false}>Done</button>
                <button style={{ backgroundColor: "red"}} onClick={() => {clickUndone(task, username)}} disabled={isDone ? false : true}>Not Done</button>

            </div>
        </div>
    );
}

export default UserLogin;
