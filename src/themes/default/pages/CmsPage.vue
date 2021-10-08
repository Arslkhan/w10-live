<template>
  <div id="cms-page">
<!--    <header class="bg-cl-secondary py25">-->
<!--      <div class="container">-->
<!--        <div class="row middle-sm">-->
<!--          <h1 class="col-sm-9 category-title">-->
<!--            {{ cmsPageContent.title }}-->
<!--          </h1>-->
<!--        </div>-->
<!--      </div>-->
<!--    </header>-->
    <div class="container pb60" v-html="cmsPageContent.content" />
  </div>
</template>

<script>
import CmsPage from '@vue-storefront/core/pages/CmsPage'

export default {
  computed: {
    cmsPageContent () {
      return this.$store.state.cmsPage.current
    }
  },
  mixins: [CmsPage]
}
</script>

<style lang="scss" >
#cms-page {
 .main-returns{
   h4, .days-year{
     font-weight: 700;
     font-size:24px;
   }
   p {
     font-weight:500;
     font-size:20px;
     font-family: 'Raleway';
   }
   .return-Links{
     font-size:24px;
     a{
       color:#98694B;
       text-decoration: underline;
     }
   }
 }
 .main-terms{
   p, span{
     font-weight:500 !important;
     font-size:20px;
     font-family: 'Raleway';
   }
   .terms-top{
     font-weight: 700;
   }
 }
 .main-policy{
   .img-costa{
     text-align: center;
   }
    p, span, ol, li{
     font-weight:500 !important;
     font-size:20px;
     font-family: 'Raleway';
   }
 }
}
</style>
