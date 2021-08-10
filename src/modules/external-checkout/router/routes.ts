const ExternalSuccessPage = () => import(/* webpackChunkName: "vsf-ExternalSuccessPage" */ '../pages/ExternalSuccess.vue');

export const routes = [
  { name: 'external-thank-you', path: '/order-success/:orderId', component: ExternalSuccessPage, meta: { layout: 'default', title : 'Order Confirm' } }
]
