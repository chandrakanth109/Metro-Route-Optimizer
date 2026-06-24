# 🚇 Metro Route Optimizer

### Intelligent Route Planning using Dijkstra's Algorithm

A full-stack metro navigation system that computes the shortest path between stations using **Dijkstra's Shortest Path Algorithm**. The application models the metro network as a weighted graph and provides optimized routes, distance calculations, and interchange handling through a responsive web interface.

---

## 🌐 Live Demo

**Frontend:** https://metrorouteoptifrontend-o00mhbjfz-mallela-chandrakanths-projects.vercel.app

**Backend API:** https://metro-route-optimizer-backend.onrender.com

---

## 🎯 Problem Statement

Finding the most efficient route in a metro network becomes increasingly complex as the number of stations and interconnections grows.

This project solves the problem by:

- Representing stations as graph vertices
- Representing connections as weighted edges
- Applying Dijkstra's Algorithm to compute optimal routes
- Returning the shortest path along with route information

---

## 🏗️ System Architecture


React Frontend
      │
      ▼
Express REST API
      │
      ▼
Route Optimization Engine
(Dijkstra's Algorithm)
      │
      ▼
MongoDB Database


## 🧠 Core Algorithm

### Dijkstra's Shortest Path Algorithm

The metro network is modeled as a weighted graph.


Airport ──5km── Central ──3km── Museum
      │
      └────8km──── City Hall


### Algorithm Workflow

1. Build an adjacency list from MongoDB connections.
2. Initialize source station distance as 0.
3. Select the nearest unvisited station.
4. Relax neighboring vertices.
5. Continue until destination is reached.
6. Reconstruct and return the shortest route.

### Time Complexity

```text
O((V + E) log V)
```

Where:

- V = Number of Stations
- E = Number of Connections

---

## ✨ Features

### Route Planning

- Find shortest path between metro stations
- Distance calculation
- Dynamic route generation
- Source and destination selection
- Graph-based route optimization

### Metro Network Management

- Add stations
- Add connections
- Store route metadata
- Manage weighted edges

### Production Features

- RESTful API architecture
- Environment-based configuration
- MongoDB Atlas integration
- Responsive UI
- Render deployment
- Vercel deployment
- CORS handling

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## 📂 Database Design

### Station Schema

```json
{
  "name": "Airport",
  "code": "AIR",
  "line": "Blue Line",
  "x": 100,
  "y": 300
}
```

### Connection Schema

```json
{
  "from": "StationId",
  "to": "StationId",
  "distance": 5,
  "line": "Blue Line"
}
```

---

## 🔌 API Endpoints

### Stations

```http
GET /api/v1/getStations
POST /api/v1/createStation
```

### Connections

```http
GET /api/v1/getConnections
POST /api/v1/createConnection
```

### Route Optimization

```http
POST /api/v1/findRoute
```

#### Request

```json
{
  "source": "Airport",
  "destination": "Museum"
}
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/chandrakanth109/Metro-Route-Optimizer.git
cd MetroRouteOptimizer
```

### Frontend Setup

```bash
npm install
npm start
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:4000/api/v1
```

### Backend (.env)

```env
MONGODB_URL=your_mongodb_connection_string
PORT=4000
```

---

## 🚀 Deployment Journey

This project is deployed using:

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

During deployment, several production challenges were identified and resolved:

- Environment Variable Configuration
- API Routing Issues
- CORS Restrictions
- Cross-Origin Communication
- Production Debugging

---

## 📸 Application Preview

### Metro Network

<img width="656" height="886" alt="image" src="https://github.com/user-attachments/assets/4759bf9b-77bd-47d7-a46b-eab79b6eaddb" />

---

## 🎓 Key Learnings

- Graph Data Structures
- Dijkstra's Shortest Path Algorithm
- MERN Stack Development
- REST API Design
- MongoDB Schema Modeling
- Environment Variable Management
- Production Deployment
- CORS Configuration
- Full-Stack Debugging

---

## 👨‍💻 Author

### M Chandrakanth

Full Stack Developer | MERN Stack | DSA | C++

📧 chandumallela007@gmail.com

🔗 LinkedIn: https://linkedin.com/in/chandra-kanth-0079

---

⭐ If you found this project useful, consider giving it a star.
