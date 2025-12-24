// MongoDB initialization script
// Run this in MongoDB shell or MongoDB Compass

use smart-knowledge-companion;

// Create indexes for better performance
db.contents.createIndex({ "domain": 1, "fetchedAt": -1 });
db.contents.createIndex({ "title": "text", "content": "text" });
db.progresses.createIndex({ "userId": 1 });

// Sample data insertion (optional)
db.contents.insertMany([
  {
    title: "Introduction to Machine Learning",
    content: "Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.",
    domain: "ai",
    source: "Sample",
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    title: "Latest Tech Trends 2024",
    content: "Artificial intelligence, quantum computing, and sustainable technology are leading the innovation landscape in 2024.",
    domain: "news",
    source: "Sample",
    publishedAt: new Date(),
    fetchedAt: new Date()
  },
  {
    title: "The History of Computing",
    content: "From mechanical calculators to modern supercomputers, the evolution of computing has transformed how we process information.",
    domain: "general",
    source: "Sample",
    publishedAt: new Date(),
    fetchedAt: new Date()
  }
]);

print("Database initialized successfully!");