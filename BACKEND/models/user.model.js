const db = require("./db");

const User = {
    create: (nombre, email, password, callback) => {
        const sql =
            'INSERT INTO usuarios (nombre, email, contrasena, rol, creado_en) VALUES (?, ?, ?, "usuario", NOW())';
        db.query(sql, [nombre, email, password], callback);
    },

    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        db.query(sql, [email], callback);
    },

    findById: (id, callback) => {
        const sql = "SELECT id, nombre, email, rol FROM usuarios WHERE id = ?";
        db.query(sql, [id], callback);
    },
};

module.exports = User;
