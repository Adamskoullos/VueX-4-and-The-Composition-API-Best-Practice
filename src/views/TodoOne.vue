<template>
  <div class="container-todo">
    <AddTask :todo="moduleOne" />
    <TaskList :todo="moduleOne" :st="st" />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated, ref } from "@vue/runtime-core";
  import AddTask from "../components/AddTask.vue";
  import TaskList from "../components/TaskList.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTask, TaskList },
    setup() {
      const store = useStore();
      const st = ref(store.state.todoOne);
      const moduleOne = ref("todoOne");

      const fetchData = () => {
        store.dispatch("todoOne/fetchTodo");
      };

      onBeforeMount(() => {
        fetchData();
      });

      onUpdated(() => {
        fetchData();
      });

      return { store, moduleOne, st };
    },
  };
</script>

<style lang="scss">
  .container-todo {
    margin: 40px 50px;
  }
  @media (min-width: 200px) and (max-width: 499px) {
    .container-todo {
      margin: 40px 0;
    }
  }
</style>
