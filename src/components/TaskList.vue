<template>
  <div class="task-list">
    <div class="task">
      <p>Task number one</p>
      <span class="material-icons outline">check_box_outline_blank</span>
      <span class="material-icons">check_box</span>
      <span class="material-icons edit">edit</span>
    </div>
  </div>
</template>

<script>
  export default {};
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

      span {
        margin: auto 5px;
        font-size: 32px;
        color: #81e597;
        border-radius: 4px;
      }
      span.outline {
        color: #e5e8ea;
      }
      span.edit {
        font-size: 26px;
        color: #8288a1;
      }
    }
  }
</style>
