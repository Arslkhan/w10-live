<template>
  <button v-if="parseInt(variant.value) === current"
    :class="['mr10 mb5 bg-cl-transparent brdr-1 brdr-cl-transparent :brdr-cl-bg-primary relative inline-flex pointer color', (selected > 0 && selected === parseInt(variant.value)) ? 'active' : '']"
    @click="$emit('change', variant)"
    :aria-label="$t('Select material ') + variant.label"
  >
    <span
      class="absolute brdr-1 brdr-cl-secondary block color-inside"
      v-lazy:background-image="backgroundColor(variant.label)"
    />
    <span class="absolute h6 cl-text weight-600 color-label">{{variant.label}}</span>
  </button>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts'
export default {
  props: {
    current: {
      type: Number,
      required: false
    },
    selected: {
      type: Number,
      required: false
    }
  },
  mixins: [filterMixin],
  methods: {
    backgroundColor(label) {
        return '/assets/material/' + label + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(primary);

  .color {
    width: 60px;
    height: 89px;

    &.active {
      border-color: $color-active;
    }
  }

  .color-inside {
    width: 50px;
    height: 50px;
    left: 50%;
    top: 6px;
    transform: translate(-50%, 0);
    background-size: cover;
  }

  .color-label {
      left: 50%;
      bottom: 6px;
      transform: translate(-50%, 0)
  }
</style>
