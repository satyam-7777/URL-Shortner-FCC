# URL Shortener

A full-stack URL shortener built with **React**, **Node.js**, **Express**, and **MongoDB**.

The application converts long URLs into short, shareable URLs and redirects users from the short URL to the original URL.

## Features

- Create short URLs from long URLs
- Redirect short URLs to their original URLs
- Prevent duplicate entries for the same original URL
- Validate submitted URLs
- Verify URL hostnames using DNS lookup
- Generate unique short URL keys
- Store URL data in MongoDB
- REST API built with Express
- React frontend
- Loading and error states
- Responsive user interface
- React frontend served by Express in production

## Tech Stack

### Frontend

- React
- CSS
- Fetch API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## How It Works

The application has two main operations:

### 1. Create a Short URL

The user submits a long URL from the React frontend.

```text
React
  │
  │ POST /api/shorturl
  ▼
validateUrl
  │
  ├── Check URL format
  ├── Check HTTP/HTTPS protocol
  └── Check hostname using DNS
  │
  ▼
shortenUrl
  │
  ├── Search for existing URL
  │
  ├── Existing → return existing short URL
  │
  └── New → generate short URL and save to MongoDB
  │
  ▼
JSON Response
  │
  ▼
React UI
```

### 2. Redirect to the Original URL

When a user visits a short URL:

```text
GET /api/shorturl/:id
        │
        ▼
sendOriginalUrl
        │
        ▼
Find short URL in MongoDB
        │
        ▼
Redirect to original URL
```

## API Endpoints

### Create Short URL

```http
POST /api/shorturl
```

Creates a short URL for the submitted URL.

### Request Body

```json
{
  "url": "https://www.example.com"
}
```

### Example Request

```bash
curl -X POST http://localhost:8000/api/shorturl \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.example.com"}'
```

### Example Response

```json
{
  "original_url": "https://www.example.com",
  "short_url": "a1b2c3d4",
  "createdDate": "2026-09-16T10:30:00.000Z"
}
```

## Redirect to Original URL

```http
GET /api/shorturl/:id
```

Redirects the user to the original URL associated with the short URL.

### Example

```text
http://localhost:8000/api/shorturl/a1b2c3d4
```

If `a1b2c3d4` exists in the database, the server redirects the request to:

```text
https://www.example.com
```

## URL Validation

Submitted URLs are validated before they are stored.

The validation process checks:

- URL is provided
- URL can be parsed using JavaScript's `URL` class
- Protocol is either `http:` or `https:`
- Hostname can be resolved using DNS

For example, these are accepted:

```text
https://example.com
http://example.com
https://www.google.com
```

Invalid or unsupported URLs are rejected.

## Duplicate URLs

If the submitted URL already exists in the database, the application returns the existing short URL instead of creating another record.

For example:

```text
First request
https://example.com
       ↓
Creates: a1b2c3d4

Second request
https://example.com
       ↓
Returns: a1b2c3d4
```

This prevents multiple short URLs from being created for the same original URL.

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SHORT_URL_LENGTH=6
```

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/satyam-7777/URL-Shortener.git
cd URL-Shortener
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
npm --prefix client install
```

### 4. Configure environment variables

Create a `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SHORT_URL_LENGTH=8
```

Replace the MongoDB connection string with your own MongoDB connection string.

### 5. Run in development

```bash
npm run dev
```

This starts both the React development server and the Express backend.

- React frontend: `http://localhost:3000`
- Express backend: `http://localhost:8000`

Open the application:

```text
http://localhost:3000
```

### 6. Build for production

```bash
npm run build
```

This creates the React production build inside:

```text
client/build
```

### 7. Start the production server

```bash
npm start
```

In production, Express serves both the React frontend and the API.

Open:

```text
http://localhost:8000
```

## Available Scripts

### Start production server

```bash
npm start
```

### Start backend with Nodemon

```bash
npm run server
```

### Run frontend and backend together

```bash
npm run dev
```

### Build React application

```bash
npm run build
```

## Error Handling

If an invalid URL is submitted, the API returns an error response.

Example:

```json
{
  "status": "error",
  "message": "invalid url"
}
```

A request using a short URL that does not exist also returns an error.

## License

This project is licensed under the ISC License.
