<template>
  <div class="page-not-found">
    <h1>404</h1>
    <h3>Page Not Found</h3>
    <router-link :to="{ name: 'TodoOne' }" class="button"
      >Take me home</router-link
    >
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  div.page-not-found {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    h1 {
      font-size: 100px;
      font-weight: 400;
      margin-bottom: 30px;
    }
    h3 {
      font-size: 60px;
      font-weight: 400;
    }
    .button {
      margin: 50px;
      font-size: 30px;
      border: none;
      background: #81e597;
      padding: 10px;
      border-radius: 6px;
      color: #fff;
      box-shadow: 0px 0px 20px 6px rgba(129, 229, 151, 0.3);
      cursor: pointer;
      text-decoration: none;
    }
  }
</style>
