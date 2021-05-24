<template>
  <div class="container-todo">
    <AddTaskOne />
    <TaskListOne />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated } from "@vue/runtime-core";
  import AddTaskOne from "../components/AddTaskOne.vue";
  import TaskListOne from "../components/TaskListOne.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTaskOne, TaskListOne },
    setup() {
      const store = useStore();

      const fetchData = () => {
        store.dispatch("fetchTodoOne");
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
