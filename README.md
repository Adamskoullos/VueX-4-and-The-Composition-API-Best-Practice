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

1. Modelling the set up structure for VueX 4 + Compistion API to use separate module files
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

**Note**: Moving forward all code is working with Vue3 composition api + VueX 4.

This sections covers noteworthy parts of the build process.

**Issue**: When using modules and namespace scoping there is a best practice to target the properties of a specific module:

```js
const fetchData = () => {
  store.dispatch("moduleName/actionFunction");
};
```

**Fixed**: Each module requires `namespaced: true`, I had set it as `namespace: true`. Now I can refactor and make nested components reusable.

## Fetching data on initial load

**Note**: Application currently being refactored with refined workflows

## Updating Task to complete

**Note**: Application currently being refactored with refined workflows

> A **Conditional class** is used to provide a strike-through text-decoration on completed tasks.

## Add new task workflow

**Note**: Application currently being refactored with refined workflows

## Update todo text content workflow

**Note**: Application currently being refactored with refined workflows

## Getters - working with computed properties to filter todo lists

This section is a work in progress
