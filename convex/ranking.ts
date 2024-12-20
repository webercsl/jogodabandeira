import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: { score: v.number() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {

        }

        return await ctx.db.insert("ranking", {
            playerId: user?.subject,
            score: args.score,
        })
    },
})

// export const list = query({
//     args: {},
//     handler: async (ctx) => {
//         const ranking = await ctx.db.query("ranking").collect();
//         return Promise.all(
//             ranking.map(async (rank) => {
//                 // For each rank in this channel, fetch the `User` who wrote it and
//                 // insert their name into the `author` field.
//                 const user = await ctx.db.get(rank.user);
//                 return {
//                     author: user?.name ?? "Anonymous",
//                     ...rank,
//                 };
//             }),
//         );
//     },
// });