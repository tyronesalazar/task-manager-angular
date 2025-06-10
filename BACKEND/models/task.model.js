const db = require("./db");

const Tarea = {
    create(titulo, descripcion, prioridad, fecha_limite, usuarioId, callback) {
        const sql = `
            INSERT INTO tarea (titulo, descripcion, prioridad, fecha_limite, usuario_id)
            VALUES (?, ?, ?, ?, ?)
        `;
        console.log(usuarioId);
        db.query(
            sql,
            [titulo, descripcion, prioridad, fecha_limite, usuarioId],
            callback
        );
    },
    obtenerPorUsuario(usuarioId, callback) {
        const sql =
            "SELECT * FROM tarea WHERE usuario_id = ? ORDER BY creado_en DESC";
        db.query(sql, [usuarioId], callback);
    },
    actualizar(id, datos, usuarioId, callback) {
        const sql = `
            UPDATE tarea
            SET titulo = ?, descripcion = ?, prioridad = ?, estado = ?, fecha_limite = ?
            WHERE id = ? AND usuario_id = ?
        `;
        console.log("Datos a actualizar:", datos);
        console.log("ID de tarea:", id);
        console.log("ID de usuario:", usuarioId);
        db.query(
            sql,
            [
                datos.titulo,
                datos.descripcion,
                datos.prioridad,
                datos.estado,
                datos.fecha_limite,
                id,
                usuarioId,
            ],
            callback
        );
    },
    eliminar(id, usuarioId, callback) {
        const sql = "DELETE FROM tarea WHERE id = ? AND usuario_id = ?";
        db.query(sql, [id, usuarioId], callback);
    },
};

module.exports = Tarea;
