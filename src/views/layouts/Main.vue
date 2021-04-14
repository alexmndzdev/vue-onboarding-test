<template>
  <div class="main">
    <Navbar />
    <div class="container">
      <template v-for="user in users" >
        <Card :key="user.id" :user-data="user" />
      </template>
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import Card from '../../components/Card.vue';
import axios from '../../axios';

export default {
  name: 'Main',
  components: {
    Navbar,
    Card,
  },
  data() {
    return {
      users: [],
    };
  },
  beforeMount() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const { data } = await axios.RE.get('users');
      this.users = data.data;
    },
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
