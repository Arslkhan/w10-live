<template>
  <div id="product">
    <section class="px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12 col-md-6 middle-xs image">
            <breadcrumbs class="pb10 hidden-sm"  />
            <product-gallery
              :offline="getOfflineImage"
              :gallery="getProductGallery"
              :configuration="getCurrentProductConfiguration"
              :product="getCurrentProduct"
            />
          </div>
          
          <div class="col-xs-12 col-md-5 data">
            
            <h1
              class="mt0 cl-mine-shaft product-name"
              data-testid="productName"
            >
              {{ getCurrentProduct.name | htmlDecode }}
              <web-share
                :title="getCurrentProduct.name | htmlDecode"
                text="Check this product!"
                class="web-share"
              />
            </h1>
            <p class="shortdescription"><span v-if="getCurrentProduct.short_description">{{ getCurrentProduct.short_description | strippedContent }}</span></p>
      
            <div>
              <product-price               
                v-if="getCurrentProduct.type_id !== 'grouped'"
                :product="getCurrentProduct"
                :custom-options="getCurrentCustomOptions"
              />
        <related-variant type="related" :linkedproducts="getCurrentProduct.linkedproducts" :productID="getCurrentProduct.id" />
              <div class="cl-primary variants" v-if="getCurrentProduct.type_id =='configurable'">
                <div
                  class="error"
                  v-if="getCurrentProduct.errors && Object.keys(getCurrentProduct.errors).length > 0"
                >
                  {{ getCurrentProduct.errors | formatProductMessages }}
                </div>
                <div class="h5" v-for="option in getProductOptions" :key="option.id">
                  <div class="variants-label" data-testid="variantsLabel">
                    {{ option.label }}
                    <span
                      class="weight-700"
                    >{{ getOptionLabel(option) }}</span>
                  </div>
                  <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <color-selector
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <size-selector
                        class="mr10 mb10"
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        class="mr10 mb10"
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"
                      />
                    </div>
                    <span
                      v-if="option.label == 'Size'"
                      @click="openSizeGuide"
                      class="p0 ml30 inline-flex middle-xs no-underline h5 action size-guide pointer cl-secondary"
                    >
                      <i class="pr5 material-icons">accessibility</i>
                      <span>{{ $t('Size guide') }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="getCurrentProduct.type_id =='grouped'"
              :products="getCurrentProduct.product_links"
            />
            <product-bundle-options
              v-if="getCurrentProduct.bundle_options && getCurrentProduct.bundle_options.length > 0"
              :product="getCurrentProduct"
            />
            <product-custom-options
              v-else-if="getCurrentProduct.custom_options && getCurrentProduct.custom_options.length > 0"
              :product="getCurrentProduct"
            />
            <product-quantity
              class="row m0 mb35"
              v-if="getCurrentProduct.type_id !== 'grouped' && getCurrentProduct.type_id !== 'bundle'"
              v-model="getCurrentProduct.qty"
              :max-quantity="maxQuantity"
              :loading="isStockInfoLoading"
              :is-simple-or-configurable="isSimpleOrConfigurable"
              :show-quantity="manageQuantity"
              :check-max-quantity="manageQuantity"
              @error="handleQuantityError"
            />
            <div class="row m0">
              <add-to-cart
                :product="getCurrentProduct"
                :disabled="isAddToCartDisabled"
                class="col-xs-12 col-sm-4 col-md-6"
              />
              <AddToWishlist class="wishlist" :product="getCurrentProduct" />
            </div>

           <div class="row mt20 description">
             <div class="col-xs-12">
              <h2 class="details-title">
                {{ $t('DESCRIPTION') }}
              </h2>
              
               <div class="copy" v-html="getCurrentProduct.description" />
             
               </div>
          </div>
            
          </div>
        </section>
      </div>
      
    </section>
    <div class="row hotcoldp40">
      <div class="col-xs-12 flex center-xs middle-xs">
        <img class="hotclode visible-xs" src="assets/hotcoldsafe2.jpg" height="198" />
        <img class="hotclode hidden-xs" src="assets/hotcoldsafe.jpg" height="198" />
      </div>
    </div>

    <video-player :id="getCurrentProduct.id" />
  <about-product />
  

 
    <lazy-hydrate when-idle>
      <related-products type="upsell" :productID="getCurrentProduct.id" />
    </lazy-hydrate> 
  



</div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import VueOfflineMixin from 'vue-offline/mixin'
import config from 'config'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import RelatedVariant from 'theme/components/core/blocks/Product/RelatedVariant.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductQuantity from 'theme/components/core/ProductQuantity.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import Spinner from 'theme/components/core/Spinner'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import focusClean from 'theme/components/theme/directives/focusClean'
import WebShare from 'theme/components/theme/WebShare'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import SizeGuide from 'theme/components/core/blocks/Product/SizeGuide'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare'
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts'
import { getAvailableFiltersByProduct, getSelectedFiltersByProduct } from '@vue-storefront/core/modules/catalog/helpers/filters'
import { isOptionAvailableAsync } from '@vue-storefront/core/modules/catalog/helpers/index'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { htmlDecode } from '@vue-storefront/core/filters'
import { ReviewModule } from '@vue-storefront/core/modules/review'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import { registerModule, isModuleRegistered } from '@vue-storefront/core/lib/modules'
import { onlineHelper, isServer, productJsonLd } from '@vue-storefront/core/helpers'
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks'
import ProductPrice from 'theme/components/core/ProductPrice.vue'
import { doPlatformPricesSync } from '@vue-storefront/core/modules/catalog/helpers'
import { filterChangedProduct } from '@vue-storefront/core/modules/catalog/events'
import AboutProduct from 'theme/components/theme/blocks/Home/AboutProduct'
import VideoPlayer from 'theme/components/theme/blocks/Home/VideoPlayer2'

export default {
  components: {
    AddToCart,
    AddToCompare,
    AddToWishlist,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    PromotedOffers,
    RelatedProducts,
    RelatedVariant,
    Reviews,
    SizeSelector,
    WebShare,
    SizeGuide,
    LazyHydrate,
    ProductQuantity,
    ProductPrice,
    AboutProduct,
    VideoPlayer
  },
  mixins: [ProductOption],
  directives: { focusClean },
  beforeCreate () {
    registerModule(ReviewModule)
    registerModule(RecentlyViewedModule)
  },
  data () {
    return {
      detailsOpen: false,
      maxQuantity: 0,
      quantityError: false,
      isStockInfoLoading: false,
      hasAttributesLoaded: false,
      manageQuantity: true
    }
  },
  filters: {
    strippedContent: function(string) {
           return string.replace(/<\/?[^>]+>/ig, " "); 
    }
  },
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory',
      getCurrentProduct: 'product/getCurrentProduct',
      getProductGallery: 'product/getProductGallery',
      getCurrentProductConfiguration: 'product/getCurrentProductConfiguration',
      attributesByCode: 'attribute/attributeListByCode',
      getCurrentCustomOptions: 'product/getCurrentCustomOptions'
    }),
    getOptionLabel () {
      return (option) => {
        const configName = option.attribute_code ? option.attribute_code : option.label.toLowerCase()
        return this.getCurrentProductConfiguration[configName] ? this.getCurrentProductConfiguration[configName].label : configName
      }
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    getProductOptions () {
      if (
        this.getCurrentProduct.errors &&
        Object.keys(this.getCurrentProduct.errors).length &&
        Object.keys(this.getCurrentProductConfiguration).length
      ) {
        return []
      }
      return this.getCurrentProduct.configurable_options
    },
    getOfflineImage () {
      return {
        src: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height),
        error: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height),
        loading: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height)
      }
    },
    getCustomAttributes () {
      return Object.values(this.attributesByCode || [])
        .filter(
          a => a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.getCurrentProduct[a.attribute_code]
        )
        .sort((a, b) => { return a.attribute_id > b.attribute_id })
    },
    getAvailableFilters () {
      return getAvailableFiltersByProduct(this.getCurrentProduct)
    },
    getSelectedFilters () {
      return getSelectedFiltersByProduct(this.getCurrentProduct, this.getCurrentProductConfiguration)
    },
    isSimpleOrConfigurable () {
      return ['simple', 'configurable'].includes(this.getCurrentProduct.type_id)
    },
    isAddToCartDisabled () {
      if (this.quantityError || this.isStockInfoLoading) {
        return false
      }

      return this.isOnline && !this.maxQuantity && this.manageQuantity && this.isSimpleOrConfigurable
    },
    storeView () {
      return currentStoreView()
    },
    getJsonLd () {
      return productJsonLd(this.getCurrentProduct, this.getCurrentProductConfiguration.color && this.getCurrentProductConfiguration.color.label, this.$store.state.storeView.i18n.currencyCode, this.getCustomAttributes)
    }
  },
  async mounted () {
    await this.$store.dispatch('recently-viewed/addItem', this.getCurrentProduct)
  },
  async asyncData ({ store, route, context }) {
    if (context) context.output.cacheTags.add('product')
    const product = await store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
    const loadBreadcrumbsPromise = store.dispatch('product/loadProductBreadcrumbs', { product })
    if (isServer) await loadBreadcrumbsPromise
    catalogHooksExecutors.productPageVisited(product)
  },
  beforeRouteEnter (to, from, next) {
    if (isServer) {
      next()
    } else {
      next((vm) => {
        vm.getQuantity()
      })
    }
  },
  watch: {
    isOnline: {
      handler (isOnline) {
        if (isOnline) {
          this.getQuantity()
        }
      }
    }
  },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(
          'The product is out of stock and cannot be added to the cart!'
        ),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t(
          'No such configuration for the product. Please do choose another combination of attributes.'
        ),
        action1: { label: this.$t('OK') }
      })
    },
    async changeFilter (variant) {
      const selectedConfiguration = Object.assign({ attribute_code: variant.type }, variant)
      await filterChangedProduct(selectedConfiguration, this.$store, this.$router)
      this.getQuantity()
    },
    openSizeGuide () {
      this.$bus.$emit('modal-show', 'modal-sizeguide')
    },
    isOptionAvailable (option) { // check if the option is available
      const currentConfig = Object.assign({}, this.getCurrentProductConfiguration)
      currentConfig[option.type] = option
      return isOptionAvailableAsync(this.$store, { product: this.getCurrentProduct, configuration: currentConfig })
    },
    async getQuantity () {
      if (this.isStockInfoLoading) return // stock info is already loading
      this.isStockInfoLoading = true
      try {
        if (config.products.alwaysSyncPricesClientSide) {
          doPlatformPricesSync([this.getCurrentProduct]);
        }
        const res = await this.$store.dispatch('stock/check', {
          product: this.getCurrentProduct,
          qty: this.getCurrentProduct.qty
        })

        this.manageQuantity = res.isManageStock
        this.maxQuantity = res.isManageStock ? res.qty : null
      } finally {
        this.isStockInfoLoading = false
      }
    },
    handleQuantityError (error) {
      this.quantityError = error
    }
  },
  
  metaInfo() {
        return {
            title: htmlDecode(this.getCurrentProduct.meta_title || this.getCurrentProduct.name) + " - ",
            meta: [
                {vmid: 'description', name: 'description', content: this.getCurrentProduct.meta_description ? htmlDecode(this.getCurrentProduct.meta_description)  : ''},
                { property: 'og:title', content: htmlDecode(this.getCurrentProduct.meta_title || this.getCurrentProduct.name) + " - W10 Collapsible Cup and Eco-Friendly Drinkware"},
                { property: 'og:site_name', content: 'W10 Drinkware Collection'},
                { property: 'og:description', content: this.getCurrentProduct.meta_description ? htmlDecode(this.getCurrentProduct.meta_description)  : ''},
                {property: 'og:type', content: 'website'},
                {property: 'og:url', content: 'https://w10.world/' + this.$route.path},
                {property: 'og:image', content: 'https://w10.world/img/0/0/resize/catalog/product/' + this.getCurrentProduct.image },    
                {property: 'og:image:width', content: '800px'},
                {property: 'og:image:height', content: '800px'}
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.product {
  &__add-to-compare {
    display: none;
    @media (min-width: 767px) {
      display: block;
    }
  }
}

.breadcrumbs {
  @media (max-width: 767px) {
    margin: 0;
    padding: 5px 0;
  }
}

.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}
.data {
  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.image {
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
}

.product-name {
  @media (max-width: 767px) {
    font-size: 36px;
  }
}

.variants-label {
  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.variants-wrapper {
  @media (max-width: 767px) {
    padding-bottom: 30px;
  }

  .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.product-top-section {
  @media (max-width: 767px) {
    padding: 0;
    background-color: $color-white;
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details {
  @media (max-width: 767px) {
    padding: 50px 15px 15px;
  }
}

.details-title {
  padding: 20px 0 0 0;
  font-weight: 300;
  font-size: 25px;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0;
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}
.hotcoldp40{padding: 40px 0;
 @media (max-width: 767px) {
   padding: 0;
 }
}
.action {
  &:hover {
    color: $color-tertiary;
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-image {
  mix-blend-mode: multiply;
  width: 460px;
}

.web-share {
  float: right;
}
#product{
  margin-top: 100px;
    @media (max-width: 767px) {
      margin-top: 10px;
    }
  }
  .wishlist{
    margin-left: 20px;
  @media (max-width: 767px) {
    margin: 20px 0 0 0 !important;
  }
  }
   @media (max-width: 767px) {
 .hotclode{    width: auto;
    max-width: 100%;
    height: auto;
    padding: 20px;}
   }
 
h1{font-size: 30px; font-weight: 300; text-transform: uppercase; margin: 0; padding: 0;}
.yellow{color: #fd911b;}
.f19{font-size: 19px;}
.shortdescription{padding: 0 0 10px ; margin: 0;}
.star{margin-top: 0; padding-top: 0;}
.copy{padding: 0; margin: 0;}
.mb40{margin-bottom: 60px;}
.mt40{margin-top: 60px;}
</style>
<style>
.description ul{margin-left: -19px;}
.description li{margin-bottom: 10px;}
.description p{line-height: 24px;}
</style>
