<template>
  <div
    class="inline-flex relative dropdown"
    data-testid="accountButton"
    @click.self="goToAccount();showMenu = false;"
    @keyup.enter="goToAccount"
    tabindex="0"
    role="button"
    :aria-label="$t('Open my account')"
  >
    <button
      type="button"
      class="bg-cl-transparent cl-white brdr-none p0 accountbutton"
    >
      <div class="innerbutton">
        <span>Sign in</span>
        <img v-lazy="'/assets/accounticon.png'" height="28px">
      </div>
    </button>
  </div>
</template>

<script>

import AccountIcon from '@vue-storefront/core/compatibility/components/blocks/Header/AccountIcon'

export default {
  mixins: [AccountIcon],
  components: {
  }

}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

.dropdown {

  button {
    pointer-events: none;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  a {
    opacity: .6;

    &:hover,
    &:focus {
      background-color: $color-icon-hover;
      opacity: 1;
    }

  }

  @media (min-width: 768px) {
    &:hover .dropdown-content:not(.dropdown-content__hidden),
    &:focus .dropdown-content:not(.dropdown-content__hidden) {
      display: block;
    }

    &:focus-within {
      background-color: $color-icon-hover;
      opacity: 1;
      .dropdown-content:not(.dropdown-content__hidden) {
        display: block;
      }
    }
  }

}
.innerbutton {
  display: flex;
  align-items: center;
  span {
    color: #fff;
    font-family: 'Raleway';
    font-size: 18px;
    @media (max-width:1442px) {
      font-size: clamp(12.5px, 1.041vw, 15px);
    }
    // margin-right: 12px;
    // @media (max-width: 1243px) {
    //   margin-right: 6px;
    //   font-size: 16px;
    // }
  }
}
@media (max-width:865px) {
  .accountbutton {
    padding-right: 0;
  }
}
</style>
