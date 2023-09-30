import { relations, sql } from 'drizzle-orm'
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  url: text('url').unique().notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages),
}))

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
})

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey(),
  text: text('text').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  userId: integer('user_id').notNull(),
})

export const messagesRelations = relations(messages, ({ one }) => ({
  author: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}))
