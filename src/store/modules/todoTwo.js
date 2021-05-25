export const todoTwo = {
  namespace: true,

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
    // This first action is the core of all workflows and updates the store.state every time there has been a change
    async fetchTodoTwo(ctx) {
      ctx.commit("setIsLoading", true);
      ctx.commit("setError", "");
      try {
        const res = await fetch("https://dev-test-api-two.herokuapp.com/todos");
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
    async toggleCompleteTwo(ctx, todo) {
      try {
        await fetch("https://dev-test-api-two.herokuapp.com/todos/" + todo.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ complete: !todo.complete }),
        });
        await ctx.dispatch("fetchTodoTwo");
      } catch (err) {
        console.log(err.message);
      }
    },
    async addTodoTwo(ctx, newTodo) {
      try {
        await fetch("https://dev-test-api-two.herokuapp.com/todos", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        await ctx.dispatch("fetchTodoTwo");
      } catch (err) {
        console.log(err.message);
      }
    },
    async deleteTodoTwo(ctx, todo) {
      try {
        await fetch("https://dev-test-api-two.herokuapp.com/todos/" + todo.id, {
          method: "delete",
        });
        await ctx.dispatch("fetchTodoTwo");
      } catch (err) {
        console.log(err.message);
      }
    },
    async updateTodoTwo(ctx, todo) {
      try {
        await fetch("https://dev-test-api-two.herokuapp.com/todos/" + todo.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ update: !todo.update }),
        });
        await ctx.dispatch("fetchTodoTwo");
      } catch (err) {
        console.log(err.message);
      }
    },
    async updateTodoTextTwo(ctx, todo, text) {
      try {
        await fetch("https://dev-test-api-two.herokuapp.com/todos/" + todo.id, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            update: !todo.update,
            text: todo.text,
            complete: false,
          }),
        });
        await ctx.dispatch("fetchTodoTwo");
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  getters: {},
};
