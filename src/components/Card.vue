<template>
  <div
    class="card"
    :class="{'selectable': selectable}"
    >
    <img :src="picture" alt="picture" id="profile-picture">
    <div v-if="!selectable" class="editable">
      <h2 id="title" v-show="!editingName">{{ currentName }}</h2>
      <span v-show="editingName">
        <input
          v-model="first_name"
          type="text"
          @keydown.enter="editingName=false;updateUser({ first_name })"
          @blur="editingName=false;updateUser({ first_name })"
          >
      </span>
      <span @click="editingName=true" class="material-icons edit">edit</span>
    </div>
    <h1 id="title" v-else>
      {{ userData.first_name }}
    </h1>
    <div v-if="!selectable" class="editable">
      <span id="description" v-show="!editing">
        {{ currentEmail }}
      </span>
      <span v-show="editing">
        <input
          v-model="email"
          type="text"
          @keydown.enter="editing=false;updateUser({ email })"
          @blur="editing=false;updateUser({ email })"
          >
      </span>
      <span @click="editing=true" class="material-icons edit">edit</span>
    </div>
    <p v-else id="description">
      {{ userData.email }}
    </p>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'Card',
  props: ['userData', 'selectable'],
  data() {
    return {
      editing: false,
      editingName: false,
      email: '',
      first_name: '',
    };
  },
  computed: {
    fullName() {
      return this.userData ? `${this.userData.first_name} ${this.userData.last_name}` : 'Nombre Usuario';
    },
    picture() {
      return this.userData?.avatar || 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm';
    },
    currentName() {
      if (this.first_name.length > 0) {
        return this.first_name;
      }
      return this.userData.first_name;
    },
    currentEmail() {
      if (this.email.length > 0) {
        return this.email;
      }
      return this.userData.email;
    },
  },
  methods: {
    updateUser(obj) {
      axios.RE.put(`user/${this.userData.id}`, obj);
      const updatedUser = { ...this.userData };
      updatedUser.email = this.currentEmail;
      updatedUser.first_name = this.currentName;
      this.$emit('updatedUser', updatedUser);
    },
  },
  watch: {
    userData(oldVal, newVal) {
      if (newVal) {
        this.email = this.userData.email;
        this.first_name = this.userData.first_name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/scss/_variables.scss';
  @import '../assets/scss/mixins.scss';

  .card {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    margin-bottom: 20px;
    border-radius: 4px;
    &.selectable {
      background: #fff;
      box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
      transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),
      .3s box-shadow,
      .3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
      padding: 14px 80px 18px 36px;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
      }
    }
    @include sm {
      min-width: 150px;
      padding: 10px 50px;
      margin: 10px 50px;
    }
    @include lg {
      min-width: 300px;
    }
    img {
      margin: auto;
      border-radius: 500px;
      background-color: $font-color-secondary;
    }
    #title {
      color: $font-color-primary;
    }
    #subtitle {
      color: $font-color-secondary;
    }
    span.material-icons.edit{
      cursor: pointer;
    }
    .editable {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
