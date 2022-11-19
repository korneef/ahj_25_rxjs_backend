const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const { json } = require('body-parser');
const app = new Koa();
const Router = require('koa-router');

const router = new Router();
const { faker } = require('@faker-js/faker/locale/ru');

const server = http.createServer(app.callback());
const usersId = [];

const messages = [];

class Message {
  constructor(email, text, date, id) {
    this.email = email;
    this.text = text;
    this.date = date;
  }
}

setInterval(() => {
  const message = new Message(faker.internet.email(), faker.lorem.paragraph(), Date.now())
  messages.push(message);
}, 10000)

router.get('/messages/unread', async (ctx) => {
  ctx.response.body = JSON.stringify(messages);
});

app.use(koaBody({
  urlencoded: true,
}));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
server.listen(port);