<template>
  <div id="aboutus">
    <header class="headerimage" v-lazy:background-image="'/assets/contact.jpg'">
      <div class="container center-xs middle-xs aboutblock">
        <h1>
          ABOUT
        </h1>
        <p>the home of innovative drinkware</p>
       
      </div>
    </header>
   
    


<div class="row p0 m0 subcopy">
    <div class="col-xs-12 middle-xs center-xs">
     <cms-block :identifier="'aboutus-sub-text'" />
    </div>
</div>

<div class="row p0 m0 productinnovation">

    <div class="col-md-6 p0 m0 block1 flex center-xs middle-xs">
      <cms-block :identifier="'about-block-1'" />
    </div>
    <div class="col-md-6 p0 m0">
        <img
          v-lazy="'/assets/a1.jpg'"
          alt="development stages"
          class="w-100 h-100"
        >
    </div>

    <div class="col-md-6 p0 m0">
      <img
          v-lazy="'/assets/a2.jpg'"
          alt="THE W10 NAME"
          class="w-100 h-100"
        >
    </div>
    <div class="col-md-6 p0 m0 block2 flex center-xs middle-xs">
        <cms-block :identifier="'about-block-2'" />
    </div>

    

  

    
   
</div>

  <world-first />

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
import WorldFirst from 'theme/components/theme/blocks/WorldFirst'
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
        WorldFirst,
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
      title:"About us - ",
      meta: [{ vmid: 'description', name: 'description', content: 'Our Collapsible Cups collapses comfortably down to a handy size that can easily be carried in a small bag or jacket pocket. The clever design includes a pouch and the lid has a stopper to stop on the go spills. This reusable, eco-friendly drinkware eliminates the need for bulky travel mugs and disposable single-use coffee cups.' }]
    }
  }
}
</script>

<style scoped>
.headerimage{background-size: cover;height: 784px;}
@media (max-width: 1050px) {
  .headerimage{background-position-x: center;}
}
@media (max-width: 1423px) {
    .headerimage{
       
    background-color: #ffffff;
    height: 585px;
    }
    p{font-size: 23px;}  
}
@media (min-width: 1855px) {
        .headerimage{background-position-y: -139px !important;}
}
@media (min-width: 2500px){
    .headerimage{background-position-y: -313px !important;}
    
}
h1{font-size: 127px;font-weight: 100;color: black; margin: 0; padding: 37px 0 0 0;}
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
.subcopy{margin: 88px 0 88px 0;}
.downarrow{color: #d6d6d6; font-size: 200px; line-height: 100px;}
.payblock{background: black; opacity: 0.5; padding: 80px; width:365px; float: right; margin: 250px 138px 247px 0;}
.pay{background-size: cover;}
.cmstext{opacity: 1;}
.stopped{background: #f6f6f6; padding: 90px 20% 140px 20%}  
@media (max-width: 1476px ) and (min-width: 769px)  {
  .block1 div {padding: 10% !important;}
 
}
@media (max-width: 769px) {
.headerimage{height: 361px; background-position-x: 0px;}
 .subcopy {
    margin: 30px 0 88px 0;
}
h1{
    font-size: 44px;
    font-weight: 300;
    color: black;
}
p {
    font-size: 17px !important;
    font-weight: 400;
    color: black;
    padding: 0;
    margin: 0px;
    text-transform: uppercase;
}
.block1 div { padding: 40px 10% 20px 10%;}
.block2 div { padding: 40px 10% 20px 10%;}
.block3 div { padding: 20px 10% 20px 10%;}
.payblock {padding: 20px 0;width: 100%;margin: 20px 0;}
.stopped {padding: 40px 10% 40px 10%;}
}

</style>
<style>
@media (max-width: 1476px ) and (min-width: 769px)  {
 
  .productinnovation p {
    padding: 0px 0 15px 0 !important;
    line-height: 21px !important;
}
}
@media (max-width: 1263px ) and (min-width: 769px)  {
.productinnovation hr {
    margin: 35px auto 24px auto !important;
}
}

@media (max-width: 1103px ) and (min-width: 769px)  {
.productinnovation h3 {
    font-size: 25px !important;
    line-height: 21px !important;
}
.productinnovation p {
    font-size: 12px !important;
}
}

.productinnovation h3{font-size: 39px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #fff; line-height: 39px;}
.productinnovation h4{font-size: 18px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #fff;}
.productinnovation p{font-size: 16px; font-weight: 400; padding: 0px 0 30px 0; margin: 0; color: #fff; padding-bottom: 15px;}
.productinnovation hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 35px auto 70px auto;}

.subcopy h3{font-size: 36px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; }
.subcopy h4{font-size: 68px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; line-height: 58px;}
.subcopy h5{font-size: 18px; font-weight: 300; padding: 80px 0 0px 0; margin: 0;text-transform: uppercase; color: #000;}
.subcopy hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 50px auto !important;}
.subcopy p{padding: 0 20%; line-height: 29px;}

.aboutcopy {background-size: cover; padding: 160px 0 999px 0;}
.aboutcopy h3{font-size: 36px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; }
.aboutcopy h4{font-size: 68px; font-weight: 200; padding: 0px 12%; margin: 0;text-transform: uppercase; color: #000; line-height: 58px;}
.aboutcopy h5{font-size: 18px; font-weight: 300; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000;}
.aboutcopy hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 50px auto !important;}
.aboutcopy p{padding: 0 20%;line-height: 29px;}
.aboutcopy img{margin: 30px 0; display: block;}

@media (min-width: 1990px){
.aboutblock p{font-size: 24px !important;}
}

@media (max-width: 769px) {
    #aboutus h3 span{font-size: 35px !important;}

    .aboutcopy {background:none !important;padding: 40px 0 40px 0 !important;}
    .aboutcopy h4 {font-size: 37px;font-weight: 200;padding: 0px 0 0px 0;margin: 0;text-transform: uppercase; color: #000;  line-height: 34px;}
.aboutcopy h3 {font-size: 22px;font-weight: 200;padding: 0px 0 0px 0; margin: 0;  text-transform: uppercase;    color: #000;}
.aboutcopy { margin: 40px 0 -43px 0;}
.aboutcopy p {padding: 0 4%;}
.aboutcopy h5 {font-size: 18px; font-weight: 300; padding: 36px 0 0px 0; margin: 0; text-transform: uppercase; color: #000;}
.productinnovation h3 {font-size: 27px; line-height: 27px;}
.productinnovation h4 {font-size: 16px; padding: 9px 0 0px 0;}
.productinnovation hr {margin: 35px auto 35px auto !important;}
.subcopy h4 {font-size: 37px;font-weight: 200;padding: 0px 0 0px 0;margin: 0;text-transform: uppercase; color: #000;  line-height: 34px;}
.subcopy h3 {font-size: 22px;font-weight: 200;padding: 0px 0 0px 0; margin: 0;  text-transform: uppercase;    color: #000;}
.subcopy { margin: 40px 0 -43px 0;}
.subcopy p {padding: 0 4%;}
.subcopy h5 {font-size: 18px; font-weight: 300; padding: 36px 0 0px 0; margin: 0; text-transform: uppercase; color: #000;}
.stopped p { padding: 0;}
}
@media (max-width: 414px) {
.headerimage{height: 323px; background-position-x: -140px;}
}
</style>
