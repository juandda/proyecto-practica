module.exports = (sequelize, Sequelize) => {
    const Especialidades = sequelize.define ("Especialidades",{
        id:{
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        nombre:{
            type: Sequelize.STRING,
            allowNull: true
        },   
    })

    return Especialidades;
}