<template>
  <div class="about">
    <template v-if="!isUserSelected">
      <vSelect
        :options="options"
        label="fullName"
        :value="selectedUser"
        @input="setSelected"
        />
    </template>
    <template v-else>
      <h1 id="title">
        {{ `${selectedUser.first_name} ${selectedUser.last_name}` || 'Nombre Usuario' }}
      </h1>
      <p id="subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Impedit sequi!
      </p>
      <div class="row-icons">
        <a href="#">
          <span
            id="user-icon"
            class="material-icons">
            person_outline
          </span>
        </a>
        <a href="#">
          <span
            id="file-icon"
            class="material-icons">
            note_add
          </span>
        </a>
      </div>
      <div id="album">
        <collage
          :images="images"
          :collageSizeMin="5"
          :collageSizeMax="5"
          :showNoImagesMsg="true"
          noImagesMsg="No Images"
          :showLoadingMsg="true"
          loadingMsg="Loading..."
          height="45em"
        />
      </div>
    </template>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import Collage from 'vue-collage';
import vSelect from 'vue-select';
import axios from '../axios';

export default {
  name: 'Album',
  components: {
    Collage,
    vSelect,
  },
  data() {
    return {
      isUserSelected: false,
      selectedUser: {},
      options: [],
      images: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const { data } = await axios.RE.get('users?page=2');
      const formattedData = data.data.map((user) => ({
        ...user,
        fullName: `${user.first_name} ${user.last_name}`,
      }));
      this.options = formattedData;
    },
    setSelected(value) {
      this.selectedUser = value;
      this.getInfoUser();
    },
    async getInfoUser() {
      const { data } = await axios.TC.get(`users/${this.selectedUser.id}`);
      this.images = data.album.map((image) => ({ image }));
      this.isUserSelected = Object.keys(this.selectedUser).length;
    },
  },
  watch: {
    selectedUser(old, newVal) {
      if (Object.keys(newVal).length) {
        this.getInfoUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/_variables.scss';
  @import '../assets/scss/mixins.scss';

  .about {
    #title{
      color: $font-color-primary;
    }
    #subtitle{
      color: $font-color-secondary;
    }
    .row-icons{
      margin: 0 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      #user-icon,#file-icon{
        font-size: 30px;
        color: $font-color-primary;
        @include sm {
          font-size: 45px;
        }
      }
    }
    #album{
      margin: 0 auto;
      width: 90%;
      padding-top: 20px;
      .vc-slideshow {
        position: initial;
      }
    }
  }
</style>
