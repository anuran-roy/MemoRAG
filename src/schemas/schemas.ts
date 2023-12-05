import * as drizzlePg from "drizzle-orm/pg-core";

export const users = drizzlePg.pgTable(
    "users",
    {
        user_id: drizzlePg.serial("id").primaryKey(),
        email: drizzlePg.varchar("email", { length: 256 }),
        username: drizzlePg.varchar("username", { length: 256 }).unique(),
        password_hash: drizzlePg.varchar("password_hash", { length: 1024 }),
        login_method: drizzlePg.varchar("email", { length: 256 }),
        created_at: drizzlePg.timestamp("created_at").notNull().defaultNow(),
        verified: drizzlePg.boolean("verified").notNull().default(false),
    },
    (users) => ({
        emailIndex: drizzlePg.uniqueIndex("email_idx").on(users.email),
        userIndex: drizzlePg.uniqueIndex("user_idx").on(users.username),
    })
);

export const chatSession = drizzlePg.pgTable(
    "chat_session",
    {
        chat_session_id: drizzlePg.serial("id").primaryKey(),
        user_id: drizzlePg.integer("user_id").references(() => users.user_id),
        created_at: drizzlePg.timestamp("created_at").notNull().defaultNow(),
        updated_at: drizzlePg.timestamp("updated_at").notNull().defaultNow(),
        ended_at: drizzlePg.timestamp("ended_at"),
        ended: drizzlePg.boolean("ended").notNull().default(false),
    },
    (chatSession) => ({
        chatIndex: drizzlePg
            .uniqueIndex("chat_idx")
            .on(chatSession.chat_session_id),
    })
);

export const chatMessage = drizzlePg.pgTable("chat_message", {
    message_id: drizzlePg.serial("id").primaryKey(),
    chat_session_id: drizzlePg
        .integer("chat_session_id")
        .references(() => chatSession.chat_session_id),
    content: drizzlePg.text("content"),
    timestamp: drizzlePg.timestamp("timestamp").notNull().defaultNow(),
});
