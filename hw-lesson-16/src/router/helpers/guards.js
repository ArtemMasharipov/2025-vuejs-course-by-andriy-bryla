import { permissionService } from '@/services/permissionService';
import store from '@/store';

export const loadRbacConfig = async () => {
  if (!store.state.auth.rbacConfig) {
    await store.dispatch('auth/loadRbacConfig');
  }
};

export const requireAuth = (to) => {
  if (!permissionService.isAuthenticated()) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    };
  }
  
  return true;
};

export const checkPermission = async (permission) => {
  try {
    const hasPermission = permissionService.hasPermission(permission);
    if (!hasPermission) {
      return { name: 'home' };
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const globalGuard = async (to, from, next) => {
  try {
    await loadRbacConfig();
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
      const authResult = requireAuth(to);
      if (authResult !== true) {
        return next(authResult);
      }
    }
    
    if (to.matched.some(record => record.meta.requiresPermission)) {
      const permission = to.matched.find(
        record => record.meta.requiresPermission
      ).meta.requiresPermission;
      
      const permissionResult = await checkPermission(permission);
      if (permissionResult !== true) {
        return next(permissionResult);
      }
    }
    
    next();
  } catch (error) {
    next({ name: 'home' });
  }
};