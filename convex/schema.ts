import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    flags: defineTable({
        namePT: v.string(),
        nameEN: v.string(),
        nameSP: v.string(),
        image: v.string(),
        continent: v.string(),
    }),
    users: defineTable({
        name: v.string(),
        avatar: v.string(),
        score: v.number(),
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
});