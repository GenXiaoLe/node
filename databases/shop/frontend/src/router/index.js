import Vue from "vue";
import Router from "vue-router";

import Goods from '../views/Goods.vue';
import Cart from '../views/Cart.vue';
import Order from '../views/Order.vue';

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'goods',
            component: Goods
        },
        {
            path: '/goods',
            name: 'goods',
            component: Goods
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        }
    ]
});

