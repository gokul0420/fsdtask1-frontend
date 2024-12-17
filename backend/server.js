const express = require("express");
const sql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "goku0420",
    database: "fsdform"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Successfully connected");
});

app.post("/api/employee",(req,res) => {
    const{first_name, last_name, employee_id, email, phone, department, date_of_joining, role} = req.body;
    const query = 'Insert into employees (first_name, last_name, employee_id, email, phone, department, date_of_joining, role ) values (?,?,?,?,?,?,?,?)';

    db.query(query,[first_name, last_name, employee_id, email, phone, department, date_of_joining, role],(err,result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY"){
                res.status(400).json({"error":"Employee ID or EmailID already exist"});
            }else{
                res.status(500).json({"Error inserting data":err});
            }
            return;
        }
        res.json({message:"Employee added successfully"});
    }
    )
}
)

// Root route to respond to GET requests
app.get("/", (req, res) => {
    res.send("Welcome to the FSD backend server!");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
