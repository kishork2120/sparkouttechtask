// User registeration
export async function registerUserService(body){
  return await fetch(`/user/register`,{
      method:"POST",
      headers: {'Content-Type':'application/json'},
      body
  }).then((d)=>d.json())
}

// Login user with local strategy
export async function loginUserService(body){
  return await fetch(`/user/login`,{
      method:"POST",
      headers: {'Content-Type':'application/json'},
      body
  }).then((d)=>d.json())
}

// Logout user
export async function logoutUserService(){
  return await fetch(`/user/logout`,{
      method:"DELETE",
      headers: {'Content-Type':'application/json'}
  }).then((d)=>d.json())
}
