import store from '@/store';

const ENTITY_CONFIG = {
  driver: {
    getter: 'drivers/getDriverById',
    errorMessage: 'Driver not found'
  },
  bus: {
    getter: 'buses/getBusById',
    errorMessage: 'Bus not found'
  },
  assignment: {
    getter: 'assignments/getAssignmentById',
    errorMessage: 'Assignment not found'
  }
};

export function validateEntityFormAccess(entityType) {
  return (to, from, next) => {
    const config = ENTITY_CONFIG[entityType];
    
    if (!config) {
      console.error(`Invalid entity type: ${entityType}`);
      next(false);
      return;
    }

    if (to.params.id) {
      const entity = store.getters[config.getter](to.params.id);
      
      if (!entity) {
        next({
          name: `${entityType}s`,
          params: { error: config.errorMessage }
        });
        return;
      }
    }
    
    next();
  };
}
