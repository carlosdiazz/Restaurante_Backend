console.log(__dirname)
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
    apis: [

        `${__dirname}/components/auth/*routes.ts`,
        `${__dirname}/components/category/*routes.ts`,
        `${__dirname}/components/Order/*routes.ts`,
        `${__dirname}/components/product/*routes.ts`,
        `${__dirname}/components/tables/*routes.ts`,
        `${__dirname}/components/user/*routes.ts`,
        `${__dirname}/components/payment/*routes.ts`,
    ]
}