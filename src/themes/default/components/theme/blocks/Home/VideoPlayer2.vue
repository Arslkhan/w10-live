<template>

<div v-if="id == 26 || id == 24 || id == 8  || id == 28" class="col-md-12">
<div class="middle-xs center-xs">

<div class="row videoholder">
     <div class="container"><h2>How to safely use the collapsible cup</h2>
<h3>How it works</h3>
                <div class="middle-xs center-xs">
                    <video width="100%" height="auto" controls poster="/assets/video2.jpg" preload="none">
                    <source src="/assets/W10-Stylish-Collapsible-Stainless-Steel-Mug.mp4" type="video/mp4">
                    </video>
                </div>
      </div>
</div>

</div>
</div>
    

</template>
<script>
   //import NoSSR from 'vue-no-ssr'

   //import VueCoreVideoPlayer from 'vue-core-video-player';


    export default {
        name: 'VideoPlayer',
        components: {
        //vuePlayer,
        //'VueCoreVideoPlayer': () => import('vue-core-video-player').then(m => m.default),
        //'vue-core-video-player': () => process.browser ? import('vue-core-video-player').then(m => m.default) : null,
        //'no-ssr': NoSSR
        },
        props: {
    id: {
      type: [Number],
      required: true
    },
    
  }
    }
</script>
<style scoped lang="scss">
.videoholder{background: black; padding-bottom: 40px;}
.iframe{
  width: 1080px; height: 720px;
   @media (max-width: 767px) {
     width: 100%; height: 368px;
   }
  }
h2{
    font-size: 30px; font-weight: 300; padding: 100px 0 30px 0; margin: 0; text-transform: uppercase;line-height: 21px; color: white;
  }
  h3{
    font-size: 14px; font-weight: 400; padding: 0px 0 100px 0; margin: 0;text-transform: uppercase; color:white
  }
  @media (max-width: 767px) {
  h2 {
    font-size: 26px;
    font-weight: 300;
    padding: 50px 0 9px 0;
    margin: 0;
    text-transform: uppercase;
}
h3 {
    font-size: 14px;
    font-weight: 400;
    padding: 0px 0 40px 0;
    margin: 0;
    text-transform: uppercase;
}
  }
</style>
