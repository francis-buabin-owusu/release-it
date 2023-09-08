export const emailQueryResolver = {
  Query: {
    getUserInfo: async (_: unknown, { userId }) => {
      return { user_id: userId };
    },
  },
  UserDetails: {
    user: async ({ user_id }: { user_id: number }) => {
      if (!user_id) return;
      return { id: user_id };
    },
  },
};
