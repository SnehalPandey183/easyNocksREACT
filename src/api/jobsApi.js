import jobAxios from "../utils/jobAxios";


/* ================= GET JOBS ================= */
export const getAdminJobs = async () => {
  const response = await jobAxios.get("/api/v1/admin/jobs", {
    params: {
      statuses: "OPEN,ASSIGNED,COMPLETED,CANCELLED,ONGOING",
      limit: 10,
    },
  });

  return response?.data?.data?.jobs || [];
};

/* ================= DELETE JOB ================= */
export const deleteJob = async (jobId) => {
  const response = await jobAxios.delete(
    `/api/v1/admin/${jobId}`
  );

  return response.data;
};

/* ================= CANCEL JOB ================= */
export const cancelJob = async (jobId) => {
  const response = await jobAxios.put(
    `/api/v1/admin/${jobId}/cancel`
  );

  return response.data;
};