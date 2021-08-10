<template>
  <div id="home">

    <main-slider />
    <page-title/>

    <section>

      <div class="row center-xs w-100 m0">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <products-slider :title="'BEST SELLERS'" :config="config" :products="getBestsellers" />
        </lazy-hydrate>
        <products-slider v-else :title="'BEST SELLERS'" :config="config" :products="getBestsellers" />
      </div>
    </section>

    <section>
      <div class="quote col-xs-12 middle-xs center-xs">
        <div class="row">
          <div class="col-xs-10 col-sm-6 relative col-xs-offset-1 col-sm-offset-2">

            <h4><span class="Montserrat">“</span>The purpose - where I start - is the idea of use. It's not recycling, it's reuse. <span class="Montserrat">”</span></h4>

          </div>
          <div class="col-xs-12 col-sm-4"><img src="/assets/anna.jpg" class="four" />
            <p class="quotetext"> Issey Miyake</p>
          </div>
        </div>

      </div>
    </section>

    <video-player />

    <section>
      <div class="quote col-xs-12 middle-xs center-xs">
        <div class="row">
          <div class="col-xs-12 col-sm-4 relative col-sm-offset-2">

            <h4><span class="Montserrat">“</span> Buy less, choose well.<span class="Montserrat">”</span></h4>

          </div>
          <div class="col-xs-12 col-sm-5">
            <p><img src="/assets/quote.png" class="three" /> Fashion Designer</p>
          </div>
        </div>

      </div>
    </section>

    <about-product />

    <world-first />

    <social-area />

    <modal name="modal-welcome" :width="882">
      <div class="row welcomepopup">
        <div class="col-sm-6 m0 p0 hidden-xs">
          <img v-lazy="'/assets/welcome.jpg'" width="100%" height="100%" />
        </div>
        <div class="col-sm-6 flex center-sm middle-sm mobilepadding">
          <div>
            <h3>
              Welcome to W10 Collection.
              <i slot="close" class="modal-close material-icons" @click="closeWelcome">close</i>
            </h3>
            <hr />
            <div class="row">
              <div class="col-md-12">
                <p>As an introductory offer we would like to give you <b>10% off</b> your first order online.</p>
                <p>This will automatically be added to your cart.</p>
                <p>Happy shopping!</p>
                <p class="small">For details on how we use your data, view our privacy policy.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </modal>

  </div>
</template>

<script>
// query constructor
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'
import LazyHydrate from 'vue-lazy-hydration'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider'
import ProductsSlider from 'theme/components/core/ProductsSlider'
// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PageTitle from 'theme/components/theme/blocks/Home/PageTitle'
import VideoPlayer from 'theme/components/theme/blocks/Home/VideoPlayer'
import AboutProduct from 'theme/components/theme/blocks/Home/AboutProduct'
import SocialArea from 'theme/components/theme/blocks/SocialArea'
import WorldFirst from 'theme/components/theme/blocks/WorldFirst'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters } from 'vuex'
import config from 'config'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import Modal from 'theme/components/core/Modal'

export default {
  data () {
    return {
      loading: true,
      config: {
        perPageCustom: [[320,2], [768,2], [1024,3], [1366,4]],
        paginationEnabled: false,
        navigationEnabled: true,
        mouseDrag: false
      }
    }
  },
  components: {
    Onboard,
    ProductListing,
    PageTitle,
    TileLinks,
    LazyHydrate,
    MainSlider,
    ProductsSlider,
    VideoPlayer,
    AboutProduct,
    SocialArea,
    WorldFirst,
    Modal
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    ...mapGetters('homepage', ['getBestsellers']),
    categories () {
      return this.getCategories
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.some(
        field => ['homepage', 'homepage.bestsellers'].includes(field)
      )
    }
  },
  methods:{
    showWelcome () {
      if (this.$cookie.get('popup') == 'true') {
      }else{
        this.$cookie.set('popup', 'true', 100);
        this.$bus.$emit('modal-toggle', 'modal-welcome')
      }
    },
    closeWelcome () {
      this.$bus.$emit('modal-hide', 'modal-welcome')
    },
  },
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  async beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' })
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },
  mounted () {
    this.showWelcome();
    if (!this.isLoggedIn && localStorage.getItem('redirect')) this.$bus.$emit('modal-show', 'modal-signup')
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    if (context) context.output.cacheTags.add(`home`)
    Logger.info('Calling asyncData in Home Page (core)')()

    await Promise.all([
      store.dispatch('homepage/loadBestsellers'),
      store.dispatch('promoted/updateHeadImage'),
      store.dispatch('promoted/updatePromotedOffers')
    ])
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm =>
        vm.$store.dispatch('homepage/loadBestsellers').then(res => {
          vm.loading = false
        })
      )
    } else {
      next()
    }
  },
  metaInfo () {
    return {
      title: '',
      meta: [
        { property: 'og:title', content: 'W10 Collapsible Cup and Eco-Friendly Drinkware' },
        { property: 'og:site_name', content: 'W10 Drinkware Collection' },
        { property: 'og:description', content: 'W10 - Introducing the worlds 1st double walled Collapsible Cup and a new range of stylish, competitively priced, environmentally friendly drinkware. The range includes both desk cups and travel cups, and some that are suitable for both.'},
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://w10.world' },
        { property: 'og:image', content: 'https://w10.world/img/0/0/resize/mageplaza/bannerslider/banner/image/h/o/homepage1_5.jpg' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.new-collection {
  @media (max-width: 767px) {
    padding-top: 0;
  }
}
.quote{background: #f6f6f6; padding: 70px 0;}
h4{font-size: 43px; color:#000; font-weight: 300; margin: 0; padding: 0;}
p{font-size: 21px; color:#000; font-weight: 500; margin: 0; padding: 0;}
.one{position: absolute; left: -9px; top: -13px;}
.oneA{position: absolute; left: -9px; top: -13px;}
.two{position: absolute; right: -9px;top: 32px;}
.twoA{position: absolute; right: 82px;top: 72px;}
.three{width: 28%; vertical-align: middle;}
.four{ vertical-align: middle; float: left; margin-left: 40px;}
.quotetext{float: left; margin-top: 30px; text-align: left; margin-left: 20px;}

@media (max-width: 767px) {
  .mobilepadding{    margin-top: 5%;}
  h4{font-size: 20px; color:#000; font-weight: 300; margin: 0; padding: 0;}
  .twoA{position: absolute; right:-23px;top: 32px;}
  .quotetext {
    float: left;
    margin-top: 49px;
    text-align: left;
    margin-left: 20px;
  }
  .quote {
    background: #f6f6f6;
    padding: 30px 0;
  }
  .one {
    position: absolute;
    left: -16px;
    top: -13px;
  }
  .oneA {
    position: absolute;
    left: 44px;
    top: -13px;
  }
  .two {
    position: absolute;
    right: 54px;
    top: 4px;
  }
}
.welcomepopup{background-color: white; padding: 10px; text-align: center;}

</style>

<style>
.welcomepopup i{position: absolute !important;  top: 6px !important;  right: 0 !important; cursor: pointer;}
.welcomepopup h3{font-size: 20px; color:#000; font-weight: 400; margin: 0px 0 20px 0; padding: 0; text-transform: uppercase;}
.welcomepopup p{font-size: 16px; color:#000; font-weight: 300; margin: 0; padding: 0 20px;}
.welcomepopup hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 30px auto 30px auto !important;}
.welcomepopup .small{font-size: 10px !important; padding-top: 50px; display: none;}
</style>
