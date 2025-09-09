# product-management-system
# Product Management System

A full-stack web application for managing products with CRUD operations, built with React, Node.js, Express, and MongoDB.

## Features

### Must Have Features ✅
- **Product List Display**: View all products in a responsive grid layout
- **Add New Product**: Form to create new products with validation
- **Delete Product**: Remove products with confirmation dialog
- **Sort Products**: Sort by price (low to high, high to low) or newest first
- **Full Stack Integration**: React frontend connected to Node.js backend with MongoDB

### Nice to Have Features ✅
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error handling and user feedback
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

### Frontend
- **React 18** - Modern React with functional components and hooks
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## Project Structure

```
Bookstore/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables (create this)
├── frontend/
│   ├── public/
│   │   ├── index.html     # HTML template
│   │   └── manifest.json  # PWA manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductList.js      # Product list component
│   │   │   ├── ProductList.css
│   │   │   ├── ProductCard.js      # Individual product card
│   │   │   ├── ProductCard.css
│   │   │   ├── AddProductForm.js   # Add product form
│   │   │   └── AddProductForm.css
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Main application styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone and Navigate
```bash
cd Bookstore
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/product-management
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Database Setup
Make sure MongoDB is running on your system:
- **Local MongoDB**: Start MongoDB service
- **MongoDB Atlas**: Use your connection string in the `.env` file

### 5. Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
  - Query params: `sort` (newest, price-asc, price-desc)
- `POST /api/products` - Create new product
- `DELETE /api/products/:id` - Delete product by ID

### Health Check
- `GET /api/health` - Server health status

## Product Schema

```javascript
{
  name: String (required, max 100 chars),
  price: Number (required, min 0),
  description: String (required, max 500 chars),
  category: String (required, max 50 chars),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Usage

1. **View Products**: The homepage displays all products in a grid layout
2. **Sort Products**: Use the dropdown to sort by price or newest first
3. **Add Product**: Click "Add New Product" to open the form
4. **Delete Product**: Click "Delete" on any product card, then confirm
5. **Form Validation**: All fields are required with proper validation

## Development

### Backend Development
- Uses nodemon for auto-restart during development
- Comprehensive error handling and validation
- CORS enabled for frontend communication

### Frontend Development
- React development server with hot reload
- Responsive design for mobile and desktop
- Modern CSS with smooth animations

## Production Deployment

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
