<template>
    <div class="contact-form">
      
        <div class="contact-form__container">
            <h2>SEND A MESSAGE OR CALL US ON <a href="tel:0800 012 6406">0800 012 6406</a></h2>
            <div v-if="!messageSent" class="container">
                <form @submit.prevent="sendForm" novalidate>
                  
                    <div class="row">
        
                        <base-input
                            class="col-xs-12 col-sm-6 mb10"
                            type="text"
                            name="first-name"
                            autocomplete="given-name"
                            :placeholder="`${$t('First Name')} *`"
                            v-model.trim="currentUser.firstname"
                            @input="$v.currentUser.firstname.$touch()"
                            :validations="[
                                {
                                condition: !$v.currentUser.firstname.required && $v.currentUser.firstname.$error,
                                text: $t('Field is required')
                                },
                                {
                                condition: !$v.currentUser.firstname.minLength,
                                text: $t('Name must have at least 2 letters.')
                                }
                            ]"
                        />
                        <base-input
                            class="col-xs-12 col-sm-6 mb10"
                            type="text"
                            name="last-name"
                            autocomplete="family-name"
                            :placeholder="`${$t('Last Name')}`"
                            v-model.trim="currentUser.lastname"
                        />
                        <base-input
                            class="col-xs-12 col-md-6 mb10"
                            type="email"
                            name="email-address"
                            autocomplete="email"
                            :placeholder="$t('Email Address *')"
                            v-model="currentUser.email"
                            :validations="[
                                {
                                    condition: !$v.currentUser.email.required && $v.currentUser.email.$error,
                                    text: $t('Field is required')
                                },
                                {
                                    condition: !$v.currentUser.email.email,
                                    text: $t('Please provide valid e-mail address.')
                                }
                            ]"
                        />
                        <base-input
                            class="col-xs-12 col-sm-6 mb10"
                            type="text"
                            name="phone-number"
                            autocomplete="tel"
                            :placeholder="$t('Phone Number')"
                            v-model.trim="phone"
                        />
                    </div>
                    
                    <div class="row">
                        
                        <base-textarea
                            class="col-xs-12 col-sm-12 mb10"
                            :class="'override'"
                            type="text"
                            name="message"
                            v-model.trim="message"
                            :placeholder="`${$t('Message')} *`"
                            :autofocus="false"
                            @input="$v.message.$touch()"
                            :validations="[
                                {
                                condition: !$v.message.required && $v.message.$error,
                                text: $t('Field is required')
                                },
                                {
                                condition: !$v.message.minLength,
                                text: $t('Message must have at least 10 letters.')
                                }
                            ]"
                        />
                    </div>
                    
                    
                    <div class="row">
                        <div class="col-xs-12 col-sm-4 col-sm-offset-4 center-xs mt35">
                            <button-full class="inline-flex" type="submit">
                                {{ $t('Send Message') }}
                            </button-full>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else class="container">
                <div class="row">
                    <div class="col-xs-12 confirmation">
                        <h3 class="py15 px10 my40 weight-600 flex cl-white bg-cl-puerto-rico brdr-rad"><i class="material-icons">check_circle_outline</i> {{ $t('Your message has successfully been sent.') }}</h3>
                        <!-- <router-link :to="localizedRoute('/')" :title="$t('Home')" class="no-underline inline-flex">{{ $t('Home') }}</router-link> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import i18n from '@vue-storefront/i18n'
import { required, minLength, email } from 'vuelidate/lib/validators'
import MyProfile from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyProfile'
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import { EmailForm } from '@vue-storefront/core/modules/mailer/components/EmailForm'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { MailerModule } from '@vue-storefront/core/modules/mailer'

export default {
    name: 'ContactForm',
    components: {
        Breadcrumbs,
        BaseInput,
        BaseSelect,
        ButtonFull,
        BaseTextarea
    },
    mixins: [MyProfile, EmailForm],
    beforeCreate () {
        registerModule(MailerModule)
    },
    data () {
        return {          
            phone: '',
            subject: '',
            message: '',
            messageSent: false,
            baseUrl: config.images.paths.upload,
            timestamp: Date.now()
        }
    },
    computed: {
        mailerElements () {
            return config.mailer.contactAddress
        },
        contactFormEmailAddress () {
           
                return config.mailer.generalForm
          
        },
        contactFormSubject () {
          
                return 'General Inquiries'
           
        },
        formBodyText () {
            let html = "";

            html += 'Name: ' + this.currentUser.firstname + " " + this.currentUser.lastname + "\r\n\r\n"
            html += 'Email Address: ' + this.currentUser.email + "\r\n\r\n"
            if(this.phone) {
                html += 'Phone Number: ' + this.phone + "\r\n\r\n"
            }
            if(this.subject) {
                html += 'Subject: ' + this.subject + "\r\n\r\n"
            }
            html += 'Message: ' + this.message + "\r\n\r\n"
            
            
            return html
        }
    },

    validations: {
        
        message: {
            required,
            minLength: minLength(10),
            unicodeAlpha
        },
        currentUser: {
            firstname: {
                required,
                minLength: minLength(2),
                unicodeAlpha
            },
            email: {
                required,
                email
            }
        }
    },
    methods: {
        
        sendForm () {
            
          
            if (this.$v.$invalid) {
                this.$v.$touch()
               
            }else{
                 this.sendEmail(
                    {
                        
                        sourceAddress: this.mailerElements,
                        targetAddress: this.contactFormEmailAddress,
                        subject: this.contactFormSubject,
                        emailText: this.formBodyText,
                        confirmation: true,
                        replyAddress: this.currentUser.email
                    },
                    this.onSuccess,
                    this.onFailure
                    )
            }
            
            
           
           
        },
        onSuccess (message) {
            this.messageSent = true
            //window.scrollTo(0,0);

            if (config.mailer.sendConfirmation) {
                let confirmationHtml = "";
                confirmationHtml += "Dear customer,\r\n\r\n" 
                confirmationHtml += "We have received your request.\r\n\r\n" 
                confirmationHtml += "Thank you!" 

                this.sendEmail(
                {
                    sourceAddress: this.mailerElements,
                    targetAddress: this.currentUser.email,
                    subject: this.$t('Confirmation of receival'),
                    emailText: confirmationHtml,
                    confirmation: true
                })
            }
        },
        onFailure (message) {
            this.$store.dispatch('notification/spawnNotification', {
                type: 'error',
                message,
                action1: { label: this.$t('OK') }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$grayish-blue: color(grayish-blue);
$text: color(text);
$mint: color(mint);
$blue-gray: color(blue-gray);
$color-puerto-rico: color(puerto-rico);

.contact-form {
    padding-bottom: 150px;
    @media (max-width: 992px) {
        padding-bottom: 120px;
    }
    h2 {
        font-size: 28px;
        position: relative;
        text-align: center;
        font-weight: 300;
        margin-bottom: 60px;
        @media (max-width: 767px) {
            font-size: 20px;
            padding: 0 30px;
        }
       
    }


    .confirmation {
        h3 {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            @media (max-width: 767px) {
                font-size: 14px;
            }
            i {
                margin-right: 5px;
            }
        }
    }
}
</style>