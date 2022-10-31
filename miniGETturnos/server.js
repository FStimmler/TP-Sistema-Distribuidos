const http = require('http')
const Turnos = require('./model/turnosModel')
const { getPostData } = require('./utils')
const { hashCode } =require('./utils')

const headers = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Content-Type': 'application/json'
}

const server = http.createServer((req, res) => {
    switch(req.method){
        case 'GET': 
            if(req.url.startsWith('/api/turnos'))
                getTurnos(req, res)
            break;
        case 'POST':
            if(req.url === '/api/turnos')
                createTurno(req,res)
            break;
        case 'PUT':
        case 'DELETE':
            deleteTurno(req, res)
            break;
    }
});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;

// @desc    Gets all Turnos
// @route   GET /api/turnos
async function getTurnos(req, res) {
    try {
        var turnos;
        const params = new URLSearchParams(req.url.split('?')[1]);
        if(params.toString()){
            turnos = await Turnos.findQ(params);
        }
        else{
            turnos = await Turnos.findAll();
        }
        const headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Content-Type': 'application/json'
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify(turnos))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Turno
// @route   POST /api/turnos
async function createTurno(req, res) {
    try {


        const body = await getPostData(req);

        console.log(body);

        const { fecha, email, branchId_s } = JSON.parse(body);
   
        userId=hashCode(email);
        branchId = parseInt(branchId_s);

        const turno = {
            fecha,
            userId,
            email,
            branchId
        }

        const newTurno = Turnos.create(turno).then( ()=>{
            res.writeHead(201, headers);
            return res.end(JSON.stringify(newTurno));

        },(error)=>{
            console.log(error.status);
            res.writeHead(error.status,headers);
            res.end(error.toString());
        } )

    } catch (error) {
        console.log(error)
    }

}

// @desc    modifica Turno by idReserva
// @route   DELETE /api/reserva/:idReserva
async function deleteTurno(req, res){
    try{
        let {url} = req

        console.log(url)
        let idReserva = url.split("/")[3]       //value idReserva ingresado
        console.log(idReserva);
        const turnoId = await Turnos.findByIdReserva(idReserva)

        console.log(JSON.stringify(turnoId))

        const modifTurno = Turnos.modifyTurno(idReserva).then(()=>{
            res.writeHead(200, headers);
            return res.end(JSON.stringify(modifTurno));
        },(error)=>{
            console.log(error.status);
            res.writeHead(error.status,headers);
            res.end(error.toString());
        })
    }
    catch(error) {
        console.log(error)
    }
}