import api from "../../store/api";
const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "/dashboard",
    }),
  }),
});
export const { useGetDashboardQuery } = dashboardApi;
