<template>
  <div class="auth">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'LoginPage',
  components: {
    Login,
  },
};
</script>

<style lang="scss" scoped>
div.auth {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #306496;
}
</style>
