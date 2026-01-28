# SkillCraft
## A Skill Bartering Platform

SkillCraft is a skill-swapping platform where users can exchange knowledge. Find someone who has the skills you want to learn, and teach them something you know in return!

---

## Features

- **User Authentication** - Secure register and login with JWT-based auth
- **Profile Management** - Customize your profile with display name, bio, location, website, and avatar
- **Skill Profiles** - Add skills you have and skills you want to learn
- **Smart Matching** - Find users whose skills complement yours
- **Connection Requests** - Send and manage skill swap requests
- **Real-time Chat** - Communicate with your skill swap partners via Socket.io
- **Mutual Matching** - Prioritizes users who can both teach and learn from you

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get token |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/profile` | Update skills |
| GET | `/api/users/matches` | Find matching users |
| GET | `/api/users/:id` | Get user by ID |

### Connections
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/connections` | Send connection request |
| GET | `/api/connections/received` | Get pending requests |
| GET | `/api/connections/sent` | Get sent requests |
| GET | `/api/connections/active` | Get accepted connections |
| PUT | `/api/connections/:id` | Accept/reject request |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/WizardCarp85/SkillCraft.git
cd SkillCraft
```

2. Setup Backend
```bash
cd backend
npm install
```

3. Create `.env` file in backend folder
```
PORT=3002
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server
```bash
node server.js
```

5. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## Roadmap

- [ ] User reviews & ratings
- [ ] Skill verification badges
- [ ] Advanced search filters
- [ ] Notification system

---

## License

MIT