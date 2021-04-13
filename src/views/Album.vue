<template>
  <div class="about">
    <h1 id="title">Nombre Usuario</h1>
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
  </div>
</template>

<script>
import Collage from 'vue-collage';

export default {
  name: 'Album',
  components: {
    Collage,
  },
  data() {
    return {
      images: [
        { image: 'https://wallpapershome.com/images/pages/pic_v/5111.jpg' },
        { image: 'https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fannabel%2Ffiles%2F2018%2F02%2FLouisville_Skyline-1200x801.jpg' },
        { image: 'https://t-ec.bstatic.com/images/hotel/max1024x768/683/68345284.jpg' },
        { image: 'https://i.pinimg.com/originals/08/ec/94/08ec94ecf38048a2102ec4783dc88fa8.jpg' },
        { image: 'https://t-ec.bstatic.com/images/hotel/max1024x768/873/87316855.jpg' },
        { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Eiffel_Tower_Vertical.JPG/802px-Eiffel_Tower_Vertical.JPG' },
        { image: 'http://nexusandme.com/wp-content/uploads/2014/06/Ferris-Wheel.jpg' },
      ],
    };
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
