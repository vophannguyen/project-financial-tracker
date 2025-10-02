import api from "../../store/api";
const budgetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => ({
        url: "/budget",
      }),
      //   transformErrorResponse: (response) => response.data,
    }),
    // login: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/auth/login",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   transformErrorResponse: (response) => response.data,
    // }),
  }),
});
export const { useGetBudgetsQuery } = budgetApi;
