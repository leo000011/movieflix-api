import { Prisma } from "@prisma/client";
import express from "express";
import {PrismaClient} from '@prisma/client'

const port = 3000;
const app = express();
const prisma = new PrismaClient;

app.use(express.json())

app.get("/movies", async (_, res) => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      title: 'asc'
    },
    include: {
      genres: true,
      language: true
    }
  });
  res.json(movies)
})

app.post("/movies", async (req, res) => {

  const {title, genre_id, language_id, oscar_count, release_date} = req.body

try { 
  await prisma.movie.create({
    data: {
      title,
      genre_id,
      language_id,
      oscar_count,
      release_date: new Date(release_date)
    }
  })
} catch(err) {
  return res.status(500).send({mesangem: "Falha ao cadastra um filme"})
}


  res.status(201).send()
})


app.listen(port, () => {
  console.log('Servidor em exercução em http://localhost:3000/')
})