# Snippet Party

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)

1. [About](#about)
2. [Architecture](#architecture)
3. [Setup](#setup)

## About

This project is to satisfy the following requirements for an [assignment](https://x.com/striver_79/status/1769391241371029897?s=46):

"Create a web application that facilitates the submission and display of code snippets. The application should consist of two pages:

- [x] Page 1: Construct a form to gather the following fields: username, preferred code language (C++, Java, JavaScript, Python), standard input (stdin), and the source code.

- [x] Page 2: Present all submitted entries in a tabular format, showcasing the username, code language, stdin, and the timestamp of submission. Additionally, limit the display of the source code to the initial 100 characters.

- [x] The application must function seamlessly with data stored in MySQL tables. Both the frontend and backend applications need to be hosted.

- [x] It is required to provide the source codes uploaded to a publicly accessible git repository, along with links to the hosted frontend and backend applications.

- [x] Bonus Task 1: Implement Redis to cache the information displayed in the table on page 2, reducing the number of database read requests.

- [x] Bonus Task 2: Utilize external APIs, such as Judge0, to retrieve the output of the code and exhibit it in a new column (stdout) on page 2. Judge0 API: https://judge0.com/, https://rapidapi.com/judge0-official/api/judge0-ce

- [x] Host the frontend on platforms like Vercel or similar and complete the Google Form provided."

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
