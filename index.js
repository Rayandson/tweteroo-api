import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
const {username, avatar} = req.body;
const id = users.length + 1;
const newUser = {id: id, username: username, avatar: avatar}
 users.push(newUser)
res.send("OK")
})


app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    const id = tweets.length + 1;
    const user = users.find((obj) => obj.username === username)
    const newTweet = {id: id, username: username, avatar: user.avatar, tweet: tweet}
     tweets.push(newTweet)
    res.send("OK")
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




app.listen(5000)