<template>
  <div class="container-todo">
    <AddTask />
    <TaskList :store="store.state.todoOne" />
  </div>
</template>

<script>
  import { onBeforeMount, onMounted, onUpdated } from "@vue/runtime-core";
  import AddTask from "../components/AddTask.vue";
  import TaskList from "../components/TaskList.vue";
  import { useStore } from "vuex";

  export default {
    components: { AddTask, TaskList },
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
