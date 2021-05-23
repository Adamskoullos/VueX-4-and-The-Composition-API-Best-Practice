<template>
  <form class="container-add-task" @submit.prevent="handleSubmit">
    <h3>Create a new task</h3>
    <div class="input-div">
      <input type="text" />
      <button>Add</button>
    </div>
  </form>
</template>

<script>
  export default {
    setup() {
      const handleSubmit = async () => {};

      return { handleSubmit };
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
        flex: 1;
        padding: 20px 10px;
        margin: 10px;
        border-radius: 6px;
        background: #ecf0f3;
        border: none;
        border: 2px solid #ecf0f3;
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
      }
    }
  }
</style>
