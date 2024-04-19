USE freedb_libros_db;

CREATE TABLE libros (
	id int auto_increment primary key,
    nombre VARCHAR(60),
    autor VARCHAR(60),
    portada LONGTEXT
);

INSERT INTO libros (nombre, autor, portada)
VALUES ('Nosotros en la luna', 'Alice Kellen', 'https://m.media-amazon.com/images/I/71ce6+It8DL._AC_UF1000,1000_QL80_.jpg');

INSERT INTO libros (nombre, autor, portada)
VALUES ('Veinte poemas de amor y una canción desesperada', 'Pablo Neruda', 'https://imgonix.planetadelibros.com/usuaris/libros/fotos/250/original/portada_veinte-poemas-de-amor-y-una-cancion-desesperada_pablo-neruda_201702221815.jpg');

INSERT INTO libros (nombre, autor, portada)
VALUES ('La chica del tren', 'Paula Hawkins', 'https://m.media-amazon.com/images/I/71YDc5zRtxL._AC_UF1000,1000_QL80_.jpg');

INSERT INTO libros (nombre, autor, portada)
VALUES ('Todos los vuelos que perdí por ti', 'David Galán', 'https://m.media-amazon.com/images/I/81O8Wv+T-EL._AC_UF894,1000_QL80_.jpg');

SELECT * FROM libros;