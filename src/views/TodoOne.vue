<template>
  <div class="container-todo">
    <AddTask :todo="moduleOne" />
    <TaskListOne />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated, ref } from "@vue/runtime-core";
  import AddTask from "../components/AddTask.vue";
  import TaskListOne from "../components/TaskListOne.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTask, TaskListOne },
    setup() {
      const store = useStore();
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

      return { store, moduleOne };
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
