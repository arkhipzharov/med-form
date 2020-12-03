import { capitalizeFirstLetter } from '@/utils/helpers';

export function flattenCombinedInputsDataForEachDataKey(
  repeatingObjValuesData,
) {
  let finalObjToSpread = {};
  repeatingObjValuesData.forEach((data) => {
    data.keys.forEach((key) => {
      const flattenedDataStructure = Object.fromEntries(
        Object.entries(data.value).map(([valueKey, value]) => {
          return [`${key}${capitalizeFirstLetter(valueKey)}`, value];
        }),
      );
      finalObjToSpread = {
        ...finalObjToSpread,
        ...flattenedDataStructure,
      };
    });
  });
  return finalObjToSpread;
}
