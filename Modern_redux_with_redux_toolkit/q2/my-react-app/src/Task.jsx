import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from "./features/taskSlice";

const Task = () => {
    const dispatch = useDispatch();

    const taskState = useSelector(state => state.task);

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTask = () => {
        dispatch(addTask(inputValue));
        setInputValue('');
    };

    return (
        <>
            <input
                type='text'
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter a new task"
            />

            <div>
                <h2>Your Tasks:</h2>
                {taskState.value && taskState.value.length > 0 ? (
                    <ul>
                        {taskState.value.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks yet. Add one!</p>
                )}
            </div>

            <button onClick={handleAddTask}>Add Task</button>
        </>
    );
};

export default Task;
