<template>
  <div class="task-list" v-if="st.todos">
    <div class="task" v-for="todo in st.todos" :key="todo.id">
      <p :class="{ strike: todo.complete }" v-if="!todo.update">
        {{ todo.text }}
      </p>
      <input
        type="text"
        v-if="todo.update"
        v-model="todo.text"
        class="update-todo"
      />
      <span
        class="material-icons outline"
        v-if="!todo.complete && !todo.update"
        @click="handleComplete(todo)"
        >check_box_outline_blank</span
      >
      <span
        class="material-icons"
        v-if="todo.complete && !todo.update"
        @click="handleComplete(todo)"
        >check_box</span
      >
      <span
        class="material-icons edit"
        @click="handleUpdate(todo)"
        v-if="!todo.update"
        >edit</span
      >
      <span
        class="material-icons edit"
        @click="handleDelete(todo)"
        v-if="!todo.update"
        >delete</span
      >
      <span class="material-icons-outlined edit save" v-if="todo.update">
        save
      </span>
      <span
        class="material-icons-outlined edit back"
        v-if="todo.update"
        @click="handleUpdate(todo)"
      >
        backspace
      </span>
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

      const handleDelete = (todo) => {
        store.dispatch("deleteTodoOne", todo);
      };

      const handleUpdate = (todo) => {
        store.dispatch("updateTodoOne", todo);
      };

      return { handleComplete, st, handleDelete, handleUpdate };
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
      input {
        flex: 1;
        padding: 10px;
        margin: 10px 10px 10px 0;
        border-radius: 6px;
        background: #ecf0f3;
        border: none;
        border: 2px solid #ecf0f3;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
      }
      input:focus {
        outline: #aeadf6;
        border: 2px solid #aeadf6;
      }

      span {
        margin: auto 5px;
        font-size: 32px;
        color: #81e597;
        border-radius: 4px;
        cursor: pointer;
        transition: all ease 0.2s;
      }
      span:hover {
        transform: scale(1.1);
        transition: all ease 0.2s;
      }

      span.outline {
        color: #e5e8ea;
        cursor: pointer;
      }
      span.outline:hover {
        color: #a8a9aa !important;
      }
      span.edit {
        font-size: 26px;
        color: #a8a9aa7a !important;
        cursor: pointer;
      }
      span.edit:hover {
        color: #a8a9aa !important;
      }
      span.edit.back {
        font-size: 28px;
        color: #a8a9aa7a !important;
      }
      span.edit.save {
        font-size: 28px;
        color: #81e597 !important;
      }
      span.edit.save:hover {
        font-size: 28px;
        color: #81e597 !important;
      }
    }
  }
</style>
