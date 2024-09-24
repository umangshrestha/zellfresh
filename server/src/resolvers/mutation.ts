import { MutationResolvers, User } from "../__generated__/types";

export default {
  validateUser: async (_parent, _args, context): Promise<User> => {
    if (!context.user) {
      throw new Error("User not authenticated");
    }
    return context.user;
  },
} satisfies MutationResolvers;
