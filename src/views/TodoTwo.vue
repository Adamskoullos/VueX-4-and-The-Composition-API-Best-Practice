<template>
  <div class="container-todo">
    <AddTask :todo="moduleTwo" />
    <TaskList :todo="moduleTwo" :st="st" />
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
      const st = store.state.todoTwo;
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

      return { store, moduleTwo, st };
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
