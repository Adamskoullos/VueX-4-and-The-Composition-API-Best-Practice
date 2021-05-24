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
        store.dispatch("fetchTodoTwo");
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
    // background: orangered;
    margin: 40px 50px;
  }
</style>
