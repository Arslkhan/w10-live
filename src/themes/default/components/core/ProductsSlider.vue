<template>
  <div class="collection w-100">
    <div v-if="title" class="container w-100">
      <div class="row center-xs m0">
        <header class="col-md-12 homeh2titles">
          <h2 class="align-center">
            {{ title }}
          </h2>
          <h3><router-link
                :to="localizedRoute('/our-range')"
                class="links"
              >
                Check out the whole range here >
              </router-link></h3>
        </header>
      </div>
    </div>
    <div class="bg-cl-white collection-slider">
      <div class="container w-100 p0">
        <div class="row m0 p0">
          <div class="col-md-12 p0">
            <div class="center-xs cool-stuff-collection">
              <no-ssr>
                <carousel v-bind="config" :loop="true" :autoplay="true" :autoplayTimeout="8000" :navigation-next-label="nextLabel" :navigation-prev-label="prevLabel" @pageChange="setMuted">
                  <slide
                    v-for="product in products"
                    :key="product.id"
                  >
                    <product-tile
                      class="collection-product"
                      :product="product"
                      :labels-active="true"
                      :only-image="false"
                      :promoted="false"
                      :from="true"
                    />
                  </slide>
                </carousel>
              </no-ssr>
            </div>
          </div>
            <div class="col-xs-12 mbp20">
                <h3><router-link :to="localizedRoute('/our-range')" class="links" >Check out the whole range here ></router-link></h3>
              </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import ProductTile from 'theme/components/core/ProductTileHome'

export default {
  name: 'ProductsSlider',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    //'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    //'Slide': () => import('vue-carousel').then(Slider => Slider.Slide),
     'Carousel': () => process.browser ? import('vue-carousel').then(Slider => Slider.Carousel) : null,
     'Slide': () => process.browser ? import('vue-carousel').then(Slider => Slider.Slide) : null,
    ProductTile,
    'no-ssr': NoSSR
  },
  data () {
    return {
      currentPage: 0,
      nextLabel: "<span class='material-icons'>keyboard_arrow_right</span>",
      prevLabel: "<span class='material-icons'>keyboard_arrow_left</span>",
    }
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
<style scoped>
h3{font-size: 14px; text-transform: uppercase; color: #000; font-weight: 400; margin: 0 0 60px 0;}
</style>
<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-product-bg: color(secondary, $colors-background);
.homeh2titles h2{
  font-size: 30px; text-transform: uppercase; color: #000; font-weight: 300;    margin: 40px 0 13px 0;
  @media (max-width: 764px) {
    font-size: 26px;
  }
  }
   @media (max-width: 764px) {
.mbp20{margin-top: 20px;}
   }

.collection-slider {
  overflow: hidden;
  .VueCarousel-wrapper {
    overflow: visible!important;
    &:before,
    &:after {
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      z-index: -1;
      display: none;
      @media only screen and (min-width: 576px) {
        display: block;
        width: calc((100vw - (560px - 30px)) / 2);
      }

      @media only screen and (min-width: 768px) {
        width: calc((100vw - (752px - 30px)) / 2);
      }

      @media only screen and (min-width: 992px) {
        width: calc((100vw - (976px - 30px)) / 2);
      }

      @media only screen and (min-width: 1200px) {
        width: calc((100vw - (1184px - 30px)) / 2);
      }
    }
    // &:before {
    //   right: 100%;
    //   background: linear-gradient(to right, $color-product-bg 0%,$color-product-bg 40%,rgba($color-product-bg,0.2) 100%);
    // }
    // &:after {
    //   left: 100%;
    //   background: linear-gradient(to left, $color-product-bg 0%,$color-product-bg 40%,rgba($color-product-bg,0.2) 100%);
    // }
  }
}
.VueCarousel-navigation-prev{margin: 0 !important; padding: 0 !important;}
.VueCarousel-navigation-next{margin: 0 !important; padding: 0 !important;}
.VueCarousel-navigation--disabled{opacity: 0.1 !important}
.VueCarousel-navigation-prev{left: 100px !important;opacity: 0.5}
.VueCarousel-navigation-prev .material-icons,.VueCarousel-navigation-next .material-icons{font-size: 130px !important; color: #000; }
.VueCarousel-navigation-next{right: 100px !important;opacity: 0.5}
.VueCarousel-pagination{display: none;}
.VueCarousel-navigation-button{    top: 37% !important; }

@media (max-width: 764px) {
 .VueCarousel-navigation-button{    top: 22% !important; }
  .VueCarousel-navigation-prev .material-icons,.VueCarousel-navigation-next .material-icons{font-size: 50px !important; color: #000; }
  .VueCarousel-navigation-prev{left: 33px !important;opacity: 0.5}
  .VueCarousel-navigation-next{right: 33px !important;opacity: 0.5}
}
.product {
  &.collection-product {
    padding: 0 0 40px 0;
  }
  border: 0px solid #ffffff;
  &:hover{ border: 0px solid #c0c9d5}
}

.collection-product {
  .product-link {
    display: block;
    padding: 0 15px 0px 15px;   
    /*min-height: 665px; */
    
  }



  .product-image {
    height: auto;
    will-change: opacity;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
}
</style>
