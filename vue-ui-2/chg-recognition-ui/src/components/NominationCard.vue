<template>
  <div class="card nomination-card card-collapser mt-3" style="width: 30rem;">
    <div class="row" data-toggle="collapse">
        <div class="col-md-8 nominee" style="color: #F48221; font-weight: bold">
            <span style="font-size: xx-large">{{ nominee.name }}</span>
        </div>
        <div class="col-md-3 points" style="color: #82B941; text-align: right; font-size: large; font-weight: bold">
          +{{ nomination.points }}<br/><span style="color: black; font-size: small; font-weight: normal">{{ nomination.date | formatDate }}</span>
        </div>
        <div class="col-md-1" style="text-align: right; font-size: small">
          <a data-toggle="collapse" class="collapsed" :href="'#test-data' + nomination._id" aria-expanded="true" aria-controls="test-block" style="font-size: small"><i class="fa fa-chevron-up pull-right"></i></a>
        </div>
        <div class="col-md-8 core-value" style="color: #00A3E4; font-size: small">{{ nomination.coreValue }}</div>
        <div class="col-md-3 date" style="text-align: right; font-size: small">
        </div>
        <div class="col-md-1" style="text-align: right; font-size: small">
        </div>
    </div>
    <div :id="'test-data' + nomination._id" class="row collapse">
        <div class="col-md-8 nominator" style="font-size: small">Nominated by {{ nominator.name }}</div>
        <div class="col-md-12 message">{{ nomination.message }}</div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

Vue.filter('formatDate', function (value) {
  if (value) {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: 'numeric' })
    const [{ value: month },, { value: day },, { value: year }] = dateTimeFormat.formatToParts(new Date(String(value)))
    return `${month}/${day}/${year}`
  }
})

export default {
  props: {
    'nomination': null,
    'nominator': null,
    'nominee': null
  },

  mixins: [Vue2Filters.mixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #AAAAAA;
}

.nomination-card {
    /* color: #F48221; */
    background-color: #F0F0F0;
    font-family: "HelveticaNeue-Bold", "Helvetica Neue Bold", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    padding: 8px;
    text-align: left;
}

.card-list {
    padding: 8px;
}

.card-collapser .fa {
  transition: .3s transform ease-in-out;
}
.card-collapser .collapsed .fa {
  transform: rotate(180deg);
}
</style>
