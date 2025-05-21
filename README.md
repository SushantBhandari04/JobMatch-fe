# JobMatch Frontend (`fe`)

JobMatch is an AI-powered job matching platform that recommends jobs to users based on their profile, skills, and preferences. The frontend (`fe`) is built with Next.js and React, providing a modern, responsive user interface for job seekers.

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the Repository

```sh
git clone https://github.com/SushantBhandari04/JobMatch-fe.git
```

### 2. Environment Variables

Copy the example environment file and fill in your backend URL:

```sh
cp .env.example .env
```

**`.env` example:**
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```
- For local development, use your local backend URL.
- For production, set this to your deployed backend API URL.

### 3. Install Dependencies

```sh
npm install
# or
yarn install
```

### 4. Start the Frontend

```sh
npm run dev
# or
yarn dev
```


---

## 🧠 How the Frontend Uses AI

- **Profile Creation:** Users create detailed profiles including skills, experience, and preferences.
- **Job Recommendations:** When a user requests recommendations, the frontend sends their profile to the backend, which uses AI embeddings and vector search to find the best job matches.
- **Real-Time Updates:** As users update their profiles, recommendations are refreshed in real time.

---

## 🖥️ Main Features

- **Authentication:** Sign up, sign in, and JWT-based session management.
- **Profile Management:** Create and update a rich user profile.
- **Job Browsing:** Browse all available jobs with filters for type, experience, and remote options.
- **AI Recommendations:** Get personalized job matches powered by AI.
- **Responsive UI:** Built with Next.js, React, and shadcn/ui for a modern look and feel.

---

## 📚 API Usage

The frontend communicates with the backend via REST API endpoints.  
Set `NEXT_PUBLIC_BACKEND_URL` in your `.env` to point to your backend.

**Key endpoints:**
- `POST /signup` — Register a new user
- `POST /signin` — Login and receive JWT
- `POST /profile/create` — Create or update user profile (requires JWT)
- `GET /profile` — Get current user's profile (requires JWT)
- `GET /jobs` — List all jobs (with optional filters)
- `GET /jobs/match` — Get job recommendations for the current user (requires JWT)

All protected routes require the `Authorization` header with a valid JWT.

---

## 🏗️ Code Structure

```
fe/
├── app/                # Next.js app directory (pages, layouts, routes)
├── components/         # Shared UI components (buttons, forms, etc.)
├── contexts/           # React contexts (e.g., authentication)
├── hooks/              # Custom React hooks
├── styles/             # Global and component styles
├── public/             # Static assets
├── .env.example        # Example environment variables
├── README.md           # This file
└── ...
```

---

## ⚖️ Trade-offs & Assumptions

- **API Dependency:** The frontend expects the backend to be running and accessible at the URL specified in `NEXT_PUBLIC_BACKEND_URL`.
- **JWT Storage:** JWT tokens are stored in localStorage for simplicity; consider more secure storage for production.
- **CORS:** The backend must allow CORS for the frontend's domain.
- **Preview Deployments:** For Vercel preview deployments, ensure backend CORS allows dynamic preview URLs.

---

## 📝 Assumptions

- Users will provide accurate and detailed profile information for best recommendations.
- The backend is responsible for all AI, authentication, and data storage logic.
- The frontend is stateless except for authentication and UI state.

---
