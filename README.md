# VueX Best Practices

A Todo application mapping VueX processes for each CRUD workflow. The project to be structured as if a large project, leveraging VueX modules.

## Criteria

1. Vue.js, VueX, Vue-router and SASS to be used
2. Three page application:
   - Todo 1:
     - Home page redirected
   - Todo 2
   - 404 page
3. No CSS/font-end frameworks
4. No component libraries
5. Built to match design specification
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
   - Update task to alter text content
   - Add new task workflow plus styling
   - Remove task workflow

8. Loaders, Transitions, Hovers & 404 page

9. Testing

10. Deployment

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

This sections covers noteworthy parts of the build process.

**Issue**: When using modules and namespace scoping there is a best practice to target the properties of a specific module:

```js
const fetchData = () => {
  store.dispatch("moduleName/actionFunction");
};
```

Unfortunately prefixing the action with the module name was creating errors for me, I am assuming this is because I have got something else not quite right elsewhere. I moved on from this by giving the relevant actions different names in each module: `fetchTodoOne` & `fetchTodoTwo`. This is the only change needed as all other naming for this workflow is within the modules, hence scoped.

## Fetching data on initial load --------------------------------------------

Each todo view/page has the following pattern which is triggered by the Vue lifecycle hook `onBeforeMount`:

```js
<template>
  <div class="container-todo">
    <AddTask />
    <TaskList :store="store.state.todoOne" />
  </div>
</template>

<script>
  import { onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core";
  import AddTask from "../components/AddTask.vue";
  import TaskList from "../components/TaskList.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTask, TaskList },
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

## Updating Task to complete ----------------------------------------------------------

The workflow is triggered in the `TaskList` component when the user clicks on the task.
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

A **Conditional class** is used to provide a strike-through text-decoration on completed tasks.
