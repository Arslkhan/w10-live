<template>
 <div v-if="getCurrentRelatedProducts.length" class="row center-xs w-100 m0">
    <products-slider :title="heading" :config="config" :products="getCurrentRelatedProducts" />
    </div>
</template>

<script>
import ProductListing from 'theme/components/core/ProductListing'
import { mapGetters } from 'vuex'
import { prepareRelatedQuery } from '@vue-storefront/core/modules/catalog/queries/related'
import i18n from '@vue-storefront/i18n'
import config from 'config'
import ProductsSlider from 'theme/components/core/ProductsSlider'

export default {
  data () {
    return {
      loading: true,
      config: {
        perPageCustom: [[320,2], [768,2], [1024,3], [1366,4]],
        paginationEnabled: false,
        navigationEnabled: true,
        mouseDrag: false
      },
    }
  },
  name: 'Related',
  props: {
    type: {
      type: String,
      required: true
    },
    productID: {
      type: Number,
      required: true
    },
    heading: {
      type: String,
      required: false,
      default: i18n.t('These may also suit you')
    }
  },
  components: {
    ProductListing,
    ProductsSlider
  },
  beforeMount () {
    this.$bus.$on('product-after-load', this.refreshList)

    if (config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }

    this.refreshList()
  },
  beforeDestroy () {
    if (config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  methods: {
    async refreshList () {
      let sku = this.productLinks ? this.productLinks
        .filter(pl => pl.link_type === this.type)
        .map(pl => pl.linked_product_sku) : null

      let key = 'sku'
      if (sku === null || (sku.length === 0)) {
        sku = this.getCurrentProduct.category_ids
        key = 'category_ids'
      }
      let relatedProductsQuery = prepareRelatedQuery(key, sku)

      const response = await this.$store.dispatch('product/list', {
        query: relatedProductsQuery,
        size: 8,
        prefetchGroupProducts: false,
        updateState: false
      })
      if (response) {
        this.$store.dispatch('product/related', {
          key: this.type,
          items: response.items
        })
        this.$forceUpdate()
      }
    }
  },
  computed: {
    ...mapGetters({
      getProductRelated: 'product/getProductRelated',
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    getCurrentRelatedProducts () {
      if(this.productID && this.getProductRelated[this.type]){
        return this.getProductRelated[this.type].filter(c => {return c.id !== this.productID}) || []
      }else{
        return this.getProductRelated[this.type] || []
      }
      
    },
    productLinks () {
      return this.getCurrentProduct.product_links
    }
  }
}
</script>
