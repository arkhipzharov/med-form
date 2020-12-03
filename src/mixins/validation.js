export const validation = {
  computed: {
    validateObj() {
      let dataKey = this.selectedValueDataKey;
      const { vuelidateObj, inputData } = this;
      if (!vuelidateObj || (!inputData && !dataKey)) return {};
      if (inputData) {
        const { idAndDataKey, vuelidateDataKey } = inputData;
        if (idAndDataKey) {
          dataKey = idAndDataKey;
        } else if (vuelidateDataKey) {
          dataKey = vuelidateDataKey;
        }
      }
      let validateObj = ('formData' in vuelidateObj
        ? vuelidateObj.formData
        : vuelidateObj)[dataKey];
      validateObj = validateObj.value;
      return validateObj;
    },
  },
  methods: {
    checkValidationFailed(key) {
      const { validateObj } = this;
      if (validateObj && key in validateObj && !validateObj[key]) {
        return true;
      }
    },
  },
};
