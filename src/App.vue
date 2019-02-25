<template>
  <div id="app">
    <issues />
  </div>
</template>

<script>
import Issues from './components/Issues.vue'

export default {
  name: 'app',
  components: {
    Issues
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
