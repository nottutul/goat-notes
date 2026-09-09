
<div align="center">

# 🐐 GOAT-Notes

**A minimal, premium note-taking application powered by a context-aware AI Assistant.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-goat--notes--woad.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://goat-notes-woad.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

</div>

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 📝 **Clean Workspace** | Distraction-free interface with full dark mode support. |
| 🤖 **AI Assistant** | Context-aware AI powered by `gemini-3.1-flash-lite` to summarize, rephrase, and answer query streams. |
| 📂 **Note Navigation** | Dynamic sidebar to swiftly create, manage, swap, and organize notes. |
| 🔐 **Secure Auth** | SSR-backed session management via Supabase Auth. |

---

## 🛠️ Tech Stack

<details open>
<summary><b>Architecture & Tools</b></summary>

- **Core Framework:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **UI & Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **Database Layer:** [Supabase PostgreSQL](https://supabase.com/) via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Supabase Auth](https://supabase.com/docs/guides/auth)
- **AI Integrations:** [Vercel AI SDK](https://sdk.vercel.ai/docs), [Google Gemini API](https://ai.google.dev/)

</details>

---

## 🗄️ Database Architecture

### Prisma Schema

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

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ NOTE : owns
    USER {
        string id PK
        string email UK
        datetime createdAt
        datetime updatedAt
    }
    NOTE {
        string id PK
        string text
        string authorId FK
        datetime createdAt
        datetime updatedAt
    }

```

> **Relationship details:** Each **User** maps to a Supabase auth identity and can own multiple notes (`1:N`). Each **Note** belongs strictly to one author.

---

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js 18+ installed on your system.

### Installation & Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/nottutul/goat-notes.git](https://github.com/nottutul/goat-notes.git)

```


2. **Navigate to the directory:**
```bash
cd goat-notes

```


3. **Install dependencies:**
```bash
npm install

```


4. **Configure Environment Variables:**
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
SUPABASE_URL="[https://your-supabase-project.supabase.co](https://your-supabase-project.supabase.co)"
SUPABASE_PUBLISHABLE_KEY="your-supabase-publishable-key"
GEMINI_API_KEY="your-gemini-api-key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

```


5. **Push schema to Database:**
```bash
npx prisma db push

```


6. **Generate Prisma Client:**
```bash
npx prisma generate

```


7. **Run local development server:**
```bash
npm run dev

```



Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

