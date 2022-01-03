const Landing = require('../models/landing')

const getLandingByQuery = async(req, res) => {
    let data;
    try {
        if (req.query.minimum_mass && req.query.from && req.query.to) {
            data = await Landing.find({'mass': {$gte: req.query.minimum_mass}, 'year': {$gte: req.query.from, $lte: req.query.to + 1}}, '-_id')
        } else if(req.query.minimum_mass && req.query.from) {
            data = await Landing.find({'mass': {$gte: req.query.minimum_mass}, 'year': {$gte: req.query.from}}, '-_id')
        } else if(req.query.minimum_mass && req.query.to) {
            data = await Landing.find({'mass': {$gte: req.query.minimum_mass}, 'year': {$lte: req.query.to + 1}}, '-_id')
        } else if(req.query.from && req.query.to){
            data = await Landing.find({'year': {$gte: req.query.from, $lte: req.query.to + 1}}, '-_id')
        } else if(req.query.minimum_mass) {
            data = await Landing.find({'mass': {$gte: req.query.minimum_mass}}, '-_id')
        }else if(req.query.from){
            data = await Landing.find({'year': {$gte: req.query.from}}, '-_id')
        } else if(req.query.to){
            data = await Landing.find({'year': {$lte: req.query.to + 1}}, '-_id')
        }
        res.status(200).json(data);            
    } catch (error) {
        res.status(400).json({"error":err})
    }
}

// const toNumber = async() => {
//     await Landing.updateMany(
//         { 'mass' : { $type: 2 }},
//         [{ $set: { 'mass': { $toDouble: '$mass' } } }]
//         )
// }
// toNumber()
// La llamo y la borro porque convierte los strings a número una vez, y no hace falta llamarla más

const getLandingByMass = async(req, res) => {
    let data;
    try {
        if(req.params.mass){
            data = await Landing.find({'mass':req.params.mass}, '-_id')
            res.status(200).json(data);
        }else{
            data = await Landing.find({}, '-_id')
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).json({"error":err})
    }
}

const getLandingByClass = async(req, res) => {
    console.log('getLandingByClass');
    console.log(req.params);

    let data;
    try {
        if(req.params.recclass){
            data = await Landing.find({'recclass':req.params.recclass}, '-_id')
            res.status(200).json(data);
        }else{
            data = await Landing.find({}, '-_id')
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400).json({'error': error})
    }
}


const landing = {
    getLandingByQuery,
    getLandingByMass,
    getLandingByClass
}

module.exports = landing