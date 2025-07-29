
# 💸 Pesalink Full-Stack Banking Dashboard

Pesalink is a modern, responsive full-stack banking dashboard built with **Angular** (v20) and **Node.js/Express** using **TypeScript** throughout the stack. It provides a seamless experience for bank admins to monitor user accounts, perform transfers, and visualize transaction data.

## ✨ Features

- 📊 **Dashboard Overview**: Displays total balance, spending charts, and recent transactions.
- 🧑‍🤝‍🧑 **Dynamic User Management**: Lists users and account data fetched from the backend.
- 🔴 **Low Balance Alerts**: Highlights users with balances below a threshold (e.g., KES 100).
- 💸 **Secure Money Transfers**: Modal-based form for real-time money transfer with balance validation.
- 📄 **Transaction History**: Paginated, filterable transaction history with sorting by type/date/amount.
- 📈 **Charts and Visual Insights**: Spending trends using `Chart.js` via `ng2-charts`.
- ⚠️ **Centralized Error Handling**: Global `HttpInterceptor` shows toast notifications on API errors.
- 📱 **Responsive Design**: Built with Angular Material layout utilities to support mobile and desktop.
- ✅ **Unit Testing**: Basic Jasmine/Karma tests for components and services.

## 🛠 Tech Stack

| Category   | Technology                          |
|------------|--------------------------------------|
| Frontend   | Angular 20, TypeScript, SCSS, RxJS   |
| UI Library | Angular Material                     |
| Charting   | Chart.js (via ng2-charts)            |
| Backend    | Node.js, Express, TypeScript         |
| Database   | PostgreSQL (or MySQL as alternative) |
| Tools      | VS Code, Postman, Git                |

## 📂 Project Structure

```
pesalink-app/
├── pesalink-backend/       # Node.js + Express + TS API
└── pesalink-frontend/      # Angular 20 Frontend
```

## 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [Angular CLI](https://angular.io/cli)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pesalink-app.git
cd pesalink-app
```

### 2. Backend Setup

```bash
cd pesalink-backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Start the backend server
npm run dev
```

> Backend server will run at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../pesalink-frontend

# Install frontend dependencies
npm install

# Start Angular development server
ng serve -o
```

> Frontend will run at `http://localhost:4200`

## ✅ Running Unit Tests

Run unit tests for Angular components and services using:

```bash
ng test
```

## 📦 Features Demonstrated

- **Global HTTP Interceptor** for uniform error handling
- **Responsive Navigation Shell** using Angular Material’s Sidenav and Toolbar
- **Loading Indicators** (spinners) to improve UX during async operations
- **Dynamic Reactive Forms** with live validation
- **Pagination with mat-paginator** for transaction lists
- **Theming** with Angular Material’s custom palettes
- **Modular Architecture** with core/shared separation for scalability

## 📝 Assumptions & Design Decisions

- 🔁 **Monorepo** for easier coordination between frontend and backend
- 🧪 **Mock Data** used initially for frontend dev (easy switch to real DB)
- 🧱 **Angular Material** for rapid UI prototyping
- 🧼 **Clean Codebase**: Error handling, separation of concerns, SCSS modules
- 🔄 **State** managed via RxJS; would consider NgRx in a larger app

## 📄 License

MIT License (or your preferred license)

## 🙌 Acknowledgments

Built as part of a technical assessment to demonstrate frontend and backend development proficiency using Angular and Node.js.


