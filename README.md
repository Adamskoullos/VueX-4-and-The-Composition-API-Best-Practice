<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/119489513-ad28ce80-bd53-11eb-9894-9d411d6d6ead.png" style="margin: 30px auto"></div>

<br><br>

<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/119489574-bc0f8100-bd53-11eb-8c75-21e9c3d17574.png" style="margin: 30px auto"></div>

<br><br>

<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/119497254-4360f280-bd5c-11eb-8fe9-cca2f62bafc2.png" style="margin: 30px auto"></div>

# [Live Link](https://vues-crud-workflows.netlify.app/)

Live app uses Heroku and is deployed to Netlify

# VueX 4 + Composition API Best Practices

A Todo application mapping VueX processes for each CRUD workflow. The project to be structured as if a large project, leveraging VueX modules.

### Main focus:

1. Modelling the set up structure for VueX 4 + Composition API to use separate module files
2. Each nested component to be reusable
3. Only updating the Store with the minimum required data for each workflow, working with local state where suitable to make the user experience as fluid as possible

## Criteria

1. Vue.js, VueX, Vue-router and SASS to be used
2. Three page application:
   - Todo 1:
     - Home page redirected
   - Todo 2
   - 404 page
3. No CSS/font-end libraries
4. No component libraries
5. Built to design specification
6. Code comments used to clearly explain what the code is doing

# Planning

1. Identify and model the core VueX workflows
2. Identify/set up two end points to be used for the Todo's
3. Setup the project: Vue CLI (Vue-router, VueX, SASS)
4. Identify the Components to be used
5. setup the router and test

6. Basic styling for app.vue, NavBar, AddTask, Single Todo

7. Build out the VueX modules (one for each Todo list) and wire up as I go:

   - Initial fetch on mount workflow to retrieve and render task list
   - Update task to toggle complete property plus styling
   - Add new task workflow plus styling
   - Remove task workflow
   - Update task to alter text content
   - Add getters and computed properties to allow filtering of task lists

8. Managing Errors

9. Loader, Hovers & 404 page

10. Responsiveness & Testing

11. Deployment

# Research Stage

1. VueX

My research into the core VueX principles and workflows can be found here: https://github.com/Adamskoullos/VueX-Guide

2. API end-points

I couldn't use the basic json-placeholder api's as I needed two and also need to save db state. I also didn't want to use local storage or Firebase as the whole point is to model workflows working with Rest api's. This meant using Axios/Fetch with the async try/catch pattern each time connecting to the db and also dealing with updating the VueX store each time.

Ania Kubow has a great YouTube video detailing how to make mock api's and deploy them to Heroku: https://www.youtube.com/watch?v=FLnxgSZ0DG4

I did this and the process to build the two mock api's used for this project can be found here:

- https://github.com/Adamskoullos/mock-api-one

- https://github.com/Adamskoullos/mock-api-two

# Development Stage

## VueX Modules & Reusable Components

There are a couple of key areas to note that allow effective module name spacing within reusable nested components:

1. Accessing state properties within each module:

- A `ref` const is created in each View component to be the 'Key' for the relevant module: `const moduleOne = ref('todoOne')`
- This is passed down as a prop to both `AddTask` & `TaskList` components

```js

// TodoOne View
<template>
<div class="container-todo">
  <AddTask :todo="moduleOne" />
  <TaskList :todo="moduleOne" :st="st" />
</div>
</template>

<script>
```

```js
import { onBeforeMount, onUpdated, ref } from "@vue/runtime-core";
import AddTask from "../components/AddTask.vue";
import TaskList from "../components/TaskList.vue";
import { useStore } from "vuex";

export default {
  components: { AddTask, TaskList },
  setup() {
    const store = useStore();
    const st = ref(store.state.todoOne);
    const moduleOne = ref("todoOne");

    const fetchData = () => {
      store.dispatch("todoOne/fetchTodo");
    };

```

- The prop is accepted within the nested components and `props` is passed into the `setup()` function
- The `props.todo` is used as a prefix to the dispatched action function. This results in the module name string being added to the action string `todoOne/toggleComplete`:

```js
// TaskList component
export default {
    props: ["todo", "st"],
    components: { Loader },
    setup(props) {
      const store = useStore();

      const handleComplete = (todo) => {
        store.dispatch(props.todo + "/toggleComplete", todo);
      };

```

The above is what allows the reusable components to point to their respective modules when dispatching to actions.

2. Rendering module specific state properties within the DOM via reusable components:

The pattern to access state properties is: `store.state.moduleName.property`, each View component has a const `st`:

```js
const store = useStore();

// Module One
const st = ref(store.state.todoOne);

// Module Two
const st = ref(store.state.todoTwo);
```

`st` is passed down from the View to the nested `TaskList` component and from there can be used as: `st.propertyName`. This is the same as `store.state.moduleName.property`:

```html
<div class="container-todo">
  <AddTask :todo="moduleOne" />
  <TaskList :todo="moduleOne" :st="st" />
</div>
```

The below example comes from the template of the `TaskList` component. Note how `st.todos` is used instead of `store.state.todoOne.todos`

```html
<div class="task-list" v-if="!st.isLoading && !st.error">
  <div class="task" v-for="todo in st.todos" :key="todo.id">
    <p :class="{ strike: todo.complete }" v-if="!todo.update">
      {{ todo.text }}
    </p>
  </div>
</div>
```

The above is how the reusable nested component `TaskList` can render todo lists from different modules, depending on the parent component and what the value of `st` is when it is passed down.

## Fetching data on initial load

The below code snippet is within the script of the `TodoOne` view. Before the component mounts the DOM `fetchData()` is invoked which dispatches the `fetchTodo` function within **actions**, within the `todoOne` module:

```js
const fetchData = () => {
  store.dispatch("todoOne/fetchTodo");
};

onBeforeMount(() => {
  fetchData();
});
```

The below snippet is the `fetchTodo` within **actions**:

```js
async fetchTodo(ctx) {
      ctx.commit("setIsLoading", true);
      ctx.commit("setError", "");
      try {
        const res = await fetch("https://dev-test-api-one.herokuapp.com/todos");
        if (res.status !== 200) {
          throw new Error("Unable to fetch data");
        }
        const data = await res.json();
        ctx.commit("setTodosData", data);
        ctx.commit("setIsLoading", false);
      } catch (err) {
        console.log(err.message);
        ctx.commit("setError", "Unable to fetch todo's list");
        ctx.commit("setIsLoading", false);
      }
    },
```

Above: If the JSON data is successfully fetched, it is turned to a JS object and committed to mutations. Note the data is passed in as the second argument:

```js
ctx.commit("setTodosData", data);
```

Below: Mutations sets the data within the store.state properties, in this case the `todos` array:

```js
mutations: {
    setTodosData(state, data) {
      state.todos = data;
    },

```

## Updating Task to complete

This workflow starts in the `TaskList` component as the user clicks to complete a task. The todo is passed in so the id is available and the `toggleComplete` function is dispatched within **actions**:

```js
const handleComplete = (todo) => {
  store.dispatch(props.todo + "/toggleComplete", todo);
};
```

Below - within **actions**: A PATCH request is made grabbing the todo and toggling the `complete` state. This has now altered the state within the database but not yet within the store.

```js
async toggleComplete(ctx, todo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos/" + todo.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ complete: !todo.complete }),
        });
        await ctx.dispatch("fetchSingleTodo", todo);
      } catch (err) {
        console.log(err.message);
      }
    },

```

Above: Once the todo has been updated within the database a further action is dispatched `fetchSingleTodo` with the todo passed in so as to access the todo.id.

Below: The single todo is fetched, the existing state.todos is looped through using map to create an updated todos array. If the todo.id matches the data.id that particular todo is swapped out for the updated version (data), then the changes are committed to mutations passing in the updated todos array (newArr):

```js
async fetchSingleTodo(ctx, todo) {
      try {
        const res = await fetch(
          "https://dev-test-api-one.herokuapp.com/todos/" + todo.id
        );
        if (res.status !== 200) {
          throw new Error("Unable to fetch data");
        }
        const data = await res.json();
        const newArr = ctx.state.todos.map((todo) => {
          if (todo.id == data.id) {
            return data;
          }
          return todo;
        });
        ctx.commit("setTodosData", newArr);
      } catch (err) {
        console.log(err.message);
        ctx.commit("setError", "Unable to access the data base at this time");
      }
    },

```

Below: The last part of the process to update state.todos:

```js
// mutations
mutations: {
    setTodosData(state, data) {
      state.todos = data;
    },
```

The `fetchSingleTodo` step ensures that any changes to store.state is coming directly from the database and not short cutting the process. This reduces the risk of inconsistency.

> A **Conditional class** is used to provide a strike-through text-decoration on completed tasks.

## Add new task workflow

The workflow starts in the nested `AddTask` component. The user fills in the input and hits enter or clicks to add.
The `handleSubmit` function creates a new task object and dispatches the new task object to the `addTodo` function within **actions**:

```js
export default {
  props: ["todo"],
  setup(props) {
    const store = useStore();
    const task = ref("");
    // The below object: 'complete' is used to toggle check box and strike-through, 'update' is used to toggle input/<p> tag so the user can update task text
    const handleSubmit = () => {
      const newTodo = {
        id: Math.floor(Math.random() * 100000000 + 1),
        text: task.value,
        complete: false,
        update: false,
      };
      store.dispatch(props.todo + "/addTodo", newTodo);
      task.value = "";
    };

    return { handleSubmit, task };
  },
};
```

Below is the `addTodo` function within **actions**: The new task is passed in (newTodo) and posted to the database. Once returned the new todo is fetched and a new array is created (newArr) spreading the existing state.todos and the new todo (data) into it.
The changes are committed to **mutations** passing in `newArr`:

```js

async addTodo(ctx, newTodo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        const res = await fetch(
          "https://dev-test-api-one.herokuapp.com/todos/" + newTodo.id
        );
        if (res.status !== 200) {
          throw new Error("Unable to fetch data");
        }
        const data = await res.json();
        const newArr = [...ctx.state.todos, data];
        ctx.commit("setTodosData", newArr);
      } catch (err) {
        console.log(err.message);
      }
    },

```

Below: The updated todos array is set as the value of `state.todos`:

```js
mutations: {
    setTodosData(state, data) {
      state.todos = data;
    },

```

## Update todo text content workflow

**Note**: Application currently being refactored with refined workflows

## Getters - working with computed properties to filter todo lists

This section is a work in progress
