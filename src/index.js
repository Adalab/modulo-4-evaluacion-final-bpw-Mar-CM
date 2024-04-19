const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function getDBConnection() {
	const connection = await mysql.createConnection({
		host: "localhost",
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: "libros_db",
	});
	connection.connect();
	return connection;
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
	console.log(`Server is listening in port: ${port}`);
});

app.get("/libros", async (req, res) => {
	const connection = await getDBConnection();
	const querySQL = "SELECT * FROM libros";
	const [result] = await connection.query(querySQL);

	console.log(result);

	connection.end();

	res.json({
		info: { count: result.lenght },
		results: result,
	});
});
