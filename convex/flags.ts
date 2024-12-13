import { query } from "./_generated/server";

export const get = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("flags")
            .filter((q) => q.eq(q.field("continent"), "Europa"))
            .collect();
    },
});