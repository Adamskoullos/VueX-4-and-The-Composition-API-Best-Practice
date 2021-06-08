<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/120801408-06a1b200-c539-11eb-8c83-ce2d985e223b.png" style="margin: 30px auto"></div>

<br>

# [Live Link](https://vues-crud-workflows.netlify.app/)

Live app uses Heroku and is deployed to Netlify

# VueX 4 + Composition API Best Practices

A Todo application mapping VueX processes for each CRUD workflow. The project to be structured as if a large project, leveraging VueX modules.

### Main focus:

1. Modelling the set up structure for VueX 4 + Composition API to use separate module files
2. Each nested component to be reusable
3. Only updating the Store with the minimum required data for each workflow, working with local state where suitable to make the user experience as fluid as possible

---

ToC - Core Patterns & Workflows:

1. [VueX Modules & Reusable Components](#VueX-Modules-and-Reusable-Components)
2. [Updating Task To Complete](#Updating-Task-To-Complete)
3. [Add New Task Workflow](#Add-New-Task-Workflow)
4. [Update Todo Text Content Workflow](#Update-Todo-Text-Content-Workflow)
5. [Delete Todo Workflow](#Delete-Todo-Workflow)
6. [Getters](#Getters---working-with-computed-properties-to-filter-todo-lists)

---

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

---

# Development Stage

## VueX Modules and Reusable Components

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

---

## Fetching Data On Initial Load

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
// Fetch
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

// Axios
async fetchTodo(ctx) {
      ctx.commit("setIsLoading", true);
      ctx.commit("setError", "");
      try {
        const res = await axios.get(
          "URL"
        );
        ctx.commit("setTodosData", res.data);
        ctx.commit("setIsLoading", false);
      } catch (error) {
          console.log(error.message);
        if (error.request) {
          // Code to run...
          console.log(error.request);
        } else if (error.response) {
          // Code to run...
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.statusText);
          console.log(error.response.headers);
          console.log(error.toJSON);
        } else {
          // Code to run...
          console.log(error.toJSON);
        }
        ctx.commit("setError", "Sorry, unable to fetch todo list at this time");
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

---

## Updating Task To Complete

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
        ctx.dispatch("fetchSingleTodo", todo);
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

---

## Add New Task Workflow

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

---

## Update Todo Text Content Workflow

This workflow has two parts to it. The first being the toggle between showing the user the editable input and the fixed task. The second saving any user updates to the database and rendering the updated data to the DOM.

This first part is a great example of when working with local state is a good option. Each todo has an `update` property set to false within the database. Locally this is toggled when a user clicks the edit todo icon and toggled back when they click the backward icon. This is not data to be updated and saved within the database, rather data used locally to manipulate the DOM.

Both the above icons have the `handleSubmit` callback triggered on a click event, which dispatches the `updateTodo` function within **actions**:

```js
const handleUpdate = (todo) => {
  store.dispatch(props.todo + "/updateTodo", todo);
};
```

Below: Note how this is the first action that is not asynchronous, however the workflow still follows the core VueX process.
The user clicks to edit and the edit input form is displayed. From here they can either cancel and go back or edit and save:

```js
updateTodo(ctx, todo) {
      const newArr = ctx.state.todos.map((task) => {
        if (task.id == todo.id) {
          task.update = !task.update;
          return task;
        }
        return task;
      });
      ctx.commit("setTodosData", newArr);
    },

```

Below: If the user edits and hits save the second part of the workflow is triggered via the `handleUpdateText` callback.
This dispatches the `updateTodoText` function within **actions**, passing in the todo:

```js
const handleUpdateText = (todo) => {
  store.dispatch(props.todo + "/updateTodoText", todo);
};
```

Below: The todo is grabbed from the database and a PATCH request updates the object. This sets the `update` property back to false, assigns the updated todo text and sets the todo property `complete` to false. Once returned the `fetchSingleTodo` **action** is dispatched passing in the todo in order to access its id:

```js

// actions
async updateTodoText(ctx, todo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos/" + todo.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            update: !todo.update,
            text: todo.text,
            complete: false,
          }),
        });
        ctx.dispatch("fetchSingleTodo", todo);
      } catch (err) {
        console.log(err.message);
      }
    },

```

Below: The updated todo is fetched from the database and a new updated todos array is created using map. The updated todos array is committed to **mutations** and from there set as the value of `state.todos`

```js

// actions
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

---

## Delete Todo Workflow

The workflow starts in the nested `TaskList` component when the user clicks on the trash icon to delete a task:

```js
const handleDelete = (todo) => {
  store.dispatch(props.todo + "/deleteTodo", todo);
};
```

Above: This dispatches the `deleteTodo` function within **actions** also passing in the todo to be deleted.

Below: A delete request is made to the database, once returned a new array is created (newArr) using the `filter` method which excludes the deleted task.
The changes are committed to **mutations** passing in the new array to update state.todos with:

```js
async deleteTodo(ctx, todo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos/" + todo.id, {
          method: "delete",
        });
        const newArr = ctx.state.todos.filter((task) => task.id != todo.id);
        console.log(newArr);
        ctx.commit("setTodosData", newArr);
      } catch (err) {
        console.log(err.message);
      }
    },

```

---

## Getters - working with computed properties to filter todo lists

The below example includes a single getter that returns a filtered todo list depending on the user input. There are a few moving parts here:

1. A getter that takes in a string argument used as a flag that returns a filtered todo list of either complete, incomplete or all.
2. A `filter` property within the store.state of each module that has a string value that is altered by filter tabs within the `FilterTabs` nested component. These tabs change the string value of `filter` which in turn alters the value of what the getter returns.
3. The getter is accessed via a computed property within the `TaskList` component which is used within the template within the `v-for` loop.

Here is the worklfow:

The user clicks one of the filter tabs to show a filtered todo list. This triggers the `handleFilter` callback, which dispatches the `filterTodoList` function within **actions**, passing in the input.

The below snippet shows the template and script for the `FilterTabs` component:

```html
<!-- handleFilter function passing in the string flag -->
<template>
  <div class="filter-buttons">
    <span
      class="material-icons outline"
      :class="{ activeTab: st.filter == 'incomplete' }"
      @click="handleFilter('incomplete')"
      >check_box_outline_blank</span
    >
    <span
      class="material-icons outline"
      :class="{ activeTab: st.filter == 'complete' }"
      @click="handleFilter('complete')"
      >check_box</span
    >
    <span
      class="material-icons-outlined outline"
      :class="{ activeTab: st.filter == 'all' }"
      @click="handleFilter('all')"
    >
      all_inclusive
    </span>
  </div>
</template>
```

```js
setup(props) {
      const store = useStore();
      const handleFilter = (input) => {
        store.dispatch(props.todo + "/filterTodoList", input);
      };

      return { handleFilter };
    },

```

Below: The `filterTodoList` function within **actions** is not asynchronous and simply `commits` the changes to be made up to **mutations** passing in the string flag:

```js
// actions
filterTodoList(ctx, input) {
      ctx.commit("setFilter", input);
    },

// mutations
setFilter(state, input) {
      state.filter = input;
    },

```

Now the value of `filter` within store.state has been set to the relevant string flag by the user, lets see how this flag effects what the getter returns:

```js
getters: {
    filterTodos(state) {
      if (state.filter == "all") {
        return state.todos;
      }
      if (state.filter == "complete") {
        return state.todos.filter((todo) => todo.complete);
      }
      if (state.filter == "incomplete") {
        return state.todos.filter((todo) => todo.complete == false);
      }
    },
  },


```

To access the getter and its returned value within the `TaskList` component where the value is rendered to the DOM, we create a computed property that returns the getter's returned value:

```js
const filterTodos = computed(() => {
  return store.getters[props.todo + "/filterTodos"];
});
```

We then return the computed property from the `setup()` function so we can access it within the template:

```html
<div class="task" v-for="todo in filterTodos" :key="todo.id"></div>
```
