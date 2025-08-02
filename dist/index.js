var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { neon } from "@neondatabase/serverless";

// server/routes.ts
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  aiConversations: () => aiConversations,
  aiMessages: () => aiMessages,
  deadlines: () => deadlines,
  emailVerificationTokens: () => emailVerificationTokens,
  globalChatMessages: () => globalChatMessages,
  grantsAndScholarships: () => grantsAndScholarships,
  grantsScholarshipsHistory: () => grantsScholarshipsHistory,
  hiddenSchools: () => hiddenSchools,
  insertAiConversationSchema: () => insertAiConversationSchema,
  insertAiMessageSchema: () => insertAiMessageSchema,
  insertDeadlineSchema: () => insertDeadlineSchema,
  insertEmailVerificationTokenSchema: () => insertEmailVerificationTokenSchema,
  insertGlobalChatMessageSchema: () => insertGlobalChatMessageSchema,
  insertGrantsAndScholarshipsSchema: () => insertGrantsAndScholarshipsSchema,
  insertGrantsScholarshipsHistorySchema: () => insertGrantsScholarshipsHistorySchema,
  insertHiddenSchoolSchema: () => insertHiddenSchoolSchema,
  insertLawSchoolSchema: () => insertLawSchoolSchema,
  insertMaterialSchema: () => insertMaterialSchema,
  insertMessageSchema: () => insertMessageSchema,
  insertResultSchema: () => insertResultSchema,
  insertUserActivitySchema: () => insertUserActivitySchema,
  insertUserColumnPreferenceSchema: () => insertUserColumnPreferenceSchema,
  insertUserPreferenceSchema: () => insertUserPreferenceSchema,
  insertUserSchema: () => insertUserSchema,
  insertUserSchoolSchema: () => insertUserSchoolSchema,
  insertWebauthnCredentialSchema: () => insertWebauthnCredentialSchema,
  lawSchools: () => lawSchools,
  loginUserSchema: () => loginUserSchema,
  materials: () => materials,
  messages: () => messages,
  registerUserSchema: () => registerUserSchema,
  results: () => results,
  updateUserProfileSchema: () => updateUserProfileSchema,
  updateUserSchoolSchema: () => updateUserSchoolSchema,
  userActivities: () => userActivities,
  userColumnPreferences: () => userColumnPreferences,
  userPreferences: () => userPreferences,
  userSchools: () => userSchools,
  usernameChangeSchema: () => usernameChangeSchema,
  usernameSelectionSchema: () => usernameSelectionSchema,
  users: () => users,
  verifyEmailSchema: () => verifyEmailSchema,
  webauthnCredentials: () => webauthnCredentials
});
import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  profilePicture: text("profile_picture"),
  // URL to uploaded profile picture
  lsatScore: integer("lsat_score"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  softsTier: text("softs_tier"),
  // "T1", "T2", "T3", "T4"
  highestDegree: text("highest_degree"),
  // "Bachelor's", "Master's", "PhD", "JD", "MD", etc.
  workExperience: integer("work_experience"),
  // Years of work experience
  city: text("city"),
  state: text("state"),
  profileCompleted: boolean("profile_completed").default(false).notNull(),
  schoolListPrivate: boolean("school_list_private").default(false).notNull(),
  subscriptionTier: text("subscription_tier").default("basic").notNull(),
  // "basic", "premium", "pro"
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  usernameLastChanged: timestamp("username_last_changed"),
  // Color preferences for profile stats (0-9 index for official color wheel)
  lsatColorIndex: integer("lsat_color_index").default(0).notNull(),
  // 0 = white (default)
  gpaColorIndex: integer("gpa_color_index").default(0).notNull(),
  softsColorIndex: integer("softs_color_index").default(0).notNull(),
  schoolsColorIndex: integer("schools_color_index").default(0).notNull(),
  workColorIndex: integer("work_color_index").default(0).notNull(),
  locationColorIndex: integer("location_color_index").default(0).notNull(),
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var webauthnCredentials = pgTable("webauthn_credentials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  credentialID: text("credential_id").notNull().unique(),
  credentialPublicKey: text("credential_public_key").notNull(),
  counter: integer("counter").notNull().default(0),
  credentialDeviceType: text("credential_device_type").notNull(),
  credentialBackedUp: boolean("credential_backed_up").notNull().default(false),
  transports: text("transports"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var lawSchools = pgTable("law_schools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  lsat25th: integer("lsat_25th"),
  lsatMedian: integer("lsat_median"),
  lsat75th: integer("lsat_75th"),
  gpa25th: decimal("gpa_25th", { precision: 3, scale: 2 }),
  gpaMedian: decimal("gpa_median", { precision: 3, scale: 2 }),
  gpa75th: decimal("gpa_75th", { precision: 3, scale: 2 }),
  acceptanceRate: decimal("acceptance_rate", { precision: 5, scale: 2 }),
  barPassageRate: decimal("bar_passage_rate", { precision: 5, scale: 2 }),
  employmentRate: decimal("employment_rate", { precision: 5, scale: 2 }),
  bigLawRate: decimal("big_law_rate", { precision: 5, scale: 2 }),
  federalClerkshipRate: decimal("federal_clerkship_rate", { precision: 5, scale: 2 }),
  bigLawFederalClerkshipRate: decimal("big_law_federal_clerkship_rate", { precision: 5, scale: 2 }),
  underEmploymentRate: decimal("under_employment_rate", { precision: 5, scale: 2 }),
  medianSalary: integer("median_salary"),
  tuitionResident: integer("tuition_resident"),
  tuitionNonresident: integer("tuition_nonresident"),
  tuitionYear: text("tuition_year").default("2024-2025").notNull(),
  grant25th: integer("grant_25th"),
  grantMedian: integer("grant_median"),
  grant75th: integer("grant_75th"),
  usNewsRanking: integer("us_news_ranking"),
  aboveTheLawRanking: integer("above_the_law_ranking"),
  blueberryRanking: integer("blueberry_ranking"),
  rankingChange: integer("ranking_change"),
  applicationDeadline: text("application_deadline"),
  earlyDecisionDeadline: text("early_decision_deadline"),
  scholarshipDeadline: text("scholarship_deadline"),
  fafsaDeadline: text("fafsa_deadline"),
  seatDeposit: integer("seat_deposit"),
  seatDepositDeadline: text("seat_deposit_deadline"),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  enteringClassSize: integer("entering_class_size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var userSchools = pgTable("user_schools", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  schoolId: integer("school_id").notNull(),
  status: text("status").default("not_started").notNull(),
  // "not_started", "started", "submitted", "interviewed", "accepted", "waitlisted", "rejected"
  priority: text("priority").default("medium").notNull(),
  progress: integer("progress").default(0).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  category: text("category").default("target").notNull(),
  // "dream", "target", "safety", or custom category name
  notes: text("notes"),
  applicationFee: integer("application_fee"),
  applicationSubmitted: boolean("application_submitted").default(false).notNull(),
  applicationDate: timestamp("application_date"),
  decisionReceived: boolean("decision_received").default(false).notNull(),
  decisionDate: timestamp("decision_date"),
  decisionType: text("decision_type"),
  // "accepted", "waitlisted", "rejected"
  scholarshipOffered: boolean("scholarship_offered").default(false).notNull(),
  scholarshipAmount: integer("scholarship_amount"),
  scholarshipIsPerYear: boolean("scholarship_is_per_year").default(true).notNull(),
  depositPaid: boolean("deposit_paid").default(false).notNull(),
  depositDeadline: timestamp("deposit_deadline"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  status: text("status").default("not_started").notNull(),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  fileUrl: text("file_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var deadlines = pgTable("deadlines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  type: text("type").default("application").notNull(),
  priority: text("priority").default("medium").notNull(),
  schoolId: integer("school_id"),
  materialId: integer("material_id"),
  completed: boolean("completed").default(false).notNull(),
  completedDate: timestamp("completed_date"),
  reminderSent: boolean("reminder_sent").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var hiddenSchools = pgTable("hidden_schools", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  schoolId: integer("school_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  preferenceKey: text("preference_key").notNull(),
  preferenceValue: text("preference_value").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var userColumnPreferences = pgTable("user_column_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  visibleColumns: text("visible_columns").notNull(),
  // JSON array of column names
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  actionType: text("action_type").notNull(),
  // "added_school", "updated_status", "updated_category", "removed_school", etc.
  description: text("description").notNull(),
  // "Added Columbia to Target Schools", "Updated status to acceptance at NYU"
  schoolId: integer("school_id"),
  // Optional - if action relates to a specific school
  schoolName: text("school_name"),
  // Store school name for display purposes
  oldValue: text("old_value"),
  // Previous value for updates
  newValue: text("new_value"),
  // New value for updates
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var registerUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be 20 characters or less").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").refine((val) => !val.startsWith("_") && !val.endsWith("_"), "Username cannot start or end with underscore"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  plan: z.enum(["basic", "premium", "pro"]).default("basic")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required")
});
var loginUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  passwordHash: true,
  firstName: true,
  lastName: true,
  phone: true,
  subscriptionTier: true
});
var insertLawSchoolSchema = createInsertSchema(lawSchools).omit({
  id: true
});
var insertUserSchoolSchema = createInsertSchema(userSchools).omit({
  id: true
}).extend({
  scholarshipAmount: z.number().min(0).max(3e5).optional().nullable()
});
var updateUserSchoolSchema = z.object({
  status: z.string().optional(),
  category: z.string().optional(),
  decisionType: z.string().optional().nullable(),
  scholarshipAmount: z.number().min(0).max(3e5).optional().nullable(),
  applicationFee: z.number().min(0).max(1e4).optional().nullable()
});
var insertMaterialSchema = createInsertSchema(materials).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertDeadlineSchema = createInsertSchema(deadlines).omit({
  id: true,
  createdAt: true
});
var insertHiddenSchoolSchema = createInsertSchema(hiddenSchools).omit({
  id: true,
  createdAt: true
});
var insertUserPreferenceSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertUserActivitySchema = createInsertSchema(userActivities).omit({
  id: true,
  createdAt: true
});
var insertUserColumnPreferenceSchema = createInsertSchema(userColumnPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var updateUserProfileSchema = z.object({
  lsatScore: z.number().min(120).max(180).optional(),
  gpa: z.number().min(0).max(4).optional(),
  softsTier: z.enum(["T1", "T2", "T3", "T4"]).optional(),
  workExperience: z.number().min(0).max(50).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  profileCompleted: z.boolean().optional(),
  profilePicture: z.string().optional()
});
var usernameSelectionSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be 20 characters or less").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").refine((val) => !val.startsWith("_") && !val.endsWith("_"), "Username cannot start or end with underscore")
});
var usernameChangeSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be 20 characters or less").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").refine((val) => !val.startsWith("_") && !val.endsWith("_"), "Username cannot start or end with underscore")
});
var messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  recipientId: integer("recipient_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  // File attachment fields
  attachmentUrl: text("attachment_url"),
  // URL to uploaded file
  attachmentName: text("attachment_name"),
  // Original filename
  attachmentSize: integer("attachment_size"),
  // File size in bytes
  attachmentType: text("attachment_type"),
  // MIME type
  isRead: boolean("is_read").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  deletedAt: timestamp("deleted_at"),
  // For soft delete
  permanentDeleteAt: timestamp("permanent_delete_at"),
  // Auto-delete after 30 days
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var globalChatMessages = pgTable("global_chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  // Nullable for anonymous chat participants
  username: text("username").notNull(),
  // Denormalized for performance
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var emailVerificationTokens = pgTable("email_verification_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertMessageSchema = createInsertSchema(messages);
var insertGlobalChatMessageSchema = createInsertSchema(globalChatMessages).omit({
  id: true,
  createdAt: true
});
var insertEmailVerificationTokenSchema = createInsertSchema(emailVerificationTokens).omit({
  id: true,
  createdAt: true
});
var grantsAndScholarships = pgTable("grants_and_scholarships", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").notNull(),
  dataYear: text("data_year").default("2024").notNull(),
  // Financial Aid Data
  totalStudents: integer("total_students"),
  studentsReceivingAid: integer("students_receiving_aid"),
  percentReceivingAid: decimal("percent_receiving_aid", { precision: 5, scale: 2 }),
  // Grant Information
  totalGrantsAwarded: integer("total_grants_awarded"),
  totalGrantAmount: decimal("total_grant_amount", { precision: 12, scale: 2 }),
  averageGrantAmount: decimal("average_grant_amount", { precision: 12, scale: 2 }),
  medianGrantAmount: decimal("median_grant_amount", { precision: 12, scale: 2 }),
  // Scholarship Information
  totalScholarshipsAwarded: integer("total_scholarships_awarded"),
  totalScholarshipAmount: decimal("total_scholarship_amount", { precision: 12, scale: 2 }),
  averageScholarshipAmount: decimal("average_scholarship_amount", { precision: 12, scale: 2 }),
  medianScholarshipAmount: decimal("median_scholarship_amount", { precision: 12, scale: 2 }),
  // Need-Based Aid
  studentsReceivingNeedBased: integer("students_receiving_need_based"),
  totalNeedBasedAmount: decimal("total_need_based_amount", { precision: 12, scale: 2 }),
  averageNeedBasedAmount: decimal("average_need_based_amount", { precision: 12, scale: 2 }),
  // Merit-Based Aid
  studentsReceivingMeritBased: integer("students_receiving_merit_based"),
  totalMeritBasedAmount: decimal("total_merit_based_amount", { precision: 12, scale: 2 }),
  averageMeritBasedAmount: decimal("average_merit_based_amount", { precision: 12, scale: 2 }),
  // Full Tuition Coverage
  studentsWithFullTuition: integer("students_with_full_tuition"),
  studentsWithHalfTuition: integer("students_with_half_tuition"),
  studentsWithPartialTuition: integer("students_with_partial_tuition"),
  // Diversity and Special Scholarships
  diversityScholarships: integer("diversity_scholarships"),
  diversityScholarshipAmount: decimal("diversity_scholarship_amount", { precision: 12, scale: 2 }),
  publicInterestScholarships: integer("public_interest_scholarships"),
  publicInterestScholarshipAmount: decimal("public_interest_scholarship_amount", { precision: 12, scale: 2 }),
  // Loan Information
  studentsWithLoans: integer("students_with_loans"),
  averageLoanAmount: decimal("average_loan_amount", { precision: 12, scale: 2 }),
  medianLoanAmount: decimal("median_loan_amount", { precision: 12, scale: 2 }),
  // Cost of Attendance
  tuitionAndFees: decimal("tuition_and_fees", { precision: 12, scale: 2 }),
  livingExpenses: decimal("living_expenses", { precision: 12, scale: 2 }),
  totalCostOfAttendance: decimal("total_cost_of_attendance", { precision: 12, scale: 2 }),
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var grantsScholarshipsHistory = pgTable("grants_scholarships_history", {
  id: serial("id").primaryKey(),
  schoolId: integer("school_id").notNull(),
  dataYear: text("data_year").notNull(),
  // Key metrics for trend analysis
  totalGrantAmount: decimal("total_grant_amount", { precision: 12, scale: 2 }),
  averageGrantAmount: decimal("average_grant_amount", { precision: 12, scale: 2 }),
  percentReceivingAid: decimal("percent_receiving_aid", { precision: 5, scale: 2 }),
  studentsReceivingAid: integer("students_receiving_aid"),
  // Year-over-year changes
  grantAmountChange: decimal("grant_amount_change", { precision: 5, scale: 2 }),
  aidPercentChange: decimal("aid_percent_change", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertGrantsAndScholarshipsSchema = createInsertSchema(grantsAndScholarships);
var insertGrantsScholarshipsHistorySchema = createInsertSchema(grantsScholarshipsHistory);
var results = pgTable("results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  schoolId: integer("school_id").notNull(),
  schoolName: text("school_name"),
  username: text("username"),
  lsat: integer("lsat"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  softs: text("softs"),
  status: text("status").notNull(),
  decisionType: text("decision_type"),
  scholarshipAmount: integer("scholarship_amount").default(0),
  ranking: integer("ranking"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertResultSchema = createInsertSchema(results);
var insertWebauthnCredentialSchema = createInsertSchema(webauthnCredentials);
var aiConversations = pgTable("ai_conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  // Auto-generated or user-defined title
  summary: text("summary"),
  // Brief summary of conversation topic
  messageCount: integer("message_count").default(0).notNull(),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var aiMessages = pgTable("ai_messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => aiConversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  // "user" or "assistant"
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  context: text("context")
  // JSON string of context data used for the message
});
var insertAiConversationSchema = createInsertSchema(aiConversations);
var insertAiMessageSchema = createInsertSchema(aiMessages);

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, isNotNull, desc, gte, lt, gt, sql, or } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUserProfile(id, profileData) {
    try {
      console.log("DatabaseStorage.updateUserProfile called with:", id, profileData);
      const updateFields = {};
      if (profileData.lsatScore !== void 0) updateFields.lsatScore = profileData.lsatScore;
      if (profileData.gpa !== void 0) updateFields.gpa = profileData.gpa.toString();
      if (profileData.softsTier !== void 0) updateFields.softsTier = profileData.softsTier;
      if (profileData.workExperience !== void 0) updateFields.workExperience = profileData.workExperience;
      if (profileData.profileCompleted !== void 0) updateFields.profileCompleted = profileData.profileCompleted;
      if (profileData.profilePicture !== void 0) updateFields.profilePicture = profileData.profilePicture;
      if (profileData.city !== void 0) updateFields.city = profileData.city;
      if (profileData.state !== void 0) updateFields.state = profileData.state;
      if (profileData.highestDegree !== void 0) updateFields.highestDegree = profileData.highestDegree;
      updateFields.updatedAt = /* @__PURE__ */ new Date();
      console.log("Update fields prepared:", updateFields);
      const [updated] = await db.update(users).set(updateFields).where(eq(users.id, id)).returning();
      console.log("Database update result:", updated);
      return updated || void 0;
    } catch (error) {
      console.error("Error in updateUserProfile:", error);
      throw error;
    }
  }
  async updateUserColorPreferences(id, colorPreferences) {
    const [updated] = await db.update(users).set({
      lsatColorIndex: colorPreferences.lsatColorIndex,
      gpaColorIndex: colorPreferences.gpaColorIndex,
      softsColorIndex: colorPreferences.softsColorIndex,
      schoolsColorIndex: colorPreferences.schoolsColorIndex,
      workColorIndex: colorPreferences.workColorIndex,
      locationColorIndex: colorPreferences.locationColorIndex,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, id)).returning();
    return updated || void 0;
  }
  async updateUserActivity(id) {
    await db.update(users).set({
      lastActivity: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, id));
  }
  async isUsernameAvailable(username) {
    const [existing] = await db.select().from(users).where(eq(users.username, username));
    return !existing;
  }
  async canChangeUsername(userId) {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return false;
    if (!user.username) return true;
    if (!user.usernameLastChanged) return true;
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return user.usernameLastChanged < thirtyDaysAgo;
  }
  async setUsername(userId, username) {
    if (!await this.isUsernameAvailable(username)) {
      return void 0;
    }
    if (!await this.canChangeUsername(userId)) {
      return void 0;
    }
    const [updated] = await db.update(users).set({
      username,
      usernameLastChanged: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return updated || void 0;
  }
  async updateUserSubscription(userId, subscriptionData) {
    const [updated] = await db.update(users).set({
      subscriptionTier: subscriptionData.subscriptionTier,
      subscriptionExpiresAt: subscriptionData.subscriptionExpiresAt,
      stripeCustomerId: subscriptionData.stripeCustomerId,
      stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return updated || void 0;
  }
  async getAllLawSchools() {
    return await db.select().from(lawSchools);
  }
  async deleteAllLawSchools() {
    await db.delete(lawSchools);
  }
  async getLawSchool(id) {
    const [school] = await db.select().from(lawSchools).where(eq(lawSchools.id, id));
    return school || void 0;
  }
  async createLawSchool(school) {
    const [lawSchool] = await db.insert(lawSchools).values(school).returning();
    return lawSchool;
  }
  async updateLawSchool(id, school) {
    const [updated] = await db.update(lawSchools).set(school).where(eq(lawSchools.id, id)).returning();
    return updated || void 0;
  }
  async getUserSchools(userId) {
    const result = await db.select({
      userSchool: userSchools,
      school: lawSchools
    }).from(userSchools).leftJoin(lawSchools, eq(userSchools.schoolId, lawSchools.id)).where(eq(userSchools.userId, userId)).orderBy(userSchools.displayOrder);
    return result.map((row) => ({
      ...row.userSchool,
      school: row.school
    }));
  }
  async getUserSchool(userId, schoolId) {
    const [userSchool] = await db.select().from(userSchools).where(and(eq(userSchools.userId, userId), eq(userSchools.schoolId, schoolId)));
    return userSchool || void 0;
  }
  async addUserSchool(userSchool) {
    const [newUserSchool] = await db.insert(userSchools).values(userSchool).returning();
    return newUserSchool;
  }
  async updateUserSchool(id, userSchool) {
    const [updated] = await db.update(userSchools).set(userSchool).where(eq(userSchools.id, id)).returning();
    return updated || void 0;
  }
  async removeUserSchool(id) {
    const result = await db.delete(userSchools).where(eq(userSchools.id, id));
    return result.rowCount > 0;
  }
  async updateSchoolOrder(userId, schoolOrders) {
    console.log("updateSchoolOrder called with userId:", userId, "schoolOrders:", schoolOrders);
    try {
      for (const order of schoolOrders) {
        console.log("Processing order:", order);
        const result = await db.update(userSchools).set({ displayOrder: order.displayOrder }).where(and(eq(userSchools.id, order.id), eq(userSchools.userId, userId)));
        console.log("Update result for order:", order);
        console.log("Update result for order:", order, "result:", result);
      }
      console.log("All updates completed successfully");
    } catch (error) {
      console.error("Database update error in updateSchoolOrder:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  }
  async getUserMaterials(userId) {
    return await db.select().from(materials).where(eq(materials.userId, userId));
  }
  async getMaterial(id) {
    const [material] = await db.select().from(materials).where(eq(materials.id, id));
    return material || void 0;
  }
  async createMaterial(material) {
    const [newMaterial] = await db.insert(materials).values(material).returning();
    return newMaterial;
  }
  async updateMaterial(id, material) {
    const [updated] = await db.update(materials).set(material).where(eq(materials.id, id)).returning();
    return updated || void 0;
  }
  async deleteMaterial(id) {
    const result = await db.delete(materials).where(eq(materials.id, id));
    return result.rowCount > 0;
  }
  async getUserDeadlines(userId) {
    const result = await db.select({
      deadline: deadlines,
      school: lawSchools,
      material: materials
    }).from(deadlines).leftJoin(lawSchools, eq(deadlines.schoolId, lawSchools.id)).leftJoin(materials, eq(deadlines.materialId, materials.id)).where(eq(deadlines.userId, userId));
    return result.map((row) => ({
      ...row.deadline,
      school: row.school || void 0,
      material: row.material || void 0
    }));
  }
  async getDeadline(id) {
    const [deadline] = await db.select().from(deadlines).where(eq(deadlines.id, id));
    return deadline || void 0;
  }
  async createDeadline(deadline) {
    const [newDeadline] = await db.insert(deadlines).values(deadline).returning();
    return newDeadline;
  }
  async updateDeadline(id, deadline) {
    const [updated] = await db.update(deadlines).set(deadline).where(eq(deadlines.id, id)).returning();
    return updated || void 0;
  }
  async deleteDeadline(id) {
    const result = await db.delete(deadlines).where(eq(deadlines.id, id));
    return result.rowCount > 0;
  }
  async getUpcomingDeadlines(userId, days) {
    const cutoffDate = /* @__PURE__ */ new Date();
    cutoffDate.setDate(cutoffDate.getDate() + days);
    const result = await db.select({
      deadline: deadlines,
      school: lawSchools,
      material: materials
    }).from(deadlines).leftJoin(lawSchools, eq(deadlines.schoolId, lawSchools.id)).leftJoin(materials, eq(deadlines.materialId, materials.id)).where(eq(deadlines.userId, userId));
    return result.map((row) => ({
      ...row.deadline,
      school: row.school || void 0,
      material: row.material || void 0
    })).filter((deadline) => new Date(deadline.dueDate) <= cutoffDate);
  }
  async getUserHiddenSchools(userId) {
    const hiddenSchoolsList = await db.select().from(hiddenSchools).where(eq(hiddenSchools.userId, userId));
    return hiddenSchoolsList;
  }
  async hideSchool(userId, schoolId) {
    const [hiddenSchool] = await db.insert(hiddenSchools).values({ userId, schoolId }).returning();
    return hiddenSchool;
  }
  async unhideSchool(userId, schoolId) {
    const result = await db.delete(hiddenSchools).where(and(
      eq(hiddenSchools.userId, userId),
      eq(hiddenSchools.schoolId, schoolId)
    ));
    return result.rowCount > 0;
  }
  async isSchoolHidden(userId, schoolId) {
    const [hidden] = await db.select().from(hiddenSchools).where(and(
      eq(hiddenSchools.userId, userId),
      eq(hiddenSchools.schoolId, schoolId)
    ));
    return !!hidden;
  }
  // User preferences operations
  async getUserPreferences(userId) {
    return await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
  }
  async getUserPreference(userId, key) {
    const [preference] = await db.select().from(userPreferences).where(and(
      eq(userPreferences.userId, userId),
      eq(userPreferences.preferenceKey, key)
    ));
    return preference;
  }
  async setUserPreference(userId, key, value) {
    const existing = await this.getUserPreference(userId, key);
    if (existing) {
      const [updated] = await db.update(userPreferences).set({
        preferenceValue: value,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(userPreferences.id, existing.id)).returning();
      return updated;
    } else {
      const [created] = await db.insert(userPreferences).values({
        userId,
        preferenceKey: key,
        preferenceValue: value
      }).returning();
      return created;
    }
  }
  async deleteUserPreference(userId, key) {
    const result = await db.delete(userPreferences).where(and(
      eq(userPreferences.userId, userId),
      eq(userPreferences.preferenceKey, key)
    ));
    return result.rowCount > 0;
  }
  // Public results operations
  async getPublicResults() {
    try {
      const results2 = await db.select({
        id: userSchools.id,
        userId: userSchools.userId,
        userName: users.username,
        userFirstName: users.firstName,
        userLastName: users.lastName,
        schoolId: userSchools.schoolId,
        schoolName: lawSchools.name,
        schoolLocation: lawSchools.location,
        schoolUsNewsRanking: lawSchools.usNewsRanking,
        status: userSchools.status,
        decisionType: userSchools.decisionType,
        scholarshipAmount: userSchools.scholarshipAmount,
        scholarshipIsPerYear: userSchools.scholarshipIsPerYear,
        updatedAt: userSchools.updatedAt,
        lsatScore: users.lsatScore,
        gpa: users.gpa,
        softsTier: users.softsTier
      }).from(userSchools).innerJoin(users, eq(userSchools.userId, users.id)).innerJoin(lawSchools, eq(userSchools.schoolId, lawSchools.id)).where(isNotNull(userSchools.decisionType)).orderBy(desc(userSchools.updatedAt)).limit(50);
      return results2.map((row) => ({
        id: row.id,
        userId: row.userId,
        userName: row.userName || row.userFirstName,
        userFirstName: row.userFirstName,
        userLastName: row.userLastName,
        schoolId: row.schoolId,
        school: {
          id: row.schoolId,
          name: row.schoolName,
          location: row.schoolLocation,
          usNewsRanking: row.schoolUsNewsRanking
        },
        status: row.status,
        decisionType: row.decisionType,
        scholarshipAmount: row.scholarshipAmount,
        scholarshipIsPerYear: row.scholarshipIsPerYear,
        updatedAt: row.updatedAt,
        lsatScore: row.lsatScore,
        gpa: row.gpa,
        softsTier: row.softsTier
      }));
    } catch (error) {
      console.error("Error in getPublicResults:", error);
      return [];
    }
  }
  async getDailyResultsStats() {
    try {
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const resultsData = await db.select({
        schoolId: results.schoolId,
        schoolName: results.schoolName,
        schoolUsNewsRanking: results.ranking,
        count: sql`count(*)`.as("count")
      }).from(results).where(
        and(
          isNotNull(results.decisionType),
          gte(results.createdAt, thirtyDaysAgo)
        )
      ).groupBy(results.schoolId, results.schoolName, results.ranking).orderBy(desc(sql`count(*)`)).limit(10);
      return resultsData.map((row) => ({
        schoolId: row.schoolId,
        schoolName: row.schoolName,
        usNewsRanking: row.schoolUsNewsRanking,
        resultCount: row.count
      }));
    } catch (error) {
      console.error("Error in getDailyResultsStats:", error);
      return [];
    }
  }
  async getWeeklyWinners() {
    try {
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const winners = await db.select({
        userId: users.id,
        username: users.username,
        totalScholarship: sql`sum(${userSchools.scholarshipAmount})`.as("totalScholarship")
      }).from(userSchools).innerJoin(users, eq(userSchools.userId, users.id)).where(
        and(
          isNotNull(userSchools.scholarshipAmount),
          gt(userSchools.scholarshipAmount, 0),
          gte(userSchools.updatedAt, thirtyDaysAgo)
        )
      ).groupBy(users.id, users.username).orderBy(desc(sql`sum(${userSchools.scholarshipAmount})`)).limit(5);
      return winners.map((row) => ({
        userId: row.userId,
        username: row.username || `User ${row.userId}`,
        // Match frontend interface
        totalScholarship: row.totalScholarship || 0
      }));
    } catch (error) {
      console.error("Error in getWeeklyWinners:", error);
      return [];
    }
  }
  // Grants and Scholarships operations
  async getGrantsAndScholarships(schoolId) {
    try {
      let query = db.select().from(grantsAndScholarships);
      if (schoolId) {
        query = query.where(eq(grantsAndScholarships.schoolId, schoolId));
      }
      return await query.orderBy(desc(grantsAndScholarships.updatedAt));
    } catch (error) {
      console.error("Error in getGrantsAndScholarships:", error);
      return [];
    }
  }
  async getGrantsAndScholarshipsForSchool(schoolId) {
    try {
      const [result] = await db.select().from(grantsAndScholarships).where(eq(grantsAndScholarships.schoolId, schoolId)).orderBy(desc(grantsAndScholarships.updatedAt)).limit(1);
      return result;
    } catch (error) {
      console.error("Error in getGrantsAndScholarshipsForSchool:", error);
      return void 0;
    }
  }
  async createGrantsAndScholarships(data) {
    const [result] = await db.insert(grantsAndScholarships).values(data).returning();
    return result;
  }
  async updateGrantsAndScholarships(id, data) {
    try {
      const [result] = await db.update(grantsAndScholarships).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(grantsAndScholarships.id, id)).returning();
      return result;
    } catch (error) {
      console.error("Error in updateGrantsAndScholarships:", error);
      return void 0;
    }
  }
  async deleteGrantsAndScholarships(id) {
    try {
      const result = await db.delete(grantsAndScholarships).where(eq(grantsAndScholarships.id, id));
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error in deleteGrantsAndScholarships:", error);
      return false;
    }
  }
  // Grants and Scholarships History operations
  async getGrantsScholarshipsHistory(schoolId) {
    try {
      let query = db.select().from(grantsScholarshipsHistory);
      if (schoolId) {
        query = query.where(eq(grantsScholarshipsHistory.schoolId, schoolId));
      }
      return await query.orderBy(desc(grantsScholarshipsHistory.createdAt));
    } catch (error) {
      console.error("Error in getGrantsScholarshipsHistory:", error);
      return [];
    }
  }
  async createGrantsScholarshipsHistory(data) {
    const [result] = await db.insert(grantsScholarshipsHistory).values(data).returning();
    return result;
  }
  // Column preferences operations
  async getUserColumnPreferences(userId) {
    try {
      const [preference] = await db.select().from(userColumnPreferences).where(eq(userColumnPreferences.userId, userId));
      if (preference) {
        return JSON.parse(preference.visibleColumns);
      }
      return ["name", "usNewsRanking", "acceptanceRate", "lsat25th", "lsatMedian", "lsat75th", "gpa25th", "gpaMedian", "gpa75th", "tuitionNonresident", "medianSalary", "barPassageRate", "employmentRate", "bigLawRate", "federalClerkshipRate"];
    } catch (error) {
      console.error("Error in getUserColumnPreferences:", error);
      return ["name", "usNewsRanking", "acceptanceRate", "lsat25th", "lsatMedian", "lsat75th", "gpa25th", "gpaMedian", "gpa75th", "tuitionNonresident", "medianSalary", "barPassageRate", "employmentRate", "bigLawRate", "federalClerkshipRate"];
    }
  }
  async setUserColumnPreferences(userId, columns) {
    try {
      const visibleColumns = JSON.stringify(columns);
      const [existing] = await db.select().from(userColumnPreferences).where(eq(userColumnPreferences.userId, userId));
      if (existing) {
        await db.update(userColumnPreferences).set({
          visibleColumns,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(userColumnPreferences.userId, userId));
      } else {
        await db.insert(userColumnPreferences).values({
          userId,
          visibleColumns
        });
      }
    } catch (error) {
      console.error("Error in setUserColumnPreferences:", error);
    }
  }
  async getDailyResultStats() {
    try {
      const results2 = await db.select({
        schoolName: lawSchools.name,
        acceptanceCount: sql`COUNT(CASE WHEN ${userSchools.decisionType} = 'accepted' THEN 1 END)`,
        totalApplications: sql`COUNT(*)`,
        acceptanceRate: sql`ROUND((COUNT(CASE WHEN ${userSchools.decisionType} = 'accepted' THEN 1 END) * 100.0 / COUNT(*)), 1)`
      }).from(userSchools).innerJoin(lawSchools, eq(userSchools.schoolId, lawSchools.id)).where(isNotNull(userSchools.decisionType)).groupBy(lawSchools.name, lawSchools.id).orderBy(sql`acceptance_rate DESC`).limit(10);
      return results2;
    } catch (error) {
      console.error("Error in getDailyResultStats:", error);
      return [];
    }
  }
  async getAllResults() {
    try {
      console.log("getAllResults called - querying results table...");
      const results2 = await db.execute(sql`
        SELECT r.id, r.user_id, r.school_id, 
               COALESCE(ls.name, r.school_name) as school_name, 
               COALESCE(u.username, r.username) as username, r.lsat, r.gpa, r.softs, 
               r.status, r.decision_type, r.scholarship_amount, r.created_at, r.ranking,
               u.city, u.state
        FROM results r
        LEFT JOIN law_schools ls ON r.ranking = ls.us_news_ranking 
        LEFT JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC 
        LIMIT 100
      `);
      console.log(`getAllResults found ${results2.rows.length} rows`);
      return results2.rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        schoolId: row.school_id,
        schoolName: row.school_name,
        username: row.username,
        lsat: row.lsat,
        gpa: parseFloat(row.gpa),
        softs: row.softs,
        status: row.status,
        decisionType: row.decision_type,
        scholarshipAmount: row.scholarship_amount,
        createdAt: new Date(row.created_at),
        ranking: row.ranking,
        city: row.city,
        state: row.state
      }));
    } catch (error) {
      console.error("Error in getAllResults:", error);
      return [];
    }
  }
  async getResultsBySchool(schoolId) {
    try {
      console.log(`getResultsBySchool called for school ${schoolId}`);
      const results2 = await db.execute(sql`
        SELECT r.id, r.user_id, r.school_id, 
               COALESCE(ls.name, r.school_name) as school_name, 
               r.username, r.lsat, r.gpa, r.softs, 
               r.status, r.decision_type, r.scholarship_amount, r.created_at, r.ranking
        FROM results r
        LEFT JOIN law_schools ls ON r.school_id = ls.id 
        WHERE r.school_id = ${schoolId}
        ORDER BY r.created_at DESC
      `);
      console.log(`getResultsBySchool found ${results2.rows.length} rows for school ${schoolId}`);
      return results2.rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        schoolId: row.school_id,
        schoolName: row.school_name,
        username: row.username,
        lsat: row.lsat,
        gpa: parseFloat(row.gpa),
        softs: row.softs,
        status: row.status,
        decisionType: row.decision_type,
        scholarshipAmount: row.scholarship_amount,
        createdAt: new Date(row.created_at),
        ranking: row.ranking
      }));
    } catch (error) {
      console.error(`Error in getResultsBySchool for school ${schoolId}:`, error);
      return [];
    }
  }
  async getAdmissionResultsBySchool(schoolId) {
    try {
      const results2 = await db.execute(sql`
        SELECT r.id, r.lsat as lsat_score, r.gpa, r.decision_type, r.scholarship_amount
        FROM results r
        WHERE r.school_id = ${schoolId}
        AND r.decision_type IS NOT NULL
        AND r.lsat IS NOT NULL
        AND r.gpa IS NOT NULL
        ORDER BY r.created_at DESC
        LIMIT 100
      `);
      return results2.rows.map((row) => ({
        id: row.id,
        lsatScore: parseInt(row.lsat_score),
        gpa: parseFloat(row.gpa),
        decisionType: row.decision_type,
        scholarshipAmount: row.scholarship_amount || void 0
      }));
    } catch (error) {
      console.error(`Error getting admission results for school ${schoolId}:`, error);
      return [];
    }
  }
  async addResult(result) {
    try {
      const [newResult] = await db.insert(results).values(result).returning();
      return newResult;
    } catch (error) {
      console.error("Error in addResult:", error);
      throw error;
    }
  }
  async getDashboardStats(userId) {
    try {
      const userSchoolsList = await db.select().from(userSchools).where(eq(userSchools.userId, userId));
      const stats = {
        totalSchools: userSchoolsList.length,
        dreamSchools: userSchoolsList.filter((s) => s.category === "dream").length,
        targetSchools: userSchoolsList.filter((s) => s.category === "target").length,
        safetySchools: userSchoolsList.filter((s) => s.category === "safety").length,
        applicationStats: {
          started: userSchoolsList.filter((s) => s.status === "started").length,
          submitted: userSchoolsList.filter((s) => s.status === "submitted").length,
          interviewed: userSchoolsList.filter((s) => s.status === "interviewed").length,
          accepted: userSchoolsList.filter((s) => s.decisionType === "accepted").length,
          waitlisted: userSchoolsList.filter((s) => s.decisionType === "waitlisted").length,
          rejected: userSchoolsList.filter((s) => s.decisionType === "rejected").length
        },
        scholarshipTotal: userSchoolsList.filter((s) => s.scholarshipAmount).reduce((sum, s) => sum + (s.scholarshipAmount || 0), 0)
      };
      return stats;
    } catch (error) {
      console.error("Error in getDashboardStats:", error);
      return {
        totalSchools: 0,
        dreamSchools: 0,
        targetSchools: 0,
        safetySchools: 0,
        applicationStats: {
          started: 0,
          submitted: 0,
          interviewed: 0,
          accepted: 0,
          waitlisted: 0,
          rejected: 0
        },
        scholarshipTotal: 0
      };
    }
  }
  // Column colors operations
  async getUserColumnColors(userId) {
    try {
      const [result] = await db.select().from(userPreferences).where(and(
        eq(userPreferences.userId, userId),
        eq(userPreferences.preferenceKey, "column_colors")
      ));
      if (result?.preferenceValue) {
        return JSON.parse(result.preferenceValue);
      }
      return {};
    } catch (error) {
      console.error("Error in getUserColumnColors:", error);
      return {};
    }
  }
  async setUserColumnColors(userId, colors) {
    try {
      const existing = await db.select().from(userPreferences).where(and(
        eq(userPreferences.userId, userId),
        eq(userPreferences.preferenceKey, "column_colors")
      ));
      const colorData = JSON.stringify(colors);
      if (existing.length > 0) {
        await db.update(userPreferences).set({
          preferenceValue: colorData,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq(userPreferences.id, existing[0].id));
      } else {
        await db.insert(userPreferences).values({
          userId,
          preferenceKey: "column_colors",
          preferenceValue: colorData
        });
      }
    } catch (error) {
      console.error("Error in setUserColumnColors:", error);
    }
  }
  // WebAuthn biometric credentials operations
  async getUserWebauthnCredentials(userId) {
    try {
      const credentials = await db.select().from(webauthnCredentials).where(eq(webauthnCredentials.userId, userId));
      return credentials;
    } catch (error) {
      console.error("Error in getUserWebauthnCredentials:", error);
      return [];
    }
  }
  async getWebauthnCredentialById(credentialId) {
    try {
      const [credential] = await db.select().from(webauthnCredentials).where(eq(webauthnCredentials.credentialID, credentialId));
      return credential;
    } catch (error) {
      console.error("Error in getWebauthnCredentialById:", error);
      return void 0;
    }
  }
  async createWebauthnCredential(credential) {
    try {
      const [newCredential] = await db.insert(webauthnCredentials).values(credential).returning();
      return newCredential;
    } catch (error) {
      console.error("Error in createWebauthnCredential:", error);
      throw error;
    }
  }
  async updateWebauthnCredentialCounter(id, counter) {
    try {
      await db.update(webauthnCredentials).set({
        counter,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(webauthnCredentials.id, id));
    } catch (error) {
      console.error("Error in updateWebauthnCredentialCounter:", error);
      throw error;
    }
  }
  async deleteWebauthnCredential(id) {
    try {
      const result = await db.delete(webauthnCredentials).where(eq(webauthnCredentials.id, id));
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error("Error in deleteWebauthnCredential:", error);
      return false;
    }
  }
  async getUserById(id) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error in getUserById:", error);
      return void 0;
    }
  }
  // Messaging operations
  async createMessage(message) {
    try {
      const permanentDeleteAt = /* @__PURE__ */ new Date();
      permanentDeleteAt.setDate(permanentDeleteAt.getDate() + 30);
      const [newMessage] = await db.insert(messages).values({
        ...message,
        permanentDeleteAt
      }).returning();
      return newMessage;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }
  async getMessages(userId) {
    try {
      const userMessages = await db.select().from(messages).where(
        and(
          eq(messages.recipientId, userId),
          eq(messages.isDeleted, false)
        )
      ).orderBy(desc(messages.createdAt));
      return userMessages;
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  }
  async getUnreadMessageCount(userId) {
    try {
      const count = await db.select({ count: sql`count(*)` }).from(messages).where(
        and(
          eq(messages.recipientId, userId),
          eq(messages.isRead, false),
          eq(messages.isDeleted, false)
        )
      );
      return count[0]?.count || 0;
    } catch (error) {
      console.error("Error getting unread message count:", error);
      return 0;
    }
  }
  async searchUsers(query, currentUserId) {
    try {
      const searchResults = await db.select().from(users).where(
        and(
          sql`${users.username} ILIKE ${`%${query}%`} OR ${users.firstName} ILIKE ${`%${query}%`} OR ${users.lastName} ILIKE ${`%${query}%`}`,
          sql`${users.id} != ${currentUserId}`
        )
      ).limit(10);
      return searchResults;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
  async cleanupExpiredMessages() {
    try {
      const now = /* @__PURE__ */ new Date();
      const result = await db.delete(messages).where(
        and(
          isNotNull(messages.permanentDeleteAt),
          lt(messages.permanentDeleteAt, now)
        )
      );
      return result.rowCount || 0;
    } catch (error) {
      console.error("Error cleaning up expired messages:", error);
      return 0;
    }
  }
  // Implement missing messaging interface methods
  async sendMessage(senderId, recipientId, subject, content) {
    return this.createMessage({
      senderId,
      recipientId,
      subject,
      content
    });
  }
  async getUserMessages(userId, type) {
    try {
      let whereCondition;
      if (type === "sent") {
        whereCondition = and(
          eq(messages.senderId, userId),
          eq(messages.isDeleted, false)
        );
      } else if (type === "received") {
        whereCondition = and(
          eq(messages.recipientId, userId),
          eq(messages.isDeleted, false)
        );
      } else {
        whereCondition = and(
          or(eq(messages.senderId, userId), eq(messages.recipientId, userId)),
          eq(messages.isDeleted, false)
        );
      }
      const userMessages = await db.select().from(messages).where(whereCondition).orderBy(desc(messages.createdAt));
      return userMessages;
    } catch (error) {
      console.error("Error getting user messages:", error);
      return [];
    }
  }
  async getConversation(userId, otherUserId) {
    try {
      const conversation = await db.select().from(messages).where(
        and(
          or(
            and(eq(messages.senderId, userId), eq(messages.recipientId, otherUserId)),
            and(eq(messages.senderId, otherUserId), eq(messages.recipientId, userId))
          ),
          eq(messages.isDeleted, false)
        )
      ).orderBy(desc(messages.createdAt));
      return conversation;
    } catch (error) {
      console.error("Error getting conversation:", error);
      return [];
    }
  }
  async markMessageAsRead(messageId, userId) {
    try {
      const result = await db.update(messages).set({ isRead: true, updatedAt: /* @__PURE__ */ new Date() }).where(
        and(
          eq(messages.id, messageId),
          eq(messages.recipientId, userId)
        )
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error("Error marking message as read:", error);
      return false;
    }
  }
  async deleteMessage(messageId, userId) {
    try {
      const result = await db.update(messages).set({ isDeleted: true, deletedAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }).where(
        and(
          eq(messages.id, messageId),
          or(eq(messages.senderId, userId), eq(messages.recipientId, userId))
        )
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error("Error deleting message:", error);
      return false;
    }
  }
  // Email verification operations
  async createEmailVerificationToken(token) {
    const [createdToken] = await db.insert(emailVerificationTokens).values(token).returning();
    return createdToken;
  }
  async verifyEmailToken(token) {
    try {
      const [tokenRecord] = await db.select().from(emailVerificationTokens).where(eq(emailVerificationTokens.token, token));
      if (!tokenRecord) {
        return { userId: 0, isValid: false };
      }
      const now = /* @__PURE__ */ new Date();
      if (now > tokenRecord.expiresAt) {
        await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, tokenRecord.id));
        return { userId: 0, isValid: false };
      }
      await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, tokenRecord.id));
      return { userId: tokenRecord.userId, isValid: true };
    } catch (error) {
      console.error("Error verifying email token:", error);
      return { userId: 0, isValid: false };
    }
  }
  async markEmailAsVerified(userId) {
    try {
      const [updated] = await db.update(users).set({ emailVerified: true, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId)).returning();
      return updated || void 0;
    } catch (error) {
      console.error("Error marking email as verified:", error);
      return void 0;
    }
  }
  async deleteExpiredTokens() {
    try {
      const now = /* @__PURE__ */ new Date();
      await db.delete(emailVerificationTokens).where(lt(emailVerificationTokens.expiresAt, now));
    } catch (error) {
      console.error("Error deleting expired tokens:", error);
    }
  }
  // Global chat operations
  async createGlobalChatMessage(message) {
    try {
      const [created] = await db.insert(globalChatMessages).values(message).returning();
      return created;
    } catch (error) {
      console.error("Error creating global chat message:", error);
      throw error;
    }
  }
  async getGlobalChatMessages(limit = 100) {
    try {
      const messages2 = await db.select().from(globalChatMessages).orderBy(desc(globalChatMessages.createdAt)).limit(limit);
      return messages2.reverse();
    } catch (error) {
      console.error("Error getting global chat messages:", error);
      return [];
    }
  }
};
var storage = new DatabaseStorage();

// server/emailService.ts
import nodemailer from "nodemailer";
import crypto from "crypto";
var EmailService = class {
  transporter = null;
  constructor() {
    this.setupTransporter();
  }
  setupTransporter() {
    const emailConfig = {
      host: process.env.EMAIL_HOST || "smtp.ethereal.email",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS || ""
      }
    };
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.log("No email credentials provided. Email verification will be logged to console.");
      return;
    }
    this.transporter = nodemailer.createTransport(emailConfig);
  }
  generateVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
  }
  async sendVerificationEmail(email, firstName, token) {
    const verificationUrl = `${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : "http://localhost:5000"}/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_FROM || "hello@myblueberry.io",
      to: email,
      subject: "Verify Your Email - Blueberry",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Blueberry</h1>
            <p style="color: #6b7280; margin: 5px 0;">Welcome to your law school application journey</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for creating your account with Blueberry. To complete your registration 
              and start tracking your law school applications, please verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; 
                        border-radius: 6px; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
              If the button doesn't work, copy and paste this link into your browser:
              <br>
              <a href="${verificationUrl}" style="color: #2563eb; word-break: break-all;">${verificationUrl}</a>
            </p>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px;">
            <p>If you didn't create this account, please ignore this email.</p>
            <p>\xA9 2025 Blueberry. All rights reserved.</p>
          </div>
        </div>
      `
    };
    try {
      if (!this.transporter) {
        console.log("\n=== EMAIL VERIFICATION (Development Mode) ===");
        console.log(`To: ${email}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log(`Verification URL: ${verificationUrl}`);
        console.log("===============================================\n");
        return true;
      }
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
      return true;
    } catch (error) {
      console.error("Error sending verification email:", error);
      return false;
    }
  }
  async sendWelcomeEmail(email, firstName) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "hello@myblueberry.io",
      to: email,
      subject: "Welcome to Blueberry!",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">\u{1F389} Welcome to Blueberry!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1f2937; margin-top: 0;">Hi ${firstName}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Your email has been successfully verified! You can now access all features of Blueberry:
            </p>
            
            <ul style="color: #4b5563; line-height: 1.8;">
              <li>\u{1F4DA} Browse and research law schools</li>
              <li>\u{1F4CA} Track your application progress</li>
              <li>\u{1F4B0} Monitor scholarship opportunities</li>
              <li>\u{1F4C8} Analyze your application portfolio</li>
              <li>\u{1F4AC} Connect with other applicants</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : "http://localhost:5000"}/dashboard" 
                 style="background: #059669; color: white; padding: 12px 30px; text-decoration: none; 
                        border-radius: 6px; font-weight: bold; display: inline-block;">
                Start Your Journey
              </a>
            </div>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px;">
            <p>Happy applying!</p>
            <p>\xA9 2025 Blueberry. All rights reserved.</p>
          </div>
        </div>
      `
    };
    try {
      if (!this.transporter) {
        console.log("\n=== WELCOME EMAIL (Development Mode) ===");
        console.log(`To: ${email}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log("=========================================\n");
        return true;
      }
      await this.transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${email}`);
      return true;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return false;
    }
  }
};
var emailService = new EmailService();

// server/routes.ts
import crypto2 from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

// server/profanityFilter.ts
var OFFENSIVE_WORDS = [
  // Racial slurs and hate speech (partial list for safety)
  "nigger",
  "nigga",
  "kike",
  "chink",
  "gook",
  "wetback",
  "spic",
  "beaner",
  "raghead",
  "towelhead",
  "sandnigger",
  "paki",
  "curry",
  "dothead",
  "coolie",
  "redskin",
  "injun",
  "squaw",
  "hymie",
  "yid",
  "kraut",
  "hun",
  "dago",
  "wop",
  "guinea",
  "mick",
  "paddy",
  "limey",
  "frog",
  "boche",
  "slope",
  "zipperhead",
  "nip",
  "jap",
  "chinaman",
  "oriental",
  "mongol",
  "eskimo",
  // Profanity and vulgar terms
  "fuck",
  "shit",
  "bitch",
  "damn",
  "crap",
  "piss",
  "bastard",
  "whore",
  "slut",
  "cunt",
  "pussy",
  "cock",
  "dick",
  "penis",
  "vagina",
  "tits",
  "boobs",
  "anal",
  "sex",
  "porn",
  "xxx",
  "nude",
  "naked",
  // Hate speech and discriminatory terms
  "nazi",
  "hitler",
  "holocaust",
  "jew",
  "muslim",
  "terrorist",
  "bomber",
  "isis",
  "taliban",
  "jihad",
  "infidel",
  "kafir",
  "heathen",
  // LGBTQ+ slurs
  "fag",
  "faggot",
  "dyke",
  "queer",
  "homo",
  "tranny",
  "shemale",
  // Disability slurs
  "retard",
  "retarded",
  "mongoloid",
  "spastic",
  "cripple",
  "gimp",
  // Body shaming and appearance
  "ugly",
  "fat",
  "skinny",
  "bald",
  "short",
  "tall",
  "freak",
  // Violence and threats
  "kill",
  "murder",
  "rape",
  "assault",
  "violence",
  "torture",
  "abuse",
  "suicide",
  "death",
  "dead",
  "blood",
  "gore",
  "brutal",
  // Drug references
  "cocaine",
  "heroin",
  "meth",
  "crack",
  "weed",
  "marijuana",
  "drug",
  "dealer",
  "addict",
  "junkie",
  "pothead",
  "stoner",
  // Inappropriate sexual content
  "orgasm",
  "masturbate",
  "horny",
  "aroused",
  "erotic",
  "kinky",
  "fetish",
  "bondage",
  "bdsm",
  "gangbang",
  "threesome",
  // Common variations and leetspeak
  "f4g",
  "n1gg3r",
  "b1tch",
  "sh1t",
  "fuk",
  "phuck",
  "azz",
  "butthole"
];
var OFFENSIVE_PATTERNS = [
  /n[i1!]gg[e3a@]r/i,
  /f[a@4]gg?[o0]t/i,
  /b[i1!]tch/i,
  /sh[i1!]t/i,
  /f[u@]ck/i,
  /c[u@]nt/i,
  /d[i1!]ck/i,
  /p[u@]ssy/i,
  /wh[o0]re/i,
  /sl[u@]t/i,
  /r[e3]t[a@]rd/i,
  /h[i1!]tl[e3]r/i,
  /n[a@]z[i1!]/i,
  /k[i1!]k[e3]/i,
  /sp[i1!]c/i,
  /ch[i1!]nk/i,
  /g[o0]{2}k/i,
  /w[e3]tb[a@]ck/i,
  /b[e3]{2}n[e3]r/i,
  /r[a@]gh[e3]{2}d/i,
  /t[o0]w[e3]lh[e3]{2}d/i,
  /p[a@]k[i1!]/i,
  /c[u@]rry/i,
  /d[o0]th[e3]{2}d/i,
  /c[o0]{2}l[i1!][e3]/i,
  /r[e3]dsk[i1!]n/i,
  /[i1!]nj[u@]n/i,
  /squ[a@]w/i,
  /hyml[e3]/i,
  /y[i1!]d/i,
  /kr[a@][u@]t/i,
  /h[u@]n/i,
  /d[a@]g[o0]/i,
  /w[o0]p/i,
  /gu[i1!]n[e3]{2}/i,
  /m[i1!]ck/i,
  /p[a@]ddy/i,
  /l[i1!]m[e3]y/i,
  /fr[o0]g/i,
  /b[o0]ch[e3]/i,
  /sl[o0]p[e3]/i,
  /z[i1!]pp[e3]rh[e3]{2}d/i,
  /n[i1!]p/i,
  /j[a@]p/i,
  /ch[i1!]n[a@]m[a@]n/i,
  /[o0]r[i1!][e3]nt[a@]l/i,
  /m[o0]ng[o0]l/i,
  /[e3]sk[i1!]m[o0]/i
];
function containsOffensiveContent(text2) {
  if (!text2 || typeof text2 !== "string") {
    return false;
  }
  const normalizedText = text2.toLowerCase().trim();
  for (const word of OFFENSIVE_WORDS) {
    const regex = new RegExp(`(^|\\s)${word.toLowerCase()}(\\s|$)`, "i");
    if (regex.test(normalizedText)) {
      return true;
    }
  }
  for (const pattern of OFFENSIVE_PATTERNS) {
    if (pattern.test(normalizedText)) {
      return true;
    }
  }
  const leetText = normalizedText.replace(/[0]/g, "o").replace(/[1!]/g, "i").replace(/[3]/g, "e").replace(/[4@]/g, "a").replace(/[5]/g, "s").replace(/[7]/g, "t").replace(/[8]/g, "b");
  for (const word of OFFENSIVE_WORDS) {
    const regex = new RegExp(`(^|\\s)${word.toLowerCase()}(\\s|$)`, "i");
    if (regex.test(leetText)) {
      return true;
    }
  }
  return false;
}
function validateUsername(username) {
  if (!username || typeof username !== "string") {
    return { isValid: false, reason: "Username is required" };
  }
  const trimmed = username.trim();
  if (trimmed.length < 3 || trimmed.length > 20) {
    return { isValid: false, reason: "Username must be between 3 and 20 characters" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { isValid: false, reason: "Username can only contain letters, numbers, and underscores" };
  }
  if (containsOffensiveContent(trimmed)) {
    return { isValid: false, reason: "Username contains inappropriate content. Please choose a different username." };
  }
  const reservedWords = [
    "admin",
    "administrator",
    "root",
    "system",
    "support",
    "help",
    "staff",
    "moderator",
    "mod",
    "owner",
    "blueberry",
    "official",
    "verified",
    "null",
    "undefined",
    "true",
    "false",
    "guest",
    "anonymous",
    "user",
    "test",
    "demo",
    "sample",
    "example",
    "default",
    "api",
    "www",
    "mail",
    "email",
    "ftp",
    "ssh",
    "http",
    "https",
    "server"
  ];
  if (reservedWords.includes(trimmed.toLowerCase())) {
    return { isValid: false, reason: "This username is reserved. Please choose a different one." };
  }
  return { isValid: true };
}

// server/lawschoolbot.ts
import OpenAI from "openai";
var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
var BlueberryAI = class _BlueberryAI {
  static instance;
  static getInstance() {
    if (!_BlueberryAI.instance) {
      _BlueberryAI.instance = new _BlueberryAI();
    }
    return _BlueberryAI.instance;
  }
  async generateResponse(message, context = {}) {
    try {
      const systemPrompt = this.buildSystemPrompt(context);
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      });
      return response.choices[0].message.content || "I apologize, but I'm having trouble generating a response right now. Please try again.";
    } catch (error) {
      console.error("Blueberry AI error:", error);
      console.error("Error properties:", { status: error?.status, code: error?.code, type: error?.type, message: error?.message });
      if (error?.status === 429) {
        return "I'm currently unavailable due to OpenAI API quota limits. The API key has exceeded its usage quota and needs to be updated with a key that has available credits. Please contact the administrator to resolve this issue.";
      }
      return "I'm experiencing technical difficulties. Please try your question again in a moment.";
    }
  }
  buildSystemPrompt(context) {
    const { userProfile, userSchools: userSchools2, recentResults } = context;
    let prompt = `You are Blueberry AI, an expert AI assistant specializing in law school admissions and career outcomes. You have access to comprehensive, real-time data on all 196 ABA-accredited law schools.

CORE CAPABILITIES:
- Analyze admissions chances based on LSAT/GPA statistics
- Compare schools using employment outcomes, bar passage rates, and rankings
- Provide personalized advice based on user profiles and goals
- Explain financial aid, scholarships, and cost analysis
- Discuss application strategies and timeline management
- Answer questions about specific law schools and programs

DATA SOURCES:
- Current LSAT/GPA medians and percentiles for all schools
- Employment outcomes including Big Law placement rates
- Bar passage rates and state-by-state performance
- US News, Above the Law, and Blueberry ranking systems
- Comprehensive financial aid and scholarship data
- Real admission results from current application cycle

RESPONSE STYLE:
- Provide specific, data-driven advice
- Reference actual statistics when relevant
- Be encouraging but realistic about admission chances
- Offer actionable next steps
- Keep responses concise but comprehensive`;
    if (userProfile) {
      prompt += `

USER PROFILE:`;
      if (userProfile.lsatScore) prompt += `
- LSAT Score: ${userProfile.lsatScore}`;
      if (userProfile.gpa) prompt += `
- GPA: ${userProfile.gpa}`;
      if (userProfile.softs) prompt += `
- Softs Tier: ${userProfile.softs}`;
      if (userProfile.workExperience) prompt += `
- Work Experience: ${userProfile.workExperience} years`;
      if (userProfile.location) prompt += `
- Location: ${userProfile.location}`;
    }
    if (userSchools2 && userSchools2.length > 0) {
      prompt += `

USER'S SCHOOL LIST (${userSchools2.length} schools):`;
      userSchools2.slice(0, 10).forEach((school) => {
        prompt += `
- ${school.name} (${school.status || "not started"})`;
      });
      if (userSchools2.length > 10) {
        prompt += `
- ... and ${userSchools2.length - 10} more schools`;
      }
    }
    if (recentResults && recentResults.length > 0) {
      prompt += `

RECENT PLATFORM ACTIVITY:`;
      recentResults.slice(0, 5).forEach((result) => {
        prompt += `
- User with ${result.lsatScore} LSAT, ${result.gpa} GPA ${result.decisionType} at ${result.schoolName}`;
      });
    }
    prompt += `

IMPORTANT: Always base your advice on authentic data and current trends. If you don't have specific information, say so and suggest where the user might find it.`;
    return prompt;
  }
  async getSchoolData(schoolName) {
    try {
      return {
        message: `I have access to comprehensive data for ${schoolName} including current admissions statistics, employment outcomes, and ranking information. What specific information would you like to know?`
      };
    } catch (error) {
      console.error("Error fetching school data:", error);
      return null;
    }
  }
};
var blueberryAI = BlueberryAI.getInstance();

// server/routes.ts
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse
} from "@simplewebauthn/server";
var rpName = "Blueberry Law School Tracker";
var rpID = process.env.REPLIT_DOMAINS ? process.env.REPLIT_DOMAINS.split(",")[0] : "localhost";
var origin = `https://${rpID}`;
var v1ToV2SchoolMapping = {
  "University of Akron": "Akron",
  "University of Alabama": "Alabama",
  "Albany Law": "Albany Law",
  "American University": "American U",
  "Appalachian Law": "Appalachian Law",
  "Arizona State University": "Arizona State",
  "University of Arizona": "Arizona",
  "University of Arkansas, Little Rock": "Arkansas, Little Rock",
  "University of Arkansas": "Arkansas",
  "John Marshall Law": "John Marshall Law",
  "Ave Maria Law": "Ave Maria",
  "University of Baltimore": "U of Baltimore",
  "Barry University": "Barry",
  "Baylor University": "Baylor",
  "Belmont University": "Belmont",
  "Boston College": "Boston College",
  "Boston University": "Boston U",
  "Brigham Young University": "BYU",
  "Brooklyn Law": "Brooklyn Law",
  "University at Buffalo": "U of Buffalo",
  "California Western Law": "California Western",
  "University of California, Berkeley": "UC Berkeley",
  "University of California, Davis": "UC Davis",
  "University of California, Irvine": "UC Irvine",
  "University of California, Los Angeles": "UCLA",
  "University of California, San Francisco": "UC San Francisco",
  "Campbell University": "Campbell U",
  "Capital University": "Capital U",
  "Yeshiva University": "Yeshiva",
  "Case Western Reserve University": "Case Western",
  "Catholic University of America": "Catholic U of America",
  "Chapman University": "Chapman U",
  "Charleston Law": "Charleston Law",
  "University of Chicago": "University of Chicago",
  "Illinois Tech (Chicago Kent)": "Illinois Tech (Chicago Kent)",
  "University of Cincinnati": "Cincinnati",
  "City University of New York (CUNY)": "CUNY",
  "Cleveland State University": "Cleveland State",
  "University of Colorado": "Colorado",
  "Columbia University": "Columbia",
  "University of Connecticut": "UConn",
  "Cooley Law School": "Cooley Law",
  "Cornell University": "Cornell",
  "Creighton University": "Creighton",
  "University of Dayton": "Dayton",
  "University of Denver": "U of Denver",
  "DePaul University": "DePaul",
  "University of Detroit Mercy": "Detroit Mercy",
  "University of District of Columbia": "U of District of Columbia",
  "Drake University": "Drake",
  "Drexel University": "Drexel",
  "Duke University": "Duke",
  "Duquesne University": "Duquesne",
  "Elon University": "Elon",
  "Emory University": "Emory",
  "Faulkner University": "Faulkner U",
  "Florida A&M University": "Florida A&M",
  "Florida International University": "FIU",
  "Florida State University": "Florida State",
  "University of Florida": "Florida",
  "Fordham University": "Fordham",
  "George Mason University": "George Mason",
  "George Washington University": "George Washington",
  "Georgetown University": "Georgetown",
  "Georgia State University": "Georgia State",
  "University of Georgia": "Georgia",
  "Gonzaga University": "Gonzaga",
  "Harvard University": "Harvard",
  "Yale University": "Yale",
  "University of Hawaii, Manoa": "Hawaii, Manoa",
  "Hofstra University": "Hofstra",
  "University of Houston": "Houston",
  "Howard University": "Howard",
  "University of Idaho": "Idaho",
  "University of Illinois, Urbana-Champaign": "Illinios, Urbana-Champaign",
  "University of Illinois, Chicago": "Illinois, Chicago",
  "Indiana University, Bloomington": "Indiana, Bloomington",
  "Indiana University, Indianapolis": "Indiana, Indianapolis",
  "Inter American University of Puerto Rico": "Inter American U",
  "University of Iowa": "Iowa",
  "Jacksonville University": "Jacksonville",
  "University of Kansas": "Kansas",
  "University of Kentucky": "Kentucky",
  "Lewis & Clark Law School": "Lewis & Clark",
  "Liberty University": "Liberty",
  "Lincoln Memorial University": "Lincoln Memorial",
  "Louisiana State University": "LSU",
  "University of Louisville": "Louisville",
  "Loyola Marymount University, Los Angeles": "Loyola Marymount, LA",
  "Loyola University, Chicago": "Loyola, Chicago",
  "Loyola University, New Orleans": "Loyola, New Orleans",
  "University of Maine": "Maine",
  "Marquette University": "Marquette",
  "University of Maryland": "Maryland",
  "University of Massachusetts, Dartmouth": "Massachusets, Dartmouth",
  "University of Memphis": "Memphis",
  "Mercer University": "Mercer",
  "University of Miami": "Miami",
  "Michigan State University": "Michigan State",
  "University of Michigan": "Michigan",
  "University of Minnesota": "Minnesota",
  "Mississippi College": "Mississippi College",
  "University of Mississippi": "Ole Miss",
  "University of Missouri": "Missouri",
  "University of Missouri, Kansas City": "Missouri, Kansas City",
  "Mitchell Hamline School of Law": "Mitchell Hamline",
  "University of Montana": "Montana",
  "University of Nebraska": "Nebraska",
  "University of Nevada, Las Vegas": "UNLV",
  "New England Law, Boston": "New England Law, Boston",
  "University of New Hampshire": "New Hampshire",
  "University of New Mexico": "New Mexico",
  "New York Law School": "New York Law",
  "New York University": "NYU",
  "North Carolina Central University": "North Carolina Central U",
  "University of North Carolina": "UNC",
  "University of North Dakota": "North Dakota",
  "University of North Texas, Dallas": "North Texas, Dallas",
  "Northeastern University": "Northeastern",
  "Northern Illinois University": "Northern Illinois",
  "Northern Kentucky University": "Northern Kentucky",
  "Northwestern University": "Northwestern",
  "University of Notre Dame": "Notre Dame",
  "Nova Southeastern University": "Nova Southeastern",
  "Ohio Northern University": "Ohio Northern",
  "Oklahoma City University": "Oklahoma City U",
  "University of Oklahoma": "Oklahoma",
  "University of Oregon": "Oregon",
  "Pace University": "Pace U",
  "University of the Pacific": "U of the Pacific",
  "Penn State University (Dickinson)": "Penn State (Dickinson)",
  "Penn State University": "Penn State",
  "University of Pennsylvania": "Penn",
  "Pepperdine University": "Pepperdine",
  "University of Pittsburgh": "Pitt",
  "Pontifical Catholic University of Puerto Rico": "Pontifical Catholic U",
  "University of Puerto Rico": "U of Puerto Rico",
  "Quinnipiac University": "Quinnipiac",
  "Regent University": "Regent",
  "University of Richmond": "Richmond",
  "Roger Williams University": "Roger Williams",
  "Rutgers University": "Rutgers",
  "Saint Louis University": "Saint Louis",
  "Samford University": "Samford",
  "University of San Diego": "U of San Diego",
  "University of San Francisco": "U of San Francisco",
  "Santa Clara University": "Santa Clara",
  "Seattle University": "Seattle U",
  "Seton Hall University": "Seton Hall",
  "University of South Carolina": "South Carolina",
  "University of South Dakota": "South Dakota",
  "South Texas College of Law Houston": "South Texas College",
  "University of Southern California": "USC",
  "Southern Illinois University": "Southern Illinois",
  "Southern Methodist University": "SMU",
  "Southern University": "Southern U",
  "Southwestern Law School": "Southwestern Law",
  "St. John's University": "St. John's U",
  "St. Mary's University": "St. Mary's U",
  "St. Thomas University (Miami)": "St. Thomas (Miami)",
  "University of St. Thomas (Minneapolis)": "St. Thomas (Minneapolis)",
  "Stanford University": "Stanford",
  "Stetson University": "Stetson",
  "Suffolk University": "Suffolk",
  "Syracuse University": "Syracuse",
  "Temple University": "Temple",
  "University of Tennessee": "Tennessee",
  "Texas A&M University": "Texas A&M",
  "Texas Southern University": "Texas Southern",
  "Texas Tech University": "Texas Tech",
  "University of Texas, Austin": "Texas, Austin",
  "Ohio State University": "Ohio State",
  "University of Toledo": "Toledo",
  "Touro University": "Touro",
  "Tulane University": "Tulane",
  "University of Tulsa": "Tulsa",
  "University of Utah": "Utah",
  "Vanderbilt University": "Vanderbilt",
  "Vermont Law School": "Vermont",
  "Villanova University": "Villanova",
  "University of Virginia": "UVA",
  "Wake Forest University": "Wake Forest",
  "Washburn University": "Washburn",
  "Washington and Lee University": "Washington & Lee",
  "Washington University (St. Louis)": "Washington (St. Louis)",
  "University of Washington": "Washington",
  "Wayne State University": "Wayne State",
  "West Virginia University": "WVU",
  "Western New England University": "Western New England",
  "Westcliff University": "Westcliff U",
  "Widener University, Commonwealth": "Widener, Commonwealth",
  "Widener University, Delaware": "Widener, Delaware",
  "Willamette University": "Willamette",
  "William & Mary": "William & Mary",
  "University of Wisconsin, Madison": "Wisconsin, Madison",
  "University of Wyoming": "Wyoming"
};
function getSchoolPdfMapping(schoolName) {
  const schoolPdfMappings = {
    "University of Akron": "509_2024_Akron_1752980399150.pdf",
    "University of Alabama": "509_2024_Alabama_1752980399150.pdf",
    "Albany Law School": "509_2024_Albany_1752980399150.pdf",
    "Albany Law": "509_2024_Albany_1752980399150.pdf",
    "American University": "509_2024_AmericanU_1752980399151.pdf",
    "Appalachian School of Law": "509_2024_AppalachianLaw_1752980399151.pdf",
    "University of Arizona": "509_2024_Arizona_1752980399151.pdf",
    "Arizona State University": "509_2024_ArizonaState_1752980399151.pdf",
    "University of Arkansas": "509_2024_Arkansas_1752980399151.pdf",
    "University of Arkansas, Little Rock": "509_2024_ArkansasLR_1752980399151.pdf",
    "Ave Maria School of Law": "509_2024_AveMariaLaw_1752980399151.pdf",
    "Barry University": "509_2024_BarryU_1752980409414.pdf",
    "Baylor University": "509_2024_BaylorU_1752980409414.pdf",
    "Belmont University": "509_2024_Belmont_1752980409414.pdf",
    "Boston College": "509_2024_BostonCollege_1752980409414.pdf",
    "Boston University": "509_2024_BostonU_1752980409414.pdf",
    "Brooklyn Law School": "509_2024_BrooklynLaw_1752980409414.pdf",
    "Brigham Young University": "509_2024_BYU_1752980409415.pdf",
    "California Western School of Law": "509_2024_CalWestern_1752980409415.pdf",
    "Campbell University": "509_2024_CampbellU_1752980409415.pdf",
    "Capital University": "509_2024_CapitalU_1752980409415.pdf",
    "Case Western Reserve University": "509_2024_CaseWestern_1752980434713.pdf",
    "Catholic University of America": "509_2024_CatholicUofAmerica_1752980434713.pdf",
    "Chapman University": "509_2024_ChapmanU_1752980434713.pdf",
    "Charleston School of Law": "509_2024_CharlestonLaw_1752980434713.pdf",
    "University of Cincinnati": "509_2024_Cincinnati_1752980434713.pdf",
    "Cleveland State University": "509_2024_ClevelandState_1752980434713.pdf",
    "University of Colorado": "509_2024_Colorado_1752980434714.pdf",
    "Columbia University": "509_2024_Columbia_1752980434714.pdf",
    "Western Michigan University": "509_2024_Cooley_1752980434714.pdf",
    "Cooley Law School": "509_2024_Cooley_1752980434714.pdf",
    "Cornell University": "509_2024_Cornell_1752980434714.pdf",
    "Creighton University": "509_2024_Creighton_1752980434714.pdf",
    "City University of New York (CUNY)": "509_2024_CUNY_1752980434714.pdf",
    "University of Dayton": "509_2024_DaytonU_1752980434714.pdf",
    "DePaul University": "509_2024_DePaul_1752980434714.pdf",
    "University of Denver": "509_2024_Denver_1752980434714.pdf",
    "University of Detroit Mercy": "509_2024_DetroitMercy_1752980472412.pdf",
    "Drake University": "509_2024_DrakeU_1752980472412.pdf",
    "Drexel University": "509_2024_DrexelU_1752980472412.pdf",
    "Duke University": "509_2024_Duke_1752980472412.pdf",
    "Duquesne University": "509_2024_Duquesne_1752980472413.pdf",
    "Elon University": "509_2024_Elon_1752980472413.pdf",
    "Emory University": "509_2024_Emory_1752980472413.pdf",
    "Faulkner University": "509_2024_FaulknerU_1752980472413.pdf",
    "Florida A&M University": "509_2024_FloridaA&M_1752980472414.pdf",
    "Florida International University": "509_2024_FIU_1752980472413.pdf",
    "Florida State University": "509_2024_FloridaState_1752980472414.pdf",
    "University of Florida": "509_2024_Florida_1752980472414.pdf",
    "Fordham University": "509_2024_Fordham_1752980472414.pdf",
    "George Mason University": "509_2024_GeorgeMason_1752980472414.pdf",
    "Georgetown University": "509_2024_Georgetown_1752980472414.pdf",
    "George Washington University": "509_2024_GeorgeWashington_1752980472414.pdf",
    "University of Georgia": "509_2024_Georgia_1752980472414.pdf",
    "Georgia State University": "509_2024_GeorgiaState_1752980524091.pdf",
    "Gonzaga University": "509_2024_Gonzaga_1752980524092.pdf",
    "Harvard University": "509_2024_Harvard_1752980524092.pdf",
    "University of Hawaii, Manoa": "509_2024_Hawaii_1752980524092.pdf",
    "Hofstra University": "509_2024_Hofstra_1752980524092.pdf",
    "University of Houston": "509_2024_Houston_1752980524092.pdf",
    "Howard University": "509_2024_Howard_1752980524092.pdf",
    "University of Idaho": "509_2024_Idaho_1752980524092.pdf",
    "University of Illinois, Chicago": "509_2024_IllinoisChicago_1752980524092.pdf",
    "Illinois Institute of Technology": "509_2024_IllinoisTechChicagoKent_1752980434715.pdf",
    "University of Illinois, Urbana-Champaign": "509_2024_IllinoisUrbanaChampaign_1752980524093.pdf",
    "Indiana University, Bloomington": "509_2024_IndianaBloomington_1752980524093.pdf",
    "Indiana University, Indianapolis": "509_2024_IndianaIndianapolis_1752980524093.pdf",
    "Inter American University of Puerto Rico": "509_2024_InterAmerican_1752980524093.pdf",
    "University of Iowa": "509_2024_Iowa_1752980524093.pdf",
    "Jacksonville University": "509_2024_JacksonvilleU_1752980524093.pdf",
    "Atlanta's John Marshall Law School": "509_2024_JohnMarshallLaw_1752980399152.pdf",
    "University of Kansas": "509_2024_Kansas_1752980524093.pdf",
    "University of Kentucky": "509_2024_Kentucky_1752980524093.pdf",
    "Lewis & Clark Law School": "509_2024_Lewis&Clark_1752980524093.pdf",
    "Liberty University": "509_2024_Liberty_1752980535444.pdf",
    "Lincoln Memorial University": "509_2024_LincolnMemorialU_1752980535444.pdf",
    "University of Louisville": "509_2024_Louisville_1752980535444.pdf",
    "Louisiana State University": "509_2024_LSU_1752980535445.pdf",
    "Loyola University Chicago": "509_2024_LoyolaChicago_1752980535444.pdf",
    "Loyola Marymount University": "509_2024_LoyolaMarymount_1752980535445.pdf",
    "Loyola University New Orleans": "509_2024_LoyolaUNewOrleans_1752980535445.pdf",
    "University of Maine": "509_2024_Maine_1752980535445.pdf",
    "Marquette University": "509_2024_Marquette_1752980535445.pdf",
    "University of Maryland": "509_2024_Maryland_1752980535446.pdf",
    "University of Massachusetts, Dartmouth": "509_2024_UMassDartmouth_1752980535447.pdf",
    "University of Memphis": "509_2024_Memphis_1752980535446.pdf",
    "Mercer University": "509_2024_MercerU_1752980535446.pdf",
    "University of Miami": "509_2024_UMiami_1752980535447.pdf",
    "University of Michigan": "509_2024_Michigan_1752980535446.pdf",
    "Michigan State University": "509_2024_MichiganState_1752980535447.pdf",
    "University of Minnesota": "509_2024_Minnesota_1752980350334.pdf",
    "Mississippi College": "509_2024_MississippiCollege_1752980350334.pdf",
    "University of Missouri": "509_2024_Missouri_1752980350334.pdf",
    "University of Missouri, Kansas City": "509_2024_MissouriKC_1752980350334.pdf",
    "Mitchell Hamline School of Law": "509_2024_MitchellHamline_1752980350335.pdf",
    "University of Montana": "509_2024_Montana_1752980350335.pdf",
    "University of Nebraska": "509_2024_Nebraska_1752980350335.pdf",
    "New England Law, Boston": "509_2024_NewEnglandLawBoston_1752980350335.pdf",
    "University of New Hampshire": "509_2024_NewHampshire_1752980350335.pdf",
    "New York Law School": "509_2024_NewYorkLawSchool_1752980350335.pdf",
    "New York University": "509_2024_NYU_1752980350336.pdf",
    "University of New Mexico": "509_2024_NewMexico_1752980350335.pdf",
    "University of North Carolina": "509_2024_UNC_1752980350336.pdf",
    "North Carolina Central University": "509_2024_NorthCarolinaCentralU_1752980350335.pdf",
    "University of North Dakota": "509_2024_NorthDakota_1752980350335.pdf",
    "Northeastern University": "509_2024_Northeastern_1752980360699.pdf",
    "Northern Illinois University": "509_2024_NorthernIllinois_1752980360699.pdf",
    "Northern Kentucky University": "509_2024_NorthernKentucky_1752980360700.pdf",
    "University of North Texas at Dallas": "509_2024_NorthTexasDallas_1752980350336.pdf",
    "Northwestern University": "509_2024_Northwestern_1752980360700.pdf",
    "University of Notre Dame": "509_2024_NotreDame_1752980360700.pdf",
    "Nova Southeastern University": "509_2024_NovaSoutheastern_1752980360700.pdf",
    "University of Mississippi": "509_2024_OleMiss_1752980350336.pdf",
    "University of Nevada, Las Vegas": "509_2024_UNLV_1752980350336.pdf",
    "University of Connecticut": "509_2024_UConn_1752980434715.pdf",
    "University of Chicago": "509_2024_UChicago_1752980434715.pdf",
    "Ohio Northern University": "509_2024_OhioNorthern_1752980360700.pdf",
    "Ohio State University": "509_2024_OhioState_1752980380417.pdf",
    "University of Oklahoma": "509_2024_Oklahoma_1752980360700.pdf",
    "Oklahoma City University": "509_2024_OklahomaCityU_1752980360700.pdf",
    "University of Oregon": "509_2024_Oregon_1752980360700.pdf",
    "Pace University": "509_2024_PaceU_1752980360701.pdf",
    "University of the Pacific": "509_2024_UofthePacific_1752980360701.pdf",
    "Penn State University": "509_2024_PennState_1752980360701.pdf",
    "University of Pennsylvania": "509_2024_UPenn_1752980360701.pdf",
    "Pepperdine University": "509_2024_Pepperdine_1752980360701.pdf",
    "University of Pittsburgh": "509_2024_Pittsburgh_1752980360701.pdf",
    "University of Puerto Rico": "509_2024_UofPuertoRico_1752980370284.pdf",
    "Quinnipiac University": "509_2024_Quinnipiac_1752980370282.pdf",
    "Regent University": "509_2024_RegentU_1752980370283.pdf",
    "University of Richmond": "509_2024_URichmond_1752980370284.pdf",
    "Roger Williams University": "509_2024_RogerWilliansU_1752980370283.pdf",
    "Rutgers University": "509_2024_Rutgers_1752980370283.pdf",
    "Saint Louis University": "509_2024_SaintLouisU_1752980370283.pdf",
    "Samford University": "509_2024_Samford_1752980370283.pdf",
    "University of San Diego": "509_2024_USanDiego_1752980370284.pdf",
    "Santa Clara University": "509_2024_SantaClara_1752980370283.pdf",
    "Seattle University": "509_2024_SeattleU_1752980370283.pdf",
    "Seton Hall University": "509_2024_SetonHall_1752980370284.pdf",
    "University of South Carolina": "509_2024_SouthCarolina_1752980370284.pdf",
    "University of South Dakota": "509_2024_USouthDakota_1752980380420.pdf",
    "Southern Illinois University": "509_2024_SouthernIllinois_1752980380417.pdf",
    "Southern Methodist University": "509_2024_SMU_1752980380417.pdf",
    "Southern University": "509_2024_SouthernU_1752980380418.pdf",
    "Southwestern Law School": "509_2024_SouthwesternLaw_1752980380418.pdf",
    "Stanford University": "509_2024_Stanford_1752980380418.pdf",
    "St. John's University": "509_2024_StJohns_1752980370284.pdf",
    "St. Mary's University": "509_2024_StMary's_1752980370284.pdf",
    "University of St. Thomas": "509_2024_UStThomasMinnesota_1752980370284.pdf",
    "Stetson University": "509_2024_StetsonU_1752980380418.pdf",
    "Suffolk University": "509_2024_SuffolkU_1752980380419.pdf",
    "Syracuse University": "509_2024_SyracuseU_1752980380419.pdf",
    "Temple University": "509_2024_TempleU_1752980380419.pdf",
    "University of Tennessee": "509_2024_Tennessee_1752980380419.pdf",
    "Texas A&M University": "509_2024_TexasA&M_1752980380419.pdf",
    "Texas Southern University": "509_2024_TexasSouthern_1752980380419.pdf",
    "Texas Tech University": "509_2024_TexasTech_1752980380419.pdf",
    "University of Texas at Austin": "509_2024_Texas_1752980380419.pdf",
    "University of Texas, Austin": "509_2024_Texas_1752980380419.pdf",
    "Texas Wesleyan University": "509_2024_TexasWesleyan_1752980380417.pdf",
    "University of Toledo": "509_2024_Toledo_1752980390048.pdf",
    "Touro University": "509_2024_TouroU_1752980390048.pdf",
    "Tulane University": "509_2024_Tulane_1752980390048.pdf",
    "University of Tulsa": "509_2024_Tulsa_1752980390049.pdf",
    "University of Utah": "509_2024_Utah_1752980390049.pdf",
    "University of California, Berkeley": "509_2024_UCBerkeley_1752980409415.pdf",
    "University of California, Davis": "509_2024_UCDavis_1752980409415.pdf",
    "University of California, Irvine": "509_2024_UCIrvine_1752980409416.pdf",
    "University of California, Los Angeles": "509_2024_UCLA_1752980409416.pdf",
    "University of California, San Francisco": "509_2024_UCSanFranciso_1752980409416.pdf",
    "University of the District of Columbia": "509_2024_UDistictofColumbia_1752980472414.pdf",
    "University of Baltimore": "509_2024_UBaltimore_1752980409415.pdf",
    "University at Buffalo": "509_2024_UBuffalo_1752980409415.pdf",
    "University of Southern California": "509_2024_USC_1752980380419.pdf",
    "University of San Francisco": "509_2024_USanFrancisco_1752980370284.pdf",
    "Yeshiva University": "509_2024_YeshivaU_1752980409416.pdf",
    "Penn State Dickinson Law": "509_2024_PennStateDickinson_1752980360701.pdf",
    "Pontifical Catholic University of Puerto Rico": "509_2024_PontificalCatholicU_1752980360701.pdf",
    "South Texas College of Law Houston": "509_2024_SouthTexasCollege_1752980380418.pdf",
    "St. Thomas University": "509_2024_SaintThomasUMiami_1752980370283.pdf",
    "St. Thomas University (Miami)": "509_2024_SaintThomasUMiami_1752980370283.pdf",
    "Western State College of Law at Westcliff University": "509_2024_WesternStateWestcliff_1752980390050.pdf",
    "Westcliff University": "509_2024_WesternStateWestcliff_1752980390050.pdf",
    "Widener University Commonwealth Law School": "509_2024_WidenerCommonwealth_1752980399152.pdf",
    "Valparaiso University": "509_2024_Valparaiso_1752980380417.pdf",
    "Vanderbilt University": "509_2024_Vanderbilt_1752980390049.pdf",
    "Vermont Law School": "509_2024_Vermont_1752980390049.pdf",
    "Villanova University": "509_2024_Villanova_1752980390049.pdf",
    "University of Virginia": "509_2024_UVirginia_1752980390049.pdf",
    "Wake Forest University": "509_2024_WakeForest_1752980390049.pdf",
    "Washburn University": "509_2024_WashburnU_1752980390049.pdf",
    "University of Washington": "509_2024_UWashington_1752980390049.pdf",
    "Washington and Lee University": "509_2024_Washington&Lee_1752980390050.pdf",
    "Washington University in St. Louis": "509_2024_WashUStLouis_1752980390050.pdf",
    "Washington University (St. Louis)": "509_2024_WashUStLouis_1752980390050.pdf",
    "Wayne State University": "509_2024_WayneStateU_1752980390050.pdf",
    "West Virginia University": "509_2024_WestVirginia_1752980390050.pdf",
    "Western New England University": "509_2024_WesternNewEngland_1752980390050.pdf",
    "Whittier Law School": "509_2024_Whittier_1752980380417.pdf",
    "Widener University": "509_2024_WidenerDelaware_1752980399152.pdf",
    "Widener University, Commonwealth": "509_2024_WidenerCommonwealth_1752980399152.pdf",
    "Widener University, Delaware": "509_2024_WidenerDelaware_1752980399152.pdf",
    "Willamette University": "509_2024_Willamette_1752980399152.pdf",
    "William & Mary": "509_2024_William&Mary_1752980399152.pdf",
    "University of Wisconsin": "509_2024_WisconsinMadison_1752980399152.pdf",
    "University of Wyoming": "509_2024_Wyoming_1752980399152.pdf",
    "Yale University": "509_2024_Yale_1752980399152.pdf"
  };
  return schoolPdfMappings[schoolName] || null;
}
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  const wss = new WebSocketServer({
    server: httpServer,
    path: "/ws"
  });
  const connectedClients = /* @__PURE__ */ new Set();
  wss.on("connection", (ws2, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`WebSocket client connected from: ${clientIp}`);
    connectedClients.add(ws2);
    ws2.send(JSON.stringify({
      id: Date.now().toString(),
      username: "System",
      message: "Welcome to Blueberry chat! \u{1F4DA}",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }));
    ws2.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log("WebSocket message received:", message.username, message.content?.substring(0, 50));
        if (containsOffensiveContent(message.content)) {
          ws2.send(JSON.stringify({
            type: "error",
            message: "Message contains inappropriate content and cannot be sent. Please keep the chat respectful."
          }));
          return;
        }
        const savedMessage = await storage.createGlobalChatMessage({
          username: message.username || "Anonymous",
          message: message.content,
          timestamp: /* @__PURE__ */ new Date()
        });
        const broadcastMessage = {
          id: savedMessage.id.toString(),
          username: savedMessage.username,
          message: savedMessage.message,
          timestamp: savedMessage.timestamp.toISOString()
        };
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(broadcastMessage));
          }
        });
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });
    ws2.on("close", () => {
      console.log(`WebSocket client disconnected from: ${clientIp}`);
      connectedClients.delete(ws2);
    });
    ws2.on("error", (error) => {
      console.error("WebSocket error:", error);
      connectedClients.delete(ws2);
    });
  });
  setInterval(() => {
    connectedClients.forEach((ws2) => {
      if (ws2.readyState === WebSocket.OPEN) {
        ws2.ping();
      } else {
        connectedClients.delete(ws2);
      }
    });
  }, 3e4);
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt for:", email);
      const user = await storage.getUserByEmail(email);
      console.log("User found:", !!user);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const bcrypt = await import("bcryptjs");
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (!user.emailVerified) {
        return res.status(403).json({
          message: "Please verify your email address before logging in",
          emailVerificationRequired: true,
          email: user.email
        });
      }
      req.session.userId = user.id;
      try {
        await storage.updateUserActivity(user.id);
      } catch (error) {
        console.error("Error updating user activity on login:", error);
      }
      const { passwordHash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });
  app2.get("/api/auth/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const { passwordHash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });
  app2.patch("/api/auth/profile", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const updateData = req.body;
      if (updateData.firstName && containsOffensiveContent(updateData.firstName)) {
        return res.status(400).json({ message: "First name contains inappropriate content" });
      }
      if (updateData.lastName && containsOffensiveContent(updateData.lastName)) {
        return res.status(400).json({ message: "Last name contains inappropriate content" });
      }
      const updatedUser = await storage.updateUserProfile(req.session.userId, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { passwordHash, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.patch("/api/auth/color-preferences", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const colorPreferences = req.body;
      const updatedUser = await storage.updateUserColorPreferences(req.session.userId, colorPreferences);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const { passwordHash, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update color preferences error:", error);
      res.status(500).json({ message: "Failed to update color preferences" });
    }
  });
  app2.get("/api/users/:userId/profile", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1e3);
      const isOnline = user.lastActivity ? new Date(user.lastActivity) > thirtyMinutesAgo : false;
      const publicProfile = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        lsatScore: user.lsatScore,
        gpa: user.gpa,
        softsTier: user.softsTier,
        workExperience: user.workExperience,
        city: user.city,
        state: user.state,
        schoolListPrivate: user.schoolListPrivate || false,
        isOnline,
        lastActivity: user.lastActivity,
        highestDegree: user.highestDegree
      };
      res.json(publicProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });
  app2.post("/api/auth/activity", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      await storage.updateUserActivity(req.session.userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating user activity:", error);
      res.status(500).json({ message: "Failed to update activity" });
    }
  });
  app2.patch("/api/users/:userId/profile", async (req, res) => {
    try {
      console.log("Profile update request - Session userId:", req.session.userId, "Param userId:", req.params.userId);
      console.log("Profile update data:", req.body);
      if (!req.session.userId) {
        console.log("No session userId found");
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = parseInt(req.params.userId);
      if (userId !== req.session.userId) {
        console.log("User ID mismatch:", userId, "vs", req.session.userId);
        return res.status(403).json({ message: "Forbidden" });
      }
      const updateData = req.body;
      console.log("Calling storage.updateUserProfile with:", userId, updateData);
      const updatedUser = await storage.updateUserProfile(userId, updateData);
      if (!updatedUser) {
        console.log("User not found in storage");
        return res.status(404).json({ message: "User not found" });
      }
      console.log("Profile update successful");
      const { passwordHash, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.get("/api/users/:id/username/can-change", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = parseInt(req.params.id);
      if (userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const canChange = await storage.canChangeUsername(userId);
      res.json({ canChange });
    } catch (error) {
      console.error("Can change username error:", error);
      res.status(500).json({ message: "Failed to check username change availability" });
    }
  });
  app2.post("/api/auth/check-username", async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({
          available: false,
          message: "Username is required"
        });
      }
      const validation = validateUsername(username);
      if (!validation.isValid) {
        return res.status(400).json({
          available: false,
          message: validation.reason
        });
      }
      const existingUser = await storage.getUserByUsername(username);
      const isAvailable = !existingUser;
      res.json({
        available: isAvailable,
        message: isAvailable ? "Username is available" : "Username is already taken"
      });
    } catch (error) {
      console.error("Check username error:", error);
      res.status(500).json({
        available: false,
        message: "Failed to check username availability"
      });
    }
  });
  app2.post("/api/users/:id/username", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userId = parseInt(req.params.id);
      if (userId !== req.session.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const { username } = req.body;
      const validation = validateUsername(username);
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.reason });
      }
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      const updatedUser = await storage.setUsername(userId, username);
      if (!updatedUser) {
        return res.status(400).json({ message: "Username unavailable or cannot be changed yet" });
      }
      const { passwordHash, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Set username error:", error);
      res.status(500).json({ message: "Failed to set username" });
    }
  });
  app2.get("/api/username/available/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const validation = validateUsername(username);
      if (!validation.isValid) {
        return res.json({
          available: false,
          reason: validation.reason
        });
      }
      const available = await storage.isUsernameAvailable(username);
      res.json({ available });
    } catch (error) {
      console.error("Username availability error:", error);
      res.status(500).json({ message: "Failed to check username availability" });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      console.log("Registration request body:", JSON.stringify(req.body, null, 2));
      const validationResult = registerUserSchema.safeParse(req.body);
      if (!validationResult.success) {
        console.log("Validation errors:", validationResult.error.errors);
        const errors = validationResult.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
        return res.status(400).json({ message: `Validation failed: ${errors}` });
      }
      const { firstName, lastName, email, username, password, plan } = validationResult.data;
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      if (username) {
        const existingUsername = await storage.getUserByUsername(username);
        if (existingUsername) {
          return res.status(400).json({ message: "Username is already taken" });
        }
        const validation = validateUsername(username);
        if (!validation.isValid) {
          return res.status(400).json({ message: validation.reason });
        }
      }
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 12);
      let finalUsername = username;
      if (!finalUsername) {
        finalUsername = `${firstName.toLowerCase()}${Math.floor(Math.random() * 1e3)}`;
        if (containsOffensiveContent(finalUsername) || containsOffensiveContent(firstName)) {
          finalUsername = `user${Math.floor(Math.random() * 1e4)}`;
        }
      }
      const newUser = await storage.createUser({
        username: finalUsername,
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        phone: null,
        subscriptionTier: plan || "basic"
      });
      const verificationToken = crypto2.randomBytes(32).toString("hex");
      const expiresAt = /* @__PURE__ */ new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      await storage.createEmailVerificationToken({
        userId: newUser.id,
        token: verificationToken,
        expiresAt
      });
      const emailSent = await emailService.sendVerificationEmail(
        email,
        firstName,
        verificationToken
      );
      if (!emailSent) {
        console.warn("Failed to send verification email to:", email);
      }
      const { passwordHash, ...userWithoutPassword } = newUser;
      res.json({
        message: "Account created successfully! Please check your email to verify your account.",
        user: userWithoutPassword,
        emailSent
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.message?.includes("duplicate key") || error.message?.includes("already exists")) {
        return res.status(400).json({ message: "User already exists" });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  app2.post("/api/auth/verify-email", async (req, res) => {
    try {
      const validationResult = verifyEmailSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: "Invalid verification token" });
      }
      const { token } = validationResult.data;
      const { userId, isValid } = await storage.verifyEmailToken(token);
      if (!isValid || !userId) {
        return res.status(400).json({
          message: "Invalid or expired verification token. Please request a new verification email."
        });
      }
      const updatedUser = await storage.markEmailAsVerified(userId);
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to verify email" });
      }
      await emailService.sendWelcomeEmail(updatedUser.email, updatedUser.firstName || "User");
      req.session.userId = userId;
      const { passwordHash, ...userWithoutPassword } = updatedUser;
      res.json({
        message: "Email verified successfully! Welcome to Blueberry!",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ message: "Email verification failed" });
    }
  });
  app2.post("/api/auth/resend-verification", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.emailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }
      const verificationToken = crypto2.randomBytes(32).toString("hex");
      const expiresAt = /* @__PURE__ */ new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      await storage.createEmailVerificationToken({
        userId: user.id,
        token: verificationToken,
        expiresAt
      });
      const emailSent = await emailService.sendVerificationEmail(
        email,
        user.firstName || "User",
        verificationToken
      );
      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send verification email" });
      }
      res.json({ message: "Verification email sent successfully" });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ message: "Failed to resend verification email" });
    }
  });
  app2.get("/api/law-schools", async (req, res) => {
    try {
      const schools = await storage.getAllLawSchools();
      res.json(schools);
    } catch (error) {
      console.error("Error fetching law schools:", error);
      res.status(500).json({ message: "Failed to fetch law schools" });
    }
  });
  app2.get("/api/admissions-results/:schoolId", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.schoolId);
      if (!schoolId || isNaN(schoolId)) {
        return res.status(400).json({ message: "Invalid school ID" });
      }
      const results2 = await storage.getAdmissionResultsBySchool(schoolId);
      res.json(results2);
    } catch (error) {
      console.error("Error fetching admission results:", error);
      res.status(500).json({ message: "Failed to fetch admission results" });
    }
  });
  app2.get("/api/509-reports/mapping/:schoolName", async (req, res) => {
    try {
      const { schoolName } = req.params;
      const pdfFileName = getSchoolPdfMapping(schoolName);
      if (!pdfFileName) {
        return res.status(404).json({ message: "PDF not found for this school" });
      }
      res.json({ pdfFileName });
    } catch (error) {
      console.error("Error getting PDF mapping:", error);
      res.status(500).json({ message: "Failed to get PDF mapping" });
    }
  });
  app2.get("/api/509-reports/pdf/:year/:fileName", async (req, res) => {
    try {
      const { fileName } = req.params;
      const fs3 = await import("fs");
      const path4 = await import("path");
      const filePath = path4.join(process.cwd(), "attached_assets", fileName);
      if (!fs3.existsSync(filePath)) {
        return res.status(404).json({ message: "PDF file not found" });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      const fs_stream = (await import("fs")).createReadStream(filePath);
      fs_stream.pipe(res);
    } catch (error) {
      console.error("Error serving PDF:", error);
      res.status(500).json({ message: "Failed to serve PDF" });
    }
  });
  app2.get("/api/509-reports/:schoolId/download", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.schoolId);
      if (!schoolId || isNaN(schoolId)) {
        return res.status(400).json({ message: "Invalid school ID" });
      }
      const school = await storage.getLawSchool(schoolId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      const pdfFileName = getSchoolPdfMapping(school.name);
      if (!pdfFileName) {
        return res.status(404).json({ message: "509 Report not available for this school" });
      }
      const fs3 = await import("fs");
      const path4 = await import("path");
      const filePath = path4.join(process.cwd(), "attached_assets", pdfFileName);
      if (!fs3.existsSync(filePath)) {
        return res.status(404).json({ message: "PDF file not found" });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${school.name.replace(/[^a-zA-Z0-9]/g, "_")}_509_Report_2024.pdf"`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      const fs_stream = (await import("fs")).createReadStream(filePath);
      fs_stream.pipe(res);
    } catch (error) {
      console.error("Error downloading 509 report:", error);
      res.status(500).json({ message: "Failed to download 509 report" });
    }
  });
  app2.get("/api/user-schools", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.json([]);
      }
      const userSchools2 = await storage.getUserSchools(req.session.userId);
      res.json(userSchools2);
    } catch (error) {
      console.error("Error fetching user schools:", error);
      res.status(500).json({ message: "Failed to fetch user schools" });
    }
  });
  app2.post("/api/user-schools", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { schoolId, status = "not_started", priority = "medium", category = "target" } = req.body;
      const userSchoolData = {
        userId: req.session.userId,
        schoolId,
        status,
        priority,
        category,
        displayOrder: 0
      };
      const userSchool = await storage.addUserSchool(userSchoolData);
      res.json(userSchool);
    } catch (error) {
      console.error("Error adding user school:", error);
      res.status(500).json({ message: "Failed to add school to list" });
    }
  });
  app2.put("/api/user-schools/reorder", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { schoolOrders } = req.body;
      await storage.updateSchoolOrder(req.session.userId, schoolOrders);
      res.json({ message: "School order updated" });
    } catch (error) {
      console.error("Error reordering schools:", error);
      res.status(500).json({ message: "Failed to reorder schools" });
    }
  });
  app2.put("/api/user-schools/:id", async (req, res) => {
    try {
      console.log("UPDATE USER SCHOOL REQUEST:", {
        sessionId: req.sessionID,
        userId: req.session.userId,
        hasSession: !!req.session,
        sessionData: req.session,
        params: req.params,
        body: req.body
      });
      if (!req.session.userId) {
        console.log("AUTHENTICATION FAILED: No userId in session");
        return res.status(401).json({ message: "Unauthorized" });
      }
      const id = parseInt(req.params.id);
      const updates = req.body;
      const userSchool = await storage.updateUserSchool(id, updates);
      if (updates.decisionType && ["accepted", "waitlisted", "rejected", "interviewed"].includes(updates.decisionType)) {
        console.log(`\u{1F525} DECISION UPDATE DETECTED: ${updates.decisionType} for school ID ${userSchool?.schoolId}`);
        try {
          const user = await storage.getUser(req.session.userId);
          const school = await storage.getLawSchool(userSchool?.schoolId);
          console.log(`\u{1F4CA} Result creation data - User: ${user?.username}, School: ${school?.name}`);
          if (user && school && userSchool) {
            const resultData = {
              userId: user.id,
              schoolId: school.id,
              schoolName: school.name,
              username: user.username,
              lsat: user.lsatScore,
              gpa: user.gpa ? user.gpa.toString() : null,
              softs: user.softsTier || "T2",
              // Default to T2 if no softs tier set
              status: userSchool.status,
              decisionType: updates.decisionType,
              scholarshipAmount: updates.scholarshipAmount || userSchool.scholarshipAmount || null
            };
            console.log(`\u{1F4BE} Creating result:`, resultData);
            const newResult = await storage.addResult(resultData);
            console.log(`\u2705 Result created successfully:`, newResult);
            if (wss) {
              const message = JSON.stringify({
                type: "new_result",
                data: {
                  ...newResult,
                  ranking: school.usNewsRanking,
                  city: user.city,
                  state: user.state
                }
              });
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(message);
                }
              });
            }
          }
        } catch (resultError) {
          console.error("\u274C FAILED to add result to feed:", resultError);
        }
      } else {
        console.log(`\u23ED\uFE0F No decision update - decisionType: ${updates.decisionType}, status: ${updates.status}`);
      }
      res.json(userSchool);
    } catch (error) {
      console.error("Error updating user school:", error);
      res.status(500).json({ message: "Failed to update school" });
    }
  });
  app2.delete("/api/user-schools/:id", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const id = parseInt(req.params.id);
      await storage.removeUserSchool(id);
      res.json({ message: "School removed from list" });
    } catch (error) {
      console.error("Error removing user school:", error);
      res.status(500).json({ message: "Failed to remove school from list" });
    }
  });
  app2.get("/api/dashboard/stats", async (req, res) => {
    if (!req.session.userId) {
      return res.json({
        totalSchools: 0,
        dreamSchools: 0,
        targetSchools: 0,
        safetySchools: 0,
        applicationStats: {
          started: 0,
          submitted: 0,
          interviewed: 0,
          accepted: 0,
          waitlisted: 0,
          rejected: 0
        },
        scholarshipTotal: 0
      });
    }
    try {
      const stats = await storage.getDashboardStats(req.session.userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });
  const v1NameMapping = {
    "Northwestern Pritzker School of Law": "Northwestern University",
    "Northwestern University": "Northwestern University",
    "Columbia Law School": "Columbia University",
    "Columbia University": "Columbia University",
    "Stanford Law School": "Stanford University",
    "Stanford University": "Stanford University",
    "Georgetown University Law Center": "Georgetown University",
    "Georgetown University": "Georgetown University",
    "Washington University School of Law": "Washington University",
    "Washington University": "Washington University",
    "NYU School of Law": "New York University",
    "New York University": "New York University",
    "Duke University School of Law": "Duke University",
    "Duke University": "Duke University",
    "University of Chicago": "University of Chicago",
    "Harvard Law School": "Harvard University",
    "Harvard University": "Harvard University",
    "Yale Law School": "Yale University",
    "Yale University": "Yale University",
    "University of Pennsylvania": "University of Pennsylvania",
    "University of Michigan": "University of Michigan",
    "University of Virginia": "University of Virginia",
    "Cornell University": "Cornell University",
    "Vanderbilt University": "Vanderbilt University",
    "University of California, Berkeley": "University of California, Berkeley",
    "University of California, Los Angeles": "University of California, Los Angeles",
    "University of Southern California": "University of Southern California",
    "Boston University": "Boston University",
    "Boston College": "Boston College",
    "University of Notre Dame": "University of Notre Dame",
    "Emory University": "Emory University",
    "University of Minnesota": "University of Minnesota",
    "University of North Carolina": "University of North Carolina",
    "University of Texas": "University of Texas",
    "University of Florida": "University of Florida",
    "Florida State University": "Florida State University",
    "George Washington University": "George Washington University",
    "Fordham University": "Fordham University",
    "University of Georgia": "University of Georgia",
    "University of Alabama": "University of Alabama",
    "University of Arizona": "University of Arizona",
    "Arizona State University": "Arizona State University",
    "University of Colorado": "University of Colorado",
    "University of Iowa": "University of Iowa",
    "University of Wisconsin": "University of Wisconsin",
    "Indiana University": "Indiana University",
    "Ohio State University": "Ohio State University",
    "University of Illinois": "University of Illinois, Urbana-Champaign",
    "University of Maryland": "University of Maryland",
    "University of Washington": "University of Washington"
  };
  app2.get("/api/results-v1", async (req, res) => {
    try {
      const results2 = await storage.getAllResults();
      const resultsWithV1Names = results2.map((result) => {
        const v1Name = v1NameMapping[result.schoolName] || result.schoolName;
        return {
          ...result,
          schoolName: v1Name
        };
      });
      console.log("V1 Results API called - returning", results2.length, "results with V1 names");
      res.json(resultsWithV1Names);
    } catch (error) {
      console.error("Error fetching V1 results:", error);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });
  app2.get("/api/results", async (req, res) => {
    try {
      const results2 = await storage.getAllResults();
      const resultsWithV2Names = results2.map((result) => {
        const v1Name = v1NameMapping[result.schoolName] || result.schoolName;
        if (v1Name === "University of Chicago") {
          return {
            ...result,
            schoolName: "University of Chicago"
          };
        }
        const v2Name = v1ToV2SchoolMapping[v1Name] || v1Name;
        return {
          ...result,
          schoolName: v2Name
        };
      });
      console.log("V2 Mapping example:", {
        original: results2[0]?.schoolName,
        v1: v1NameMapping[results2[0]?.schoolName || ""],
        v2: resultsWithV2Names[0]?.schoolName
      });
      res.json(resultsWithV2Names);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });
  app2.get("/api/results/school/:schoolId", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.schoolId);
      if (isNaN(schoolId)) {
        return res.status(400).json({ message: "Invalid school ID" });
      }
      const results2 = await storage.getResultsBySchool(schoolId);
      res.json(results2);
    } catch (error) {
      console.error("Error fetching school results:", error);
      res.status(500).json({ message: "Failed to fetch school results" });
    }
  });
  function getV2SchoolName(v1Name) {
    return v1ToV2SchoolMapping[v1Name] || v1Name;
  }
  app2.get("/api/results/daily-stats-v2", async (req, res) => {
    try {
      const dailyStats = await storage.getDailyResultsStats();
      const dailyStatsV2 = dailyStats.map((stat) => ({
        schoolId: stat.schoolId,
        schoolName: getV2SchoolName(stat.schoolName),
        usNewsRanking: stat.usNewsRanking,
        resultCount: stat.resultCount,
        originalV1Name: stat.schoolName
        // Keep original for reference
      }));
      console.log("Daily stats V2 conversion:", {
        originalCount: dailyStats.length,
        convertedCount: dailyStatsV2.length,
        example: dailyStatsV2[0]
      });
      res.json(dailyStatsV2);
    } catch (error) {
      console.error("Error fetching daily stats with V2 names:", error);
      res.status(500).json({ message: "Failed to fetch daily stats" });
    }
  });
  app2.get("/api/results/weekly-winners", async (req, res) => {
    try {
      const winners = await storage.getWeeklyWinners();
      res.json(winners);
    } catch (error) {
      console.error("Error fetching weekly winners:", error);
      res.status(500).json({ message: "Failed to fetch weekly winners" });
    }
  });
  let redditAccessToken = null;
  let tokenExpiresAt = 0;
  const getRedditAccessToken = async () => {
    try {
      if (redditAccessToken && Date.now() < tokenExpiresAt) {
        return redditAccessToken;
      }
      const authString = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString("base64");
      const tokenResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "BlueberryLawSchoolTracker/1.0.0"
        },
        body: "grant_type=client_credentials"
      });
      if (!tokenResponse.ok) {
        console.error("Reddit token request failed:", tokenResponse.status);
        return null;
      }
      const tokenData = await tokenResponse.json();
      redditAccessToken = tokenData.access_token;
      tokenExpiresAt = Date.now() + tokenData.expires_in * 1e3 - 6e4;
      console.log("Reddit token obtained successfully");
      return redditAccessToken;
    } catch (error) {
      console.error("Reddit token error:", error);
      return null;
    }
  };
  app2.get("/api/reddit/posts", async (req, res) => {
    try {
      const sort = req.query.sort || "hot";
      console.log("Reddit API called, sort:", sort);
      console.log("Environment check - CLIENT_ID:", process.env.REDDIT_CLIENT_ID ? "Present" : "Missing");
      console.log("Environment check - CLIENT_SECRET:", process.env.REDDIT_CLIENT_SECRET ? "Present" : "Missing");
      const accessToken = await getRedditAccessToken();
      console.log("Access token obtained:", accessToken ? "Yes" : "No");
      if (!accessToken) {
        console.log("No access token, returning empty array");
        return res.json([]);
      }
      const endpoint = sort === "new" ? "https://oauth.reddit.com/r/lawschooladmissions/new?limit=50" : "https://oauth.reddit.com/r/lawschooladmissions/hot?limit=50";
      const response = await fetch(endpoint, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "User-Agent": "BlueberryLawSchoolTracker/1.0.0"
        }
      });
      if (response.status === 403 || response.status === 401) {
        redditAccessToken = null;
        tokenExpiresAt = 0;
        return res.json([]);
      }
      if (!response.ok) {
        console.error(`Reddit API error: ${response.status} ${response.statusText}`);
        throw new Error(`Reddit API error: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Reddit API returned ${data.data.children.length} posts`);
      const posts = data.data.children.map((post) => ({
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        created_utc: post.data.created_utc,
        score: post.data.score,
        num_comments: post.data.num_comments,
        url: `https://reddit.com${post.data.permalink}`
      }));
      res.json(posts);
    } catch (error) {
      console.error("Reddit API error:", error);
      res.json([]);
    }
  });
  app2.get("/api/hidden-schools", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.json([]);
      }
      const hiddenSchools2 = await storage.getUserHiddenSchools(req.session.userId);
      res.json(hiddenSchools2);
    } catch (error) {
      console.error("Error fetching hidden schools:", error);
      res.status(500).json({ message: "Failed to fetch hidden schools" });
    }
  });
  app2.post("/api/hidden-schools", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { schoolId } = req.body;
      await storage.hideSchool(req.session.userId, schoolId);
      res.json({ message: "School hidden successfully" });
    } catch (error) {
      console.error("Error hiding school:", error);
      res.status(500).json({ message: "Failed to hide school" });
    }
  });
  app2.delete("/api/hidden-schools/:schoolId", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const schoolId = parseInt(req.params.schoolId);
      await storage.unhideSchool(req.session.userId, schoolId);
      res.json({ message: "School unhidden successfully" });
    } catch (error) {
      console.error("Error unhiding school:", error);
      res.status(500).json({ message: "Failed to unhide school" });
    }
  });
  app2.get("/api/user-preferences/columns", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.json(["name", "usNewsRanking", "acceptanceRate", "lsat25th", "lsatMedian", "lsat75th", "gpa25th", "gpaMedian", "gpa75th", "tuitionNonresident", "medianSalary", "barPassageRate", "employmentRate", "bigLawRate", "federalClerkshipRate"]);
      }
      const columns = await storage.getUserColumnPreferences(req.session.userId);
      res.json(columns);
    } catch (error) {
      console.error("Error fetching column preferences:", error);
      res.status(500).json({ message: "Failed to fetch column preferences" });
    }
  });
  app2.post("/api/user-preferences/columns", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { columns } = req.body;
      await storage.setUserColumnPreferences(req.session.userId, columns);
      res.json({ message: "Column preferences saved" });
    } catch (error) {
      console.error("Error saving column preferences:", error);
      res.status(500).json({ message: "Failed to save column preferences" });
    }
  });
  app2.get("/api/user-preferences/column-colors", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.json({});
      }
      const colors = await storage.getUserColumnColors(req.session.userId);
      res.json(colors);
    } catch (error) {
      console.error("Error fetching column colors:", error);
      res.status(500).json({ message: "Failed to fetch column colors" });
    }
  });
  app2.post("/api/user-preferences/column-colors", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const { colors } = req.body;
      await storage.setUserColumnColors(req.session.userId, colors);
      res.json({ message: "Column colors saved" });
    } catch (error) {
      console.error("Error saving column colors:", error);
      res.status(500).json({ message: "Failed to save column colors" });
    }
  });
  app2.get("/api/auth/biometric/options", async (req, res) => {
    try {
      const options = await generateAuthenticationOptions({
        rpID,
        allowCredentials: [],
        // Allow any registered credential
        userVerification: "required"
      });
      req.session.challenge = options.challenge;
      res.json(options);
    } catch (error) {
      console.error("Error generating biometric options:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate authentication options",
        error: error.message
      });
    }
  });
  app2.post("/api/auth/biometric/verify", async (req, res) => {
    try {
      const { id, rawId, response } = req.body;
      const expectedChallenge = req.session.challenge;
      if (!expectedChallenge) {
        return res.status(400).json({
          success: false,
          message: "No challenge found in session"
        });
      }
      const credential = await storage.getWebauthnCredentialById(id);
      if (!credential) {
        return res.status(400).json({
          success: false,
          message: "Credential not found"
        });
      }
      const verification = await verifyAuthenticationResponse({
        response: {
          id,
          rawId,
          response: {
            authenticatorData: response.authenticatorData,
            clientDataJSON: response.clientDataJSON,
            signature: response.signature,
            userHandle: response.userHandle
          },
          type: "public-key"
        },
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: {
          credentialID: credential.credentialID,
          credentialPublicKey: new Uint8Array(Buffer.from(credential.credentialPublicKey, "base64")),
          counter: credential.counter
        }
      });
      if (verification.verified) {
        await storage.updateWebauthnCredentialCounter(credential.id, verification.authenticationInfo.newCounter);
        const user = await storage.getUserById(credential.userId);
        if (user) {
          req.session.userId = user.id;
          req.session.isAuthenticated = true;
        }
        delete req.session.challenge;
        res.json({
          success: true,
          message: "Biometric authentication successful"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Biometric authentication failed"
        });
      }
    } catch (error) {
      console.error("Error verifying biometric authentication:", error);
      res.status(500).json({
        success: false,
        message: "Failed to verify authentication",
        error: error.message
      });
    }
  });
  app2.get("/api/auth/biometric/register-options", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Must be logged in to register biometrics" });
      }
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const existingCredentials = await storage.getUserWebauthnCredentials(user.id);
      const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: user.id.toString(),
        userName: user.email,
        userDisplayName: user.username || user.firstName || user.email,
        attestationType: "none",
        excludeCredentials: existingCredentials.map((cred) => ({
          id: cred.credentialID,
          type: "public-key"
        })),
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          residentKey: "preferred"
        }
      });
      req.session.challenge = options.challenge;
      res.json(options);
    } catch (error) {
      console.error("Error generating registration options:", error);
      res.status(500).json({
        success: false,
        message: "Failed to generate registration options",
        error: error.message
      });
    }
  });
  app2.post("/api/auth/biometric/register", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Must be logged in to register biometrics" });
      }
      const { id, rawId, response, type } = req.body;
      const expectedChallenge = req.session.challenge;
      if (!expectedChallenge) {
        return res.status(400).json({
          success: false,
          message: "No challenge found in session"
        });
      }
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const verification = await verifyRegistrationResponse({
        response: {
          id,
          rawId,
          response: {
            attestationObject: response.attestationObject,
            clientDataJSON: response.clientDataJSON
          },
          type
        },
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID
      });
      if (verification.verified && verification.registrationInfo) {
        const { credentialID, credentialPublicKey, counter, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;
        await storage.createWebauthnCredential({
          userId: user.id,
          credentialID: Buffer.from(credentialID).toString("base64"),
          credentialPublicKey: Buffer.from(credentialPublicKey).toString("base64"),
          counter,
          credentialDeviceType,
          credentialBackedUp,
          transports: response.transports ? response.transports.join(",") : null
        });
        delete req.session.challenge;
        res.json({
          success: true,
          message: "Biometric credential registered successfully"
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Registration verification failed"
        });
      }
    } catch (error) {
      console.error("Error registering biometric credential:", error);
      res.status(500).json({
        success: false,
        message: "Failed to register credential",
        error: error.message
      });
    }
  });
  app2.get("/api/users/search", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { q } = req.query;
    if (!q || typeof q !== "string") {
      return res.status(400).json({ message: "Search query required" });
    }
    try {
      const users2 = await storage.searchUsers(q, req.session.userId);
      const sanitizedUsers = users2.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        lsatScore: user.lsatScore,
        gpa: user.gpa,
        softsTier: user.softsTier,
        workExperience: user.workExperience,
        city: user.city,
        state: user.state,
        schoolListPrivate: user.schoolListPrivate
      }));
      res.json(sanitizedUsers);
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ message: "Failed to search users" });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
      const user = await storage.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const profile = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        lsatScore: user.lsatScore,
        gpa: user.gpa,
        softsTier: user.softsTier,
        workExperience: user.workExperience,
        city: user.city,
        state: user.state,
        schoolListPrivate: user.schoolListPrivate
      };
      res.json(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const storage_multer = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${crypto2.randomBytes(6).toString("hex")}-${file.originalname}`;
      cb(null, uniqueName);
    }
  });
  const upload = multer({
    storage: storage_multer,
    limits: {
      fileSize: 10 * 1024 * 1024
      // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp"
      ];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("File type not allowed. Please upload PDF, Word, text, or image files."));
      }
    }
  });
  app2.get("/api/uploads/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(uploadDir, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
      }
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error serving file:", error);
      res.status(500).json({ message: "Failed to serve file" });
    }
  });
  app2.post("/api/messages", upload.single("attachment"), async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const { recipientId, recipientUsername, subject, content } = req.body;
      if (!subject || !content) {
        return res.status(400).json({ message: "Subject and content are required" });
      }
      let actualRecipientId = recipientId;
      if (!recipientId && recipientUsername) {
        const recipient = await storage.getUserByUsername(recipientUsername);
        if (!recipient) {
          return res.status(404).json({ message: "User not found" });
        }
        actualRecipientId = recipient.id;
      }
      if (!actualRecipientId) {
        return res.status(400).json({ message: "Recipient is required" });
      }
      let attachmentData = {};
      if (req.file) {
        attachmentData = {
          attachmentUrl: `/api/uploads/${req.file.filename}`,
          attachmentName: req.file.originalname,
          attachmentSize: req.file.size,
          attachmentType: req.file.mimetype
        };
      }
      const message = await storage.createMessage({
        senderId: req.session.userId,
        recipientId: actualRecipientId,
        subject,
        content,
        ...attachmentData
      });
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.get("/api/messages", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const type = req.query.type;
      const messages2 = await storage.getUserMessages(req.session.userId, type);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });
  app2.get("/api/messages/unread-count", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const count = await storage.getUnreadMessageCount(req.session.userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread message count:", error);
      res.status(500).json({ message: "Failed to fetch unread message count" });
    }
  });
  app2.patch("/api/messages/:id/read", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    try {
      await storage.markMessageAsRead(messageId, req.session.userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  app2.delete("/api/messages/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    try {
      await storage.deleteMessage(messageId, req.session.userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ message: "Failed to delete message" });
    }
  });
  app2.get("/api/messages/received", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
      res.set("Pragma", "no-cache");
      res.set("Expires", "0");
      const messages2 = await storage.getUserMessages(req.session.userId, "received");
      const messagesWithUsers = await Promise.all(
        messages2.map(async (msg) => {
          const sender = await storage.getUser(msg.senderId);
          const recipient = await storage.getUser(msg.recipientId);
          return {
            ...msg,
            senderUsername: sender?.username || "Unknown",
            recipientUsername: recipient?.username || "Unknown"
          };
        })
      );
      console.log(`Fetched ${messagesWithUsers.length} received messages for user ${req.session.userId}`);
      res.json(messagesWithUsers);
    } catch (error) {
      console.error("Error fetching received messages:", error);
      res.status(500).json({ message: "Failed to fetch received messages" });
    }
  });
  app2.get("/api/messages/sent", async (req, res) => {
    console.log("SENT MESSAGES REQUEST:", {
      sessionUserId: req.session.userId,
      isAuthenticated: req.session.isAuthenticated,
      hasSession: !!req.session
    });
    if (!req.session.userId) {
      console.log("SENT MESSAGES: Authentication failed - no session userId");
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
      res.set("Pragma", "no-cache");
      res.set("Expires", "0");
      console.log(`SENT MESSAGES: About to call getUserMessages for user ${req.session.userId} with type 'sent'`);
      const messages2 = await storage.getUserMessages(req.session.userId, "sent");
      console.log(`SENT MESSAGES: Raw messages from database:`, messages2.length, messages2.map((m) => ({ id: m.id, subject: m.subject, senderId: m.senderId })));
      const messagesWithUsers = await Promise.all(
        messages2.map(async (msg) => {
          const sender = await storage.getUser(msg.senderId);
          const recipient = await storage.getUser(msg.recipientId);
          return {
            ...msg,
            senderUsername: sender?.username || "Unknown",
            recipientUsername: recipient?.username || "Unknown"
          };
        })
      );
      console.log(`SENT MESSAGES: Fetched ${messagesWithUsers.length} sent messages for user ${req.session.userId}`);
      console.log("SENT MESSAGES: Final response data:", messagesWithUsers.map((m) => ({ id: m.id, subject: m.subject, senderUsername: m.senderUsername, recipientUsername: m.recipientUsername })));
      res.json(messagesWithUsers);
    } catch (error) {
      console.error("SENT MESSAGES ERROR:", error);
      res.status(500).json({ message: "Failed to fetch sent messages" });
    }
  });
  app2.get("/api/users/search", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const searchTerm = req.query.searchTerm;
      if (!searchTerm || searchTerm.length < 2) {
        return res.json([]);
      }
      const users2 = await storage.searchUsers(searchTerm, req.session.userId);
      res.json(users2);
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ message: "Failed to search users" });
    }
  });
  app2.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  });
  function getSchoolIdMapping(schoolName) {
    const schoolNameToIdMappings = {
      // T14 Schools
      "Yale University": 1145,
      "Yale Law School": 1145,
      "Stanford University": 1110,
      "Stanford Law School": 1110,
      "Harvard University": 1017,
      "Harvard Law School": 1017,
      "Columbia University": 989,
      "Columbia Law School": 989,
      "University of Chicago": 1007,
      "Chicago Law School": 1007,
      "NYU School of Law": 1070,
      "New York University": 1070,
      "University of Pennsylvania": 1091,
      "Penn Law": 1091,
      "University of Virginia": 1136,
      "UVA Law": 1136,
      "University of Michigan": 1053,
      "Michigan Law": 1053,
      "Duke University": 999,
      "Duke Law School": 999,
      "Northwestern University": 1070,
      "Northwestern Pritzker School of Law": 1070,
      "Georgetown University": 1010,
      "Georgetown University Law Center": 1010,
      "Cornell University": 995,
      "Cornell Law School": 995,
      "University of California, Los Angeles": 978,
      "UCLA School of Law": 978,
      "University of California, Berkeley": 977,
      "Berkeley Law": 977,
      // Other major law schools - mapping common name variations
      "Boston University": 966,
      "BU School of Law": 966,
      "Boston College": 965,
      "Boston College Law School": 965,
      "George Washington University": 1011,
      "GWU Law": 1011,
      "University of Southern California": 1121,
      "USC Gould School of Law": 1121,
      "Vanderbilt University": 1135,
      "Vanderbilt Law School": 1135,
      "Washington University": 1140,
      "Washington University School of Law": 1140,
      "Emory University": 1001,
      "Emory Law School": 1001,
      "University of Notre Dame": 1076,
      "Notre Dame Law School": 1076,
      "University of Texas at Austin": 1127,
      "UT Austin Law": 1127,
      "University of Minnesota": 1056,
      "Minnesota Law School": 1056,
      // Public schools
      "University of Florida": 1003,
      "UF Levin College of Law": 1003,
      "University of Georgia": 1009,
      "UGA School of Law": 1009,
      "University of North Carolina": 1074,
      "UNC School of Law": 1074,
      "University of Alabama": 951,
      "Alabama Law": 951,
      "University of Arizona": 956,
      "Arizona Law": 956,
      // Additional common variations
      "University of Akron": 950,
      "Akron Law": 950,
      "Albany Law School": 952,
      "Albany Law": 952,
      "American University": 953,
      "American University Washington College of Law": 953,
      // T50 and regional schools - comprehensive mapping
      "Arizona State University": 955,
      "ASU Sandra Day O'Connor College of Law": 955,
      "University of Arkansas": 958,
      "Arkansas Law": 958,
      "Baylor University": 963,
      "Baylor Law": 963,
      "BC Law": 965,
      "BU Law": 966,
      "Brigham Young University": 967,
      "BYU Law": 967,
      "Brooklyn Law School": 968,
      "Brooklyn Law": 968,
      "University at Buffalo": 969,
      "Buffalo Law": 969,
      // California schools
      "University of California, Davis": 976,
      "UC Davis Law": 976,
      "University of California, Irvine": 979,
      "UC Irvine Law": 979,
      "California Western School of Law": 980,
      "Cal Western": 980,
      // More major law schools
      "Case Western Reserve University": 981,
      "Case Western": 981,
      "University of Cincinnati": 982,
      "Cincinnati Law": 982,
      "University of Colorado": 983,
      "Colorado Law": 983,
      "University of Connecticut": 984,
      "UConn Law": 984,
      "Creighton University": 996,
      "Creighton Law": 996,
      "DePaul University": 997,
      "DePaul Law": 997,
      "Fordham University": 1004,
      "Fordham Law": 1004,
      "George Mason University": 1005,
      "GMU Law": 1005,
      // More comprehensive mappings
      "University of Houston": 1018,
      "Houston Law": 1018,
      "Howard University": 1019,
      "Howard Law": 1019,
      "University of Illinois": 1020,
      "Illinois Law": 1020,
      "Indiana University": 1021,
      "Indiana Law": 1021,
      "University of Iowa": 1022,
      "Iowa Law": 1022,
      "University of Kansas": 1023,
      "Kansas Law": 1023,
      "University of Kentucky": 1024,
      "Kentucky Law": 1024,
      "Lewis & Clark Law School": 1032,
      "Lewis & Clark": 1032,
      // High-ID schools from recent query
      "Stanford Law": 1110,
      "Southern Methodist University": 1103,
      "SMU Law": 1103,
      "St. John's University": 1106,
      "St. Johns": 1106,
      "St. Mary's University": 1107,
      "St. Marys": 1107,
      "Temple University": 1114,
      "Temple Law": 1114,
      "University of Tennessee": 1115,
      "Tennessee Law": 1115,
      "Texas A&M University": 1116,
      "Texas A&M Law": 1116,
      "University of Texas, Austin": 1119,
      "UT Austin": 1119,
      "Texas Law": 1119,
      "Tulane University": 1123,
      "Tulane Law": 1123,
      "Villanova University": 1128,
      "Villanova Law": 1128,
      "Wake Forest University": 1130,
      "Wake Forest Law": 1130,
      "WashU Law": 1133,
      "University of Washington": 1134,
      "Washington Law": 1134,
      "William & Mary": 1142,
      "William and Mary": 1142,
      "W&M Law": 1142,
      "University of Wisconsin, Madison": 1143,
      "Wisconsin Law": 1143
    };
    if (schoolNameToIdMappings[schoolName]) {
      return schoolNameToIdMappings[schoolName];
    }
    const variations = [
      schoolName.replace(" Law School", "").replace(" School of Law", "").replace(" College of Law", ""),
      schoolName.replace("University of ", "").replace(", The", ""),
      schoolName.split(",")[0].trim(),
      schoolName.replace(" Law", "")
    ];
    for (const variation of variations) {
      if (schoolNameToIdMappings[variation]) {
        return schoolNameToIdMappings[variation];
      }
    }
    return null;
  }
  app2.get("/api/school-profile/name/:schoolName", async (req, res) => {
    try {
      const { schoolName } = req.params;
      const decodedSchoolName = decodeURIComponent(schoolName);
      const schoolId = getSchoolIdMapping(decodedSchoolName);
      if (!schoolId) {
        return res.status(404).json({ message: "School not found in mapping" });
      }
      const school = await storage.getLawSchool(schoolId);
      if (!school) {
        return res.status(404).json({ message: "School not found in database" });
      }
      res.json(school);
    } catch (error) {
      console.error("Get school by name error:", error);
      res.status(500).json({ message: "Failed to get school" });
    }
  });
  app2.get("/api/law-schools/:id", async (req, res) => {
    try {
      const schoolId = parseInt(req.params.id);
      if (isNaN(schoolId)) {
        return res.status(400).json({ message: "Invalid school ID" });
      }
      const school = await storage.getLawSchool(schoolId);
      if (!school) {
        return res.status(404).json({ message: "School not found" });
      }
      res.json(school);
    } catch (error) {
      console.error("Get school error:", error);
      res.status(500).json({ message: "Failed to get school" });
    }
  });
  app2.post("/api/messages/send", async (req, res) => {
    try {
      console.log("=== MESSAGE SEND ATTEMPT ===");
      console.log("Session userId:", req.session.userId);
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      console.log("Content-Type:", req.get("Content-Type"));
      console.log("Session data:", JSON.stringify(req.session, null, 2));
      if (!req.session.userId) {
        console.log("MESSAGE SEND FAILED: No user session - User needs to log in");
        return res.status(401).json({
          message: "Please log in to send messages",
          error: "AUTHENTICATION_REQUIRED"
        });
      }
      const { recipientId, content, subject } = req.body;
      console.log("MESSAGE SEND PARSED:", { recipientId, content: content?.substring(0, 50), subject });
      if (!recipientId || !content || !content.trim()) {
        console.log("MESSAGE SEND FAILED: Missing required fields");
        return res.status(400).json({ message: "Recipient ID and message content are required" });
      }
      console.log("MESSAGE SEND: Looking up users...");
      const sender = await storage.getUser(req.session.userId);
      const recipient = await storage.getUser(recipientId);
      console.log("MESSAGE SEND: Found users:", { sender: sender?.username, recipient: recipient?.username });
      if (!sender || !recipient) {
        console.log("MESSAGE SEND FAILED: User not found");
        return res.status(404).json({ message: "User not found" });
      }
      const messageSubject = subject || `Message from ${sender.username || sender.firstName || "User"}`;
      console.log("MESSAGE SEND: About to call storage.sendMessage...");
      const savedMessage = await storage.sendMessage(
        req.session.userId,
        recipientId,
        messageSubject,
        content.trim()
      );
      console.log("=== MESSAGE STORED SUCCESSFULLY ===");
      console.log("Saved message ID:", savedMessage.id);
      console.log("From:", sender.username, "(ID:", req.session.userId, ")");
      console.log("To:", recipient.username, "(ID:", recipientId, ")");
      console.log("Subject:", messageSubject);
      console.log("Content length:", content.trim().length);
      console.log("Timestamp:", savedMessage.createdAt);
      const messageUpdate = {
        type: "private_message",
        messageId: savedMessage.id,
        senderId: req.session.userId,
        recipientId,
        senderUsername: sender.username || sender.firstName || "Unknown",
        recipientUsername: recipient.username || recipient.firstName || "Unknown",
        subject: messageSubject,
        content: content.trim(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageUpdate));
        }
      });
      console.log("Private message broadcasted via WebSocket:", messageUpdate);
      if (recipient.username === "auto_responder" && recipient.email === "autobot@test.com") {
        setTimeout(async () => {
          try {
            const responses = [
              "Thanks for reaching out! I'm also applying to law school this cycle. Good luck with your applications! \u{1F4DA}",
              "Hey there! Always happy to connect with fellow law school applicants. What schools are you targeting? \u{1F3AF}",
              "Hi! Great to hear from you. I'm focusing on T14 schools but also have some safeties. How about you? \u{1F3EB}",
              "Hello! Thanks for the message. I'd love to chat about the application process. Are you taking the LSAT again? \u{1F4DD}",
              "Hey! Nice to meet you. I'm actually done with my applications for this cycle. Happy to share any advice! \u{1F4A1}",
              "Hi! I see you're also on the law school journey. What's your timeline looking like? \u23F0",
              "Thanks for connecting! I'm really excited about this cycle. Which practice areas interest you most? \u2696\uFE0F"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const autoResponse = await storage.sendMessage(
              recipient.id,
              sender.id,
              `Re: ${messageSubject}`,
              randomResponse
            );
            const autoResponseUpdate = {
              type: "private_message",
              messageId: autoResponse.id,
              senderId: recipient.id,
              recipientId: sender.id,
              senderUsername: recipient.username || "Auto Responder",
              recipientUsername: sender.username || sender.firstName || "Unknown",
              subject: `Re: ${messageSubject}`,
              content: randomResponse,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            };
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(autoResponseUpdate));
              }
            });
            console.log("TEST AUTO-RESPONSE sent from", recipient.username, "to", sender.username);
          } catch (error) {
            console.error("Error sending auto-response:", error);
          }
        }, 2e3);
      }
      res.json({
        message: "Message sent successfully",
        messageId: savedMessage.id
      });
    } catch (error) {
      console.error("Send message error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.get("/api/messages", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const type = req.query.type;
      const messages2 = await storage.getUserMessages(req.session.userId, type);
      const messagesWithUsers = await Promise.all(
        messages2.map(async (msg) => {
          const sender = await storage.getUser(msg.senderId);
          const recipient = await storage.getUser(msg.recipientId);
          return {
            ...msg,
            senderUsername: sender?.username || "Unknown",
            recipientUsername: recipient?.username || "Unknown"
          };
        })
      );
      res.json(messagesWithUsers);
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ message: "Failed to get messages" });
    }
  });
  app2.get("/api/messages/conversation/:userId", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const otherUserId = parseInt(req.params.userId);
      if (isNaN(otherUserId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      const conversation = await storage.getConversation(req.session.userId, otherUserId);
      res.json(conversation);
    } catch (error) {
      console.error("Get conversation error:", error);
      res.status(500).json({ message: "Failed to get conversation" });
    }
  });
  app2.patch("/api/messages/:messageId/read", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const messageId = parseInt(req.params.messageId);
      if (isNaN(messageId)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }
      const success = await storage.markMessageAsRead(messageId, req.session.userId);
      if (success) {
        res.json({ message: "Message marked as read" });
      } else {
        res.status(404).json({ message: "Message not found or unauthorized" });
      }
    } catch (error) {
      console.error("Mark message read error:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  app2.delete("/api/messages/:messageId", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const messageId = parseInt(req.params.messageId);
      if (isNaN(messageId)) {
        return res.status(400).json({ message: "Invalid message ID" });
      }
      const success = await storage.deleteMessage(messageId, req.session.userId);
      if (success) {
        res.json({ message: "Message deleted" });
      } else {
        res.status(404).json({ message: "Message not found or unauthorized" });
      }
    } catch (error) {
      console.error("Delete message error:", error);
      res.status(500).json({ message: "Failed to delete message" });
    }
  });
  app2.post("/api/messages/cleanup", async (req, res) => {
    try {
      const deletedCount = await storage.cleanupExpiredMessages();
      res.json({ deletedCount });
    } catch (error) {
      console.error("Message cleanup error:", error);
      res.status(500).json({ message: "Failed to cleanup messages" });
    }
  });
  app2.get("/api/users/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query || query.length < 2) {
        return res.json([]);
      }
      res.json([]);
    } catch (error) {
      console.error("User search error:", error);
      res.status(500).json({ message: "Failed to search users" });
    }
  });
  app2.get("/api/chat/messages", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 100;
      const messages2 = await storage.getGlobalChatMessages(limit);
      res.json(messages2);
    } catch (error) {
      console.error("Error fetching global chat messages:", error);
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });
  app2.post("/api/chat/messages", async (req, res) => {
    try {
      const { username, message } = req.body;
      if (!username || !message) {
        return res.status(400).json({ message: "Username and message are required" });
      }
      if (containsOffensiveContent(message)) {
        return res.status(400).json({
          message: "Message contains inappropriate content and cannot be sent. Please keep the chat respectful."
        });
      }
      const savedMessage = await storage.createGlobalChatMessage({
        username,
        message,
        timestamp: /* @__PURE__ */ new Date()
      });
      res.json(savedMessage);
    } catch (error) {
      console.error("Error creating global chat message:", error);
      res.status(500).json({ message: "Failed to create chat message" });
    }
  });
  app2.post("/api/lawschoolbot/chat", async (req, res) => {
    try {
      const { message, userId } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Message is required" });
      }
      let context = {};
      if (userId) {
        try {
          context.userProfile = await storage.getUser(userId);
          context.userSchools = await storage.getUserSchools(userId);
        } catch (error) {
          console.log("Could not fetch user context:", error);
        }
      }
      try {
        context.recentResults = await storage.getAllResults();
        if (context.recentResults) {
          context.recentResults = context.recentResults.slice(0, 10);
        }
      } catch (error) {
        console.log("Could not fetch recent results:", error);
      }
      const response = await blueberryAI.generateResponse(message, context);
      res.json({
        response,
        timestamp: /* @__PURE__ */ new Date(),
        context: {
          hasUserProfile: !!context.userProfile,
          userSchoolCount: context.userSchools?.length || 0,
          recentResultsCount: context.recentResults?.length || 0
        }
      });
    } catch (error) {
      console.error("Blueberry AI error:", error);
      res.status(500).json({ message: "Bot temporarily unavailable. Please try again." });
    }
  });
  app2.get("/api/lawschoolbot/status", async (req, res) => {
    try {
      const testResponse = await blueberryAI.generateResponse("Hello, are you working?");
      res.json({
        status: "operational",
        message: "Blueberry AI is ready to help with law school questions!",
        testResponse: testResponse ? "\u2713 Working" : "\u2717 Error"
      });
    } catch (error) {
      console.error("Bot status check failed:", error);
      res.status(500).json({
        status: "error",
        message: "Bot is currently unavailable",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  setInterval(() => {
    connectedClients.forEach((ws2) => {
      if (ws2.readyState === WebSocket.OPEN) {
        ws2.ping();
      } else {
        connectedClients.delete(ws2);
      }
    });
  }, 3e4);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import { config } from "dotenv";
config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
var PgStore = ConnectPgSimple(session);
var sql2 = neon(process.env.DATABASE_URL);
app.use(session({
  store: new PgStore({
    conString: process.env.DATABASE_URL,
    tableName: "user_sessions",
    // Optional: specify table name
    createTableIfMissing: true
    // Create table if it doesn't exist
  }),
  secret: process.env.SESSION_SECRET || "law-school-tracker-secret-key",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  // Reset expiry on each request to keep active users logged in
  cookie: {
    secure: process.env.NODE_ENV === "production",
    // Use HTTPS in production
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1e3,
    // 365 days - practically permanent for development
    sameSite: "lax"
    // Allow cross-site requests for mobile compatibility
  }
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
app.use("/attached_assets", express2.static("attached_assets"));
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (process.env.NODE_ENV === "production") {
    log("Running in production mode - serving static files");
    serveStatic(app);
  } else {
    log("Running in development mode - using Vite middleware");
    await setupVite(app, server);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const startServer = () => {
    server.listen({
      port,
      host: "0.0.0.0"
    }, () => {
      log(`serving on port ${port}`);
    });
  };
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      log(`Port ${port} is already in use`);
      process.exit(1);
    } else {
      log(`Server error: ${err.message}`);
      throw err;
    }
  });
  startServer();
})();
