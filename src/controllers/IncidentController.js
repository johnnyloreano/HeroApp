const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {    
    async index(request,response){
        
        const {page = 1} = request.query;

        const [count] = await connection('incident').count();

        const incidents = await connection('incident')
        .join('ongs','ongs.id','incident.ongs_id')
        .limit(5)
        .offset((page - 1 ) * 5)
        .select(
            [
                "incident.*",
                "ongs.name",
                "ongs.email",
                "ongs.phone",
                "ongs.city",
                "ongs.uf",
        ]);
    
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    
    async create(request,response){
        const {title,description,value} = request.body;
        const ongs_id = request.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ongs_id
        })
        return response.json({id});
    },

    async delete(request,response){
        const {id} = request.params;
        const ongs_id = request.headers.authorization;

        const [incident] = await connection('incident').where('id', id).select('ongs_id');

        if(ongs_id != incident.ongs_id) return response.status(401).json( {error : "Operation not permitted"});

        await connection('incident').where('id', id).delete();

        return response.status(204).send();

    }
}