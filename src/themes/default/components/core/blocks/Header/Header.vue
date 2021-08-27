<template>
  <div class="header">
    <!--    <top-promo />-->
    <header
      class="fixed w-100 brdr-bottom-1 bg-cl-primary"
      :class="{ 'is-visible': navVisible }"
    >
      <div class="container1 px15">
        <div class="row between-xs middle-sm mainhead" v-if="!isCheckoutPage || isThankYouPage">
          <div class="col-xs-2 visible-xs">
            <div>
              <hamburger-icon class="p15 icon pointer" />
            </div>
          </div>

          <div class="col-md-3 end-xs col-xs-5 logo">
            <logo :imgsrc="'/assets/logo2.png'" class="visible-xs" />
            <logo :imgsrc="'/assets/logo.png'" class="hidden-xs" />
          </div>
          <div class="col-md-6 hidden-xs center-xs headerlink">
            <router-link
              class="inline-flex weight-500 relative no-underline"
              :to="localizedRoute('/our-range.html')"
              exact
            >
              Our Range
            </router-link>

            <div class="spacer relative inline-flex" />

            <router-link
              class="inline-flex weight-500 relative no-underline"
              :to="localizedRoute('/innovation')"
              exact
            >
              Innovation
            </router-link>
            <div class="spacer relative inline-flex" />

            <router-link
              class="inline-flex weight-500 relative no-underline"
              :to="localizedRoute('/faq')"
              exact
            >
              FAQ
            </router-link>

            <div class="spacer relative inline-flex"></div>

            <router-link
              class="inline-flex weight-500 relative no-underline"
              :to="localizedRoute('/about-us')"
              exact
            >
              About us
            </router-link>

            <div class="spacer relative inline-flex" />
            <router-link
              class="inline-flex weight-500 relative no-underline"
              :to="localizedRoute('/contact-us')"
              exact
            >
              Contact Us
            </router-link>
          </div>
          <div class="logodiv col-md-1">
            <a
              class="inline-flex weight-500 relative no-underline costa-logo" href="http://costa.w10.world/"
            >
              <img src="/assets/Costa_Logo.svg" alt="costaLogo">
            </a>
          </div>
          <div class="col-xs-4 end-xs p0 m0 mt15 visible-xs">
            <wishlist-icon class="icon pointer" />
            <microcart-icon class="icon pointer" />
          </div>

          <div class="col-md-2 col-xs-2 hidden-xs end-xs navicon">
            <div class="inline-flex right-icons">
              <search-icon class="p15 cl-white icon hidden pointer" />
              <wishlist-icon class="p10 cl-white icon pointer" />
              <microcart-icon class="p10 cl-white icon pointer" />
              <account-icon class="p10 icon pointer" />
            </div>
          </div>
        </div>
        <div class="row between-xs middle-xs px15 py5" v-if="isCheckoutPage && !isThankYouPage">
          <div class="col-xs-5 col-md-3 middle-xs">
            <div>
              <router-link
                :to="localizedRoute('/')"
                class="cl-tertiary links"
              >
                {{ $t('Return to shopping') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-2 col-md-6 center-xs">
            <logo width="auto" height="124px" />
          </div>
          <div class="col-xs-5 col-md-3 end-xs">
            <div>
              <a
                v-if="!currentUser"
                href="#"
                @click.prevent="gotoAccount"
                class="cl-tertiary links"
              >{{ $t('Login to your account') }}</a>
              <span v-else>{{ $t('You are logged in as {firstname}', currentUser) }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'
import TopPromo from 'theme/components/theme/blocks/Home/TopPromo'

export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    SearchIcon,
    WishlistIcon,
    TopPromo
  },
  mixins: [CurrentPage],
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 54
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    }),
    isThankYouPage () {
      return this.$store.state.checkout.isThankYouPage
        ? this.$store.state.checkout.isThankYouPage
        : false
    }
  },
  beforeMount () {
    window.addEventListener(
      'scroll',
      () => {
        this.isScrolling = true
      },
      { passive: true }
    )

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  methods: {

    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (
        this.scrollTop > this.lastScrollTop &&
        this.scrollTop > this.navbarHeight
      ) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-icon-hover: color(primary, $colors-background);
.w10 {
  font-size: 26px;
  line-height: 21px;
  margin-right: 4px;
}

header {
  height: 150px;
  top: -201px;
  z-index: 3;
  transition: top 0.2s ease-in-out;

  &.is-visible {
    top: 0;
  }
}
.logodiv {
  @media (max-width: 865px) {
    flex-basis: 3%;
    max-width: 3%;
  }
  @media (max-width: 768px) {
    display: none;
  }
  .costa-logo {
    margin-top: 25px;
    // @media (max-width: 865px) {
    //   margin-left: -14px;
    // }
      img {
      @media(max-width: 1092px) {
        width: 75px;
      }
      @media(max-width: 990px) {
        width: 60px;
      }
      @media (max-width: 865px) {
         width: 54px;
          margin-left: -28px;
      }
    }
  }
}

.logo {
  margin-top: 22px;
  @media (max-width:1220px) {
    flex-basis: 20%;
    max-width: 20%;
  }
  @media (max-width:1092px) {
    flex-basis: 16%;
    max-width: 16%;
  }
  @media (max-width:865px) {
    flex-basis: 20%;
    max-width: 20%;
    // flex-basis: 18%;
    // max-width: 18%;
  }
}
@media (max-width:1092px) {
  .mainhead {
    margin-top: 15px;
  }
}
.headerlink {
  margin-top: 23px;
  @media (max-width: 1220px) {
    flex-basis: 55%;
    max-width: 55%;
  }
  @media (max-width:1092px) {
    flex-basis: 58%;
    max-width: 58%;
  }
   @media (max-width:940px) {
    padding-right: 0;
    justify-content: center;
   }
  // @media (max-width:1090px) {
  //   flex-basis: 61%;
  //   max-width: 61%;
  // }
}

.navicon {
  margin-top: -54px;
  @media (max-width:865px) {
    flex-basis: 14.666667%;
    max-width: 14.666667%;
  }
}

.icon {
  opacity: 1;

  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}

.right-icons {
  //for edge
  float: right;
}

.header-placeholder {
  height: 151px;
}

.links {
  text-decoration: underline;
}

.spacer {
  border-right: 1px solid #aa806e;
  margin: 0 20px;
}
@media (max-width: 940px) {
  .spacer {
    margin: 0 10px;
  }
  .headerlink a {
    font-size: 14px;
  }
}
@media (max-width: 865px) {
  .headerlink a {
    font-size: 12.4px;
  }
}
// @media (max-width: 769px) {
//   .logo {
//     margin-top: 5px;
//   }

//   header {
//     height: 60px;
//     top: 24px !important;
//   }
//   .header-placeholder {
//     height: 85px;
//   }
//   .row.middle-xs {
//     margin: 0 -15px;

//     &.py5 {
//       margin: 0;
//     }
//   }
//   .col-xs-2:first-of-type {
//     padding-left: 0;
//   }
//   .col-xs-2:last-of-type {
//     padding-right: 0;
//   }
//   a,
//   span {
//     font-size: 12px;
//   }
// }
</style>
<style>
header .material-icons {
  font-size: 30px !important;
  color: #fff
}

.headerlink a {
  text-transform: uppercase;
  color: #fff;
  font-size: 20px;
  border-bottom: 1px solid #000;
  border-top: 0px solid #000
}
@media (max-width:1385px) {
  .headerlink a {
    font-size: 15px;
    }
  }
  @media (max-width: 999px) {
    .headerlink a {
      font-size: 13px;
    }
  }
.headerlink a:hover {
  border-bottom: 1px solid #aa806e;
  border-top: 0px solid #aa806e
}

/* @media (max-width: 1051px) {
  .headerlink a {
    font-size: 16px
  }
} */

/* @media (max-width: 892px) {
  .headerlink a {
    font-size: 14px
  }
} */

</style>
