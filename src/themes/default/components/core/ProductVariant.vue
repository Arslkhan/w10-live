<template>
  <div class="option-box">
    <router-link class="no-underline block" v-for="option in getCustomFilters" :key="option.id" :to="productLink">
      <product-material-selector
        v-for="filter in option.options"
        :key="filter.id"
        :variant="filter"
        :current="parseInt(product.material)"
        :selected="parseInt(selectedMaterial)"
      />
    </router-link>
  </div>
</template>
<script>
import ProductMaterialSelector from 'theme/components/core/ProductMaterialSelector.vue'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import { mapGetters } from 'vuex'
export default {
    props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ProductMaterialSelector
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      attributesByCode: 'attribute/attributeListByCode'
    }),
    getCustomFilters () {
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && a.attribute_code === 'material' && this.product[a.attribute_code]
      })
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    selectedMaterial () {
      return this.getCurrentProduct.material

    },
    storeView () {
      return currentStoreView()

    }
  }
}
</script>