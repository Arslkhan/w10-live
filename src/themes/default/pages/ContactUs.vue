<template>
  <div id="contact us" class="contact-main">
    <!--    <header class="headerimage" v-lazy:background-image="'/assets/hero1.jpg'">-->
    <!--      <div class="container center-xs middle-xs aboutblock">-->
    <!--        <h1>-->
    <!--          CONTACT-->
    <!--        </h1>-->
    <!--        <p>get in touch</p>-->
    <!--      </div>-->
    <!--    </header>-->
    <p class="head">Contact</p>
    <p class="head-small">get in touch</p>
    <p class="contactUsP">
      <img src="/assets/hero1.jpg" alt="contact-us" class="Desktop-banner" />
      <!--      <img src="/assets/contact-mobile.png" alt="contact-us" class="mobile-banner">-->
    </p>
    <contact-form />
    <social-area />
  </div>
</template>

<script>
import CmsBlock from "theme/components/core/blocks/Cms/Block";
import SocialArea from "theme/components/theme/blocks/SocialArea";
import ContactForm from "theme/components/theme/blocks/Static/ContactForm";
export default {
  components: {
    CmsBlock,
    SocialArea,
    ContactForm,
  },
  metaInfo() {
    return {
      title: "Contact us - ",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "Call or email us for any issues",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.contact-main {
  margin-top: -15px;
  position: relative;

  .head {
    margin: 0;
    padding-top: 8px;
    font-size: 76px;
    font-family: "Raleway";
    position: absolute;
    left: 40%;
    z-index: 1;
    top: 65px;
    @media (max-width: 500px) {
      left: 28%;
    }
  }
  .head-small {
    font-size: 28px;
    font-weight: 300;
    color: black;
    padding: 0;
    margin: 0px;
    text-transform: uppercase;
    top: 142px;
    position: absolute;
    z-index: 1;
    left: 46.3%;
  }

  .main-fields {
    .button-under-text {
      color: #6d1f37;
      font-size: 28px;
      font-family: "Brandon_reg";
      text-align: center;
      font-weight: 700;

      a {
        color: #6d1f37;
        font-size: 28px;
        font-family: "Brandon_reg";
        text-align: center;
        font-weight: 700;
        text-decoration: underline;
      }
    }
  }

  .contactUsP {
    img {
      width: 100%;
      height: auto;
      position: absolute;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
    }
    padding-bottom: 27%;
    position: relative;
    @media (max-width: 767px) {
      padding-bottom: 30.5%;
    }
  }

  .message {
    color: #6d1f37;
    font-size: 24px;
    font-family: "Brandon_reg";
    text-align: center;
    font-weight: 700;
    padding-bottom: 10px;
  }

  .form {
    .main-fields {
      padding: 0px 170px;
      @media (max-width: 1199px) {
        padding: 0px 80px;
      }
      @media (max-width: 767px) {
        padding: 0px 30px;
      }

      .main-fields-1 {
        display: flex;
        @media (max-width: 767px) {
          flex-direction: column;
        }

        #fname {
          margin-right: 8px;
          @media (max-width: 767px) {
            margin: 0;
          }
        }

        #lname {
          margin-left: 8px;
          @media (max-width: 767px) {
            margin: 0;
          }
        }
      }

      .main-fields-2 {
        display: flex;
        margin-top: 9px;
        @media (max-width: 767px) {
          flex-direction: column;
          margin-top: 0;
        }

        #email {
          margin-right: 8px;
          @media (max-width: 767px) {
            margin: 0;
          }
        }

        #phone {
          margin-left: 8px;
          @media (max-width: 767px) {
            margin: 0;
          }
        }
      }

      input::placeholder {
        font-weight: bold;
      }
    }

    #message::placeholder {
      font-weight: bold;
    }
  }

  .buttonmessage {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 90px;
    @media screen and (max-width: 1024px) {
      margin-top: 60px;
    }
    @media screen and (max-width: 767px) {
      margin-top: 40px;
    }

    button {
      background: #6d1f37;
      height: 61px;
      width: 100%;
      max-width: 251px;
      border-radius: 50px;
      border: none;
      color: #fff;
      font-family: "Raleway";
      font-size: 18px;
      font-weight: 900;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .return-text-form {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 30px;

    p {
      font-family: "BrandonMedium";
      font-size: 24px;
      @media screen and (max-width: 767px) {
        font-size: 18px;
      }

      a {
        color: #6d1f37;
        font-family: "BrandonMedium";
        font-size: 24px;
        padding-left: 3px;
        cursor: pointer;
        font-weight: 700;
        @media screen and (max-width: 767px) {
          font-size: 18px;
        }
      }

      a.underline:after,
      a:not(.no-underline):hover:after {
        content: none;
      }
    }
  }
}
@media (min-width: 768px) {
  .mobile-banner {
    display: none;
  }
  .head {
    //left: 45% !important;
  }
}
.Return-Policy {
  font-family: "Raleway";
  font-size: 26px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 400;
  padding: 60px 0 40px 0;
  @media screen and (max-width: 767px) {
    padding: 42px 0 25px 0;
    font-size: 20px !important;
  }
  a {
    color: #98694b;
  }
}
.headerimage {
  background-size: cover;
  height: 784px;
}
@media (max-width: 1050px) {
  .headerimage {
    background-position-x: center;
  }
}
@media (max-width: 1423px) {
  .headerimage {
    background-color: #ffffff;
    height: 585px;
  }
  p {
    font-size: 23px;
  }
}
@media (min-width: 1855px) {
  .headerimage {
    background-position-y: -139px !important;
  }
}
@media (min-width: 2500px) {
  .headerimage {
    background-position-y: -313px !important;
  }
}
h1 {
  font-size: 127px;
  font-weight: 100;
  color: black;
  margin: 0;
  padding: 37px 0 0 0;
}
p {
  font-size: 28px;
  font-weight: 300;
  color: black;
  padding: 0;
  margin: 0px;
  text-transform: uppercase;
}

hr {
  margin: 50px 0;
  padding: 0;
  width: 100px;
  border: 0;
  border-top: 1px solid #98694b;
}

@media (max-width: 769px) {
  .headerimage {
    height: 361px;
    background-position-x: 0px;
  }
  .subcopy {
    margin: 30px 0 88px 0;
  }
  h1 {
    font-size: 44px;
    font-weight: 300;
    color: black;
  }
  p {
    font-size: 17px !important;
    font-weight: 400;
    color: black;
    padding: 0;
    margin: 0px;
    text-transform: uppercase;
  }
}
@media (max-width: 414px) {
  .headerimage {
    height: 323px;
    background-position-x: -140px;
  }
}
</style>
