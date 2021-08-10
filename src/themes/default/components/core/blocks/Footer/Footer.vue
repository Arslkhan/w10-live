<template>
  <footer>

    <div class="footerholder">
      <div class="container">
        <div class="row m0 center-xs between-md">
          <div class="col-xs-12 mb20"><img v-lazy="'/assets/logo2.png'" height="124px" alt="W10" /></div>
          <div class="col-xs-12"><img v-lazy="'/assets/cred.png'" height="44px" alt="BPMA Accedited" /> <img v-lazy="'/assets/british-jewellery-and-giftware-international.png'" height="82px" alt="british jewellery and giftware international" /></div>
          <div class="col-xs-12"><p><a href="tel:0800 012 6406"><b>0800 012 6406</b></a><br/>
            <a href="mailto:contactus@w10.world" class="text-underline">contactus@w10.world</a></p></div>

          <div class="col-xs-12">
            <router-link class="mr10"
                         to="/i/terms-and-conditions"
                         exact
            >
              {{ $t('TERMS & CONDITIONS ') }}
            </router-link>

            <router-link class="mr10"

                         to="/i/privacy-policy"
                         exact
            >
              {{ $t('PRIVACY POLICY') }}
            </router-link>

            <router-link

              to="/i/returns"
              exact
            >
              Returns
            </router-link>
          </div>
          <div class="col-xs-12">
            <p>TIDEWAY YARD UNIT T04, <br/>
              125 MORTLAKE HIGH STREET,  <br/>
              LONDON, SW14 8SN</p></div>

          <div class="col-xs-12">  <p>© 2021 Jogroup trading as W10 </p></div>
<!--          <div class="col-xs-12">  <p><a href="https://www.origin.uk.com" rel="noopener" class="small" target="_blank">WEB DESIGN BY ORIGIN</a></p></div>-->
          <div class="col-xs-12">

            <img class="stripe-icon mr-2" src="https://secure.w10.world/pub/static/version1598452708/frontend/origin/w10/en_GB/StripeIntegration_Payments/img/cards/amex.svg" width="50" alt="amex">

            <img class="stripe-icon mr-2" src="https://secure.w10.world/pub/static/version1598452708/frontend/origin/w10/en_GB/StripeIntegration_Payments/img/cards/discover.svg" width="50" alt="discover">

            <img class="stripe-icon mr-2" src="https://secure.w10.world/pub/static/version1598452708/frontend/origin/w10/en_GB/StripeIntegration_Payments/img/cards/diners.svg" width="50" alt="diners">

            <img class="stripe-icon mr-2" src="https://secure.w10.world/pub/static/version1598452708/frontend/origin/w10/en_GB/StripeIntegration_Payments/img/cards/jcb.svg" width="50" alt="jcb">

            <img class="stripe-icon mr-2" src="https://secure.w10.world/pub/static/version1598452708/frontend/origin/w10/en_GB/StripeIntegration_Payments/img/cards/mastercard.svg" width="50" alt="mastercard">

            <img class="stripe-icon mr-2" src="https://secure.w10.world/pub/static/version1598452708/frontend/origin/w10/en_GB/StripeIntegration_Payments/img/cards/visa.svg" width="50" alt="visa">

            <img class="stripe-icon" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png" width="50" alt="paypal">

          </div>

        </div>
      </div>
    </div>

    <back-to-top bottom="20px" right="20px" visibleoffset="200">
      <button type="button" class="btn-top button no-outline brdr-none cl-white bg-cl-mine-shaft :bg-cl-th-secondary py10 px10">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" fill="white" />
        </svg>
      </button>
    </back-to-top>
  </footer>
</template>

<script>
import BackToTop from 'theme/components/core/BackToTop'

export default {
  name: 'MainFooter',
  components: {
    BackToTop
  }
}
</script>

<style lang="scss" scoped>
.footerholder{padding: 100px 0 65px 0;}
footer{background: #000;}
a:hover{color: #98694b; text-decoration: none !important; background-color: black !important;}
p,a{color: #98694b; font-size: 20px; text-transform: uppercase;}
.small{font-size: 16px;}
.text-underline{text-decoration: underline;}
</style>
