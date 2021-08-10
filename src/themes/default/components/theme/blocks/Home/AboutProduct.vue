<template>
<div class="row p0 m0 aboutproduct">

    
        <div class="col-md-5 p0 m0 block1 flex middle-xs"><cms-block class="end-md" :identifier="'homepage-about-block-1'" /><img v-lazy="'/assets/b1.png'" height="157px" /></div>
        <div class="col-md-7 p0 m0"><img v-lazy="'/assets/b1.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>



        <div class="col-md-7 p0 m0 hidden-xs"><img v-lazy="'/assets/b2.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>
        <div class="col-md-5 p0 m0 block2 flex middle-xs hidden-xs"><img v-lazy="'/assets/b2.png'" height="157px" /><cms-block class="end-md" :identifier="'homepage-about-block-2'" /></div>

        <div class="col-md-5 p0 m0 block2 flex middle-xs visible-xs"><img v-lazy="'/assets/b2.png'" height="157px" /><cms-block class="end-md" :identifier="'homepage-about-block-2'" /></div>
        <div class="col-md-7 p0 m0 visible-xs"><img v-lazy="'/assets/b2.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>
        


        <div class="col-md-5 p0 m0 block3 flex middle-xs"><cms-block class="end-md" :identifier="'homepage-about-block-3'" /><img v-lazy="'/assets/b3.png'" height="157px" /></div>
        <div class="col-md-7 p0 m0"><img v-lazy="'/assets/b3.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>

        
        <div class="col-md-5 p0 m0 block4 flex middle-xs visible-xs"><img v-lazy="'/assets/b4.png'" height="157px" /><cms-block class="end-md" :identifier="'homepage-about-block-4'" /></div>
        <div class="col-md-7 p0 m0 visible-xs"><img v-lazy="'/assets/b4.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>       

        <div class="col-md-7 p0 m0 hidden-xs"><img v-lazy="'/assets/b4.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>
        <div class="col-md-5 p0 m0 block4 flex middle-xs hidden-xs"><img v-lazy="'/assets/b4.png'" height="157px" /><cms-block class="end-md" :identifier="'homepage-about-block-4'" /></div>

        <div class="col-md-5 p0 m0 block5 flex middle-xs"><cms-block class="end-md" :identifier="'homepage-about-block-5'" /><img v-lazy="'/assets/b5.png'" height="157px" /></div>
        <div class="col-md-7 p0 m0"><img v-lazy="'/assets/b5.jpg'" alt="Vacuum insulation" class="w-100 h-100" /></div>
   

</div>

</template>
<script>
   //import NoSSR from 'vue-no-ssr'

   //import VueCoreVideoPlayer from 'vue-core-video-player';

import CmsBlock from 'theme/components/core/blocks/Cms/Block'
    export default {
        name: 'AboutBlock',
        components: {
        CmsBlock
        },
        methods: {
            //mainBlock () {
            //    return this.parsedContent.querySelector('#homepage-about-block-1').innerHTML
            //}
        }
    }
</script>
<style scoped lang="scss">
.block1{background-color: #4c4c4c;}
.block2{background-color: #cd1c1e;}
.block3{background-color: #a89286;}
.block4{background-color: #000;}
.block5{background-color: #706b69;}
.block1 img{margin: 0 20px;}
.block1 div{padding: 0 0 0 20%;}
 
.block2 img{margin: 0 20px;}
.block2 div{padding: 0 20% 0 0; text-align: left;}

.block3 img{margin: 0 20px;}
.block3 div{padding: 0 0 0 20%;}

.block4 img{margin: 0 20px;}
.block4 div{padding: 0 20% 0 0; text-align: left;}

.block5 img{margin: 0 20px;}
.block5 div{padding: 0 0 0 20%;}

@media (max-width: 1500px) {
    .block1 div{padding: 0 0 0 10%;}
    .block2 div{padding: 0 10% 0 0; text-align: left;}
    .block3 div{padding: 0 0 0 10%;}
    .block4 div{padding: 0 10% 0 0; text-align: left;}
    .block5 div{padding: 0 0 0 10%;}
}
@media (max-width: 1144px) {
  .block1 img{display: none;}  
  .block2 img{display: none;}
  .block3 img{display: none;}
  .block4 img{display: none;}
  .block5 img{display: none;}
  .block1 div{padding: 0 20px;text-align: center;}
    .block2 div{padding: 0 20px; text-align: center;}
    .block3 div{padding: 0 20px;text-align: center}
    .block4 div{padding: 0 20px; text-align: center;}
    .block5 div{padding: 0 20px;text-align: center}
}

@media (max-width: 769px) {

.block1 div{padding: 20px; text-align:center;}
 

.block2 div{padding: 20px; text-align:center;}


.block3 div{padding: 20px;text-align:center;}


.block4 div{padding: 20px ; text-align: center;}


.block5 div{padding: 20px ; text-align:center;}
}
</style>
<style>
.aboutproduct h3{font-size: 52px; font-weight: 300; padding: 0px 0 30px 0; margin: 0;text-transform: uppercase; color: #fff; line-height: 49px;}
.aboutproduct p{font-size: 21px; font-weight: 200; padding: 0px 0 30px 0; margin: 0;text-transform: uppercase; color: #fff; padding-bottom: 15px;}
@media (max-width: 769px) {
    .aboutproduct h3{font-size: 20px; font-weight: 300; padding: 0px 0 30px 0; margin: 0;text-transform: uppercase; color: #fff; line-height: 20px;}
.aboutproduct p{font-size: 16px; font-weight: 200; padding: 0px 0 30px 0; margin: 0;text-transform: uppercase; color: #fff; padding-bottom: 16px;}
.aboutproduct .cms-content{width: 100%;}
}
</style>
