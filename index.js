// action
// {
//   type: "ADD_TODO",
//   todo: {
//     id:0,
//     name: "Learn Redux",
//     complete: false
//   }
// }

// {
//   type: "REMOVE_TODO",
//   id:0,
// }

// {
//   type:"TOGGLE_TODO",
//   id:0,
// }

// reducer
function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    case "TOGGLE_TODO":
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
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
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

const store = createStore(app);
