<template>
  <div class="container-todo">
    <AddTask />
    <TaskList />
  </div>
</template>

<script>
  import AddTask from "../components/AddTask.vue";
  import TaskList from "../components/TaskList.vue";

  export default {
    components: { AddTask, TaskList },
  };
</script>

<style lang="scss">
  .container-todo {
    // background: orangered;
    margin: 40px 50px;
  }
</style>
