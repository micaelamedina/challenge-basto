/* Handler functions for LivestockList component */

import axios from "axios";

export const getAllLivestock = async () => {
  const getAll = await axios.get("http://localhost:3001/livestock");
  return getAll.data;
};
