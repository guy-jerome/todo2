import express from "express"
import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: process.env.DB_PASS,
  port: 5432
})

app.use(express.json())
app.use(express.static("public"))

//GET ALL
app.get('/api/todo', async (req,res,next)=>{
  const client = await pool.connect()
  try{
  const result = await client.query('SELECT * FROM todo;')
  const data = result.rows
  res.status(200).json(data)
  }catch (err){
  next(err)
  }finally{
    client.release()
  }
})
//GET ONE
app.get('/api/todo/:id', async (req,res,next)=>{
  const id = req.params.id
  const client = await pool.connect()
  try{
  const result = await client.query('SELECT * FROM todo WHERE id = $1', [id])
  const data = result.rows
  res.status(200).json(data)
  }catch (err){
  next(err)
  }finally{
    client.release()
  }
})
//CREATE ONE
app.post('/api/todo', async (req,res,next)=>{
  const {name} = req.body
  const client = await pool.connect()
  try{
  const result = await client.query('INSERT INTO todo (name) VALUES ($1) RETURNING *;',[name])
  const data = result.rows
  res.status(200).json(data)
  }catch (err){
  next(err)
  }finally{
    client.release()
  }
})
//DELETE ONE
app.delete('/api/todo/:id', async (req,res,next)=>{
  const id = req.params.id
  const client = await pool.connect()
  try{
  const result = await client.query('DELETE FROM todo WHERE id = $1 RETURNING *;', [id])
  const data = result.rows
  res.status(200).json(data)
  }catch (err){
  next(err)
  }finally{
    client.release()
  }
})
//UPDATE ONE
app.put('/api/todo/:id', async (req,res,next)=>{
  const id = req.params.id
  const {name} = req.body
  const client = await pool.connect()
  try{
  const result = await client.query('UPDATE todo SET name=$1 WHERE id=$2 RETURNING *',[name,id])
  const data = result.rows
  res.status(200).json(data)
  }catch (err){
  next(err)
  }finally{
    client.release()
  }
})


app.use((err,res)=>{
  console.log(err)
  res.status(500).json({error:"Internal Error"})
})

app.listen(port,()=>{
  console.log("Server listening on Port:",port)
})