<template>
  <div class="container-todo">
    <AddTask :todo="moduleTwo" />
    <TaskListTwo />
  </div>
</template>

<script>
  import { onBeforeMount, onUpdated, ref } from "@vue/runtime-core";
  import AddTask from "../components/AddTask.vue";
  import TaskListTwo from "../components/TaskListTwo.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTask, TaskListTwo },
    setup() {
      const store = useStore();
      const moduleTwo = ref("todoTwo");

      const fetchData = () => {
        store.dispatch("todoTwo/fetchTodo");
      };

      onBeforeMount(() => {
        fetchData();
      });

      onUpdated(() => {
        fetchData();
      });

      return { store, moduleTwo };
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
