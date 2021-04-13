<template>
  <div class="card">
    <img :src="picture" alt="picture" id="profile-picture">
    <h2 id="title">{{ fullName }}</h2>
    <p id="description">
    <!-- eslint-disable-line -->
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, facilis exercitationem
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['userData'],
  computed: {
    fullName() {
      return this.userData ? `${this.userData.first_name} ${this.userData.last_name}` : 'Nombre Usuario';
    },
    picture() {
      return this.userData?.avatar || '../assets/logo.png';
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
  }
</style>
