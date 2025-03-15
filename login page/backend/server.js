const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Dummy user storage (Not a database)
let users = [];

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Store user
    users.push({ name, email, password });
    res.json({ message: "Signup successful" });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ user });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
