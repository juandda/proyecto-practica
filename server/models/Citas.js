module.exports = (sequelize, Sequelize) => {
    const Citas = sequelize.define ("Citas",{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        direccion:{
            type: Sequelize.STRING,
            allowNull: false
        }, 

        fecha:{
            type: Sequelize.DATEONLY,
            allowNull:false,
            validate:{
                isDate: true
            }
        },

        hora:{
            type: Sequelize.STRING,
            allowNull: false
        }, 

        estado:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    })


    return Citas;
}
