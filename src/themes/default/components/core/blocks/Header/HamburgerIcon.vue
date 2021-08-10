<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
    data-testid="menuButton"
  >
    <img src="/assets/bars.png" />
  </button>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/compatibility/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [HamburgerIcon]
}
</script>
<style scoped>
img{height: 30px;}
</style>
