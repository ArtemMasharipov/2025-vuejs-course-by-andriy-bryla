import { createStore } from 'vuex';
import assignments from './modules/assignments';
import buses from './modules/buses';
import drivers from './modules/drivers';

export default createStore({
  modules: {
    drivers,
    buses,
    assignments
  }
});
