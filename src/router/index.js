import Vue from 'vue'
import Router from 'vue-router'
import mallEdit from '@/components/mallEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mallEdit',
      component: mallEdit
    }
  ]
})
