import * as fs from 'fs'
import * as dotenv from 'dotenv';
import { downloadBlob, uploadBlob } from './storage';
import multer from 'multer';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const express = require('express')
const csv = require('csv-parser')
const app = express()
const port = 3000


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.send({ "status": "error", "error": "file is required" });
            return;
        }
        await uploadBlob(file.buffer, file.originalname)
        res.send({ "status": "success" });
    } catch (err) {
        res.send({ "status": "error", "error": err });

    }

});

app.get('/', async (req, res) => {
    try {
        const results = [];
        if (!req.query?.dataset) {
            res.send({ "status": "error", "error": "dataset is required" });
            return;
        }
        const dataset = `./public/${req.query.dataset}`
        if (!fs.existsSync(dataset)) {
            await downloadBlob(req.query.dataset)
        }
        fs.createReadStream(dataset)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data)
            })
            .on('end', () => {
                const out = {
                    "status": "success",
                    "data": results.slice(0, 10)
                }
                res.send(out);
            });
    } catch (err) {
        res.send({ "status": "error", "error": err });
    }

})

app.get('/count', async (req, res) => {
    const results = [];
    if (!req.query?.dataset) {
        res.send({ "error": "dataset is required" });
        return;
    }

    const dataset = `./public/${req.query.dataset}`
    if (!fs.existsSync(dataset)) {
        await downloadBlob(req.query.dataset)
    }
    if (req.query?.by) {
        fs.createReadStream(dataset)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data)
            })
            .on('error', (err) => {
                console.log(err)
            })
            .on('end', () => {
                const getCounts = (by) => {
                    const counts = results.reduce((acc, curr, currIndex) => {
                        if (currIndex === 1) {
                            acc = {}
                        }
                        if (acc[curr[by]]) {
                            acc[curr[by]] += 1;
                        } else {
                            acc[curr[by]] = 1;
                        }
                        return acc;
                    })
                    return counts;
                }
                const counts = getCounts(req.query.by);
                const out = {
                    "status": "success",
                    "data": counts
                }
                res.send(out);
            });
    } else {
        res.send({});
    }


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})