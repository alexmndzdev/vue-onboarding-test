<template>
  <div class="card">
    <h1 id="title">Sign in</h1>
    <p id="subtitle">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. In nec nibh vitae...
    </p>
    <form action="api.login">
      <div class="form-group">
        <input
         v-model="email"
         id="input-email"
         type="email"
         placeholder="Email">
        <template v-if="hasErrorEmail">
          <span id="email-error">{{errorEmail}}</span>
        </template>
      </div>

      <div class="form-group">
        <input
         v-model="pass"
         id="input-password"
         type="password"
         placeholder="Password">
        <template v-if="hasErrorPass">
          <span id="password-error">{{errorPass}}</span>
        </template>
      </div>

      <button @click="doRequestLogin" id="btn-sign-in">Sign in</button>
    </form>
    <a id="reset-password" href="">Forgot your password?</a>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'Login',
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
        const userData = {
          email: this.email,
          password: this.pass,
        };
        axios.RE
          .post('login', userData)
          .then((res) => {
            if (res.status === 200) {
              axios.setTokenHeader(res.data.token);
              return this.$router.push('/');
            }
            return '';
          });
      }
    },
    areValidFields() {
      if (!this.email) {
        this.errorEmail = 'Email is required';
        return false;
      }
      if (!this.pass) {
        this.errorPass = 'Password is required';
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
@import '../assets/scss/_variables.scss';
@import '../assets/scss/mixins.scss';
  div.card{
    width: 90%;
    max-width: 500px;
    background-color: #f7f7f8;
    #title{
      padding-top: 30px;
      color: $font-color-primary;
      font-family: system-ui;
      font-weight: 500;
    }
    #subtitle{
      margin: 20px 40px 30px 40px;
      @include sm {
        margin: 20px 80px 30px 80px;
      }
      color: $font-color-secondary;
    }
    form{
      //margin: 0 auto;
      margin: 0 10%;
      @include sm {
        margin: 0 25%;
      }
      div.form-group{
        input{
          width: -webkit-fill-available;
          padding-left: 10px;
          padding-top: 10px;
          padding-bottom: 10px;
          margin-bottom: 5px;
        }
        span{
          display: block;
          color: red;
          text-align: initial;
        }
        margin-bottom: 20px;
      }
      button{
        color: white;
        background-color: $btn-primary;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        &:hover{
          cursor: pointer;
        }
      }
    }
    a#reset-password{
      display: block;
      color: $font-color-a;
      text-decoration: none;
      padding-top: 30px;
      margin-bottom: 40px;
    }
  }
</style>
