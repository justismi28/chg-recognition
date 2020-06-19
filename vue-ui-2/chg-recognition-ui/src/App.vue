<template>
  <div id="app">
    <img src="./assets/logo.png">
    <b-nav tabs>
      <b-nav-item href="#/">Nomination Form</b-nav-item>
      <b-nav-item href="#/history">History</b-nav-item>
      <b-nav-item href="#/users">Users</b-nav-item>
    </b-nav>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavPlugin } from 'bootstrap-vue'

Vue.use(NavPlugin)

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
