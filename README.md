# DevArt

A backend API for a learning management system built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **User Management**: Registration, authentication, and profile management
- **Course Management**: Create and manage courses with multiple videos
- **Video Lessons**: Track video completion and progress
- **Documentation**: Manage course documentation
- **Activity Tracking**: Monitor user activities and engagement
- **Enrollment System**: Handle course enrollments and lesson progress
- **Tag System**: Organize videos with tags

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- pnpm (v10.6.3 or higher)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Codeleb
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-jwt-secret-key
PORT=3000
```

4. Build the project:
```bash
pnpm build
```

## 🚀 Running the Application

### Development Mode
```bash
pnpm dev
```

### Production Mode
```bash
pnpm start
```

## 📁 Project Structure

```
Codeleb/
├── api/                    # API entry point
│   └── index.ts           # Express app configuration
├── controller/            # Request handlers
│   ├── Activity.controller.ts
│   ├── Auth.controller.ts
│   ├── CompleteVideo.controller.ts
│   ├── Docs.controller.ts
│   ├── IsNew.controller.ts
│   ├── User.controller.ts
│   └── Video.controller.ts
├── model/                 # Database models
│   ├── Activity.model.ts
│   ├── Course.model.ts
│   ├── Doc.model.ts
│   ├── Enrollment.model.ts
│   ├── LessonProgress.model.ts
│   ├── Tag.model.ts
│   ├── User.model.ts
│   ├── Video.model.ts
│   ├── VideoTag.model.ts
│   ├── builder/          # Model builders
│   └── Interface/        # TypeScript interfaces
├── routes/               # API routes
│   ├── Activity.route.ts
│   ├── Data.route.ts
│   ├── Docs.route.ts
│   ├── IsNew.route.ts
│   ├── Register.route.ts
│   └── Video.route.ts
├── utils/               # Utility functions
│   └── jwt.util.ts
├── db.ts               # Database configuration
├── package.json
├── tsconfig.json
└── vercel.json
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Profile
- `GET /api/profile` - Get user profile data

### Videos
- `GET /api/video` - Get videos
- `POST /api/video/complete` - Toggle video completion status

### Documentation
- `GET /api/docs` - Get course documentation

### Activity
- `GET /api/activity` - Get user activities

### New Content
- `GET /api/isNew` - Check for new content

### Quiz
- `GET /api/quiz/genres` - List quiz genres
- `GET /api/quiz/genres/:genreId` - Get a single genre
- `GET /api/quiz/genres/:genreId/questions` - Get randomized questions with options (no answers)
- `POST /api/quiz/attempts/start` - Start an attempt (body: `user_id`, `genre_id`)
- `POST /api/quiz/attempts/:attemptId/answer` - Save an answer (body: `question_id`, `option_id`)
- `POST /api/quiz/attempts/:attemptId/complete` - Finalize attempt and score it
- `GET /api/quiz/attempts/user/:userId` - List attempts for a user
- `GET /api/quiz/attempts/:attemptId` - Get a single attempt

## 🔒 Security

- JWT-based authentication
- bcrypt password hashing
- CORS enabled for specific origins
- PostgreSQL SSL connection
- Environment variable configuration

## 📦 Database Models

- **User**: User accounts and authentication
- **Course**: Course information
- **Video**: Video lessons
- **Doc**: Course documentation
- **Enrollment**: User course enrollments
- **LessonProgress**: Track user progress through lessons
- **Activity**: User activity logs
- **Tag**: Video categorization
- **VideoTag**: Many-to-many relationship between videos and tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Scripts

- `pnpm dev` - Run development server with hot reload
- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run production server
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Lint and auto-fix issues

## 👨‍💻 Author

Ali Al Najjar

## 📄 License

ISC

## 🌐 Frontend

This API is connected to the frontend application hosted at: `https://devart-learn.vercel.app`

---

**Note**: Make sure to configure all environment variables before running the application.
