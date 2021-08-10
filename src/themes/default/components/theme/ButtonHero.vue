<template>
  <component
    :is="compontentType"
    :to="redirectionLink"
    class="py15 herobutton"
    :class="{
      light : color === 'light',
      dark : color === 'dark',
      standard : color === 'standard',
      px0 : link ? true : false,
      px40 : link ? false : true
    }"
  >
    <slot>Button</slot>
    
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'

export default {
  name: 'ButtonHero',
  directives: { focusClean },
  props: {
    color: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: null,
      required: false
    }
  },
  computed: {
    compontentType () {
      return this.link ? 'router-link' : 'button'
    },
    redirectionLink () {
      return this.link ? this.localizedRoute(this.link) : null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";

$white: color(white);
$black: color(black);

.herobutton{font-weight: 600; font-size: 11px; text-transform: uppercase;letter-spacing: 2px; padding: 10px 0; }


.dark {
  color: $white;
    background: #454a74;
    opacity: 0.9;
    width: 100%;
  &:hover,
  &:focus {
    color: $white;
    background: #454a74;
    text-decoration: none !important;
    border: 0 !important;
    opacity: 1;
  }
}
.light {
    color: $white;
    background: #eba691;
    opacity: 0.9;
    width: 100%;
  &:hover,
  &:focus {
    color: $white;
    background: #eba691;
    text-decoration: none !important;
    border: 0 !important;
    opacity: 1;
  }
}
.standard{
    color: #ffffff;
    background: #3b477a;
    border-radius: 5px;
    text-transform: uppercase;
    display: inline-block !important;
    margin: 0 auto;
    padding: 10px 20px !important;
    font-size: 11px;
    font-weight: 600;
    border: 1px solid #3b477a;

  &:hover,
  &:focus {
    color: #ffffff;
    background:transparent;
    text-decoration: none !important;
    color: #3b477a;
  }
}

@media screen and (min-width: 500px) {
.herobutton{font-weight: 600; font-size: 13px; text-transform: uppercase;letter-spacing: 2px; padding: 20px 0; }
.dark,.light,.standard{width:259px}
}


</style>
