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

## Planning

1. Identify and model the core VueX workflows
2. Identify/set up two end points to be used for the Todo's
3. Setup the project: Vue CLI (Vue-router, VueX, SASS)
4. Identify the Components to be used
5. setup the router and test

6. Build out the VueX modules (one for each Todo list) and wire up as I go:

   - Once the workflow to pull in the data from the end point is in place, get some styling done for what can be done at that point
   - Work through each CRUD workflow working it out as I go

7. Testing

8. Deployment

## Research Stage

1. VueX

My research into the core VueX principles and workflows can be found here: https://github.com/Adamskoullos/VueX-Guide

2. API end-points

I couldn't use the basic json-placeholder api's as I needed two and also need to save db state. I also didn't want to use local storage as the whole point is to model real life workflows. This meant using Axios/Fetch with the async try/catch pattern each time connecting to the db and also dealing with updating the VueX store each time.

Ania Kubow has a great YouTube video detailing how to make mock api's and deploy them to Heroku: https://www.youtube.com/watch?v=FLnxgSZ0DG4

I did this and the process to build the two mock api's used for this project can be found here:

- https://github.com/Adamskoullos/mock-api-one

- https://github.com/Adamskoullos/mock-api-two

### Development Stage
