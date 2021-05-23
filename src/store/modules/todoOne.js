export const todoOne = {
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
    async fetchTodosData(ctx) {
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
  },
  getters: {},
};
