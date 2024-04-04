# Snippet Party

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

A web application to submit and display code snippets

1. [About](#about)
2. [Architecture](#architecture)
3. [Setup](#setup)

## About

This project is to satisfy the following requirements for an [assignment](https://x.com/striver_79/status/1769391241371029897?s=46) by creating a web application to submit and display code snippets:

#### Frontend
 - [x] Page 1: Construct a form to gather username, code language (C++, Java, JavaScript, Python), standard input (stdin), and source code.
 - [x] Page 2: Display submitted entries in a tabular format, showcasing username, code language, stdin, and submission timestamp.

#### The application:
 - [x] Functions seamlessly with data stored in MySQL tables.
 - [x] Provides source code uploaded to a publicly accessible git repository, along with links to hosted frontend and backend applications.

#### Bonus Tasks:
 - [x] Implemented Redis to cache information displayed in the table on page 2, reducing database read requests.
 - [x] Utilized external APIs, such as Judge0, to retrieve code output and display it in a new column (stdout) on page 2.

## Architecture

![Architecture diagram](diagram.png)

## Setup

To install the frontend:

```bash
cd web
pnpm install
pnpm run dev
```

To install the backend:

```bash
cd api
pnpm install
pnpm run dev
```

Make sure you fill out the `.env` files in both the `web` and `api` directories.
