<template>

<div class="col-md-12">
<cms-block class="homeinto middle-xs center-xs" :identifier="'homepage-intro-text'" />
</div>
    

</template>
<script>
    import { mapGetters } from 'vuex'
    import CmsBlock from 'theme/components/core/blocks/Cms/Block'

    export default {
        name: 'PageTitle',
        components: {
        CmsBlock
        }
       
    }
</script>
<style lang="scss">
.homeinto{text-align: center;}

.homeinto h1{
    
    font-size: 47px; font-weight: 200; padding: 50px 150px 10px 150px; margin: 0; text-transform: uppercase;
    @media (min-width: 1388px) {
      padding: 50px 250px 10px 250px !important;
    }
    @media (min-width: 1570px) {
    padding: 50px 350px 10px 350px !important;
    }
     @media (min-width: 1771px) {
    padding: 50px 400px 10px 400px !important;
    }
    @media (min-width: 1871px) {
    padding: 50px 500px 10px 500px !important;
    }
    
  }
  .homeinto h2{
    font-size: 20px; font-weight: 500; padding: 0px 0 30px; margin: 0;text-transform: uppercase;
  }
  @media (max-width: 765px) {
    .homeinto h1{ font-size: 18px !important; padding: 20px 13px 10px 13px !important; }
  .homeinto h2{font-size: 16px !important; padding: 0px 0 30px !important;}
  }
    
</style>
