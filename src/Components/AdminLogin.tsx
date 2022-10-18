import { ChangeEvent, FC, useState, useEffect, useRef } from 'react';
import { ITask } from '../Store/reduxInterface';
import { addTask, deleteTask } from '../Store/actions/actions';
import { store } from '../Store/store';

const AdminLogin: FC = () => {

    const taskRef = useRef<any>();

    const [task, setTask] = useState<string>('');
    const [deadline, setDeadline] = useState<number>(0)
    const [taskList, setTaskList] = useState<ITask[]>([]);

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    }, [])

    const updateState = () => {
        const state = store.getState();
        setTaskList(state.tasks);
    }

    const handleSubmit = (): void => {
        store.dispatch(addTask({ taskName: task, deadline: deadline, doneBy: []}));
        setTask('');
        setDeadline(0);
    }

    const taskDelete = (task: ITask): void => {
        store.dispatch(deleteTask(task));
        updateState();
    }

    useEffect((): void => {
        taskRef.current.focus();
    })

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <section className="adminTaskList">

            <div className="inputTask">

                <h1 style={{ textAlign: "center" }}>Admin Login</h1>
                <label htmlFor="task-input">Give a Task</label>
                <input 
                    id="task-input"
                    type="text"
                    autoComplete="off"
                    placeholder="Task"
                    value={task}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setTask(e.target.value) }}
                    ref={taskRef}
                />
                <label htmlFor="deadline">Give Deadline</label>
                <input 
                    id="deadline"
                    type="number"
                    min="0"
                    value={deadline}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setDeadline(Number(e.target.value)) }}
                />
                <button onClick={handleSubmit} disabled={task === "" || deadline === 0 ? true : false}>Add Task</button>

            </div>
        </section>

        <div className="display-tasks">

            <h1 style={{textAlign: "center"}}>Given Tasks</h1>
                <ul className="tasks">
                    {taskList.map((task: ITask, key: number) => {
                        return <li key={key}><DisplayTask task={task} deleteTask={taskDelete} /></li>
                    })}
                </ul>
        </div>

        <button><a href="/login" style={{color: 'black', textDecoration: 'none'}}>Log Out</a></button>

        </div>
    );
};

export default AdminLogin;

interface Props {
    task: ITask;
    deleteTask(task: ITask): void
}

const DisplayTask = ({ task, deleteTask }: Props) => {
    return (
        <div className="task" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>Task: {task.taskName}</p>
            <p>Deadline: {task.deadline}</p>
            <button style={{width: "100px"}} onClick={() => {deleteTask(task)}}>Delete</button>
        </div>
    );
}