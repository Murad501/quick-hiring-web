# Quick Hire - Frontend

A modern, responsive job portal dashboard built with React, Vite, and Tailwind CSS.

## Features

- **Dynamic Job Discovery**: Browse and search jobs by keyword, category, company, or type.
- **Category Explorer**: Live job counts for different sectors on the homepage.
- **Seamless Application**: Easy-to-use job application forms.
- **Admin Dashboard**:
  - **Overview**: High-level statistics.
  - **Job Management**: Create, edit, and delete job postings with dynamic sections.
  - **Application Management**: Track and update the status of incoming applications.
- **Security**: Protected admin routes and automatic session expiration handling.
- **Toast Notifications**: Interactive feedback for user actions.

## Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit & RTK Query
- **State Persistence**: Redux Persist
- **Icons**: React Icons (Lucide)
- **Forms**: React Hook Form
- **Routing**: React Router DOM

## Prerequisites

- Node.js (v18 or higher)
- Yarn or npm

## Getting Started

### 1. Installation

```bash
cd quick-hire-web
yarn install
```

### 2. Environment Variables

Create a `.env` file in the root directory and add:

```env
# URL of your running backend (without trailing slash)
VITE_API_URL=https://quick-hiring-server.vercel.app/api/v1
```

### 3. Running the App

**Development Mode:**

```bash
yarn dev
```

**Production Build:**

```bash
yarn build
yarn preview
```

## Dashboard Access

To access the admin features, use the following credentials (default):

- **Email**: `admin@quick-hiring.com`
- **Password**: `admin@quick-hiring.com`

---
