const fs = require('fs');
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

let API = "yelleyy"
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Ploblem API",
            version: '1.0.0@ALPHA',
            license: {
                name: "Yelleyy",
                url: "https://github.com/Yelleyy"
            },
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },
    apis: ["index.js"],
};
const specs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json())

/**
 * @swagger
 * /api/problem:
 *   get:
 *     description: use api to get problem
 *     parameters:
 *      - name: token
 *        description: ทดสอบ api
 *        in: query
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: APIcheck
 */
app.get('/api/problem', async (req, res) => {

    const token = req.query['token']
    let decode = jwt.decode(token);
    try {
        if (token != null && decode != null) {
            console.log(decode);
            if (decode['name'] === API) {
                fs.readFile('./problem.json', (err, data) => {
                    if (err) throw err;
                    let problem = JSON.parse(data);
                    res.send(problem);
                });

            }
            else {
                res.json({
                    status: "error",
                    token: "Invalid Token"
                })
            }
        }
        else {
            res.json({
                status: "error",
                token: "required"
            })
        }

    } catch (error) {
        console.log(error);
    }
})

/**
 * @swagger
 * /problem:
 *   get:
 *     description: แสดงผลโจทย์ทั้งหมด
 *     responses:
 *       200:
 *         description: ทดสอบ
 * 
 */
app.get('/problem', async (req, res) => {

    try {
        fs.readFile('./problem.json', (err, data) => {
            if (err) throw err;
            let problem = JSON.parse(data);
            res.send(problem);
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(4000, () => {
    console.log('Server started on 4000')
})

