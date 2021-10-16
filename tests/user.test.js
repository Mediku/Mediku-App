const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const { signToken } = require('../helpers/jwt')


const user = {
  full_name: 'testing bosku',
  email: 'test1@mail.com',
  password: 'rahasia123'
}

const user2 = {
  full_name: 'testing bossku',
  email: 'test2@mail.com',
  password: 'rahasia123'
}

describe('POST /register [CASE SUCCESS]', () => {
  beforeAll(done => {
    User.create(user2)
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => done())
      .catch(err => done(err));
  });

  test('Should return object with id, email, full_name, status code 201', (done) => {
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(user)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("full_name", user.full_name)
        expect(response.body).toHaveProperty("email", user.email)
        expect(response.body).not.toHaveProperty("password", user.password)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('POST /register [CASE FAILED]', () => {
  beforeAll(done => {
    User.create(user2)
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => done())
      .catch(err => done(err));
  });

  test('Full Name is Null, should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: null,
      email: 'test1@mail.com',
      password: 'rahasia123'
    }
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(userFailed)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Please fill the Full Name's Column"
          ]
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Full Name is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: '',
      email: 'test1@mail.com',
      password: "rahasia123"
    }
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(userFailed)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Please fill the Full Name's Column"
          ]
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Password is Null, should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: 'test1',
      email: 'test1@mail.com',
      password: null
    }
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(userFailed)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Please fill the Password's Column"
          ]
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Password is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: 'test1',
      email: 'test1@mail.com',
      password: ""
    }
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(userFailed)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Please fill the Password's Column"
          ]
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test('Email is Null, should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: 'test1',
      email: null,
      password: 'rahasia123'
    };
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Please fill the Email's Column",
          ]
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test('Email is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: 'test1',
      email: "",
      password: 'rahasia123'
    };
    request(app)
      .post('/register')
      .set('Accept', 'application/json')
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Must be email format",
            "Please fill the Email's Column",
          ]
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("Email already registered, should return bad request message, status code 400", (done) => {
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send(user2)
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: `${user2.email} already registered` //based on file error handler
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("Must be email format, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: 'test1',
      email: "test1",
      password: "rahasia123"
    };
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            'Must be email format'
          ]
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('POST /login [CASE SUCCESS]', () => {
  beforeAll(done => {
    User.create(user)
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Users', {})
      .then(() => done())
      .catch(err => done(err));
  });

  test('Should return object with id, email, role, status code 200', (done) => {
    const userSuccess = {
      email: 'test1@mail.com',
      password: 'rahasia123'
    }
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(userSuccess)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body).not.toHaveProperty("password", userSuccess.password)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("email", userSuccess.email)
        expect(response.body).toHaveProperty("full_name", expect.any(String))
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("POST /login [CASE FAILED]", () => {
  test("Email is wrong return Email/Password is wrong and status code 401", (done) => {
    const user = {
      email: "test2@mail.com",
      password: "rahasia123"
    }
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body).toEqual({
          message: "Email/Password is wrong"
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  test("Password is wrong return Email/Password is wrong and status code 401", (done) => {
    const user = {
      email: 'test1@mail.com',
      password: "rahasia"
    }
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(401)
        expect(response.body).toEqual({
          message: "Email/Password is wrong"
        })
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})