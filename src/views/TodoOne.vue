<template>
  <div class="container-todo">
    <AddTask />
  </div>
</template>

<script>
  import AddTask from "../components/AddTask.vue";

  export default {
    components: { AddTask },
  };
</script>

<style lang="scss">
  .container-todo {
    // background: orangered;
    margin: 40px 50px;
  }
</style>
