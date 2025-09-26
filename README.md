# ✨ Magic Surveys
*Instant AI-Powered Survey Generation.*


**[🔗 View Live Demo](https://magic-surveys.vercel.app/)**

---

## 🚀 Core Idea

The core concept is speed and simplicity. A user enters a topic (e.g., "Customer satisfaction for a new SaaS product"), and the AI instantly generates relevant multiple-choice questions. The user can then customize the survey, generate a unique link, and start collecting responses immediately.

---

## 🌟 Key Features

- **AI Question Generation**: Uses the Google Gemini API to instantly create relevant MCQ questions from a simple topic.
- **Full Customization**: Users can easily edit AI-generated questions, modify options, add their own questions, or delete unwanted ones before publishing.
- **Secure Authentication**: JWT-based authentication and authorization system to protect user accounts and survey data.
- **Dashboard**: A central hub for users to view, manage, and access all their created surveys.
- **Unique Sharable Links**: Automatically generates a unique, public-facing link for each survey to easily share with respondents.
- **Simple Analytics**: A clean and intuitive statistics page for each survey, showing response counts and percentage breakdowns for each question.
- **Secure Deletion**: Users can safely delete their surveys, which also removes all associated response data.
- **Fully Responsive**: Modern and clean UI built with Tailwind CSS and Radix UI, ensuring a seamless experience on all devices.

---

## 🔧 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)  
- **AI**: [Google Gemini API](https://ai.google.dev/)  
- **Authentication**: [JWT](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)  
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🛠️ Getting Started: Local Setup

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)  
- [Git](https://git-scm.com/)  
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)  
- A [Google AI API Key](https://aistudio.google.com/app/apikey) for Gemini  

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/magic-surveys.git
   cd magic-surveys
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a file named `.env.local` in the root of the project and add the following variables. Replace the placeholder values with your actual credentials.

   ```env
   # .env.local

   # MongoDB Connection String
   MONGODB_URI="your_mongodb_connection_string"

   # JWT Secret Key (a long, random, and secret string)
   JWT_SECRET="your_super_secret_key_for_jsonwebtokens"

   # Google Gemini API Key
   GEMINI_API_KEY="your_google_ai_gemini_api_key"

   # Your application's public URL for generating share links
   # For local development:
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 📁 Project Structure

The project follows the standard Next.js App Router structure:

```
/
├── app/
│   ├── (app)/              # Group for authenticated routes (dashboard, create-survey)
│   │   ├── dashboard/
│   │   ├── create-survey/
│   │   └── layout.tsx      # Shared layout for authenticated pages
│   ├── api/                # All API backend routes
│   │   ├── auth/
│   │   ├── surveys/
│   │   └── ...
│   ├── survey/[uniqueLink]/ # Dynamic route for public survey-taking page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable React components (UI elements)
├── helpers/                # Helper functions (e.g., token decoding)
├── lib/                    # Library code (database connection)
├── models/                 # Mongoose schemas for User, Survey, Response
├── public/                 # Static assets
└── middleware.ts           # Handles authentication and route protection
```

---

## 🌐 API Endpoints

Here is an overview of the main API routes available in the application.

| Method   | Endpoint                          | Description                                | Protected |
|----------|----------------------------------|--------------------------------------------|-----------|
| `POST`   | `/api/auth/sign-up`              | Register a new user.                       | No        |
| `POST`   | `/api/auth/sign-in`              | Log in a user and issue a JWT.             | No        |
| `GET`    | `/api/auth/sign-out`             | Log out a user by clearing the JWT cookie. | Yes       |
| `POST`   | `/api/generate-survey`           | Generate survey questions with AI.         | Yes       |
| `GET`    | `/api/surveys`                   | Get all surveys for the logged-in user.    | Yes       |
| `POST`   | `/api/surveys`                   | Create and save a new survey.              | Yes       |
| `GET`    | `/api/surveys/[uniqueLink]`      | Get a specific survey for public viewing.  | No        |
| `GET`    | `/api/surveys/stats/[surveyId]`  | Get analytics for a specific survey.       | Yes       |
| `DELETE` | `/api/surveys/manage/[surveyId]` | Delete a survey and its responses.         | Yes       |
| `POST`   | `/api/responses`                 | Submit a new response to a survey.         | No        |

---

## 🚀 Deployment

This application is optimized for deployment on [Vercel](https://vercel.com/).

1. **Push your code to a Git repository** (e.g., GitHub, GitLab).  
2. **Import the project into Vercel.** Vercel will automatically detect that it is a Next.js project and configure the build settings.  
3. **Add Environment Variables.** In your Vercel project settings, navigate to `Settings > Environment Variables` and add the same variables from your `.env.local` file:
   - `MONGODB_URI`  
   - `JWT_SECRET`  
   - `GEMINI_API_KEY`  
   - `NEXT_PUBLIC_APP_URL` (**Important:** Update this to your production URL, e.g., `https://magic-surveys.vercel.app`)  

4. **Deploy.** Vercel will build and deploy your application. Any subsequent pushes to the main branch will trigger automatic redeployments.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the app, please feel free to open an issue or submit a pull request.

1. Fork the Project  
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)  
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)  
4. Push to the Branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request  

---

## 📜 License

This project is licensed under the MIT License.
