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
		user: process.env.PDB_USER,
		password: process.env.DB_PASSWORD,
		database: "freedb_libros_db",
	});
	connection.connect();
	return connection;
}

const port = process.env.PORT || 5001;
app.listen(port, () => {
	console.log(`Server is listening in port: ${port}`);
});

// 1. GET

app.get("/libros", async (req, res) => {
	const connection = await getDBConnection();
	const querySQL = "SELECT * FROM libros";
	const [result] = await connection.query(querySQL);

	console.log(result);

	connection.end();

	res.json({
		info: { count: result.length },
		results: result,
	});
});

// 2. GET POR ID

app.get("/libros/:id", async (req, res) => {
	const idLibros = req.params.id;
	const connection = await getDBConnection();
	const querySQL = "SELECT * FROM libros WHERE id = ?";
	const [result] = await connection.query(querySQL, [idLibros]);

	console.log(result);

	connection.end();

	if (result.length === 0) {
		res.status(404).json({
			success: false,
			error: "No hay ningún elemento con ese id",
		});
	} else {
		res.status(200).json({
			success: true,
			result: result,
		});
	}
});

// 3. POST AÑADIR NUEVO LIBRO

app.post("/libros", async (req, res) => {
	const data = req.body;
	console.log(data);
	const { name, author, frontbook } = data;

	const connection = await getDBConnection();
	const querySQL =
		"INSERT INTO libros (nombre, autor, portada) VALUES(?, ?, ?)";
	const [resultInsert] = await connection.query(querySQL, [
		name,
		author,
		frontbook,
	]);
	console.log(resultInsert);

	connection.end();

	res.status(201).json({
		success: true,
		id: resultInsert.insertId,
	});
});

// 4. PUT MODIFICAR UN LIBRO

app.put("/libros/:id", async (req, res) => {
	const idLibros = req.params.id;
	const newData = req.body;
	const { name, author, frontbook } = newData;

	const connection = await getDBConnection();
	const querySQL =
		"UPDATE libros SET nombre = ?, autor = ?,  portada = ? WHERE id = ?";
	const [result] = await connection.query(querySQL, [
		name,
		author,
		frontbook,
		idLibros,
	]);

	connection.end();

	res.status(200).json({
		success: true,
	});
});

// 5. DELETE
app.delete("/libros/:id", async (req, res) => {
	const idLibros = req.params.id;
	const connection = await getDBConnection();

	const querySQL = "DELETE FROM libros WHERE id = ?";
	const [result] = await connection.query(querySQL, [idLibros]);

	connection.end();

	if (result.affectedRows > 0) {
		res.status(200).json({
			success: true,
			message: "Libro eliminado",
		});
	} else {
		res.status(400).json({
			success: false,
			message: "El libro elegido no se ha eliminado",
		});
	}
});
