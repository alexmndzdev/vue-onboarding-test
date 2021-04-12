<template>
  <div class="main">
    <Navbar />
    <div class="container">
      <template v-for="n in 10" >
        <Card :key="n"/>
      </template>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import Card from '../../components/Card.vue';

export default {
  name: 'Main',
  components: {
    Navbar,
    Card,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';
@import '../../assets/scss/mixins.scss';
div.main {
  div.container{
    padding-top: 20px;
    display: block;
    @include sm {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
    }
  }
}
</style>
