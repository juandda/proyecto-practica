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
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      
      })

    return Especialidades;
}