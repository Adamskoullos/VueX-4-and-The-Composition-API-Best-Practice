<template>
  <div class="container-todo">
    <AddTask />
    <TaskListTwo :store="store.state.todoTwo" />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated } from "@vue/runtime-core";
  import AddTask from "../components/AddTask.vue";
  import TaskListTwo from "../components/TaskListTwo.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTask, TaskListTwo },
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
