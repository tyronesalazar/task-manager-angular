const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authController = {
    register: (req, res) => {
        const { nombre, email, contraseña } = req.body;
        console.log("Datos de registro:", req.body);
        if (!nombre || !email || !contraseña) {
            return res
                .status(400)
                .json({ mensaje: "Todos los campos son obligatorios." });
        }
        User.findByEmail(email, (err, data) => {
            if (data.length > 0) {
                return res
                    .status(400)
                    .json({ mensaje: "El correo ya está registrado." });
            }

            const hashedPassord = bcrypt.hashSync(contraseña, 10);

            User.create(nombre, email, hashedPassord, (err, data) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .json({ mensaje: "Error al registrar el usuario." });
                }
                console.log("Nuevo usuario registrado");
                console.log(data);
                return res
                    .status(201)
                    .json({ mensaje: "Usuario registrado exitosamente." });
            });
        });
    },

    login: (req, res) => {
        const { email, contraseña } = req.body;
        if (!email || !contraseña) {
            return res
                .status(400)
                .json({ mensaje: "Todos los campos son obligatorios." });
        }

        User.findByEmail(email, (err, data) => {
            if (err || data.length === 0) {
                return res.status(401).json({ mensaje: "Cuenta no existe." });
            }

            const user = data[0];
            const isPasswordValid = bcrypt.compareSync(
                contraseña,
                user.contrasena
            );
            if (!isPasswordValid) {
                return res
                    .status(401)
                    .json({ mensaje: "Contraseña incorrecta." });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: "3h" }
            );
            console.log("Nuevo inicio de sesion");
            console.log(data);
            return res.status(200).json({
                mensaje: "Inicio de sesión exitoso.",
                token,
                usuario: {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    rol: user.rol,
                },
            });
        });
    },
};

module.exports = authController;
