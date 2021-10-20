const app = require("../app");
const request = require("supertest");
const { User, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");

const user = {
  full_name: "testing bosku",
  email: "test1@mail.com",
  password: "rahasia123",
  phone_number: "081208120812",
  identity_card_number: "01010101010",
  identity_card_address: "test identity_card_address",
  gender: "male",
  date_of_birth: "2020-04-10",
  province: "Sumatera Utara",
  regency: "Kota Medan",
  district: "Medan Kota",
  sub_district: "Pasar Baru",
  RT: "01",
  RW: "02",
};

const user2 = {
  full_name: "testing bossku",
  email: "test2@mail.com",
  password: "rahasia123",
  phone_number: "081208120812",
  identity_card_number: "01010101010",
  identity_card_address: "test identity_card_address",
  gender: "male",
  date_of_birth: "2020-04-10",
  province: "Sumatera Utara",
  regency: "Kota Medan",
  district: "Medan Kota",
  sub_district: "Pasar Baru",
  RT: "01",
  RW: "02",
};

const editUser = {
  full_name: "test edit",
  email: "testedit@mail.com",
  password: "rahasia123",
  phone_number: "1231323212",
  identity_card_number: "123123321321",
  identity_card_address: "test edit ICD",
  gender: "female",
  date_of_birth: "2020-05-10",
  regency: "Kota Medan",
  district: "Medan Kota",
  sub_district: "Pasar Baru",
  RT: "01",
  RW: "02",
};

let userToken1, userToken2;
let invalidToken =
  "22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvbm9AbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMTYzNDYyfQ.WhdvxtOveekRlXU0-KbuFv7vvsZsciDBKSDugxIX19g";

describe("POST /users/register [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user2)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test("Should return object with id, full_name, email, phone_number, identity_card_number, identity_card_address, gender, date_of_birth, province, regency, district, sub_district, RT, RW with status code 201", (done) => {
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty(
          "full_name",
          response.body.full_name
        );
        expect(response.body).toHaveProperty("email", response.body.email);
        expect(response.body).not.toHaveProperty("password", user.password);
        expect(response.body).toHaveProperty(
          "phone_number",
          response.body.phone_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_number",
          response.body.identity_card_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_address",
          response.body.identity_card_address
        );
        expect(response.body).toHaveProperty("gender", response.body.gender);
        expect(response.body).toHaveProperty(
          "date_of_birth",
          response.body.date_of_birth
        );
        expect(response.body).toHaveProperty(
          "province",
          response.body.province
        );
        expect(response.body).toHaveProperty(
          "district",
          response.body.district
        );
        expect(response.body).toHaveProperty(
          "sub_district",
          response.body.sub_district
        );
        expect(response.body).toHaveProperty("RT", response.body.RT);
        expect(response.body).toHaveProperty("RW", response.body.RW);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/register [CASE FAILED]", () => {
  beforeAll((done) => {
    User.create(user2)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test("Full Name is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: null,
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Full Name's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Full Name is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Full Name's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Password is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: null,
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Password's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Password is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Password's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: null,
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Email's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Email is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Must be email format", "Please fill the Email's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email already registered, should return bad request message, status code 400", (done) => {
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(user2)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: `${user2.email} already registered`, //based on file error handler
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Must be email format, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test1",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Must be email format"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Phone Number is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: null,
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Phone Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Phone Number is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Phone Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Identity Card Number is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: null,
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Identity Card Number is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Identity Card Address is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: null,
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Address's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Identity Card Address is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Address's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Gender is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: null,
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Gender's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Gender is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Gender's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Date of Birth is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: null,
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Date of Birth's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Date of Birth is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Date of Birth's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Province is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: null,
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Province's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Province is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Province's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Regency is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: null,
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Regency's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Regency is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Regency's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("District is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: null,
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('District is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Sub District is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: null,
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Sub District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Sub District is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "",
      RT: "01",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Sub District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("RT is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: null,
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RT's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('RT is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "",
      RW: "02",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RT's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("RW is Null, should return bad request message, status code 400", (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: null,
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RW's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('RW is "", should return bad request message, status code 400', (done) => {
    const userFailed = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "",
    };
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(userFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RW's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/login [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((_) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  afterAll((done) => {
    queryInterface
      .bulkDelete("Users", {})
      .then(() => done())
      .catch((err) => done(err));
  });

  test("Should return object with id, email, role, status code 200", (done) => {
    const userSuccess = {
      email: "test1@mail.com",
      password: "rahasia123",
    };
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(userSuccess)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty(
          "password",
          userSuccess.password
        );
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("email", userSuccess.email);
        expect(response.body).toHaveProperty("full_name", expect.any(String));
        expect(response.body).toHaveProperty(
          "phone_number",
          response.body.phone_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_number",
          response.body.identity_card_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_address",
          response.body.identity_card_address
        );
        expect(response.body).toHaveProperty("gender", response.body.gender);
        expect(response.body).toHaveProperty(
          "date_of_birth",
          response.body.date_of_birth
        );
        expect(response.body).toHaveProperty(
          "province",
          response.body.province
        );
        expect(response.body).toHaveProperty("regency", response.body.regency);
        expect(response.body).toHaveProperty(
          "district",
          response.body.district
        );
        expect(response.body).toHaveProperty(
          "sub_district",
          response.body.sub_district
        );
        expect(response.body).toHaveProperty("RT", response.body.RT);
        expect(response.body).toHaveProperty("RW", response.body.RW);
        expect(response.body).toHaveProperty(
          "access_token",
          response.body.access_token
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /users/login [CASE FAILED]", () => {
  test("Email is wrong return Email/Password is wrong and status code 401", (done) => {
    const user = {
      email: "test2@mail.com",
      password: "rahasia123",
    };
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          message: "Email/Password is wrong",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Password is wrong return Email/Password is wrong and status code 401", (done) => {
    const user = {
      email: "test1@mail.com",
      password: "rahasia",
    };
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          message: "Email/Password is wrong",
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /users/logined [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken(
          { id: data.id, email: data.email },
          "rahasia123"
        );
        return User.create(user2);
      })
      .then((data2) => {
        userToken2 = signToken({ id: data2.id, email: data2.email }, "secret");
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

  test("Should return object with id, full_name, email, phone_number, identity_card_number, identity_card_address, gender, date_of_birth, province, regency, district, sub_district, RT, RW with status code 200", (done) => {
    request(app)
      .get("/users/logined")
      .set("access_token", userToken1)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("id", response.body.id);
        expect(response.body).toHaveProperty(
          "full_name",
          response.body.full_name
        );
        expect(response.body).toHaveProperty("email", response.body.email);
        expect(response.body).toHaveProperty(
          "phone_number",
          response.body.phone_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_number",
          response.body.identity_card_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_address",
          response.body.identity_card_address
        );
        expect(response.body).toHaveProperty("gender", response.body.gender);
        expect(response.body).toHaveProperty(
          "date_of_birth",
          response.body.date_of_birth
        );
        expect(response.body).toHaveProperty(
          "province",
          response.body.province
        );
        expect(response.body).toHaveProperty("regency", response.body.regency);
        expect(response.body).toHaveProperty(
          "district",
          response.body.district
        );
        expect(response.body).toHaveProperty(
          "sub_district",
          response.body.sub_district
        );
        expect(response.body).toHaveProperty("RT", response.body.RT);
        expect(response.body).toHaveProperty("RW", response.body.RW);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /users/logined [CASE FAILED]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken(
          { id: data.id, email: data.email },
          "rahasia123"
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

  test("Case Without Token should return error message 'Please Login first' with status code 401", (done) => {
    request(app)
      .get("/users/logined")
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
      .get("/users/logined")
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
});

describe("PUT /users/edit/profile [CASE SUCCESS]", () => {
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToken1 = signToken(
          { id: data.id, email: data.email },
          "rahasia123"
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

  test("Should return object with id, full_name, email, phone_number, identity_card_number, identity_card_address, gender, date_of_birth, province, regency, district, sub_district, RT, RW with status code 200", (done) => {
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUser)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty("password");
        expect(response.body).toHaveProperty("id", response.body.id);
        expect(response.body).toHaveProperty(
          "full_name",
          response.body.full_name
        );
        expect(response.body).toHaveProperty("email", response.body.email);
        expect(response.body).toHaveProperty(
          "phone_number",
          response.body.phone_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_number",
          response.body.identity_card_number
        );
        expect(response.body).toHaveProperty(
          "identity_card_address",
          response.body.identity_card_address
        );
        expect(response.body).toHaveProperty("gender", response.body.gender);
        expect(response.body).toHaveProperty(
          "date_of_birth",
          response.body.date_of_birth
        );
        expect(response.body).toHaveProperty(
          "province",
          response.body.province
        );
        expect(response.body).toHaveProperty(
          "district",
          response.body.district
        );
        expect(response.body).toHaveProperty(
          "sub_district",
          response.body.sub_district
        );
        expect(response.body).toHaveProperty("RT", response.body.RT);
        expect(response.body).toHaveProperty("RW", response.body.RW);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /users/edit/profile [CASE FAILED]", () => {
  let userToEdit;
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToEdit = data;
        userToken1 = signToken(
          { id: data.id, email: data.email },
          "rahasia123"
        );
        return User.create(user2);
      })
      .then((data2) => {
        userToken2 = signToken(
          { id: data2.id, email: data2.email },
          "rahasia123"
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

  test("Case Without Token should return error message 'Please Login first' with status code 401", (done) => {
    request(app)
      .get("/users/edit/profile")
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
      .get("/users/edit/profile")
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
      full_name: "",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutFullName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Full Name's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Full Name is null Should return error with status code 400", (done) => {
    const editUserWithoutFullName = {
      full_name: null,
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutFullName)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Full Name's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email is '' Should return error with status code 400", (done) => {
    const editUserWithoutEmail = {
      full_name: "testing bossku",
      email: "",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Must be email format", "Please fill the Email's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email is null Should return error with status code 400", (done) => {
    const editUserWithoutEmail = {
      full_name: "testing bossku",
      email: null,
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutEmail)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Email's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Email already registered, should return bad request message, status code 400", (done) => {
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken2)
      .set("Accept", "application/json")
      .send(user)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: `${user.email} already registered`, //based on file error handler
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Must be email format, should return bad request message, status code 400", (done) => {
    const editUserFailed = {
      full_name: "testing bossku",
      email: "test1",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserFailed)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Must be email format"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Password is '' Should return error with status code 400", (done) => {
    const editUserWithoutPassword = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutPassword)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Password's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Password is null Should return error with status code 400", (done) => {
    const editUserWithoutPassword = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: null,
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .send(editUserWithoutPassword)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Password's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Phone Number is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutPhoneNumber = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: null,
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutPhoneNumber)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Phone Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Phone Number is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutPhoneNumber = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutPhoneNumber)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Phone Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Identity Card Number is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutICN = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: null,
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutICN)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Identity Card Number is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutICN = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutICN)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Number's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Identity Card Address is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutICA = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: null,
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutICA)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Address's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Identity Card Address is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutICA = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutICA)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Identity Card Address's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Gender is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutGender = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: null,
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutGender)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Gender's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Gender is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutGender = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutGender)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Gender's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Date of Birth is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutDOB = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: null,
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutDOB)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Date of Birth's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Date of Birth is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutDOB = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutDOB)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Date of Birth's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Province is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutProvince = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: null,
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutProvince)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Province's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Province is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutProvince = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutProvince)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Province's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Regency is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutRegency = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: null,
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutRegency)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Regency's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Regency is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutRegency = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutRegency)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Regency's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("District is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutDistrict = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: null,
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutDistrict)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('District is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutDistrict = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutDistrict)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Sub District is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutSubDistrict = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: null,
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutSubDistrict)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Sub District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Sub District is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutSubDistrict = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "",
      RT: "01",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutSubDistrict)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the Sub District's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("RT is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutRT = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: null,
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutRT)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RT's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('RT is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutRT = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "",
      RW: "02",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutRT)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RT's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("RW is Null, should return bad request message, status code 400", (done) => {
    const editUserWithoutRW = {
      full_name: "testing bossku",
      email: "test@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: null,
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutRW)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RW's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('RW is "", should return bad request message, status code 400', (done) => {
    const editUserWithoutRW = {
      full_name: "testing bossku",
      email: "test2@mail.com",
      password: "rahasia123",
      phone_number: "081208120812",
      identity_card_number: "01010101010",
      identity_card_address: "test identity_card_address",
      gender: "male",
      date_of_birth: "2020-04-10",
      province: "Sumatera Utara",
      regency: "Kota Medan",
      district: "Medan Kota",
      sub_district: "Pasar Baru",
      RT: "01",
      RW: "",
    };
    request(app)
      .put("/users/edit/profile")
      .set("access_token", userToken1)
      .set("Accept", "application/json")
      .send(editUserWithoutRW)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: ["Please fill the RW's Column"],
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Delete /users/:id [CASE SUCCESS]", () => {
  let userToDelete;
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToDelete = data;
        userToken1 = signToken(
          { id: data.id, email: data.email },
          "rahasia123"
        );
        return User.create(user2);
      })
      .then((data2) => {
        userToken2 = signToken(
          { id: data2.id, email: data2.email },
          "rahasia123"
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

  test("Should return object with message 'User <User.full_name> has been deleted' with status code 200", (done) => {
    request(app)
      .delete(`/users/${userToDelete.id}`)
      .set("access_token", userToken1)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          message: `User ${userToDelete.full_name} has been deleted`,
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Delete /user [CASE FAILED]", () => {
  let userToDelete1;
  let userToDelete2;
  let userToDeleteFailed = {
    id: 0,
  };
  if (userToDelete1) {
    userToDeleteFailed.id = +userToDelete1.id + 1;
  }
  beforeAll((done) => {
    User.create(user)
      .then((data) => {
        userToDelete1 = data;
        userToken1 = signToken(
          { id: data.id, email: data.email },
          "rahasia123"
        );
        return User.create(user2);
      })
      .then((data2) => {
        userToDelete2 = data2;
        userToken2 = signToken(
          { id: data2.id, email: data2.email },
          "rahasia123"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Case Rejected by Authorization return error message 'Invalid Token' with status code 403", (done) => {
    request(app)
      .delete(`/users/${userToDelete2.id}`)
      .set("access_token", userToken1)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty(
          "message",
          "You are not authorized"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("Case Rejected cause of user id not found return error message 'Data Not Found' with status code 404", (done) => {
    request(app)
      .delete(`/users/${userToDeleteFailed.id}`)
      .set("access_token", userToken1)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Data Not Found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

afterAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
