import { pgTable, serial, text, varchar, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  username: varchar("username", { length: 100 }),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  lsat: integer("lsat"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lawSchools = pgTable("law_schools", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  ranking: integer("ranking"),
  tuition: decimal("tuition", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userSchools = pgTable("user_schools", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  schoolId: integer("school_id").references(() => lawSchools.id).notNull(),
  status: varchar("status", { length: 50 }).default("not_started"),
  category: varchar("category", { length: 50 }),
  scholarshipAmount: decimal("scholarship_amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertLawSchoolSchema = createInsertSchema(lawSchools).omit({ id: true, createdAt: true });
export const insertUserSchoolSchema = createInsertSchema(userSchools).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LawSchool = typeof lawSchools.$inferSelect;
export type InsertLawSchool = z.infer<typeof insertLawSchoolSchema>;
export type UserSchool = typeof userSchools.$inferSelect;
export type InsertUserSchool = z.infer<typeof insertUserSchoolSchema>;
