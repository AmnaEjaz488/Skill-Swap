

# SkillSwap — A Peer-to-Peer Learning Platform

SkillSwap is a platform where users can exchange skills they’re good at (e.g., guitar, coding, cooking, Photoshop) and learn skills from others in return. It’s a barter-style learning community — no payments, just sharing knowledge.

---

## :bulb: Why SkillSwap Works
- **Real-world Challenge**: Provides access to affordable skill learning and community-driven support.
- **Data-driven**: Matches learners with skill providers using user data.
- **High Engagement**: Features user profiles, skills offered/wanted, bookings, and chat.

---

## :bricks: Tech Stack
### MERN + GraphQL
- **Frontend**: React
- **Backend**: Node.js + Express + GraphQL
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT

---

## :desktop_computer: Frontend Features
1. **Skill Board UI**:
   - Search and filter skills by category or availability.
2. **User Dashboard**:
   - View offered skills and scheduled sessions.
3. **Skill Profile Pages**:
   - Detailed skill pages with descriptions and availability.
4. **Responsive Design**:
   - Clean and user-friendly layout for all devices.

---

## :brain: Backend Features
1. **GraphQL Queries and Mutations**:
   - Add/Edit/Delete offered skills.
   - Browse and request sessions.
   - Update availability.
   - User authentication and profile management.
2. **JWT Authentication**:
   - Secure routes for booking sessions and managing skills.

---

## :closed_lock_with_key: Authentication
- **Register/Login**: Users can sign up or log in securely.
- **Protected Routes**: Only authenticated users can book sessions or manage skills.

---

## :rocket: Deployment

## https://skill-swap-01.onrender.com/ ## 

1. **Backend**:
   - Deployed on Render.
2. **Frontend**:
   - Deployed on  Render.
   
3. **CI/CD**:
   - GitHub Actions for linting and testing on push.

---

## :toolbox: Bonus Features
- **Chat or Messaging**:
   - Real-time communication using WebSockets.
- **Rating/Review System**:
   - Users can rate and review skill sharers.
- **Notification Emails**:
   - Session reminders and updates.

---

## :package: Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   REACT_APP_GRAPHQL_ENDPOINT=<your-backend-url>/graphql
   ```
4. Start the development server:
   ```bash
   npm start
   ```

---

## :test_tube: Testing
- Run backend tests:
  ```bash
  npm test
  ```
- Run frontend tests:
  ```bash
  npm test
  ```

---

## :link: Deployment

## https://skill-swa3.onrender.com/ ##

1. **Backend**:
   - Deploy on Render.
   - Set environment variables in Render's dashboard.
2. **Frontend**:
   - Deploy on Vercel or Render.
   - Set environment variables in the deployment settings.

---

## :memo: License
This project is licensed under the MIT License.

---

## :handshake: Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

##  Contact
For any questions or feedback, feel free to reach out via GitHub or LinkedIn.
