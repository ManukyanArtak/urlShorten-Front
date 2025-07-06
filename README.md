# Short URL Generator

A modern web application for creating and managing short URLs with user authentication and analytics.

## Features

- 🔐 **User Authentication**: Secure login and registration system
- 🔗 **URL Shortening**: Create short URLs from long ones
- 📊 **Analytics**: Track visit counts for each URL
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Built with Material-UI for a clean interface
- 🔒 **Route Protection**: Public and private routes with authentication guards

## Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Validation**: Yup
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Backend API running on port 3001

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd short-url-front
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Create environment file:
```bash
# Create .env file in the root directory
REACT_APP_API_BASE_URL=http://localhost:3001
```

4. Start the development server:
```bash
yarn start
# or
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application


## Usage

### Authentication
- Register a new account or login with existing credentials
- Protected routes automatically redirect to login if not authenticated
- Logout clears session and redirects to login

### URL Management
- View all your shortened URLs in the dashboard
- Create new short URLs using the floating action button
- Copy short URLs with one click
- Track visit counts for each URL
- Open original URLs in new tabs


