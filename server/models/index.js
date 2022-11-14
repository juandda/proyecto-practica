'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Medicos = require("./Medicos")(sequelize, Sequelize);
db.Especialidades = require("./Especialidades")(sequelize, Sequelize);
db.Eps = require("./Eps")(sequelize, Sequelize);
db.Citas = require("./Citas")(sequelize, Sequelize);
db.Usuarios = require("./Usuarios")(sequelize, Sequelize);

//Uno a uno entre medicos y especialidades
db.Especialidades.hasMany(db.Medicos, {foreignKey: "especialidadId"}); 
db.Medicos.belongsTo(db.Especialidades, {as:"especialidad"});

//Uno a uno entre Medicos y EPS
db.Eps.hasMany(db.Medicos, { foreignKey: "epsId"}); 
db.Medicos.belongsTo(db.Eps, {as:"eps"});
  
db.Usuarios.hasMany(db.Citas, {as:"citas",foreignKey: "usuarioId"}); 
db.Citas.belongsTo(db.Usuarios, {as:"usuario"});

//Uno a uno entre Citas y Medicos
db.Medicos.hasMany(db.Citas, {as:"citas",foreignKey: "medicoId"}); 
db.Citas.belongsTo(db.Medicos, {as: "medico"}); 

//Uno a uno entre Usuarios y EPS
db.Eps.hasMany(db.Usuarios, {foreignKey: "epsId"}); 
db.Usuarios.belongsTo(db.Eps, {as: "eps"});


module.exports = db; 
 