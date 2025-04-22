export default {
  data() {
    return {
      dialogs: {
        default: {
          open: false,
          loading: false,
          item: {}
        }
      }
    };
  },
  
  computed: {
    dialogOpen: {
      get() { return this.dialogs.default?.open || false; },
      set(value) { this.dialogs.default && (this.dialogs.default.open = value); }
    },
    dialogLoading: {
      get() { return this.dialogs.default?.loading || false; },
      set(value) { this.dialogs.default && (this.dialogs.default.loading = value); }
    },
    dialogItem: {
      get() { return this.dialogs.default?.item || {}; },
      set(value) { this.dialogs.default && (this.dialogs.default.item = value); }
    }
  },
  
  methods: {
    openDialog(item = {}, options = {}, dialogKey = 'default') {
      !this.dialogs[dialogKey] && this.initDialog(dialogKey);
      this.dialogs[dialogKey].item = { ...item };
      this.dialogs[dialogKey].open = true;
      options.callback?.();
    },
    
    closeDialog(options = {}, dialogKey = 'default') {
      if (this.dialogs[dialogKey]) {
        this.dialogs[dialogKey].open = false;
        this.dialogs[dialogKey].item = {};
      }
      options.callback?.();
    },
    
    toggleDialog(value, dialogKey = 'default') {
      if (this.dialogs[dialogKey]) {
        const newValue = value !== undefined ? value : !this.dialogs[dialogKey].open;
        this.dialogs[dialogKey].open = newValue;
        !newValue && (this.dialogs[dialogKey].item = {});
      }
    },
    
    setDialogLoading(loading, dialogKey = 'default') {
      this.dialogs[dialogKey] && (this.dialogs[dialogKey].loading = loading);
    },
    
    initDialog(dialogKey, initialState = {}) {
      !this.dialogs[dialogKey] && (this.dialogs[dialogKey] = {
        open: false,
        loading: false,
        item: {},
        ...initialState
      });
    }
  }
};