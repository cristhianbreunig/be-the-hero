const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        console.log(count);
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
    ]);

        // retorna no cabeçalho a propriedade count(*)
        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(incidents);
    },

    async create (request, response) {
        const { title, description, value } = request.body;

        // contexto da requisição, dados do usuário (da autenticação)
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        console.log(incident.ong_id);

        console.log(ong_id);

        // verifica se o id da ong (logada) é o mesmo da que criou o caso
        if(incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete();

        // resposta (com sucesso) para o frontend sem conteúdo
        return response.status(204).send();
    }

};