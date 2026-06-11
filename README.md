# 🐐 GOAT-Notes

GOAT-Notes is a minimal, premium note-taking application featuring a context-aware AI Note Assistant.

🔗 **Live Link:** [goat-notes-woad.vercel.app](https://goat-notes-woad.vercel.app/)

---

## ✨ Features

- 📝 **Clean Workspace:** Distraction-free, dark-mode supported note editing.
- 🤖 **AI Assistant:** Context-aware assistant powered by Gemini (`gemini-3.1-flash-lite`) to summarize, rephrase, and answer questions.
- 📂 **Note List:** Sidebar navigation to quickly swap, create, or update notes.
- 🔐 **Secure Auth:** Powered by Supabase Auth (SSR server-side sessions).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, Radix UI, Shadcn
- **Database:** Supabase PostgreSQL via Prisma ORM
- **Authentication:** Supabase Auth
- **AI Integrations:** Vercel AI SDK, Google Gemini

---

## 🗄️ Database Model

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  notes     Note[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())
}

model Note {
  id        String   @id @default(uuid())
  text      String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt @default(now())
}
```

---

### Entity Relationship (ER) Representation

```
+------------------+                   +------------------+
|      USER        |                   |      NOTE        |
+------------------+                   +------------------+
| id (PK, UUID)    |<------------------| id (PK, UUID)    |
| email (Unique)   | 1               * | text (String)    |
| createdAt        |                   | authorId (FK)    |
| updatedAt        |                   | createdAt        |
+------------------+                   | updatedAt        |
                                       +------------------+
```

- Each **User** is identified by a unique ID mapping to their Supabase authenticated user ID. A user can own multiple notes.
- Each **Note** contains its text content, a foreign key referencing the owner/author (`authorId`), and audit timestamps.

## 🚀 Getting Started

1. **Clone & Install:**

   ```bash
   git clone https://github.com/nottutul/goat-notes.git
   cd goat-notes
   npm install
   ```

2. **Setup Env Variables (`.env.local`):**

   ```env
   DATABASE_URL="postgresql://..."
   SUPABASE_URL="https://..."
   SUPABASE_PUBLISHABLE_KEY="..."
   GEMINI_API_KEY="..."
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

3. **Database & Run:**
   ```bash
   npx prisma db push
   npx prisma generate
   npm run dev
   ```
