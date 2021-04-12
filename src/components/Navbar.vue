<template>
  <div class="navbar">
    <a id="logo" href="/">
      DONE
    </a>
    <ul id="routes">
      <li>
        <a id="home-link" href="/">Home</a>
      </li>
      <li>
        <a id="about-link" href="/about">About</a>
      </li>
    </ul>
    <a id="logout" href="/logout">
      <span id="logout-icon" class="material-icons">logout</span>
    </a>
    <span class="material-icons" id="search">search</span>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables.scss';
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin: 0 5%;
    padding: 0 5%;
    border: 1px solid #e7e7e7;
    background-color: #f3f3f3;
    #logo{
      display: inline-block;
      font-size: 30px;
      color: $font-color-secondary;
      text-decoration: none;
    }
    #logout{
      text-decoration: none;
      color: inherit;
    }
    ul{
      list-style: none;
      display: flex;
      margin: 0;
      flex-basis: 80%;
      flex-direction: row-reverse;
      li{
        a {
          display: block;
          text-align: center;
          padding: 20px 16px;
          color: $font-color-primary;
          text-decoration: none;
          &:hover{
            background-color:  $font-color-secondary;
          }
        }
      }
    }
  }
</style>
