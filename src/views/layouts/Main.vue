<template>
  <div class="main">
    <Navbar />
    <div id="container" class="container">
      <template v-for="user in users" >
        <Card
          :key="user.id"
          :user-data="user"
          @click.native="showSidebar(user)"
          :selectable="true"
          :ref="'card-'+user.id"
        />
      </template>
    </div>
    <div id="side-menu">
      <a class="closebtn" href="#" @click="closeSidebar">
        <span class="material-icons">close</span>
      </a>
      <Card
        :user-data="selectedUser"
        @updatedUser="onUpdatedUser($event)"
      />
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
      selectedUser: {},
      users: [],
    };
  },
  beforeMount() {
    this.getUsers();
  },
  methods: {
    onUpdatedUser(obj) {
      // this.getUsers(); is removed cause the api is not saving changes
      /* eslint no-underscore-dangle: ["error", { "allow": ["_props"] }] */
      const userCard = this.$refs[`card-${obj.id}`][0]._props.userData;
      userCard.email = obj.email;
      userCard.first_name = obj.first_name;
    },
    async getUsers() {
      const { data } = await axios.RE.get('users');
      this.users = data.data;
    },
    showSidebar(user) {
      this.selectedUser = user;
      document.getElementById('container').style.marginRight = '35%';
      document.getElementById('side-menu').style.width = '35%';
    },
    closeSidebar() {
      document.getElementById('container').style.marginRight = '0px';
      document.getElementById('side-menu').style.width = '0px';
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
  div#side-menu{
    height: 100%;
    width: 0;
    position: absolute;
    z-index: 1;
    top: 6em;
    right: 0;
    background: #fff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    border: 1px solid $font-color-secondary;
    .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      margin-left: 50px;
    }
  }
}
</style>
