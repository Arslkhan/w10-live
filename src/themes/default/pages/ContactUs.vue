<template>
  <div id="contact us">
    
   <header class="headerimage" v-lazy:background-image="'/assets/about.jpg'">
      <div class="container center-xs middle-xs aboutblock">
        <h1>
          CONTACT
        </h1>
         <p>get in touch</p>
       
      </div>
    </header>

     <contact-form />
    

    <social-area />
  </div>
</template>

<script>

import CmsBlock from 'theme/components/core/blocks/Cms/Block'
import SocialArea from 'theme/components/theme/blocks/SocialArea'
import ContactForm from 'theme/components/theme/blocks/Static/ContactForm'
export default {
    
  components: {
        CmsBlock,
        SocialArea,
        ContactForm
  },
  metaInfo () {
    return {
      title:"Contact us - ",
      meta: [{ vmid: 'description', name: 'description', content: 'Call or email us for any issues' }]
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
}
@media (max-width: 414px) {
.headerimage{height: 323px; background-position-x: -140px;}
}
</style>


