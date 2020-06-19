<template>
  <div id="nominationForm" class="component">
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
import axios from 'axios'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

export default {
  data () {
    return {
      'coreValueCategory': null,
      'nominator': null,
      'nominee': null,
      'points': 50,
      'message': null,
      'users': [],
      title: null,
      showNominationForm: true,
      coreValueOptions: [ 'Putting People First', 'Quality & Professionalism', 'Growth', 'Continuous Improvement', 'Integrity & Ethics' ]
    }
  },

  async mounted () {
    try {
      let response = await axios.get('https://chg-recognition.curtisporter.com/users/')
      this.users = response.data
      this.usersById = this.users.reduce(function (usersById, user) { usersById[user._id] = user; return usersById }, {})
      console.log('Finished populating usersById ' + JSON.stringify(this.usersById['5e729a3c6ea33327d2851b4f'], null, 2))
    } catch (err) {
      console.log(err)
    }
  },

  methods: {
    submitNomination () {
      this.formDisabled = true
      let postBody = {
        'nominatorId': this.nominator,
        'nomineeId': this.nominee,
        'points': parseInt(this.points),
        'coreValue': this.coreValueCategory,
        'message': this.message
      }
      let isOk = window.confirm('Submit this nomination?')

      if (isOk) {
        console.log('Submitting: ' + JSON.stringify(postBody, null, 2))
        axios({
          url: 'https://chg-recognition.curtisporter.com/nominations/',
          data: postBody,
          method: 'POST',
          mode: 'cors'
        }).then(response => {
          alert('submitted')
        }).catch((error) => {
          console.log(error)
          alert('there was an error submitting ' + error)
        }).finally((blah) => {
          this.formDisabled = false
        })
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component {
    padding: 20px;
    text-align: left;
}
</style>
