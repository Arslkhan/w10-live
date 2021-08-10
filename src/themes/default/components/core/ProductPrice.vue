<template>
  <div class="price serif">
    <div

      v-if="initialPrice.special && price.default && price.original"
    >
      <span

      >{{ price.special | price(storeView) }}</span>&nbsp;
      <span
        class="price-original"
      >{{ price.original | price(storeView) }}</span>
    </div>
    <div

      v-if="!initialPrice.special && price.default"
    >
      {{ price.default | price(storeView) }}
    </div>
  </div>
</template>
<script>
import { getCustomOptionValues, getCustomOptionPriceDelta } from '@vue-storefront/core/modules/catalog/helpers/customOption'
import { getBundleOptionsValues, getBundleOptionPrice } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import get from 'lodash-es/get'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  name: 'ProductPrice',
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    customOptions: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bundleOptionsPrice () {
      const allBundeOptions = this.product.bundle_options || []
      const selectedBundleOptions = Object.values(get(this.product, 'product_option.extension_attributes.bundle_options', {}))
      const price = getBundleOptionPrice(
        getBundleOptionsValues(selectedBundleOptions, allBundeOptions)
      )
      return price
    },
    customOptionsPriceDelta () {
      const priceDelta = getCustomOptionPriceDelta(
        getCustomOptionValues(Object.values(this.customOptions), this.product.custom_options || []),
        this.product
      )

      return priceDelta
    },
    price () {
      const customOptionPrice = this.customOptionsPriceDelta.priceInclTax
      const special = (this.initialPrice.default + customOptionPrice) * this.product.qty
      const original = (this.initialPrice.original + customOptionPrice) * this.product.qty
      const defaultPrice = this.product.qty > 0
        ? (this.initialPrice.default + customOptionPrice) * this.product.qty
        : this.initialPrice.default

      if (this.bundleOptionsPrice.priceInclTax > 0) {
        return {
          special,
          original,
          default: this.bundleOptionsPrice.priceInclTax
        }
      }

      return {
        special,
        original,
        default: defaultPrice
      }
    },
    initialPrice () {
      return {
        default: this.product.price || this.product.price || 0,
        original: this.product.original_price || this.product.originalPrice || 0,
        special: this.product.special_price || this.product.specialPrice || 0
      }
    },
    storeView () {
      return currentStoreView()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
.price-original {
  text-decoration: line-through;
}


.price{font-size: 50px; font-weight: 300; color: #000; text-transform: uppercase;}
</style>
