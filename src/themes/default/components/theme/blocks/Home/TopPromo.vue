<template>
<section class="fixed shippingpromo w-100">
<div class="col-md-12">
<cms-block class="middle-xs center-xs" :identifier="'homepage-top-shipping-promo'" />
</div>
</section>    

</template>
<script>
    import { mapGetters } from 'vuex'
    import CmsBlock from 'theme/components/core/blocks/Cms/Block'

    export default {
        name: 'TopPromo',
        components: {
        CmsBlock
        }
       
    }
</script>
<style lang="scss">
.shippingpromo{background: #98694b; padding: 0; z-index: 4;}
.shippingpromo p{font-size: 12px; font-weight: 500; color: #fff;text-transform: uppercase; letter-spacing: 3px; line-height: 4px;  }
  
@media (max-width: 765px) {
.shippingpromo p{font-size: 10px; font-weight: 500;  }
}
    
</style>
