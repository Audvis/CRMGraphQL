const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');


// Resolvers
const resolvers = {
    Query: {
        obtenerCurso: () => "algo"
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) => {

            const { email, password } = input;

            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({ email });
            console.log(existeUsuario)
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado')
            }

            // Hashear su password
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            // Guardarlo en la base de datos
            try {
                const usuario = new Usuario(input);
                usuario.save(); // guardarlo
                return usuario;
            } catch (error) {

            }

        }
    }
}

module.exports = resolvers;