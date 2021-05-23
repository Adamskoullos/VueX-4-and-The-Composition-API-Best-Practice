import { createStore } from "vuex";
import { todoOne } from "./modules/todoOne";

export const store = createStore({
  modules: {
    todoOne,
  },
});
