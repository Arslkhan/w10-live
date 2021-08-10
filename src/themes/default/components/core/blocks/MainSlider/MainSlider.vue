<template>

  <section class="main-slider w-100 cl-white">
   
   <div class="hidden-tb hidden-xs desktopslider">
      
    <no-ssr>
     
      <carousel :per-page="1" :autoplay="true" :loop="true" :autoplayTimeout="8000" :navigationEnabled="true" navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"  navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"> 
        <slide v-for="(slide, index) in bannerData" :key="index" v-if="slide.status != 0">
          
          <!-- 2  button layout -->
          <div v-if="slide.title" class="container w-100" v-lazy:background-image="getThumbnail(slide.image,0,0,'mageplazabanner')">
            <router-link :to="localizedRoute(slide.url_banner)">
            <div class="row center-xs">
              
              <div v-if="slide.title" class="col-md-12 h1block">              
                <h2 class="title mt0 mb7 align-center">
                  {{ slide.title }}
                </h2>
                <h3 class="title mt0 mb7 align-center">
                  {{ slide.button1_text }}
                </h3>
              </div>

              

            </div>
            </router-link>
          </div>

          <!-- No button large link -->
          <div v-else-if="slide.url_banner" class="container w-100" v-lazy:background-image="getThumbnail(slide.image,0,0,'mageplazabanner')">
           <router-link :to="localizedRoute(slide.url_banner)"> 
             
             <div class="row middle-xs center-xs">
                
          
          
          </div>
          </router-link>
          </div>

          

        </slide>
      </carousel>
    </no-ssr>
   </div>
   <div class="hidden-sm hidden-md hidden-lg hidden-xl mobileslider">

<no-ssr>
      <carousel :per-page="1" :autoplay="true" :loop="true" :autoplayTimeout="8000" pagination-active-color="#c0c9d5" pagination-color="#eef1f5">
        <slide v-for="(slide, index) in bannerData" :key="index" v-if="slide.status != 0">
          
               <!-- 2  button layout -->
          <div v-if="slide.title" class="container w-100" v-lazy:background-image="getThumbnail(slide.image_mobile,0,0,'mageplazabanner')">
            <router-link :to="localizedRoute(slide.url_banner)">
            <div class="row center-xs">
              
              <div v-if="slide.title" class="col-md-12 h1block">              
                <h2 class="title mt0 mb7 align-center">
                  {{ slide.title }}
                </h2>
                <h3 class="title mt0 mb7 align-center">
                  {{ slide.button1_text }}
                </h3>
              </div>

              

            </div>
            </router-link>
          </div>

          <!-- No button large link -->
          <div v-else-if="slide.url_banner" class="container w-100" v-lazy:background-image="getThumbnail(slide.image_mobile,0,0,'mageplazabanner')">
           <router-link :to="localizedRoute(slide.url_banner)"> 
             
             <div class="row middle-xs center-xs">
                
          
          
          </div>
          </router-link>
          </div>

        </slide>
      </carousel>
    </no-ssr>

  </div>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'

import ButtonHero from 'theme/components/theme/ButtonHero'
import axios from 'axios'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import config from 'config'

export default {
  data () {
    return {
      currentSlide: 1,
      slides: [],
      totalSlides: 3,
      baseUrl: config.mageplaza.baseURL,
      bannerData: null,
      nextLabel: "<span class='material-icons'>keyboard_arrow_right</span>",
      prevLabel: "<span class='material-icons'>keyboard_arrow_left</span>",
    }
  },
  components: {
    ButtonHero,
    'Carousel': () => process.browser ? import('vue-carousel').then(Slider => Slider.Carousel) : null,
     'Slide': () => process.browser ? import('vue-carousel').then(Slider => Slider.Slide) : null,
    'no-ssr': NoSSR
  },
  methods: {
    fetchData(){
      axios
      .get(this.baseUrl + '/pub/media/banners.json')
      .then(response => (this.bannerData = response.data))
      
    },
    getThumbnail(image,width,height, path){
      //console.log(image);
      return getThumbnailPath("/" + image,width,height, path)
    }
  },
  mounted () {
    //setInterval(() => {
    //  this.totalSlides = this.bannerData.length
    //  this.currentSlide = (this.currentSlide + 1) % (this.totalSlides)
   // }, 5000)
  },
  created () {
    this.fetchData();
    
  }
}
</script>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-white: color(white);
.main-slider {

 
  .VueCarousel-pagination {
    position: absolute;
    bottom: -30px;
  }
  .VueCarousel-dot{
    border-radius: 0 !important;
        width: 80px !important;
    height: 5px !important;
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid $color-white;
    margin-top: -2px;
  }
}

</style>
<style scoped>
.h1block{ margin-top: 35px;}
.h2block{margin: 20px 0 0 110px;}
h2 {
  font-size: 127px; font-weight: 100; color: #000; text-transform: uppercase; margin: 0;line-height: 124px;
}
h3 {
  font-size: 32px; font-weight: 400; color: #000;text-transform: uppercase;margin: 0;
}
.main-slider {
  height: 784px;
}
.container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.container2{
  background-size: unset;
    background-repeat: repeat-x;
}
.row {
  height: 784px;
}

a:hover::after {
    border: 0; background-color: transparent; text-decoration: none;
  }


@media (max-width: 769px) {
  .main-slider {
    height: 597px;
  }
 .h1block {
    background-color: #ffffff;
    opacity: 0.9;
    margin-top: 25%;
    margin-bottom: 0;
    padding: 15px;
    display: table;
}
h2{font-size: 50px;line-height: 44px;}
h3{font-size: 23px;}
  .row {
    height: 597px;
  }


.title2 {
   font-size: 20px;
    letter-spacing: unset;
    padding: 20px;
  }
}
@media (max-width: 414px) {
   .main-slider {
    height: 303px;
  }
  .row {
    height: 303px;
  }
}
</style>
