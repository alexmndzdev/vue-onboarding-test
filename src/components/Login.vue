<template>
  <div class="hello">
    <h2 id="title">Sign in</h2>
    <p id="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit... </p>
    <form action="api.login">
      <input v-model="email" id="input-email" type="email" placeholder="Email">
      <template v-if="hasErrorEmail">
        <span id="email-error">{{errorEmail}}</span>
      </template>
      <input v-model="pass" id="input-password" type="password" placeholder="Password">
      <template v-if="hasErrorPass">
        <span id="password-error">{{errorPass}}</span>
      </template>
      <button @click="doRequestLogin" id="btn-sign-in">Sign in</button>
      <a id="reset-password" href="">Forget your password?</a>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  props: {
    msg: String,
  },
  data() {
    return {
      email: '',
      pass: '',
      errorPass: '',
      errorEmail: '',
    };
  },
  computed: {
    hasErrorPass() {
      return this.errorPass.length > 0;
    },
    hasErrorEmail() {
      return this.errorEmail.length > 0;
    },
  },
  methods: {
    doRequestLogin(event) {
      event.preventDefault();
      if (this.areValidFields()) {
        // TODO: axios.get
      }
    },
    areValidFields() {
      if (!this.email) {
        this.errorEmail = 'Email is required';
      }
      if (!this.pass) {
        this.errorPass = 'Password is required';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
