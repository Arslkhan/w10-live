<template>
  <div class="text-center">
    <header class="pt20 h1 weight-200">
      {{ $t('Reset password') }}
    </header>
    <div class="text-center center-xs flex middle-xs w-100">
         <hr />
    </div>
    <div class="row pb60 cl-secondary">
      <template v-if="!passwordSent">
          <div class="col-sm-4"></div>
        <form @submit.prevent="sendEmail" novalidate class="col-sm-4">
          <div class="mb20">
            <p class="mb45">
              {{ $t('Enter your email to receive instructions on how to reset your password.') }}
            </p>
            <base-input
              type="email"
              name="email"
              v-model="email"
              focus
              :placeholder="$t('E-mail address *')"
              :validations="[
                {
                  condition: !$v.email.required && $v.email.$error,
                  text: $t('Field is required.')
                },
                {
                  condition: !$v.email.email && $v.email.$error,
                  text: $t('Please provide valid e-mail address.')
                }
              ]"
            />
          </div>
          <button-full class="mb35" type="submit">
            {{ $t('Reset password') }}
          </button-full>
          
        </form>
        <div class="col-sm-4"></div>
      </template>
      <template v-if="passwordSent">
          <div class="col-sm-4"></div>
        <form class="col-sm-4">
          <p class="py30 mb80">
            {{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}
          </p>
          <button-full class="mb35" type="link" @click.native="switchElem">
            {{ $t('Back to login') }}
          </button-full>
        </form>
        <div class="col-sm-4"></div>
      </template>
    </div>
  </div>
</template>

<script>

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
import { Logger } from '@vue-storefront/core/lib/logger'
import i18n from '@vue-storefront/i18n'

export default {
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
           
    sendEmail () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Resetting the password ... '))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        console.log(response);
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: 'The provided email does not exist',//i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          
        }
      }).catch((err) => {
        console.log("here");
        Logger.error(err)()
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  },
  metaInfo () {
    return {
      title:"Forgotten Password - ",
      meta: [{ vmid: 'description', name: 'description', content: 'Enter your email to receive instructions on how to reset your password.' }]
    }
  },
  name: 'ForgotPass',
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  components: {
    ButtonFull,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
  .modal-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-close{
    cursor: pointer;
  }
  .modal-content {
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
    .h1{text-transform: uppercase;}
    .text-center{text-align: center;}
     hr{margin: 50px 0; padding: 0; width: 100px;border: 0; border-top:1px solid #98694b;}
</style>
