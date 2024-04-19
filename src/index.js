const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function getDBConnection() {
	const connection = await mysql.createConnection({
		host: "sql.freedb.tech",
		user: "freedb_mar_admin",
		password: "s2&U#2n5bJq2$5Y",
		database: "freedb_libros_db",
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

app.get("/libros/:id", async (req, res) => {
	const idLibros = req.params.id;
	const connection = await getDBConnection();
	const querySQL = "SELECT * FROM libros WHERE id = ?";
	const [result] = await connection.query(querySQL, [idLibros]);

	console.log(result);

	connection.end();

	if (result.lenght === 0) {
		res.status(404).json({
			success: false,
			results: "No hay ningun elemento con ese id",
		});
	} else {
		res.status(200).json({
			success: true,
			result: result,
		});
	}
});
