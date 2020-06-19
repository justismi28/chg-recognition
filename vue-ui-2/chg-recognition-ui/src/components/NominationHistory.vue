<template>
  <div id="nominationHistory" class="component">
    <h1>Nominations</h1>
    <div class="card-list">
      <NominationCard
        v-for="n in orderBy(nominations, 'date', -1)"
          v-bind:nomination="n"
          v-bind:nominator="usersById[n.nominatorId]"
          v-bind:nominee="usersById[n.nomineeId]"
          v-bind:key="n._id"
          class="NominationCard"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NominationCard from '@/components/NominationCard'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

export default {

  data () {
    return {
      'nominations': null,
      'nominator': null,
      'nominee': null,
      'users': [],
      'usersById': null,
      title: null
    }
  },
  mixins: [Vue2Filters.mixin],

  components: {
    NominationCard
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

    try {
      let response = await axios.get('https://chg-recognition.curtisporter.com/nominations/')
      this.nominations = response.data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component {
    padding: 20px;
}

.card-list {
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;

}
</style>
