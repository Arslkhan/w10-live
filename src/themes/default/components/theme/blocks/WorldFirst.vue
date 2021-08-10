<template>
    <div class="col-xs-12 aboutcopy" v-lazy:background-image="'/assets/aboutus2.jpg'">
    <div class="middle-xs center-xs flex">
        <div class="row">
        <cms-block class="cmstext col-xs-12" :identifier="'about-us-world-first'" />
        
        <div class="col-xs-12 hidden-xs middle-xs center-xs">
            <div class="row">
  <span class="col-xs-12 center-xs flex"><img src="/assets/logo2.png" height="100px"/></span>
        <h5 class="col-xs-12">the home of innovative drinkware</h5>
            </div>
      
        </div>
        </div>
    </div>
    </div>
</template>
<script>
import CmsBlock from 'theme/components/core/blocks/Cms/Block'
export default {
    components: {
        CmsBlock
    }
}
</script>
<style scoped>

hr{margin: 50px 0; padding: 0; width: 100px;border: 0; border-top:1px solid #98694b;}


</style>
<style>

.aboutcopy {background-size: cover; padding: 160px 0 999px 0; background-position: center;}
@media (max-width: 1423px) {
    .aboutcopy{
        background-size: cover !important;
    
    background-repeat: no-repeat;
    background-color: #ffffff;
    }
}
@media (min-width: 1200px) {
           .aboutcopy{background-position-y: -2px; }
}
@media (min-width: 1990px){
    
    
}
.aboutcopy h3{font-size: 36px; font-weight: 200; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000; }
.aboutcopy h4{font-size: 68px; font-weight: 200; padding: 0px 12%; margin: 0;text-transform: uppercase; color: #000; line-height: 58px;}
.aboutcopy h5{font-size: 18px; font-weight: 300; padding: 0px 0 0px 0; margin: 0;text-transform: uppercase; color: #000;}
.aboutcopy hr{width: 150px !important; border: 0; border-top:1px solid #98694b; margin: 50px auto !important;}
.aboutcopy p{padding: 0 20%;line-height: 29px;}
.aboutcopy img{margin: 30px 0; display: block;}

@media (max-width: 767px) {
    .aboutcopy {background:none !important;padding: 40px 0 40px 0 !important;}
    .aboutcopy h4 {font-size: 37px;font-weight: 200;padding: 0px 0 0px 0;margin: 0;text-transform: uppercase; color: #000;  line-height: 34px;}
.aboutcopy h3 {font-size: 22px;font-weight: 200;padding: 0px 0 0px 0; margin: 0;  text-transform: uppercase;    color: #000;}
.aboutcopy { margin: 40px 0 -43px 0;}
.aboutcopy p {padding: 0 4%;}
.aboutcopy h5 {font-size: 18px; font-weight: 300; padding: 36px 0 0px 0; margin: 0; text-transform: uppercase; color: #000;}

}
</style>