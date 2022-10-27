import { createServer } from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import { nanoid } from 'nanoid';
import  {startVdata } from './dataStart.js';

const app = new Koa();
const notes = startVdata;
app.use(cors());
app.use(koaBody({
  json: true,
  urlencoded: true,
  multipart: true,
}));
const router = new Router();

router.get('/notes', async (ctx, next) => {
  ctx.response.body = notes;
});

router.post('/notes', async(ctx, next) => {
notes.push({text: ctx.request.body, id: nanoid()});
  ctx.response.status = 201;
});

router.delete('/notes/:id', async(ctx, next) => {
  const noteId = ctx.params.id;
  const index = notes.findIndex((o) => o.id === noteId);
  if(index !== -1) {
    notes.splice(index, 1);
    ctx.response.status = 204;
  } else { ctx.response.status = 400}
  
})

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 8080;
const server = createServer(app.callback());
server.listen(port, () => console.log('server started'));
