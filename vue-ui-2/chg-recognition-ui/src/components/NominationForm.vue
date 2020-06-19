<template>
  <div id="nominationForm">
    <form v-show="showNominationForm">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Nominee Name</label>
                <v-select :options="users" label="name" :reduce="user => user._id" placeholder="Who do you want to nominate?" v-model="nominee"></v-select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Your Name</label>
                <v-select :options="users" label="name" :reduce="user => user._id" placeholder="YOUR name (nominator)?" v-model="nominator"></v-select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="coreValInput">Core Value</label>
                <select name="coreValInput" id="coreValInput" class="form-control"
                        aria-describedby="Core value selection" v-model="coreValueCategory">
                   <option v-for="o in coreValueOptions" :key="o.value" :value="o">{{o}}</option>
                </select>
                <small id="coreValueHelp" class="form-text text-muted">Select the CHG core value that most describes what this person did</small>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-1">
                <label for="points">Points</label>
                <input class="form-control " v-model="points" step=5 type="number" min="50" max="1234" name="points" id="points" aria-describedby="Points given"/>
            </div>
            <div class="form-group col-md-5">
                <label>&nbsp;</label>
                <input class="form-control-range " v-model="points" step=5 type="range" min="50" max="1234" name="points" id="points" aria-describedby="Points given"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Message</label>
                <textarea class="form-control" v-model="message" v-bind:placeholder="nominee ? 'Describe why you are nominating ' + nominee : ''"></textarea>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button v-on:click="submitNomination(); return false;" class="btn btn-primary btn-lg btn-block">Submit</button>
                <br>
            </div>
        </div>

    </form>
</div>
</template>

<script>
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import { axios } from 'axios'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

Vue.use(Vue2Filters)

export default {
  data () {
    return {
      'coreValueCategory': null,
      'nominator': null,
      'nominee': null,
      'points': 50,
      'message': null,
      title: null,
      showNominationForm: true,
      coreValueOptions: [ 'Putting People First', 'Quality & Professionalism', 'Growth', 'Continuous Improvement', 'Integrity & Ethics' ]
    }
  },
  mixins: [Vue2Filters.mixin],

  mounted () {
    axios.get('https://chg-recognition.curtisporter.com/nominations/')
      .then((response) => (this.nominations = response.data))

    axios.get('https://chg-recognition.curtisporter.com/users/')
      .then(response => {
        this.users = response.data
        this.usersById = this.users.reduce(function (usersById, user) { usersById[user._id] = user; return usersById }, {})
        console.log(this.users.filter(user => user._id === '5e729a3c6ea33327d2851b4f'))
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
