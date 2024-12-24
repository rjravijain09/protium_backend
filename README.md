# protium_backend

# Stock Tracker API

This project is a backend application for a stock tracking system. It includes user management, portfolio management, and transaction tracking.

---

## **Features**
1. User Management
2. Portfolio Management
3. Stock Management
4. Transaction Management
5. Request logging using Winston

---

## **Prerequisites**
1. Node.js (v14 or higher)
2. MongoDB
3. Postman (for testing APIs)

---

## **Setup Instructions**

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd stock-tracker
npm install
PORT=5000
MONGO_URI=mongodb://localhost:27017/stock_tracker
npm start
---

### **3. Postman/API Documentation**

#### Option 1: Create a Postman Collection
1. Set up all your API endpoints in Postman.
2. Save the requests in a collection.
3. Export the collection:
   - Go to the "Collections" tab in Postman.
   - Click the "Export" button.
4. Save the `.json` file and include it in your project submission.

### **4. Database Schema Diagram**
#### Schema Diagram:
- **Users Collection**
  - `userId`: ObjectId
  - `name`: String
  - `email`: String
  - `password`: String

- **Portfolios Collection**
  - `portfolioId`: ObjectId
  - `userId`: ObjectId (reference to Users)
  - `stocks`: Array of stock references

- **Stocks Collection**
  - `stockId`: ObjectId
  - `name`: String
  - `price`: Number

- **Transactions Collection**
  - `transactionId`: ObjectId
  - `userId`: ObjectId (reference to Users)
  - `stockId`: ObjectId (reference to Stocks)
  - `quantity`: Number
  - `type`: String ("buy" or "sell")
