# nmovies - A simple movie recommendation website

A simple movie recommendation website built using React in the frontend and Express in the backend.

<img alt="nmovies" src="https://github.com/user-attachments/assets/38178afe-cbc9-44a7-a1c8-72e0cac5ecf1" width="100%" />

## 📋 Table of Contents

1. 🤖 [Introduction](#-introduction)
2. 🚀 [Demo](#-demo)
3. ⚙️ [Tech Stack](#%EF%B8%8F-tech-stack)
4. 🔋 [Features](#-features)
5. 🤸 [Quick Start](#-quick-start)

## 🤖 Introduction

The website allows users to search for movies and TV shows, get recommendations, and read reviews. Users can also create an account, log in, and save their favorite movies and TV shows.

This project was inspired by the [_React Pro course_](https://academy.holetex.com/p/react-course), created by Holetex and [_MoonFlix - Fullstack Responsive Movie Website 2022 tutorial_](https://youtu.be/j-Sn1b4OlLA), created by
Tuat Tran Anh.

The backend is built using Express, MongoDB, JWT for authentication, sending emails by Mailgun and deployed on Heroku. You can find the repository [here](https://github.com/nboraxxd/nmovies-server).

## 🚀 Demo

Check out the [live demo](https://nmovies-xoxo.vercel.app/).

- Email: `4639xenacious@livinitlarge.net`

- Password: `Demo12345@#`

- Or you can create your own account.

## ⚙️ Tech Stack

- React
- TypeScript
- shadcn/ui
- TanStack Query
- zustand
- Zod

## 🔋 Features

- User authentication: Register, send verification email, login, forgot password, reset password, refresh token.

- User profile: Update user information, change password, delete account.

- Movies: Get movies, search movies, get movie details, get recommended movies.

- TV Shows: Get TV shows, search TV shows, get TV show details, get recommended TV shows.

- Reviews: Get reviews for a movie or TV show with pagination, create a review, get user reviews with pagination, delete a review.

- Favorites: Add a movie or TV show to favorites, get user favorites, remove a movie or TV show from favorites.

- Responsive Design: Fully optimized for a seamless experience on desktops, tablets, and mobile devices.

- High Performance: Fast loading and smooth interactions for an efficient user experience.

and many more, including code architecture and reusability

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

**Clone the repository**

```bash
git clone https://github.com/nboraxxd/nmovies-client.git
cd nmovies-client
```

**Installations**

Install the dependencies using npm:

```bash
npm install
```

**Environment Variables**

Create a new file named .env in the root of your project and add the following content:

```bash
VITE_SERVER_API=
VITE_CLIENT_URL=
```

**Runnning the project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
