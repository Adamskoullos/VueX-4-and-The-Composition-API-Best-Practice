import { createStore } from "vuex";
import { todoOne } from "./modules/todoOne.js";
import { todoTwo } from "./modules/todoTwo.js";

const store = createStore({
  modules: {
    todoOne,
    todoTwo,
  },
});

export default store;
