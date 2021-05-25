<template>
  <div class="task-list" v-if="!st.isLoading && !st.error">
    <div class="task" v-for="todo in st.todos" :key="todo.id">
      <p :class="{ strike: todo.complete }" v-if="!todo.update">
        {{ todo.text }}
      </p>
      <form
        v-if="todo.update"
        @submit.prevent="handleUpdateText(todo, todo.text)"
      >
        <input type="text" v-model="todo.text" class="update-todo" />
        <button>
          <span class="material-icons-outlined edit save">
            save
          </span>
        </button>
      </form>
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
      <span
        class="material-icons-outlined edit back"
        v-if="todo.update"
        @click="handleUpdate(todo)"
      >
        backspace
      </span>
    </div>
  </div>
  <div v-if="st.isLoading && !st.error && !st.todos">
    <Loader />
  </div>
  <div v-if="st.error" class="error">
    <h1>Sorry, unable to fetch todo list at this time</h1>
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import Loader from "../components/Loader";

  export default {
    components: { Loader },
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

      const handleUpdateText = (todo) => {
        store.dispatch("updateTodoTextOne", todo);
      };

      return {
        handleComplete,
        st,
        handleDelete,
        handleUpdate,
        handleUpdateText,
      };
    },
  };
</script>

<style lang="scss" scoped>
  div.error {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      margin: auto;
      font-size: 30px;
      font-weight: 400;
    }
  }
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
        margin: 10px 10px 10px 0;
        padding: 10px;
        border: 2px solid #ffff;
        border-bottom: 2px solid #e5e8ea;
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        color: #505050;
      }
      p.strike {
        text-decoration: line-through;
      }
      form {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: stretch;

        input {
          margin-right: 5px;
          border: 2px solid #ecf0f3;
        }

        button {
          border: none;
          background: rgba(255, 255, 255, 0);
          display: flex;
          align-items: center;
          transition: all ease 0.2s;

          span {
            font-size: 34px !important;
          }
        }
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
        color: #a8a9aa;
      }
      span.edit {
        font-size: 26px;
        color: #a8a9aa7a;
        cursor: pointer;
      }
      span.edit:hover {
        color: #a8a9aa;
      }
      span.edit.back {
        font-size: 28px;
        color: #a8a9aa7a;
        margin-right: 35px;
        margin-left: 0;
      }
      span.edit.back:hover {
        color: #a8a9aa !important;
      }
      span.edit.save {
        font-size: 28px;
        color: #81e597;
      }
      span.edit.save:hover {
        font-size: 28px;
        color: #81e597;
        transform: scale(1.07);
        transition: all ease 0.2s;
      }
    }
  }
</style>
