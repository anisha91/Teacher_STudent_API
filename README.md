# Teacher-Student API

## Running Locally

## Prerequisites
- Node.js (>=16.x recommended)
- MySQL database

## Setup Instructions

## 1. Clone the repository
```sh
git clone [YOUR_REPO_URL]
cd [Teacher_Student_API]
```

## 2. Install dependencies
```sh
npm install
```

## 3. Configure the database
- Create a MySQL database
- Update the `.env` file with below database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=teacher_student_db
```

## 4. Start the server
```sh
npm start
```
Server will run at: `http://localhost:3000`

## API Endpoints

## Register Students
```
http://localhost:3000/api/register

```
## Retrieve Common Students
```
http://localhost:3000/api/commonstudents

```
## Suspend a Student
```
http://localhost:3000/api/suspend

```
## Retrieve Students for Notifications
```
http://localhost:3000/api/retrievefornotifications

```

# Running Tests
To execute test cases:
```sh
npm test
```