const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  };
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}

// reducer
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
  // if(action.type === "ADD_TODO"){
  //   return state.concat([action.todo])
  // }
  // else if(action.type === "REMOVE_TODO"){
  //   return state.filter((todo)=> todo.id !== action.id)
  // }
  // else if(action.type === "TOGGLE_TODO"){
  //   return (state.map((todo)=> todo.id !== action.id ? todo :
  //   Object.assign({},todo,{complete : !todo.complete})
  //   ))
  // }
  // else{

  //   return state
  // }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

function createStore() {
  // the store shuold have 4 parts:
  // 1. the state
  // 2. get the state
  // 3. listen to change on the state
  // 4. update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  };

  const dispatch = (action) => {
    state = app(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// Dom Code

function generateId() {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}
function addTodo() {
  const input = document.getElementById("todo");
  const name = input.value;
  input.value = "";

  store.dispatch(
    addTodoAction({
      id: generateId(),
      name,
      complete: false,
    })
  );
}

function addGoal() {
  const input = document.getElementById("goal");
  const name = input.value;
  input.value = "";

  store.dispatch(
    addGoalAction({
      id: generateId(),
      name,
    })
  );
}

document.getElementById("todoBtn").addEventListener("click", addTodo);
document.getElementById("goalBtn").addEventListener("click", addGoal);
//
const store = createStore(app);

store.subscribe(() => {
  const { goals, todos } = store.getState();

  document.getElementById("todos").innerHTML = "";
  document.getElementById("goals").innerHTML = "";

  todos.forEach(addTodoDOM);
  goals.forEach(addGolDOM);
});

function addTodoDOM(todo) {
  const node = document.createElement("li");
  const text = document.createTextNode(todo.name);
  node.appendChild(text);

  document.getElementById("todos").appendChild(node);
}

function addGolDOM(goal) {
  const node = document.createElement("li");
  const text = document.createTextNode(goal.name);
  node.appendChild(text);

  document.getElementById("goals").appendChild(node);
}
