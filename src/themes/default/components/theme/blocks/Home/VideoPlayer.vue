<template>

<div class="col-md-12">
<div class="middle-xs center-xs">
<h2>AN innovation in design</h2>
<h3>PATENT PENDING (1815385.8) TECHNOLOGY</h3>
<div class="row videoholder">
     <div class="col-md-4"></div>
                <div class="col-md-4 home_bottom_video">
                    <video width="100%" height="auto" controls poster="/assets/video.jpg" preload="none">
  <source src="/assets/W10.mp4" type="video/mp4">
</video>
                </div>
      <div class="col-md-4"></div>
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
        }
    }
</script>
<style scoped lang="scss">
.videoholder{background: black;}
h2{
    font-size: 30px; font-weight: 300; padding: 100px 0 30px 0; margin: 0; text-transform: uppercase;line-height: 21px;
  }
  h3{
    font-size: 14px; font-weight: 400; padding: 0px 0 100px 0; margin: 0;text-transform: uppercase;
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
