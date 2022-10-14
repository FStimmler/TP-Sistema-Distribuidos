const http = require('http')
const Turnos = require('./model/turnosModel')


const server = http.createServer((req, res) => {
    if (req.url === '/api/turnos' && req.method === 'GET') {
      getTurnos(req, res);
    }
    else if(req.url === '/api/turnos' && req.method === 'POST'){
        createTurno(req,res)
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;


// @desc    Gets all Turnos
// @route   GET /api/turnos
async function getTurnos(req, res) {
    try {
        const turnos = await Turnos.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(turnos))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Turno
// @route   POST /api/turnos
async function createTurno(req, res) {
    try {
        const turno = {
            id: 7, 
            datetime: "2022-09-03T19:58:10.406Z",
            userId: 4, 
            email: "email2@gmail.com", 
            branchId: 2
        }

        const newTurno = await Turnos.create(turno)

        res.writeHead(201, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify(newTurno))
    } catch (error) {
        console.log(error)
    }
}