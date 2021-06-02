<template>
  <form class="container-add-task" @submit.prevent="handleSubmit">
    <h3>Create a new task</h3>
    <div class="input-div">
      <input type="text" v-model="task" />
      <button>Add</button>
    </div>
  </form>
</template>

<script>
  import { ref } from "@vue/reactivity";
  import { useStore } from "vuex";

  export default {
    setup() {
      const store = useStore();
      const task = ref("");
      // The below object: 'complete' is used to toggle check box and strike-through, 'update' is used to toggle input/<p> tag so the user can update task text
      const handleSubmit = () => {
        const newTodo = {
          id: Math.floor(Math.random() * 100000000 + 1),
          text: task.value,
          complete: false,
          update: false,
        };
        store.dispatch("todoOne/addTodo", newTodo);
        task.value = "";
      };

      return { handleSubmit, task };
    },
  };
</script>

<style lang="scss">
  .container-add-task {
    max-width: 900px;
    margin: auto;
    margin-bottom: 50px;

    h3 {
      font-weight: 400;
    }

    .input-div {
      display: flex;
      align-items: center;
      justify-content: stretch;

      input {
        flex: 1 1;
        padding: 20px 10px;
        margin: 10px;
        border-radius: 6px;
        background: #ecf0f3;
        border: none;
        border: 2px solid #ecf0f3;
        font-size: 18px;
      }
      input:focus {
        outline: #aeadf6;
        border: 2px solid #aeadf6;
      }
      button {
        margin: 10px;
        background: #81e597;
        border: none;
        font-size: 16px;
        font-weight: 500;
        line-height: 30px;
        border-radius: 4px;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
        padding: 5px 10px;
        box-shadow: 0px 0px 20px 4px rgba(129, 229, 151, 0.3);
        transition: all ease 0.2s;
      }
      button:hover {
        transform: scale(1.05);
        transition: all ease 0.2s;
      }
    }
  }
  @media (min-width: 200px) and (max-width: 499px) {
    form.container-add-task {
      margin: 10px;

      h3 {
        text-align: center;
      }

      .input-div {
        flex: 1;
        flex-wrap: wrap;
        justify-content: center;

        input {
          margin: 10px 0;
        }
      }
    }
  }
</style>
