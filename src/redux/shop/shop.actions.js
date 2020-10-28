import ShopActionTypes from "./shopt.types";

export const updateCollections = (collectionsMap) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap,
});
