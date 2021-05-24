<template>
  <div class="task-list" v-if="st.todos">
    <div class="task" v-for="todo in st.todos" :key="todo.id">
      <p :class="{ strike: todo.complete }">{{ todo.text }}</p>
      <span
        class="material-icons outline"
        v-if="!todo.complete"
        @click="handleComplete(todo)"
        >check_box_outline_blank</span
      >
      <span
        class="material-icons"
        v-if="todo.complete"
        @click="handleComplete(todo)"
        >check_box</span
      >
      <span class="material-icons edit">edit</span>
    </div>
  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>

<script>
  import { useStore } from "vuex";

  export default {
    setup() {
      const store = useStore();
      const st = store.state.todoOne;

      const handleComplete = (todo) => {
        store.dispatch("toggleCompleteOne", todo);
      };

      return { handleComplete, st };
    },
  };
</script>

<style lang="scss">
  .task-list {
    max-width: 900px;
    margin: auto;

    .task {
      //   background: gray;
      display: flex;
      align-items: center;
      justify-content: stretch;
      margin: 10px;

      p {
        flex: 1;
        margin: 10px 15px 10px 0;
        padding: 10px;
        // border-bottom: 2px solid #aeadf6;
        border-bottom: 2px solid #e5e8ea;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        color: #505050;
      }
      p.strike {
        text-decoration: line-through;
      }

      span {
        margin: auto 5px;
        font-size: 32px;
        color: #81e597;
        border-radius: 4px;
        cursor: pointer;
      }
      span.outline {
        color: #e5e8ea;
        cursor: pointer;
      }
      span.edit {
        font-size: 26px;
        color: #8288a1;
        cursor: pointer;
      }
    }
  }
</style>
