// src/api/userApi.jsx

import userAxios from "../utils/userAxios";

// ================= GET ALL USERS =================
export const getAllUsers = async ({
  pageNo = 0,
  pageSize = 10,
  lastId = 0,
  lastCreatedAtMs = 0,
}) => {
  try {
    const response = await userAxios.get(
      "/api/v1/admin/get/all/user/details",
      {
        params: {
          pageNo,
          pageSize,
          lastId,
          lastCreatedAtMs,
        },
      }
    );

    return response.data; // important
  } catch (error) {
    console.error(
      "Get Users API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};