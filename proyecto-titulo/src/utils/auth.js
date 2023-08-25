const users = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@mail.com',
    password: 'admin',
  },
  {
    id: 2,
    name: 'Usuario X',
    email: 'user@mail.com',
    password: 'user',
  },
  {
    id: 3,
    name: 'Felipe',
    email: 'felipe@mail.com',
    password: 'felipe',
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