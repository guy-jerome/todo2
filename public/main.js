//GET ALL
async function getAll(){
  try{
    const res = await fetch('/api/todo')
    const data = await res.json()
    return data
  }catch (err){
    console.error(err)
  }
}
//GET ONE
async function getOne(id){
  try{
    const res = await fetch(`/api/todo/${id}`)
    const data = await res.json()
    return data
  }catch (err){
    console.error(err)
  }
}
//CREATE ONE
async function createOne(body){
  try{
    const res = await fetch('/api/todo',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    })
    const data = await res.json()
    return data
  }catch (err){
    console.error(err)
  }
}

//DELETE ONE
async function deleteOne(id){
  try{
    const res = await fetch(`/api/todo/${id}`,{
      method: 'DELETE'
    })
    const data = await res.json()
    return data
  }catch (err){
    console.error(err)
  }
}
//UPDATE ONE
async function updateOne(id, body){
  try{
    const res = await fetch(`/api/todo/${id}`,{
      method: 'PUT',
      headers: {'Content-Type':'application/data'},
      body: JSON.stringify(body)
    })
    const data = await res.json()
    return data
  }catch (err){
    console.error(err)
  }
}