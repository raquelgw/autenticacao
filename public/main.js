const pre = document.querySelector('pre')

// LOGIN
const form = document.querySelector('form')
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = form.username.value
  const password = form.password.value
  const response = await fetch('/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  const data = await response.json()
  pre.textContent = response.status + "\n" + JSON.stringify(data, null, 2)
  if (!response.ok) {
    console.error('Login failed', data)
    if (data.token)
      localStorage.setItem('token', data.token)
    alert('Login failed')
    return
  }

  console.log('Login success', data)
  window.location.href="lista.html";
 
  localStorage.setItem('token', data.token)

})

document.querySelector('button.get-token').addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`/token/${token}`)
  const data = await response.json()
  pre.textContent = response.status + "\n" + JSON.stringify(data, null, 2)
  if (!response.ok) {
    console.error('Token failed', data)
    alert('Token failed')
    return
  }
  console.log('Token success', data)
})

document.querySelector('button.get-users').addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`/users/${token}`)
  const data = await response.json()
  pre.textContent = response.status + "\n" + JSON.stringify(data, null, 2)
  if (!response.ok) {
    console.error('Get users failed', data)
    alert('Get users failed')
    return
  }
  console.log('Get users success', data)
})  

document.querySelector('button.logout').addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`/token/${token}`, { method: 'DELETE' })
  pre.textContent = response.status
  if (!response.ok) {
    console.error('Logout failed')
    alert('Logout failed')
    return
  }
  console.log('Logout success')
  localStorage.removeItem('token')
})