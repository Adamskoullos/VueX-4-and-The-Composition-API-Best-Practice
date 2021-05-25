<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/119489513-ad28ce80-bd53-11eb-9894-9d411d6d6ead.png" style="margin: 30px auto"></div>

<br><br>

<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/119489574-bc0f8100-bd53-11eb-8c75-21e9c3d17574.png" style="margin: 30px auto"></div>

<br><br>

<div style="width: 100%; display: flex;"><img src="https://user-images.githubusercontent.com/73107656/119497254-4360f280-bd5c-11eb-8fe9-cca2f62bafc2.png" style="margin: 30px auto"></div>

# VueX Best Practices

A Todo application mapping VueX processes for each CRUD workflow. The project to be structured as if a large project, leveraging VueX modules.

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

**Note**: Moving forward all code is working with Vue3 composition api + VueX 4.

This sections covers noteworthy parts of the build process.

**Issue**: When using modules and namespace scoping there is a best practice to target the properties of a specific module:

```js
const fetchData = () => {
  store.dispatch("moduleName/actionFunction");
};
```

Unfortunately prefixing the action with the module name was creating errors for me, I am assuming this is because I have got something else not quite right elsewhere. I moved on from this by giving the relevant actions different names in each module: `fetchTodoOne` & `fetchTodoTwo`. This is the only change needed as all other naming for this workflow is within the modules, hence scoped.

## Fetching data on initial load

Each todo view/page has the following pattern which is triggered by the Vue lifecycle hook `onBeforeMount`:

```js
<template>
  <div class="container-todo">
    <AddTaskOne />
    <TaskListOne />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated } from "@vue/runtime-core";
  import AddTaskOne from "../components/AddTaskOne.vue";
  import TaskListOne from "../components/TaskListOne.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTaskOne, TaskListOne },
    setup() {
      const store = useStore();

      const fetchData = () => {
        store.dispatch("fetchTodoOne");
      };

      onBeforeMount(() => {
        fetchData();
      });

      onUpdated(() => {
        fetchData();
      });

      return { store };
    },

```

The above process:

1. Import `useStore`, create a const `store`
2. Define `fetchData`, invoked with the `onBeforeMount` hook which dispatches to **actions** and invokes `fetchTodoOne`

3. Continuing on `fetchTodoOne` within the todoOne module is invoked triggering the VueX process below:

```js
state() {
    return {
      todos: [],
      isLoading: false,
      error: "",
    };
  },
  mutations: {
    setTodosData(state, data) {
      state.todos = data;
    },
    setIsLoading(state, boolean) {
      state.isLoading = boolean;
    },
    setError(state, err) {
      state.error = err;
    },
  },
  actions: {
    async fetchTodoOne(ctx) {
      ctx.commit("setIsLoading", true);
      ctx.commit("setError", "");
      try {
        const res = await fetch("end-point-omitted");
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

Above: If the data is successfully returned it is committed to `setTodosData` within **mutations**, which in turn sets the data as the value of `state.todos`.

## Updating Task to complete

The workflow is triggered in the `TaskListOne` component when the user clicks on the task.
Here the specific todo item is passed in giving access to it's properties:

```js
const handleComplete = (todo) => {
  store.dispatch("toggleCompleteOne", todo);
};
```

This dispatch triggers the `toggleCompleteOne` function within **actions**:

```js
async toggleCompleteOne(ctx, todo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos/" + todo.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ complete: !todo.complete }),
        });
        await ctx.dispatch("fetchTodoOne");
      } catch (err) {
        console.log(err.message);
      }
    },

```

In the above snippet, once the `PATCH` request has been successfully returned the action `fetchTodoOne` is dispatched, updating the state.todos array, which in turn provides the updated data globally to the application.

> A **Conditional class** is used to provide a strike-through text-decoration on completed tasks.

## Add new task workflow

Starting in the `AddTaskOne` component, the user input is set as the value of the `text` property within the `newTodo` object. this object is dispatched to `addTodoOne` within **actions**:

```js
setup() {
      const store = useStore();
      const task = ref("");

      const handleSubmit = () => {
        const newTodo = {
          id: Math.floor(Math.random() * 100000000 + 1),
          text: task.value,
          complete: false,
          update: false,
        };
        store.dispatch("addTodoOne", newTodo);
        task.value = "";
      };

      return { handleSubmit, task };

```

Below: The `addTodoOne` within actions takes in the `newTodo` as the second argument, once returned the `fetchTodoOne` action is dispatched to pull in the updated data, which if successfully returned is committed to **mutations** and set as the new value of `state.todos`

```js
async addTodoOne(ctx, newTodo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        await ctx.dispatch("fetchTodoOne");
      } catch (err) {
        console.log(err.message);
      }
    },

```

## Update todo text content workflow

Within the `TaskListOne` component there is both a `<p>` tag to display the todo.text and a form with an `<input>` with a v-model. Only one of the above is shown at a time.

As a default the `<p>` tag is displayed, showing the current value of the `todo.text`:

![Screenshot from 2021-05-25 07-01-43](https://user-images.githubusercontent.com/73107656/119448490-51495000-bd29-11eb-9933-46deaf66016a.png)

When the user clicks the edit icon this switches to show the `<input>` tag with a v-model for `todo.text`:

![Screenshot from 2021-05-25 07-02-36](https://user-images.githubusercontent.com/73107656/119448709-9bcacc80-bd29-11eb-8ec0-7b4d5afc98a4.png)

The user can either edit and save or cancel and go back.

![Screenshot from 2021-05-25 07-03-19](https://user-images.githubusercontent.com/73107656/119448847-c9177a80-bd29-11eb-9e0c-5af7793cc1fd.png)

The user edits the form and submits. This dispatches the `updateTodoTextOne` within **actions** passing in the todo to be updated:

```js
const handleUpdateText = (todo) => {
  store.dispatch("updateTodoTextOne", todo);
};
```

Below: The `updateTodoTextOne` within **actions**, which also dispatches the `fetchTodoOne` pulling in the updated data, which inturn commits the changes to **mutations** and assigns the updated data to the value of todos:

```js
// Actions

async updateTodoTextOne(ctx, todo) {
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
        await ctx.dispatch("fetchTodoOne");
      } catch (err) {
        console.log(err.message);
      }
    },

// -------------------------------------------------------------

// Actions

 async fetchTodoOne(ctx) {
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

// ---------------------------------------------------------------------

// Mutations

 mutations: {
    setTodosData(state, data) {
      state.todos = data;
    },

```

## Getters - working with computed properties to filter todo lists

This section is a work in progress
