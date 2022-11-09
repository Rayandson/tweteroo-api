import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors())
app.use(express.json())
const mongoClient = new MongoClient("mongodb://localhost:27017");
let db;

const users = [];
const tweets  = []

mongoClient.connect().then(() => {
    db = mongoClient.db("tweterooBD")
})

app.post('/sign-up', (req, res) => {
const {username, avatar} = req.body;
if(!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios")
    return
}
const newUser = {username: username, avatar: avatar}
db.collection("users").insert(newUser).then((response) => {
    res.status(201).send("OK")
})
})


app.post('/tweets', (req, res) => {
    const {username, avatar, tweet} = req.body;
    if(!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios")
        return
    }
    // const user = users.find((obj) => obj.username === username)
    
    const newTweet = {username: username, avatar: avatar, tweet: tweet}
     db.collection("tweets").insert(newTweet).then(() => {
        res.status(201).send("OK")
     })
    })

app.get('/tweets', (req, res) => {
    db.collection("tweets").find().toArray().then( tweets => {
        console.log(tweets)
        res.send(tweets.slice(-10).reverse())
    })
})

// app.get('/tweets/:username', (req, res) => {
//     db.collection("tweets").find().toArray().then( tweets => {
//     const userTweets = tweets.filter((t) => (req.params.username === t.username))
//     if(userTweets.length === 0) {
//         res.status(404).send("Usuário não encontrado")
//     } else {
//         res.send(userTweets)
//     }
// })
// })


app.listen(5000)