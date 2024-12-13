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
});