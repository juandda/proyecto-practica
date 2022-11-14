module.exports = (sequelize, Sequelize) => {
    const Eps = sequelize.define ("Eps",{
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

        telefono:{
            type: Sequelize.INTEGER,
            allowNull: true
        },  
    })

    return Eps;
}
