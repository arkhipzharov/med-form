export function shapeAndPossiblyNormalizeInputsDataObj(
  repeatingObjValuesData,
  remainingObj,
  isVuelidateObj,
) {
  let finalObj = remainingObj;
  if (repeatingObjValuesData) {
    finalObj = mixInRepeatingValues(repeatingObjValuesData, finalObj);
  }
  return isVuelidateObj
    ? nestVuelidateObjValues(finalObj)
    : normalizeVueInputsDataObj(finalObj);
}

function mixInRepeatingValues(repeatingObjValuesData, finalObj) {
  repeatingObjValuesData.forEach((data) => {
    data.keys.forEach((key) => {
      finalObj[key] = data.value;
    });
  });
  return finalObj;
}

function normalizeVueInputsDataObj(finalObj) {
  Object.entries(finalObj).forEach(([key, value]) => {
    if (Array.isArray(value)) return;
    const valueKeys = Object.keys(value);
    if (valueKeys.length > 0 && !('label' in value)) {
      valueKeys.forEach((nestedValueKey) => {
        value[nestedValueKey] = {
          value: '',
          idAndDataKey: nestedValueKey,
          ...value[nestedValueKey],
        };
      });
    } else {
      const nestedValue = value.value;
      finalObj[key] = {
        ...value,
        value: nestedValue === undefined ? '' : nestedValue,
        ...(value.label
          ? {
              idAndDataKey: key,
            }
          : {
              vuelidateDataKey: key,
            }),
      };
    }
  });
  return finalObj;
}

export function nestVuelidateObjValues(obj) {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    obj[key] = {
      value,
    };
  });
  return obj;
}
