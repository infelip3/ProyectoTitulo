const users = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@mail.com',
    password: 'admin',
    role: 'admin'
  },
  {
    id: 2,
    name: 'UsuarioPlus',
    email: 'plus@mail.com',
    password: 'plus',
    role: 'admin'
  },
  {
    id: 3,
    name: 'Usuario',
    email: 'user@mail.com',
    password: 'user',
    role: 'user'
  },
];

let loggedUser = null;

const doLogin = (loginData) => new Promise((resolve, reject) => {
  const user = users.find((user) => user.email === loginData.email && user.password === loginData.password);
  if (user) {
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    loggedUser = user;

    resolve(user);
  } else {
    loggedUser = null;

    reject(new Error('Usuario o contraseña incorrectos'));
  }
});

const doLogout = () => new Promise((resolve) => {
  localStorage.removeItem('loggedUser');
  loggedUser = null;
  
  resolve();
});

const getLoggedUser = () => localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : null;

export {
  doLogin,
  getLoggedUser,
  doLogout,
}