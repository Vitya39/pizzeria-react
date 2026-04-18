import { useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [name, setName] = useState("");

    return (
        <div>
            <div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <button
                    onClick={e => {
                        todos.push(name);
                        setName("");
                    }}
                >
                    Hozzáadás
                </button>
            </div>
            <ul>
                {todos.map(todoItem => (
                    <li>
                        {todoItem}
                        <button
                            onClick={() => {
                                setTodos(todos.filter(j => j != todoItem));
                            }}
                        >
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
