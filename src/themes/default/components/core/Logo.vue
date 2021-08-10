<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex">
    <img
      :width="width"
      :height="height"
      :src="imgsrc"
      :alt="$t(defaultTitle)"
      class="mainlogo"
    >
  </router-link>
</template>

<script>
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  data () {
    const storeView = currentStoreView()
    return {
      defaultTitle: storeView.seo.defaultTitle ? storeView.seo.defaultTitle : config.seo.defaultTitle
    }
  },
  props: {
    width: {
      type: [String, Number],
      required: false
    },
    height: {
      type: [String, Number],
      required: false
    },
    imgsrc:{
      type: [String, Number],
      required: true
    }
  }
}
</script>
<style scoped>
.mainlogo{height: 100px; width: auto;}

@media (max-width: 768px) {
  .mainlogo{height: 50px; width: auto; margin-right: 65px;}
}
@media (max-width: 414px) {
  .mainlogo{height: 50px; width: auto; margin-right: 13px;}
}
</style>
