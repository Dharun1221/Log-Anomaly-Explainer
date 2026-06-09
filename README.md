# Log-Anomaly-Explainer

A full-stack log analysis app with a FastAPI backend and a React/Vite frontend.

## Live deployment setup

### Backend (Render)
1. Create a new Render Web Service from this repository.
2. Use the existing Render config in render.yaml.
3. Set the environment variables in the Render dashboard (do not commit secrets):
   - GEMINI_API_KEY=<your real Gemini key>
   - ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:5173
4. Render will start the API with the backend/Procfile and backend/requirements.txt.

### Frontend (Vercel)
1. Deploy the frontend folder as a Vercel app.
2. Set the environment variable in Vercel (do not commit it):
   - VITE_API_URL=https://your-render-backend-url
3. Use the included vercel.json for SPA routing.

### Local development
- Backend: cd backend && uvicorn main:app --reload --port 8000
- Frontend: cd frontend && npm install && npm run dev

The backend now uses the live API URL from VITE_API_URL and the CORS allowlist from ALLOWED_ORIGINS, so the app is ready to be hosted publicly once the environment variables are set.

