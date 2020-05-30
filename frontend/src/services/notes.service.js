// Get all Notes
export async function getNotesListService(){
  return await fetch(`/notes/getNotesList`,{
      method: 'GET'
  }).then((d)=>d.json())
}

// Create Notes
export async function addNotes(body){
  return await fetch(`/notes/addNotes`,{
      method:"POST",
      headers: {'Content-Type':'application/json'},
      body
  }).then((d)=>d.json())
}

// Update Notes details
export async function editNotes(body){
  return await fetch(`/notes/editNotes`,{
      method:"PUT",
      headers: {'Content-Type':'application/json'},
      body
  }).then((d)=>d.json())
}

// Delete Notes
export async function deleteNotes(body){
  return await fetch(`/notes/deleteNotes`,{
      method:"DELETE",
      headers: {'Content-Type':'application/json'},
      body
  }).then((d)=>d.json())   
}
