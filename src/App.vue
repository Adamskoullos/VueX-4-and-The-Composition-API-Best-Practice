<template>
  <div class="container-outer">
    <div class="container-inner">
      <NavBar />
      <router-view />
    </div>
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue";

  export default {
    components: { NavBar },
    setup() {},
  };
</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: Roboto;
  }
  .container-outer {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(303.46deg, #aeadf6 59.26%, #d3d4ff 100.01%);
  }
  .container-inner {
    margin: auto;
    background: #ffffff;
    width: 90%;
    max-width: 1280px;
    min-height: 800px;
    border-radius: 24px;
    box-shadow: 0px 6px 30px 12px rgba(158, 157, 201, 0.6);

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
</style>
