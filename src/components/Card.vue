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
      return this.userData?.avatar || 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm';
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
    background: #fff;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    // eslint-disable-line max-len
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),
    .3s box-shadow,
    .3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
    padding: 14px 80px 18px 36px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
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
  }
</style>
