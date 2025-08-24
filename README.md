# Mini Plant Store - Frontend

## Overview
This is the frontend for the Mini Plant Store, built for the Urvann Software Development Intern Assignment. It provides a responsive UI for browsing plants, searching/filtering, and an admin panel for full CRUD operations with local image uploads.

## Features
1. **Plant Catalog**:
   - Displays a grid of plants with name, price, categories, availability, image, and description.
   - Clickable cards open a modal with detailed plant info.
2. **Search & Filter**:
   - Case-insensitive search by plant name or category keyword.
   - Multi-select category filter (dropdown populated from backend).
3. **Admin Panel**:
   - **Add Plant**: Form to add plants with name, price, multiple categories (CreatableSelect), availability, image upload, and description.
   - **List Plants**: Table view with images, edit, and delete buttons.
   - **Edit Plant**: Pre-filled form to update plant details, including new image uploads.
   - **Delete Plant**: Delete with confirmation prompt.
4. **Responsive UI**:
   - Mobile-friendly (single-column on small screens, multi-column on larger).
   - Tailwind CSS for consistent, modern styling.
5. **Loading & Error States**:
   - Skeleton loaders during API fetches.
   - Error messages with retry buttons for failed requests.
6. **Extra Features**:
   - Local image uploads (replaces URL input) with previews.
   - Real-time debounced search (300ms delay).
   - Toast notifications for CRUD feedback.
   - Modal for plant details.
   - Animation on catalog cards (fade-in-up).

## Tech Stack
- **Framework**: ReactJS (hooks, functional components).
- **Styling**: Tailwind CSS.
- **Libraries**:
  - axios (API calls).
  - react-hook-form + yup (form validation).
  - react-select/creatable-react-select (category selection).
  - react-toastify (notifications).
  - react-router-dom (routing).
  - lodash (debounce for search).
- **Routing**: / (Catalog), /admin (Admin Panel).

## Setup Instructions
### Prerequisites
- Node.js (v18+ recommended).
- Backend running at `http://localhost:5000` (see backend README).

### Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>/mini-plant-store.git
   cd mini-plant-store
   ```
2. Install dependencies:
   ```
   npm install
   ```

### Run Locally
```
npm start
```
- Opens at `http://localhost:3000`.
- Routes:
  - Catalog: `/`
  - Admin: `/admin`

### Build for Production
```
npm run build
```

## Deployment
- **Platform**: Vercel (free tier).
- **Deployed URL**: [https://your-frontend.vercel.app] (replace with your deployed URL).
- **Configuration**:
  - Push to GitHub, connect to Vercel.
  - No environment variables needed (update axios base URL to deployed backend in production, e.g., `https://your-backend.render.com`).
- **Notes**: Ensure backend is deployed and accessible for API calls.

## Usage
- **Catalog**:
  - Browse plants in a grid.
  - Use search bar for name/category (e.g., "Money Plant" or "Indoor").
  - Filter by categories via dropdown.
  - Click a plant card to view details in a modal.
- **Admin Panel**:
  - **Add**: Fill form, upload image (.jpg/.png), select/create categories, submit.
  - **List**: View plants with images, edit/delete buttons.
  - **Edit**: Update plant details, upload new image if needed.
  - **Delete**: Confirm deletion in prompt.
- **Notes**:
  - Images are uploaded to backend’s `/uploads` and served from `http://localhost:5000/Uploads/...`.
  - Ensure backend is running to avoid API errors.

## Code Quality
- **Modularity**: Reusable components (PlantCard, SearchBar, AddPlantForm, UpdatePlantForm, PlantList).
- **State Management**: React hooks (useState, useEffect, useCallback).
- **Validation**: Yup schemas for form inputs.
- **Error Handling**: Robust error messages, loading states, and retry logic.
- **Performance**: Debounced search, memoized callbacks, optimized API calls.

## Troubleshooting
- **Images Not Showing**: Verify backend serves images at `http://localhost:5000/Uploads/...`. Check console for 404 errors.
- **API Errors**: Ensure backend is running and MongoDB is connected.
- **Search Issues**: Confirm debounced search updates results (300ms delay).

For issues, contact [your-email].