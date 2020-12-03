// using factory function to make it possible that component can have it's own
// untouchable data and data to reset which we pass in mixin.
export function reset(dataToResetFactory) {
  let dataToReset = dataToResetFactory();
  return {
    data() {
      return dataToReset;
    },
    methods: {
      reset(specificKey) {
        dataToReset = dataToResetFactory();
        if (specificKey) {
          this.$data[specificKey] = dataToReset[specificKey];
        } else {
          Object.keys(dataToReset).forEach((key) => {
            if (Array.isArray(dataToReset[key])) {
              // arrays wasn't updating
              this.$data[key].splice(0).concat(dataToReset[key]);
            } else {
              this.$data[key] = dataToReset[key];
            }
          });
        }
      },
    },
  };
}
