<template>
  <section>
    <div class="media-gallery-carousel">
      <no-ssr>
      <carousel
        :per-page="1"
        :mouse-drag="false"
        :navigation-enabled="false"
        :pagination-enabled="false"
        pagination-active-color="#828282"
        pagination-color="transparent"
        navigation-next-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_right</i>"
        navigation-prev-label="<i class='material-icons p15 cl-bg-tertiary pointer'>keyboard_arrow_left</i>"
        ref="carousel"
        :speed="carouselTransitionSpeed"
        @pageChange="pageChange"
      >
        <slide
          v-for="(images, index) in gallery"
          :key="images.src"
        >
          <div
            class="product-image-container bg-cl-white"
            :class="{'video-container w-100 h-100 flex relative': images.video}"
          >
            <product-image
              v-show="hideImageAtIndex !== index"
              @click="openOverlay"
              class="pointer image"
              :image="images"
              :alt="productName | htmlDecode"
            />
           
            

            <product-video
              v-if="images.video && (index === currentPage)"
              v-bind="images.video"
              :index="index"
              @video-started="onVideoStarted"
            />
          </div>
        </slide>
      </carousel>
      </no-ssr>
      <!-- <i
        class="zoom-in material-icons p15 cl-bgs-tertiary pointer"
        @click="openOverlay"
      >zoom_in</i> -->
    </div>
    <div class="mt10 thumbs-gallery-carousel" ref="thumbs">
      <no-ssr>
      <carousel
        :per-page-custom="[[768,4],[1024,5], [1440,6], [1660,7], [1936,8]]" 
        :mouse-drag="false"
        :navigation-enabled="false"
        :pagination-enabled="false"
        pagination-active-color="#828282"
        pagination-color="transparent"
        :navigation-next-label="nextLabel" :navigation-prev-label="prevLabel"
        ref="thumbs"
        :speed="carouselTransitionSpeed"
        @pageChange="pageChange"
      >
        <slide
          v-for="(images, index) in gallery"
          :key="images.src"
        >
          <div
            class="media-gallery-carousel__thumb bg-cl-transparent inline-flex pb10 mx5"
            @click="active = index" :class="{thumb__active:active == index}"
          >
            <product-image
              @click="navigate(index)"
              :image="images"
              :alt="productName | htmlDecode"
            />
          </div>
        </slide>
      </carousel>
      </no-ssr>
    </div>
    <!-- <ul class="media-gallery-carousel__thumbs m0 p0 hidden-xs mt10" ref="thumbs">
      <li class="media-gallery-carousel__thumb bg-cl-transparent inline-flex pb10" @click="active = index" :class="{thumb__active:active == index}" v-for="(images, index) in gallery" :key="images.src">
        <product-image
          @click="navigate(index)"
          :image="images"
          :alt="productName | htmlDecode"
        />
      </li>
    </ul> -->
  </section>
</template>

<script>
import config from 'config'
import ProductImage from './ProductImage'
import ProductVideo from './ProductVideo'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'ProductGalleryCarousel',
  components: {
    ProductImage,
    ProductVideo,
     'Carousel': () => process.browser ? import('vue-carousel').then(Slider => Slider.Carousel) : null,
     'Slide': () => process.browser ? import('vue-carousel').then(Slider => Slider.Slide) : null,
    'no-ssr': NoSSR
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      default: ''
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carouselTransition: true,
      carouselTransitionSpeed: 0,
      currentColor: 0,
      currentPage: 0,
      hideImageAtIndex: null,
      active: 0,
       nextLabel: "<span class='material-icons'>keyboard_arrow_right</span>",
      prevLabel: "<span class='material-icons'>keyboard_arrow_left</span>",
    }
  },
  computed: {},
  beforeMount () {
    this.$bus.$on('filter-changed-product', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()

    if (this.configuration.color) {
      const {color} = this.configuration
      this.currentColor = color.id
    }

    this.$emit('loaded')
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
  },
  methods: {
    navigate (index) {
      if (this.$refs.carousel) {
        this.$refs.carousel.goToPage(index)
      }
    },
    selectVariant () {
      if (config.products.gallery.mergeConfigurableChildren) {
        const option = reduce(map(this.configuration, 'attribute_code'), (result, attribute) => {
          result[attribute] = this.configuration[attribute].id
          return result
        }, {})
        if (option) {
          let index = this.gallery.findIndex(
            obj => obj.id && Object.entries(obj.id).toString() === Object.entries(option).toString(), option)
          if (index < 0) index = this.gallery.findIndex(obj => obj.id && obj.id.color === option.color)
          this.navigate(index)
        }
      }

      this.$emit('close')
    },
    openOverlay () {
      const currentSlide = this.$refs.carousel.currentPage
      this.$emit('toggle', currentSlide)
    },
    switchCarouselSpeed () {
      const {color} = this.configuration
      if (color && this.currentColor !== color.id) {
        this.currentColor = color.id
        this.carouselTransitionSpeed = 0
      } else {
        this.carouselTransitionSpeed = 500
      }
    },
    pageChange (index) {
      this.switchCarouselSpeed()

      this.currentPage = index
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
 .thumb {
    max-height: 80px;
  }
.media-gallery-carousel {
  position: relative;
  text-align: center;
  height: 100%;

  &__thumbs{
    list-style: none;
    width:100%;
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__thumb{
    max-width: 181px;
    height: auto;
    width: 200px;
    cursor: pointer;
    position: relative;
    @media (max-width: 1440px) {
      width: 96px;
     }
     @media (max-width: 1366px) {
      width: 92px;
     }
     @media (max-width: 1024px) {
       width: 82px;
     }
     @media (max-width: 768px) {
       width: 72px;
     }

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 30px;
      height: 0;
      background-color: #98694b;
      left: 50%;
      transform: translateX(-50%);
    }

    &:hover:not(.thumb__active) {
        &::before {
          height: 2px;
          background-color: #e3e3e3;
        }
      }

    & > *{
      opacity: 1;
       &:hover {
        will-change: opacity;
        transition: .3s opacity $motion-main;
        opacity: .4;
      }
    }
  }
}

  .thumb__active {
    & > * {
      opacity: .4;
      will-change: opacity;
    }
    
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 30px;
      height: 2px;
      background-color: #98694b;
      left: 50%;
      transform: translateX(-50%);
    }
  }

.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
.image{
  opacity: 1;
  will-change: opacity;
  transition: .3s opacity $motion-main;
  &:hover{
    opacity: .9;
  }
}
.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
// .VueCarousel-navigation-next {
//   right: 25px !important;
// }
// .VueCarousel-navigation-prev {
//   left: 25px !important;
// }
.thumbs-gallery-carousel {
  .VueCarousel-inner {
    flex-basis: auto !important;
    //justify-content: center;
  }
}

.media-gallery-carousel,
.media-zoom-carousel {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .VueCarousel-navigation-button {
    margin: 0;
    transform: translateY(-50%) !important;
  }
  .VueCarousel-slide {
    backface-visibility: unset;
  }
  .VueCarousel-navigation {
    opacity: 0;
    &--disabled {
      display: none;
    }
  }
  .VueCarousel-dot {
    padding: 8px !important;
    button {
      border: 2px solid #828282;
    }
  }
  &:hover {
    .VueCarousel-navigation {
      opacity: .9;
    }
    .VueCarousel-navigation-button {
      transition: opacity 3s;
      &:after {
        background-color: transparent;
      }
    }
  }
}
</style>
