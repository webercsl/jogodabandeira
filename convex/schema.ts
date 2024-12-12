import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    flags: defineTable({
        name: v.string(),
    }),
});