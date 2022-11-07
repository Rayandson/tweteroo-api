import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
const {username, avatar} = req.body;
if(!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios")
    return
}
const id = users.length + 1;
const newUser = {id: id, username: username, avatar: avatar}
 users.push(newUser)
 res.status(201).send("OK")
})


app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    if(!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios")
        return
    }
    const id = tweets.length + 1;
    const user = users.find((obj) => obj.username === username)
    const newTweet = {id: id, username: username, avatar: user.avatar, tweet: tweet}
     tweets.push(newTweet)
    res.status(201).send("OK")
    })

app.get('/tweets', (req, res) => {
    const tweetsToSend = []
    if(tweets.length <= 10) {
        for(let i=0; i < tweets.length; i++) {
            tweetsToSend.push(tweets[i])
        }
    } else {
        for(let i=0; i < 10; i++) {
            tweetsToSend.push(tweets[i])
        } 
    }
    res.send(tweetsToSend)
})

app.get('/tweets/:username', (req, res) => {
    const userTweets = tweets.filter((t) => (req.params.username === t.username))
    if(userTweets.length === 0) {
        res.status(404).send("Usuário não encontrado")
    } else {
        res.send(userTweets)
    }
})


app.listen(5000)