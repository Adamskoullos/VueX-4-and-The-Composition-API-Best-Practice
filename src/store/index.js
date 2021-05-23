import { createStore } from "vuex";
import { todoOne } from "./modules/todoOne.js";

const store = createStore({
  modules: {
    todoOne,
  },
});

export default store;
