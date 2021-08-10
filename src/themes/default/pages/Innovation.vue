<template>
  <div id="innovation">
    <section>
      <div class="container center-xs middle-xs">
        <h1>
          INNOVATION
        </h1>
        <p>the world's first double-walled collapsible cup</p>
       
      </div>
    </section>
    <div class="text-center center-xs flex middle-xs w-100">
         <hr />
    </div>
    <div class="row videoholder">
     <div class="col-md-4"></div>
                <div class="col-md-4 home_bottom_video">
                    <video width="100%" height="auto" controls poster="/assets/video.jpg">
  <source src="/assets/W10.mp4" type="video/mp4">
</video>
                </div>
      <div class="col-md-4"></div>
</div>


<div class="row p0 m0 subcopy">
    <div class="col-xs-12 middle-xs center-xs">
     <cms-block :identifier="'innovation-sub-heading'" />
     <hr />
     <cms-block class="innop" :identifier="'innovation-body-copy'" />
     <h5>Which one’s your preference ?</h5>
     <span class="material-icons downarrow">keyboard_arrow_down</span>
    </div>
</div>








<div class="row p0 m0 productinnovation">

    <div class="col-md-6 p0 m0 block1 flex center-xs middle-xs">
      <cms-block :identifier="'innovation-block-1'" />
    </div>
    <div class="col-md-6 p0 m0">
        <img
          v-lazy="'/assets/i1.jpg'"
          alt="Vacuum insulation"
          class="w-100 h-100"
        >
    </div>

    <div class="col-md-6 p0 m0">
      <img
          v-lazy="'/assets/i2.jpg'"
          alt="Vacuum insulation"
          class="w-100 h-100"
        >
    </div>
    <div class="col-md-6 p0 m0 block2 flex center-xs middle-xs">
        <cms-block :identifier="'innovation-block-2'" />
    </div>

   

    <div class="col-xs-12 pay hidden" v-lazy:background-image="'/assets/i4.jpg'">
    <div class="payblock middle-xs center-xs flex">
        <cms-block class="cmstext" :identifier="'innovation-block-4'" />
    </div>
    </div>

    
   
</div>

<div class="col-xs-12 stopped">
    <div class="middle-xs center-xs flex">
        <cms-block class="cmstext" :identifier="'innovation-we-havent-stopped-there'" />
    </div>
    </div>

      <section>
     
      <div class="row center-xs w-100 m0">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <products-slider :title="'BEST SELLERS'" :config="config" :products="getBestsellers" />
        </lazy-hydrate>
       <products-slider v-else :title="'BEST SELLERS'" :config="config" :products="getBestsellers" />
      </div>
    </section>
    <social-area />
  </div>
</template>

<script>

import CmsBlock from 'theme/components/core/blocks/Cms/Block'
import ProductsSlider from 'theme/components/core/ProductsSlider'
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'
import LazyHydrate from 'vue-lazy-hydration'
import { mapGetters } from 'vuex'
import config from 'config'
import SocialArea from 'theme/components/theme/blocks/SocialArea'
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
        CmsBlock,
        ProductsSlider,
        SocialArea,
        LazyHydrate
        },
        computed: {
    ...mapGetters('homepage', ['getBestsellers']),
    isLazyHydrateEnabled () { return config.ssr.lazyHydrateFor.some(field => ['homepage', 'homepage.bestsellers'].includes(field))}
    },
    async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    await Promise.all([
     store.dispatch('homepage/loadBestsellers') 
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
      title:"Innovation - ",
      meta: [{ vmid: 'description', name: 'description', content: 'Our Collapsible Cups collapses comfortably down to a handy size that can easily be carried in a small bag or jacket pocket. The clever design includes a pouch and the lid has a stopper to stop on the go spills. This reusable, eco-friendly drinkware eliminates the need for bulky travel mugs and disposable single-use coffee cups.' }]
    }
  }
}
</script>

<style scoped>
h1{font-size: 130px;font-weight: 100;color: black; margin: 40px 0 0px 0; padding: 0;}
p{font-size: 28px; font-weight: 300; color:black; padding: 0; margin: 0px; text-transform: uppercase;}
hr{margin: 50px 0; padding: 0; width: 100px;border: 0; border-top:1px solid #98694b;}

.text-center{text-align: center;}
.videoholder{background: black;}
.block1{background-color: #323232;}
.block2{background-color: #cd1c1e;}
.block3{background-color: #5e5e5e;}

.block1 div{padding: 0 20% 0 20%;}
 
.block2 div{padding: 0 20% 0 20%;}


.block3 div{padding: 0 20% 0 20%;}
.subcopy{margin: 120px 0 -43px 0;}
.downarrow{color: #d6d6d6; font-size: 200px; line-height: 100px;}
.payblock{background: black; opacity: 0.5; padding: 80px; width:365px; float: right; margin: 250px 138px 247px 0;}
.pay{background-size: cover;}
.cmstext{opacity: 1;}
.stopped{background: #f6f6f6; padding: 90px 20% 140px 20%}  

@media (max-width: 769px) {
h1{
    font-size: 44px;
    font-weight: 100;
    color: black;
    margin: 40px 0 0px 0;
    padding: 0;
}
p {
    font-size: 18px;
    font-weight: 300;
    color: black;
    padding: 0;
    margin: 0px;
    text-transform: uppercase;
}
.block1 div { padding: 20px 10% 20px 10%;}
.block2 div { padding: 20px 10% 20px 10%;}
.block3 div { padding: 20px 10% 20px 10%;}
.payblock {padding: 20px 0;width: 100%;margin: 20px 0;}
.stopped {padding: 40px 10% 40px 10%;}
}

</style>
<style>
.innop p{line-height: 29px; padding: 0 30%;}
.productinnovation h3{font-size: 39px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #fff; line-height: 39px;}
.productinnovation h4{font-size: 18px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #fff;}
.productinnovation p{font-size: 16px; font-weight: 400; padding: 0px 0 30px 0; margin: 0; color: #fff; padding-bottom: 15px;}
.productinnovation hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 35px auto 35px auto !important;}

.subcopy h3{font-size: 36px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; }
.subcopy h4{font-size: 68px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; line-height: 58px;}
.subcopy h5{font-size: 18px; font-weight: 300; padding: 80px 0 0px 0; margin: 0;text-transform: uppercase; color: #000;}
.subcopy hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 50px auto !important;}
.subcopy p{padding: 0 20%;}

.stopped h3{font-size: 40px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; }
.stopped h4{font-size: 25px; font-weight: 400; padding: 20px 0 0px 0; margin: 0;color: #000; line-height: 38px;}
.stopped hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 38px auto !important;}
.stopped p{padding: 0 20%;line-height: 29px;}

.payblock hr{border-top:1px solid #fff !important;}
.payblock a{color: #fff;}
@media (max-width: 769px) {
.productinnovation h3 {font-size: 27px; line-height: 27px;}
.productinnovation h4 {font-size: 16px; padding: 9px 0 0px 0;}
.productinnovation hr {margin: 35px auto 35px auto !important;}
.subcopy h4 {
    font-size: 37px;
    font-weight: 200;
    padding: 0px 0 0px 0;
    margin: 0;
    text-transform: uppercase;
    color: #000;
    line-height: 34px;
}
.subcopy h3 {
    font-size: 22px;
    font-weight: 200;
    padding: 0px 0 0px 0;
    margin: 0;
    text-transform: uppercase;
    color: #000;
}
.subcopy {
    margin: 40px 0 -43px 0;
}
.subcopy p {
    padding: 0 4%;
}
.subcopy h5 {
    font-size: 18px;
    font-weight: 300;
    padding: 36px 0 0px 0;
    margin: 0;
    text-transform: uppercase;
    color: #000;
}
.stopped p {
    padding: 0;
}
}
</style>
