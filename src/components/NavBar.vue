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
    flex-wrap: wrap;

    h2 {
      margin: auto auto auto 60px;
      font-weight: 500;
      font-size: 28px;
    }

    #nav {
      margin: auto 40px auto auto;
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
  @media (min-width: 200px) and (max-width: 499px) {
    .nav-wrapper h2 {
      margin: 30px auto 30px auto;
      width: 300px;
      text-align: center;
    }

    .nav-wrapper #nav {
      justify-content: center;
      margin: auto;

      a {
        margin: 0 10px 20px 10px;
      }
    }
  }
</style>
