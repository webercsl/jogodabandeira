import { v } from "convex/values";

import { query, mutation } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx, args) => {
        const users = await ctx.db.query("users").collect();
        return users.map(user => ({
            id: user._id,
            name: user.name,
            avatar: user.avatar,
            score: user.score,
        }));
    },
});

export const getScore = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            return { score: null }; // Return null score if not authenticated
        }

        const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier)).first();
        if (!user) {
            throw new Error("User not found");
        }

        return { score: user.score };
    },
});

export const update = mutation({
    args: {
        score: v.number(),
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();

        // Verificar se o usuário está autenticado
        if (!userIdentity || !userIdentity.tokenIdentifier) {
            throw new Error("Unauthorized: User must be logged in to update the score.");
        }

        // Obter o _id do usuário a partir da tabela users
        const user = await ctx.db.query("users").filter(q => q.eq(q.field("tokenIdentifier"), userIdentity.tokenIdentifier)).first();

        if (!user || !user._id) {
            throw new Error("User not found.");
        }

        // Atualizar o campo "score" do usuário autenticado
        await ctx.db.patch(user._id, {
            score: args.score,
        });

        return { success: true, userId: user._id };
    },
});