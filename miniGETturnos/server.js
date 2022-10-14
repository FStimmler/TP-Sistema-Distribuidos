const http = require('http');
const Turnos = require('./model/turnosModel')
const server = http.createServer((req, res) => {
    if (req.url === '/api/turnos' && req.method === 'GET') {
      getTurnos(req, res);
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;


// @desc    Gets All Products
// @route   GET /api/products
async function getTurnos(req, res) {
    try {
        const turnos = await Turnos.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(turnos))
    } catch (error) {
        console.log(error)
    }
}
