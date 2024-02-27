const express = require('express')
const csv = require('csv-parser')
const fs = require('fs')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    const results = [];
    fs.createReadStream('./public/ev.csv')
        .pipe(csv())
        .on('data', (data) => {
            results.push(data)
        }
        )
        .on('end', () => {
            console.log(results);
            res.send(JSON.stringify(results.slice(0, 10)));
        });
})

app.get('/count', (req, res) => {
    const results = [];
    if(req.query?.by){
        fs.createReadStream('./public/ev.csv')
            .pipe(csv())
            .on('data', (data) => {
                results.push(data)
            })
            .on('end', () => {
                console.log(results);
                const getCounts = (by) => {
                    const counts = results.reduce((acc, curr, currIndex) => {
                        if(currIndex === 1){
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
                res.send(JSON.stringify(counts));
            });
    } else {
        res.send(JSON.stringify({}));
    }
    
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})