import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const getForCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        return await ctx.db
            .query("users")
            .filter((q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
            .first();
    },
});

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        // Note: If you don't want to define an index right away, you can use
        // ctx.db.query("users")
        //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
        //  .unique();
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier),
            )
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name, avatar: identity.pictureUrl });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        return await ctx.db.insert("users", {
            name: identity.name ?? "Anonymous",
            avatar: identity.pictureUrl ?? "https://curious-fish-513.convex.cloud/api/storage/3c5b8b8d-2caf-4faa-9228-aadb3be64263",
            score: 0,
            tokenIdentifier: identity.tokenIdentifier,
        });
    },
});