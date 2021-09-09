<template>
  <div @mouseover="toggleTooltip()" @mouseout="removeTooltip">
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
    <span class="detail grade-tooltip" ref="gradeBox">
      This is test text
<!--      <svg-->
<!--        xmlns="http://www.w3.org/2000/svg"-->
<!--        width="19.268"-->
<!--        height="18.68"-->
<!--        viewBox="0 0 19.268 18.68"-->
<!--      >-->
<!--        <g id="Group_82" data-name="Group 82" transform="translate(-1434.82 -1341.835)"></g>-->
<!--      </svg>-->
    </span>
  </div>
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
    toggleTooltip () {
      this.$refs.gradeBox.classList.toggle('show-tooltip');
    },
    removeTooltip () {
      if (this.$refs.gradeBox && this.$refs.gradeBox.classList.contains('show-tooltip')) {
        this.$refs.gradeBox.classList.remove('show-tooltip');
      }
    },
    backgroundColor (label) {
      let leb1 = label.replace(/\s/g, '');
      let leb2 = leb1.replace('&', '');
      return '/assets/material/' + leb2 + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(primary);
  .detail{
    max-width: 45%;
    display: flex;
    align-items: center;
    &.grade-tooltip {
      position: relative;
      &::before {
        content: attr(data-grade-value);
        position: absolute;
        bottom: 24px;
        left: -40%;
        width: 100%;
        width: 200px;
        height: auto;
        background: #161d49;
        border-radius: 3px;
        color: #fff;
        padding: 16px 22px;
        font-size: 14px;
        opacity: 0;
        box-sizing: border-box;
        @media (max-width: 991px) {
          left: auto;
          right: 24px;
        }
        @media (max-width: 767px) {
          left: -86px;
          right: auto;
        }
      }
      &.show-tooltip {
        &::before {
          opacity: 1;
        }
      }
    }
    a {
      color: #102DE5;
      transition: all 0.2s ease;
      &:hover {
        color: #f7941d;
      }
    }
    svg {
      margin-left: 5px;
      position: relative;
      cursor: default;
      cursor: pointer;
    }
  }
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
