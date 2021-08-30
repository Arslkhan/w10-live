import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { coreHooks } from '@vue-storefront/core/hooks';
import * as types from './store/mutation-types';
import fetch from 'isomorphic-fetch';
import config from 'config';
const ORDERDETAIL_URL = config.orderDetails.endpoint;

const vinylModuleStore = {
  namespaced: true,
  state: {
    orderDetailsState: null
  },
  actions: {
    async getOrderDetails ({}, systemData) {
      try {
        const response = await fetch(
          `${ORDERDETAIL_URL}`,
          {
            method: 'post',
            mode: 'cors',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(systemData)
          }
        );
        const jsonRes = await response.json();
        if (jsonRes.code === 200) {
          return jsonRes.result;
        }
        console.log(jsonRes);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    [types.orderDetail] (state, orderDetail) {
      state.orderDetail = 'orderDetail';
    }
  }
};

export const orderDetail: StorefrontModule = function ({ store}) {
  console.log('orderDetail Module Registered');
  store.registerModule('orderDetail', vinylModuleStore);
  coreHooks.afterAppInit(async () => {
    console.log('App HAVE BEEN initialized');
  });
};
