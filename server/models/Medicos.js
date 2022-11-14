module.exports = (sequelize, Sequelize) => {
    const Medicos = sequelize.define ("Medicos",{
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
    })

    return Medicos; 
}