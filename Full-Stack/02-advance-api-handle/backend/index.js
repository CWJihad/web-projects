import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const hostname = "localhost";

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "table wooden",
      price: 200,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 2,
      name: "table glass",
      price: 250,
      image:
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 180,
      image:
        "https://images.pexels.com/photos/37347/office-chair-chair-isolated-furniture.jpg?auto=compress&cs=tinysrgb&w=940",
    },
    {
      id: 4,
      name: "Minimalist Desk Lamp",
      price: 45,
      image:
        "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=940",
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      price: 120,
      image:
        "https://images.pexels.com/photos/4317157/pexels-photo-4317157.jpeg?auto=compress&cs=tinysrgb&w=940",
    },
  ];

// http://localhost:3000/api/products?search=wooden table

  if (req.query.search) { // 'req.query' => fixed but '.search' => changeable but you should follow that structure
    const filteredProducts = products.filter(product => product.name.includes(req.query.search))
    res.send(filteredProducts)
    return; // otherwise app will crushed
  }

  setTimeout(() => {
    res.send(products)
  }, 3000);
  
});

app.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}`);
});
