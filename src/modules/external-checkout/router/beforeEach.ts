import config from 'config'
import { Route } from 'vue-router'
import rootStore from '@vue-storefront/core/store'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '@vue-storefront/core/helpers'

export const isEnabled = (gtmId: string | null) => {
  return typeof gtmId === 'string' && gtmId.length > 0 && !isServer
}

export const getProduct = (item) => {
  let product = {}

      const attributeMap: string[]|Record<string, any>[] = config.googleTagManager.product_attributes
      attributeMap.forEach(attribute => {
        const isObject = typeof attribute === 'object'
        let attributeField = isObject ? Object.keys(attribute)[0] : attribute
        let attributeName = isObject ? Object.values(attribute)[0] : attribute

        if (item.hasOwnProperty(attributeField) || product.hasOwnProperty(attributeName)) {
          const value = item[attributeField] || product[attributeName]
          if (value) {
            product[attributeName] = value
          }
        }
      })

      const { category } = item
      if (category && category.length > 0) {
        product['category'] = category.slice(-1)[0].name
      }

      return product
}

export function beforeEach(to: Route, from: Route, next) {
  const cartToken: string = rootStore.state.cart.cartServerToken;
  const userToken: string = rootStore.state.user.token;
  const externalCheckoutConfig = {...config.externalCheckout};
  const cmsUrl: string = externalCheckoutConfig.cmsUrl;
  const stores = externalCheckoutConfig.stores;
  const storeCode = currentStoreView().storeCode
  const multistoreEnabled: boolean = config.storeViews.multistore

  if (multistoreEnabled) {
    if (storeCode in stores && to.name === storeCode + '-checkout') {
      window.location.replace(stores[storeCode].cmsUrl + '/vue/cart/sync/token/' + userToken + '/cart/' + cartToken)
    } else if (storeCode in stores && to.name === 'checkout' && stores[storeCode].cmsUrl !== undefined) {
      window.location.replace(stores[storeCode].cmsUrl + '/vue/cart/sync/token/' + userToken + '/cart/' + cartToken)
    } else {
      next()
    }
  } else {
    if (to.name === 'checkout') {
      window.location.replace(cmsUrl + '/vue/cart/sync/token/' + userToken + '/cart/' + cartToken)
    } else {
      next()
    }
  }
}
