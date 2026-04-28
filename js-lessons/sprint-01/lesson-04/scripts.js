const todolistId_1 = crypto.randomUUID();
const todolistId_2 = crypto.randomUUID();

const todolists = [
    { id: todolistId_1, title: 'What to learn' },
    { id: todolistId_2, title: 'What to buy' }
]

const tasks = {
    [todolistId_1]: [
        { id: crypto.randomUUID(), title: "HTML", isDone: false },
        { id: crypto.randomUUID(), title: "CSS", isDone: false },
        { id: crypto.randomUUID(), title: "JS/TS", isDone: false },
    ],
    [todolistId_2]: [
        { id: crypto.randomUUID(), title: "Milk", isDone: true },
        { id: crypto.randomUUID(), title: "Bread", isDone: false },
        { id: crypto.randomUUID(), title: "Cola", isDone: true },
    ]
}


const map = new Map();
map.set(false, "true");
map.set(todolists[0], tasks[todolists[0].id]);
map.get(false);

const array = [1, 2, 3, 4, 5, 6, 6, 221, 7, 34, 2, 56, 7, 8, 8, 34];
const set = new Set(array);
const unicArray = Array.from(set)


function delteTodoList(id) {
    todolists = todolists.filter( td => td.id !== id);
    const copyTasks = {...tasks};
    delete tasks[id];
    tasks = copyTasks;

}

function addTodoList(title) {
    const id = crypto.randomUUID();
    const newTodo = {id, title};

    todolists = [...todolists, newTodo];
    tasks = {...tasks, [id]: []}
    
}