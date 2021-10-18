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

const editUser = {
  full_name: 'test edit',
  phone_number: '1231323212',
  identity_card_number: '123123321321',
  identity_card_address: 'test edit ICD',
  gender: 'female',
  date_of_birth: '2020-05-10',
  email: 'testedit@mail.com',
  password: 'rahasia123',
  domisili_address: 'test edit papua'
}

let userToken1;
// let userToken1, userToken2
let invalidToken =
  "22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvbm9AbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMTYzNDYyfQ.WhdvxtOveekRlXU0-KbuFv7vvsZsciDBKSDugxIX19g";

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

describe("GET /user [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken({ id: data.id, email: data.email }, "rahasia123");
        return User.create(user2);
      })
      .then((data2) => {
        userToken2 = signToken(
          { id: data2.id, email: data2.email },
          "secret"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => {
        return queryInterface.bulkDelete("Users", {});
      })
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  test("Should return object with id, full_name, email, domisili_address, phone_number, identity_card_number, identity_card_address, gender, date_of_birth. with status code 200", (done) => {
    request(app)
      .get("/user")
      .set("access_token", userToken1)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("id", response.body.id)
        expect(response.body).toHaveProperty("full_name", response.body.full_name)
        expect(response.body).toHaveProperty("email", response.body.email)
        expect(response.body).toHaveProperty("phone_number", response.body.phone_number)
        expect(response.body).toHaveProperty("identity_card_number", response.body.identity_card_number)
        expect(response.body).toHaveProperty("identity_card_address", response.body.identity_card_address)
        expect(response.body).toHaveProperty("gender", response.body.gender)
        expect(response.body).toHaveProperty("date_of_birth", response.body.date_of_birth)
        expect(response.body).toHaveProperty("domisili_address", response.body.domisili_address)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("GET /user [CASE FAILED]", () => {
  // beforeAll((done) => {
  //   User.create(user)
  //     .then((data) => {
  //       userToken1 = signToken({ id: data.id, email: data.email }, "rahasia123");
  //       return User.create(user2);
  //     })
  //     .then((data2) => {
  //       userToken2 = signToken(
  //         { id: data2.id, email: data2.email },
  //         "secret"
  //       );
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken({ id: data.id, email: data.email }, "rahasia123");
        done()
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => {
        return queryInterface.bulkDelete("Users", {});
      })
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  test("Case Without Token should return error message 'Please Login first' with status code 401", (done) => {
    request(app)
      .get("/user")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Please Login First");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Case Invalid Token should return error message 'Invalid Token' with status code 401", (done) => {
    request(app)
      .get("/user")
      .set("access_token", invalidToken)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

})

describe("PUT /edit/profile [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken({ id: data.id, email: data.email }, "rahasia123");
        done()
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => {
        return queryInterface.bulkDelete("Users", {});
      })
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  test("Should return object with id, full_name, email, phone_number, identity_card_number, identity_card_address, gender, date_of_birth with status code 200", (done) => {
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUser)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("id", response.body.id)
        expect(response.body).toHaveProperty("full_name", response.body.full_name)
        expect(response.body).toHaveProperty("email", response.body.email)
        expect(response.body).toHaveProperty("phone_number", response.body.phone_number)
        expect(response.body).toHaveProperty("identity_card_number", response.body.identity_card_number)
        expect(response.body).toHaveProperty("identity_card_address", response.body.identity_card_address)
        expect(response.body).toHaveProperty("gender", response.body.gender)
        expect(response.body).toHaveProperty("date_of_birth", response.body.date_of_birth)
        expect(response.body).toHaveProperty("domisili_address", response.body.domisili_address)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe("PUT /edit/profile [CASE FAILED]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken({ id: data.id, email: data.email }, "rahasia123");
        done()
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => {
        return queryInterface.bulkDelete("Users", {});
      })
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  test("Case Without Token should return error message 'Please Login first' with status code 401", (done) => {
    request(app)
      .get("/edit/profile")
      .send(editUser)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Please Login First");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Case Invalid Token should return error message 'Invalid Token' with status code 401", (done) => {
    request(app)
      .get("/edit/profile")
      .set("access_token", invalidToken)
      .send(editUser)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Full Name is '' Should return error with status code 400", (done) => {
    const editUserWithoutFullName = {
      full_name: '',
      phone_number: '1231323212',
      identity_card_number: '123123321321',
      identity_card_address: 'test edit ICD',
      gender: 'female',
      date_of_birth: '2020-05-10',
      email: 'testedit@mail.com',
      password: 'rahasia123',
      domisili_address: 'test edit papua'
    }
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutFullName)
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

  test("Full Name is null Should return error with status code 400", (done) => {
    const editUserWithoutFullName = {
      full_name: null,
      phone_number: '1231323212',
      identity_card_number: '123123321321',
      identity_card_address: 'test edit ICD',
      gender: 'female',
      date_of_birth: '2020-05-10',
      email: 'testedit@mail.com',
      password: 'rahasia123',
      domisili_address: 'test edit papua'
    }
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutFullName)
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

  test("Email is '' Should return error with status code 400", (done) => {
    const editUserWithoutEmail = {
      full_name: 'test edit',
      phone_number: '1231323212',
      identity_card_number: '123123321321',
      identity_card_address: 'test edit ICD',
      gender: 'female',
      date_of_birth: '2020-05-10',
      email: '',
      password: 'rahasia123',
      domisili_address: 'test edit papua'
    }
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutEmail)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Must be email format",
            "Please fill the Email's Column"
          ]
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test("Email is null Should return error with status code 400", (done) => {
    const editUserWithoutEmail = {
      full_name: 'test edit',
      phone_number: '1231323212',
      identity_card_number: '123123321321',
      identity_card_address: 'test edit ICD',
      gender: 'female',
      date_of_birth: '2020-05-10',
      email: null,
      password: 'rahasia123',
      domisili_address: 'test edit papua'
    }
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutEmail)
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual({
          message: [
            "Please fill the Email's Column"
          ]
        })
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  test("Password is '' Should return error with status code 400", (done) => {
    const editUserWithoutPassword = {
      full_name: 'test edit',
      phone_number: '1231323212',
      identity_card_number: '123123321321',
      identity_card_address: 'test edit ICD',
      gender: 'female',
      date_of_birth: '2020-05-10',
      email: 'testedit@mail.com',
      password: '',
      domisili_address: 'test edit papua'
    }
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutPassword)
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

  test("Password is null Should return error with status code 400", (done) => {
    const editUserWithoutPassword = {
      full_name: 'test edit',
      phone_number: '1231323212',
      identity_card_number: '123123321321',
      identity_card_address: 'test edit ICD',
      gender: 'female',
      date_of_birth: '2020-05-10',
      email: 'testedit@mail.com',
      password: null,
      domisili_address: 'test edit papua'
    }
    request(app)
      .put("/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutPassword)
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
})