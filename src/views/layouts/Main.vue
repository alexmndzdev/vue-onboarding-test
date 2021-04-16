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
    <div id="side-menu" :class="{'opened': clickedCard}">
      <a class="closebtn" href="#" @click="closeSidebar">
        <span class="material-icons">close</span>
      </a>
      <Card
        :user-data="selectedUser"
        @updatedUser="onUpdatedUser($event)"
      />
      <br>
      <table-component
         :data="userPosts"
         sort-by="title"
         sort-order="asc"
      >
        <table-column show="id" label="Id" data-type="numeric"/>
        <table-column show="title" label="Title"/>
        <table-column :sortable="false" :filterable="false">
          <template slot-scope="userPosts">
            <a href="#" @click="removePostById(userPosts.id)">
                <span class="material-icons">delete</span>
            </a>
          </template>
      </table-column>
     </table-component>
    </div>
  </div>
</template>

<script>
import { TableComponent, TableColumn } from 'vue-table-component';
import Navbar from '../../components/Navbar.vue';
import Card from '../../components/Card.vue';
import axios from '../../axios';

export default {
  name: 'Main',
  components: {
    Navbar,
    Card,
    TableComponent,
    TableColumn,
  },
  data() {
    return {
      selectedUser: {},
      users: [],
      userPosts: [],
      clickedCard: false,
    };
  },
  beforeMount() {
    this.getUsers();
  },
  methods: {
    removePostById(postId) {
      axios.TC.delete(`posts/${postId}`).then((res) => {
        if (res.status === 200) {
          this.userPosts = this.userPosts.filter((post) => post.id !== postId);
        }
      });
    },
    onUpdatedUser(obj) {
      // this.getUsers(); is removed cause the api is not saving changes
      /* eslint no-underscore-dangle: ["error", { "allow": ["_props"] }] */
      const userCard = this.$refs[`card-${obj.id}`][0]._props.userData;
      userCard.email = obj.email;
      userCard.first_name = obj.first_name;
    },
    async getUsers() {
      const { data } = await axios.RE.get('users?page=2');
      this.users = data.data;
    },
    async getPostsByUserid() {
      const { data } = await axios.TC.get(`posts?user_id=${this.selectedUser.id}`);
      this.userPosts = data;
    },
    showSidebar(user) {
      this.selectedUser = user;
      this.getPostsByUserid();
      this.clickedCard = true;
    },
    closeSidebar() {
      this.clickedCard = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';
@import '../../assets/scss/mixins.scss';
div.main {
  position: relative;
  overflow: hidden;
  height: 100%;
  @include sm {
    height: 100vh;
  }
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
    width: 100%;
    position: fixed;
    @include md {
      width: 50%;
      position: absolute;
    };
    @include lg {
      width: 35%;
      position: absolute;
    }
    z-index: 1;
    top: 6em;
    background: #fff;
    padding-top: 60px;
    border: 1px solid $font-color-secondary;
    box-shadow: 5px 5px 10px grey;
    opacity: 0;
    right: -100%;
    transition: all 0.50s;
    -webkit-transition: all 0.50s;
    &.opened {
      opacity: 1;
      right: 0;
    }
    .closebtn {
      position: absolute;
      top: 10px;
      right: 25px;
    }
  }
}
</style>
