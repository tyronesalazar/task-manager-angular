const express = require("express");
const router = express.Router();

const tareaController = require("../controllers/task.controller");
const verificarToken = require("../middlewares/auth.middleware");

router.post("/", verificarToken, tareaController.crearTarea);

router.get("/", verificarToken, tareaController.obtenerTareas);

router.put("/:id", verificarToken, tareaController.actualizarTarea);

router.delete("/:id", verificarToken, tareaController.eliminarTarea);

module.exports = router;
