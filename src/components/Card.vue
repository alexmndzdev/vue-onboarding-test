<template>
  <div class="card">
    <img src="../assets/logo.png" alt="picture" id="profile-picture">
    <h2 id="title">Lorem ipsum dolor, sit amet consectetur</h2>
    <p id="description">
    <!-- eslint-disable-line -->
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, facilis exercitationem
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
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
