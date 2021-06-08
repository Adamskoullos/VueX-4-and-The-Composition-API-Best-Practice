import axios from "axios";

export const todoOne = {
  namespaced: true,

  state() {
    return {
      todos: [],
      isLoading: false,
      error: "",
      filter: "all",
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
    setUpdateTodo(state, boolean) {
      state.updateTodo = boolean;
    },
    setFilter(state, input) {
      state.filter = input;
    },
  },
  actions: {
    // This first action is the core of all workflows and updates the store.state every time there has been a change
    async fetchTodo(ctx) {
      ctx.commit("setIsLoading", true);
      ctx.commit("setError", "");
      try {
        const res = await axios.get(
          "https://dev-test-api-one.herokuapp.com/todos"
        );
        ctx.commit("setTodosData", res.data);
        ctx.commit("setIsLoading", false);
      } catch (error) {
        if (error.request) {
          // Code to run...
          console.log(error.message);
          console.log(error.request);
        } else if (error.response) {
          // Code to run...
          console.log(error.message);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.statusText);
          console.log(error.response.headers);
          console.log(error.toJSON);
        } else {
          // Code to run...
          console.log(error.message);
          console.log(error.toJSON);
        }
        ctx.commit("setError", "Sorry, unable to fetch todo list at this time");
        ctx.commit("setIsLoading", false);
      }
    },
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
    async deleteTodo(ctx, todo) {
      try {
        await fetch("https://dev-test-api-one.herokuapp.com/todos/" + todo.id, {
          method: "delete",
        });
        const newArr = ctx.state.todos.filter((task) => task.id != todo.id);
        ctx.commit("setTodosData", newArr);
      } catch (err) {
        console.log(err.message);
      }
    },
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
        await ctx.dispatch("fetchSingleTodo", todo);
      } catch (err) {
        console.log(err.message);
      }
    },
    filterTodoList(ctx, input) {
      ctx.commit("setFilter", input);
    },
  },
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
};
