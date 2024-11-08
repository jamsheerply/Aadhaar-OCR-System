# Aadhaar-OCR-System

Build on MERN stack web application to perform OCR (Optical Character Recognition) on Aadhaar cards.

## 📌 Overview

The application will allow users to upload images of the front and back of an Aadhaar card, process these images through an API, and display the extracted information on the frontend.

## 🛠 Tech Stack

### Frontend

- React
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express

### Development Tools

- Tesseract.js

## 🔗 Important Links

### Live Deployments

- **Backend Server**: [Railway Deployment]()
- **Frontend Application**: [Vercel Deployment]()

## 🚀 Quick Start Guide

### Prerequisites

- Node.js (v18.18.0)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jamsheerply/Patient-Health-Dashboard-for-Prior-Authorization.git
   cd Patient-Health-Dashboard-for-Prior-Authorization
   ```

2. **Environment Configuration**
   Create a `.env` file in the /server directory with the following variables:

   ```env
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Setup Backend (First Terminal)**

   ```bash
   cd server
   npm install
   # Create .env file as shown above
   npm start
   ```

   Backend will run on http://localhost:5000

4. **Environment Configuration**
   Create a `.env` file in the /client directory with the following variables:

   ```env
   VITE_API_URL = http://localhost:5000
   ```

5. **Setup Frontend (Second Terminal)**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:5173

### Ports and Access

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Verification Steps

1. Backend is running when you see: "Server is running on port 5000"
2. Frontend is running when you see: "Local: http://localhost:5173/"
3. Visit http://localhost:5173 in your browser to access the application

## 💡 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact & Support

For questions, support, or collaboration:

- **Email**: jamsheerpayyoli@gmail.com
- **GitHub Issues**: For bug reports and feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Jamsheer](https://github.com/jamsheerply)
