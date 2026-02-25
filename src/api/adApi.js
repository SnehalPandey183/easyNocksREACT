import marketplaceAxios from "../utils/marketplaceAxios";

/* ================= GET ALL ADS ================= */

export const getAdminAds = async () => {
  const response = await marketplaceAxios.get(
    "/api/v1/admin/ads",
    {
        params:{
            statuses:"ACTIVE",
        }
    }
  );

  return response.data.data.ads;
};

/* ================= DELETE AD ================= */

export const deleteAd = async (adId) => {
  const response = await marketAxios.delete(
    `/api/v1/admin/ads/${adId}`
  );

  return response.data;
};