<template>
  <div v-if="products != ''" class="flex material-container py10">
   
    <div class="h6 cl-text weight-300 uppercase w-100 py10">CHOOSE A FINISH</div>
    <div class="flex">
      <product-variant :product="parentProduct" />
      <product-variant
        v-for="product in products"
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<script>
import ProductVariant from 'theme/components/core/ProductVariant'
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
export default {
  name: 'Variant',
  components: {
    ProductVariant
  },
  props: {
    products: {
      type: null,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    parentProduct () {
      return this.getCurrentProduct
    }
  }
}
</script>
<style lang="scss" scoped>
  .material-container {
    flex-direction: column;
  }
</style>