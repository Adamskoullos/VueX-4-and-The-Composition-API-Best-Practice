<template>
  <div class="nav-wrapper">
    <h2>Branding</h2>
    <div id="nav">
      <router-link :to="{ name: 'TodoOne' }">Todo One</router-link>
      <router-link :to="{ name: 'TodoTwo' }">Todo Two</router-link>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .nav-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100px;

    h2 {
      margin: auto auto auto 50px;
      font-weight: 500;
      font-size: 28px;
    }

    #nav {
      margin: auto 50px auto auto;
      display: flex;
      align-items: center;

      a {
        margin: 20px;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
      }
      a.router-link-active {
        border-bottom: 3px solid #aeadf6;
      }
    }
  }
</style>
