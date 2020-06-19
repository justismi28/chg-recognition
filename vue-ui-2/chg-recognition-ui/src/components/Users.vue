<template>
  <div id="users" class="table table-striped table-hover">
      <h1>Users </h1>
      <table>
          <thead>
              <th>Name</th>
              <th>Points</th>
              <th>Nomination Points</th>
              <th>Login</th>
              <th>Id</th>
          </thead>
          <tbody>
              <tr v-for="u in users" :key="u._id">
                  <td>{{u.name}}</td>
                  <td>{{u.points}}</td>
                  <td>{{u.nominationPoints}}</td>
                  <td>{{u.login}}</td>
                  <td>{{u._id}}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      'users': [],
      'usersById': null,
      title: null
    }
  },

  mounted () {
    axios.get('https://chg-recognition.curtisporter.com/users/')
      .then(response => {
        this.users = response.data
        this.usersById = this.users.reduce(function (usersById, user) { usersById[user._id] = user; return usersById }, {})
        console.log('Finished populating usersById ' + this.users.filter(user => user._id === '5e729a3c6ea33327d2851b4f'))
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
