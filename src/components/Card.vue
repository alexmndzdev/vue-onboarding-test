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
  .card {
    #title {
      color: $font-color-primary;
    }
    #subtitle {
      color: $font-color-secondary;
    }
  }
</style>
