import { permissionService } from '@/services/permissionService';

export default {
  mounted(el, binding) {
    updateVisibility(el, binding);
  },
  
  updated(el, binding) {
    updateVisibility(el, binding);
  }
};

function updateVisibility(el, binding) {
  const value = binding.value;
  const permission = typeof value === 'string' ? value : value?.permission;
  const requireAdmin = value?.requireAdmin || false;
  const requireAuth = permission === 'read:products' ? false : (value?.requireAuth !== false);
  
  const isAuthenticated = permissionService.isAuthenticated();
  const isAdmin = permissionService.isAdmin();
  const hasPermission = permission ? permissionService.hasPermission(permission) : true;
  
  const visible = 
    (!requireAuth || isAuthenticated) && 
    (!requireAdmin || isAdmin) && 
    hasPermission;
    
  el.style.display = visible ? '' : 'none';
}