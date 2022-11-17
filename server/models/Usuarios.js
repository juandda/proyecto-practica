module.exports = (sequelize,Sequelize) =>{
    const Usuarios = sequelize.define("Usuarios",{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: Sequelize.STRING,
            allowNull: true
        }, 
        correo:{
            type: Sequelize.STRING,
            allowNull: true,
            validate:{
                isEmail: true
            }
        },
        fecha_nacimiento:{
            type: Sequelize.DATEONLY,
            allowNull:true,
            validate:{
                isDate: true
            }
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        rol:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    return Usuarios;
}