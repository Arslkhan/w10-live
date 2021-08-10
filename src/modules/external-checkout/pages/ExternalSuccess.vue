<template>
  <div id="thank_you_external">
    <header class="thank-you-title">
     
      <div class="container center-xs middle-xs">
        <h1>
          {{ $t('Order confirmation') }}
        </h1>
       
      
      </div>
    </header>
    <div class="text-center center-xs flex middle-xs w-100">
         <hr />
    </div>
    <div class="thank-you-content">
      <div class="container">
        <div class="row">
          <div class="col-md-12 pl20 pr20">
            <h3 v-if="OnlineOnly" >
              {{ $t('Your purchase') }}
            </h3>
            <p v-html="this.$t('You have successfuly placed the order. You can check status of your order by using our <b>delivery status</b> feature. You will receive an order confirmation e-mail with details of your order and a link to track its progress.')" />
            <p v-html="this.$t('E-mail us at <b>contactus@w10.world</b> with any questions, suggestions how we could improve products or shopping experience')"/>
            <h3>
              {{ $t('Your Account') }}
            </h3>
            <p v-html="this.$t('You can log to your account using e-mail and password defined earlier. On your account you can <b>edit your profile data,</b> check <b>history of transactions</b>.</b>')"/>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Composite from '@vue-storefront/core/mixins/composite'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import get from 'lodash-es/get';
import { mapGetters, mapState } from 'vuex';
import config from 'config';
import VueOfflineMixin from 'vue-offline/mixin';
import { isServer } from '@vue-storefront/core/helpers';
import rootStore from '@vue-storefront/core/store'
import { getProduct } from '../router/beforeEach'
import prepareCheckoutObject from '../../facebook-pixel/util/prepareCheckoutObject';
export default {
  name: 'ExternalThankYouPage',
  mixins: [Composite, VueOfflineMixin],
    components: {
    Breadcrumbs
  },
  data () {
    return {
      dataLoaded: true
    }
  },
  // beforeMount () {
  //   this.$bus.$on('application-after-loaded', (payload) => {
  //     if (document.getElementById('thank_you_external') != null) {
  //       this.clearTheCart()
  //     }
  //   })
  //   this.$bus.$on('cart-after-itemchanged', (payload) => {
  //     if (document.getElementById('thank_you_external') != null) {
  //       this.clearTheCart()
  //     }
  //   })
  // },
  computed: {
    ...mapState({
      lastOrderConfirmation: state => get(state, 'order.last_order_confirmation.confirmation') || {},
      checkoutPersonalEmailAddress: state => state.checkout.personalDetails.emailAddress
    }),
    platformTotal () {
      return this.$store.state.cart.platformTotals
    },
    // ...mapGetters({
    //   ordersHistory: 'user/getOrdersHistory'
    // }),
    // order () {
    //   return this.ordersHistory.find(order =>
    //     parseInt(order.entity_id) === parseInt(this.$route.params.orderId)
    //   )
    // }
  },
  methods: {
    clearTheCart () {
      if (this.getNumberOfItemsInCart() > 0) {
        rootStore.dispatch('cart/clear', {}, { root: true })
        rootStore.dispatch('cart/serverCreate', {guestCart: false}, {root: true})
      }
    },
    getNumberOfItemsInCart () {
      return this.$store.state.cart.cartItems.length
    },
    gtmTrackEvent (cart) {
      //console.log(this.$store.state.cart.cartItems)
      this.$gtm.trackEvent({
        event: 'online.purchase',
        'ecommerce': {
          'currencyCode' : 'GBP',
          'purchase': {
            'actionField': {
              'id': this.$route.params.orderId ? this.$route.params.orderId : '',
              'affiliation': 'W10',
              'revenue': cart && cart.base_grand_total ? cart.base_grand_total : '',
              'tax': cart && cart.base_tax_amount ? cart.base_tax_amount : '',
              'shipping': cart && cart.base_shipping_amount ? cart.base_shipping_amount : '',
              'coupon': ''
            },
            'products': this.$store.state.cart.cartItems.map(product => getProduct(product))
            
          }
        }
      });
      
      this.$gtm.trackEvent({
        event: 'conversion',
        'send_to': 'AW-612207016/P1oMCPCl0-sBEKiT9qMC', 
        'value': cart && cart.base_grand_total ? cart.base_grand_total : '',
        'currency': 'GBP', 
        'transaction_id': this.$route.params.orderId ? this.$route.params.orderId : ''
        });

      fbq('track', 'Purchase', prepareCheckoutObject(this.$store, true));
      this.clearTheCart();
    }
  },
  watch: {
    platformTotal (n, o) {
      if (this.dataLoaded) {
        this.gtmTrackEvent(n);
        this.dataLoaded = false;
      }
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title,
      meta: [{vmid: 'description', description: this.$route.meta.description}]
    }
  },
}
</script>
<style lang="scss" scoped>
  #thank_you_external ~ .notifications {
    display: none;
  }
  h1{font-size: 44px;font-weight: 100;color: black; margin: 40px 0 0px 0; padding: 0; text-transform: uppercase;}
  h3{font-size: 25px;font-weight: 300;color: black; margin: 0px 0 0px 0; padding: 0; text-transform: uppercase;}
  hr{margin: 50px 0; padding: 0; width: 100px;border: 0; border-top:1px solid #98694b;}
  .thank-you-improvment{padding:20px 40px 40px 40px}
  .thank-you-content{margin-bottom: 40px;}
  @media (max-width: 767px) {
    hr{margin: 30px 0 0 0;}
     .thank-you-content{margin-top: 0px;}
h1{
    font-size: 32px;
    font-weight: 100;
    color: black;
    margin: 40px 0 0px 0;
    padding: 0;
}
}

</style>
