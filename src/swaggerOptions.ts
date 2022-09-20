export const swaggerOptionsJson = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: 'API RESTAURANTE',
            version: '1.0.0',
            description: 'API DE RESTAURANTE',
        },
        servers: [
            {
                url: 'http://localhost:4500'
            }
        ]
    },
    apis: [`${__dirname}/routes/*ts`]
}