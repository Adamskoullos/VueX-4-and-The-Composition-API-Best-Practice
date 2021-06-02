<template>
  <div class="container-todo">
    <AddTaskTwo />
    <TaskListTwo />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated } from "@vue/runtime-core";
  import AddTaskTwo from "../components/AddTaskTwo.vue";
  import TaskListTwo from "../components/TaskListTwo.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTaskTwo, TaskListTwo },
    setup() {
      const store = useStore();

      const fetchData = () => {
        store.dispatch("todoTwo/fetchTodo");
      };

      onBeforeMount(() => {
        fetchData();
      });

      onUpdated(() => {
        fetchData();
      });

      return { store };
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
