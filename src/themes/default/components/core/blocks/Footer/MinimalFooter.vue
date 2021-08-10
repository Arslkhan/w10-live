<template>
  <footer>
    <div class="footerholder">
      <div class="container">
        <div class="row m0 center-xs between-md">
          <div class="col-xs-12 mb20"><img src="/assets/logo2.png" alt="W10" /></div>
          <div class="col-xs-12"><img src="/assets/cred.png" alt="BPMA Accedited" /></div>
          <div class="col-xs-12"><p>+44 (0)208 827 0190<br/>
            <a href="mailto:enquiries@jogroup.co.uk">enquiries@jogroup.co.uk</a></p></div>

          <div class="col-xs-12">
            <router-link class="mr10"
                         to="/legal"
                         exact
            >
              {{ $t('TERMS & CONDITIONS ') }}
            </router-link>

            <router-link

              to="/privacy"
              exact
            >
              {{ $t('PRIVACY POLICY') }}
            </router-link>
          </div>
          <div class="col-xs-12">
            <p>TIDEWAY YARD UNIT T07, <br/>
              125 MORTLAKE HIGH STREET,  <br/>
              LONDON, SW14 8SN</p></div>

          <div class="col-xs-12">  <p>© 2020 Jogroup trading as W10 </p></div>
<!--          <div class="col-xs-12">  <p><a href="https://www.origin.uk.com" class="small" target="_blank">WEB DESIGN BY ORIGIN</a></p></div>-->

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
</style>
