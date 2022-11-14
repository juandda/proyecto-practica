const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models');


// Routers
const usuarioRouter =  require('./routes/Usuarios')
app.use("/usuarios", usuarioRouter)

const citasRouter = require('./routes/Citas')
app.use("/citas", citasRouter) 

const epsRouter = require('./routes/Eps')
app.use("/eps", epsRouter) 

const especialidadRouter = require('./routes/Especialidades')
app.use("/especialidades", especialidadRouter) 

const medicosRouter = require('./routes/Medicos')
app.use("/medicos", medicosRouter) 

db.sequelize.sync().then(()=>{
    app.listen(3001, () => {
        console.log('Listening on port 3001!');
    })
})