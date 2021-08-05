<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <h2 @click="$store.commit('add')">{{ $store.state.counter }}</h2>
    <h2 @click="handleAsyncClick">async: {{ $store.state.counter }}</h2>
    <h2>doubleCounter: {{ $store.getters.doubleCounter }}</h2>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    handleAsyncClick () {
      this.$store.dispatch('add')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
