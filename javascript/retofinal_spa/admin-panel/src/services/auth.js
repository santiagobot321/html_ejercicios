export async function userAuth (email, passwd) {
    const usuario = await fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => data.find(user => user.email === email && user.password === passwd ))
    return usuario
}