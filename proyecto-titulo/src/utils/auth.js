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

const doLogin = (loginData) => new Promise((resolve, reject) => {
  const user = users.find((user) => user.email === loginData.email && user.password === loginData.password);
  if (user) {
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    resolve(user);
  } else {
    reject(new Error('Usuario o contraseña incorrectos'));
  }
});

const getLoggedUser = () => new Promise((resolve, reject) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  if (loggedUser) {
    resolve(loggedUser);
  } else {
    reject(new Error('No hay un usuario logueado'));
  }
});

const doLogout = () => new Promise((resolve) => {
  localStorage.removeItem('loggedUser');
  resolve();
});

export {
  doLogin,
  getLoggedUser,
  doLogout,
}