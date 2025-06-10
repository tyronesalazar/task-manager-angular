const Tarea = require("../models/task.model");

const tareaController = {
    crearTarea(req, res) {
        const { titulo, descripcion, prioridad, fecha_limite } = req.body;
        const usuarioId = req.user.id;

        Tarea.create(
            titulo,
            descripcion,
            prioridad,
            fecha_limite,
            usuarioId,
            (err, result) => {
                if (err) {
                    console.log(
                        "Error al crear una tarea con el usuario:",
                        usuarioId
                    );
                    console.error(err);
                    return res
                        .status(500)
                        .json({ mensaje: "Error al crear la tarea" });
                }
                res.status(201).json({
                    mensaje: "Tarea creada",
                    id: result.insertId,
                });
            }
        );
    },

    obtenerTareas(req, res) {
        const usuarioId = req.user.id;

        Tarea.obtenerPorUsuario(usuarioId, (err, tareas) => {
            if (err)
                return res
                    .status(500)
                    .json({ mensaje: "Error al cargar las tareas" });
            res.json(tareas);
        });
    },
    actualizarTarea(req, res) {
        const tareaId = req.params.id;
        const usuarioId = req.user.id;
        const datos = req.body;

        Tarea.actualizar(tareaId, datos, usuarioId, (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ mensaje: "Error al actualizar tarea." });
            res.json({ mensaje: "Tarea actualizada." });
        });
    },
    eliminarTarea(req, res) {
        const tareaId = req.params.id;
        const usuarioId = req.user.id;

        Tarea.eliminar(tareaId, usuarioId, (err, result) => {
            if (err)
                return res
                    .status(500)
                    .json({ mensaje: "Error al eliminar tarea." });
            res.json({ mensaje: "Tarea eliminada." });
        });
    },
};

module.exports = tareaController;
