<template>
  <div class="container-add-task">
    <h3>Create a new task</h3>
    <div class="input-div">
      <input type="text" />
      <button>Add</button>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  .container-add-task {
    max-width: 900px;
    margin: auto;

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
      }
      input:focus {
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
