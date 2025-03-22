import { createStore } from 'vuex'
import auth from './modules/auth'
import lessons from './modules/lessons'
import reports from './modules/reports'
import teachers from './modules/teachers'

export default createStore({
  modules: {
    auth,
    lessons,
    teachers,
    reports
  }
})
