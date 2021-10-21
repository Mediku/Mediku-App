const request = require("supertest");
const app = require("../app");
const { Clinic } = require("../models");

let clinics = [];
for (let i = 1; i <= 20; i++) {
  let add = {
    name: `user ${i}`,
    email: `useremail${i}@mail.com`,
    password: `passworduser${i}`,
    phone_number: `45621685412${i}`,
    address: `jalan klinik gang ${i}`,
    imageURL: `awikwok${i}`,
    operational_time_open: "09:00",
    operational_time_close: "17:00",
    operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
    swab_antigen: i % 3 === 0 ? true : false,
    swab_pcr: i % 2 === 0 ? true : false,
    antigen_price: 30000 * i,
    pcr_price: 20000 * i,
  };
  clinics.push(add);
}
let add = {
  name: `user clinic login`,
  email: `useremailclinic@mail.com`,
  password: `passwordclinic`,
  phone_number: `45621685412`,
  address: `jalan klinik gang clinic`,
  imageURL: `awikwokklinik`,
  operational_time_open: "09:00",
  operational_time_close: "17:00",
  operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
  swab_antigen: true,
  swab_pcr: false,
  antigen_price: 400000,
  pcr_price: 200000,
};

beforeAll((done) => {
  Clinic.bulkCreate(clinics)
    .then((_) => {
      return Clinic.create(add);
    })
    .then((_) => {
      done()
    })
    .catch(err => {
      done(err)
    })
}); // di chaining

describe("view clinic(s)", () => {
  test("get all clinics", (done) => {
    request(app)
      .get("/clinic/list")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("list");
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("get clinic with specific ID", (done) => {
    request(app)
      .get("/clinic/list/2")
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("address");
        expect(res.body).toHaveProperty("email");
        expect(res.body).toHaveProperty("phone_number");
        expect(res.body).toHaveProperty("operational_time_open");
        expect(res.body).toHaveProperty("operational_time_close");
        expect(res.body).toHaveProperty("operational_day_open");
        expect(res.body).toHaveProperty("swab_antigen");
        expect(res.body).toHaveProperty("swab_pcr");
        expect(res.body).toHaveProperty("antigen_price");
        expect(res.body).toHaveProperty("pcr_price");
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("display error for unregistered id in Clinic entity", (done) => {
    request(app)
      .get("/clinic/list/30")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Clinic not found");
        expect(res.status).toBe(404);
        done();
      });
  });
});

describe("create a clinic", () => {
  test("successfully created a clinic", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Clinic successfully registered");
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(22);
        expect(res.body).toHaveProperty("email");
        expect(res.body.email).toContain("klinikngakak@mail.com");
        expect(res.body).toHaveProperty("name");
        expect(res.body.name).toContain("klinik ngakak");
        expect(res.body).toHaveProperty("phone_number");
        expect(res.body.phone_number).toContain("125445123689");
        expect(res.body).toHaveProperty("address");
        expect(res.body.address).toContain("jalan ngakak");
        expect(res.body).toHaveProperty("operational_time_open");
        expect(res.body.operational_time_open).toContain("09:00");
        expect(res.body).toHaveProperty("operational_time_close");
        expect(res.body.operational_time_close).toContain("17:00");
        expect(res.body).toHaveProperty("operational_day_open");
        expect(res.body.operational_day_open).toContain("senin");
        expect(res.body.operational_day_open).toContain("selasa");
        expect(res.body.operational_day_open).toContain("rabu");
        expect(res.body.operational_day_open).toContain("kamis");
        expect(res.body.operational_day_open).toContain("jumat");
        expect(res.body).toHaveProperty("swab_pcr");
        expect(res.body.swab_pcr).toBe(true);
        expect(res.body).toHaveProperty("swab_antigen");
        expect(res.body.swab_antigen).toBe(false);
        expect(res.body).toHaveProperty("pcr_price");
        expect(res.body.pcr_price).toBe(200000);
        expect(res.body).toHaveProperty("antigen_price");
        expect(res.body.antigen_price).toBe(300000);
        expect(res.status).toBe(201);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if name is empty", (done) => {
    let add = {
      name: "",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT NAME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if name is null", (done) => {
    let add = {
      name: null,
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT NAME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if imageURL is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: ``,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT IMAGE URL");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if imageURL is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: null,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT IMAGE URL");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if email is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: null,
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT EMAIL");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if email is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message[0]).toContain("PLEASE INSERT EMAIL");
        expect(res.body.message[1]).toContain("NOT A VALID EMAIL FORMAT");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if email is not an email format", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "ngakak",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("NOT A VALID EMAIL FORMAT");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if phone_number is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: null,
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PHONE_NUMBER");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if phone_number is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PHONE_NUMBER");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if address is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: null, //jalan ngakak
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT ADDRESS");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if address is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "", //jalan ngakak
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT ADDRESS");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time open is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: null,
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT OPEN TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time open is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT OPEN TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time close is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: null,
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT CLOSE TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time close is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT CLOSE TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time close is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: null,
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT CLOSE TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("return error if swab pcr is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: null,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT SWAB_PCR BOOLEAN");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if swab pcr is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: "",
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT SWAB_PCR BOOLEAN");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if swab antigen is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: null,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT SWAB_ANTIGEN BOOLEAN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if swab antigen is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: "",
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT SWAB_ANTIGEN BOOLEAN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if antigen price is less than 0", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: -200,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("MINIMAL ANTIGEN PRICE IS 0");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if pcr price is less than 0", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: -10,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("MINIMAL PCR PRICE IS 0");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational day open is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: null,
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT OPERATIONAL DAY OPEN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational day open is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: "",
      password: "ngakak",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT OPERATIONAL DAY OPEN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if password is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: null,
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PASSWORD");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if password is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "klinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "",
    };
    request(app)
      .post("/clinic/add")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PASSWORD");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("login as clinic admin", () => {
  test("login clinic", (done) => {
    request(app)
      .post("/clinic/login")
      .send({
        email: "useremailclinic@mail.com",
        password: "passwordclinic",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(21);
        expect(res.body).toHaveProperty("email");
        expect(res.body.email).toContain("useremailclinic@mail.com");
        expect(res.body).toHaveProperty(`access_token`);
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("wrong email", (done) => {
    request(app)
      .post("/clinic/login")
      .send({
        email: "useremailcnic@mail.com",
        password: "passwordclinic",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Email/Password is wrong");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("wrong password", (done) => {
    request(app)
      .post("/clinic/login")
      .send({
        email: "useremailclinic@mail.com",
        password: "passwordcli",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Email/Password is wrong");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("update a clinic", () => {
  test("successfully update a clinic", (done) => {
    let add = {
      name: "edit klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "11223344",
      address: "jalan ngakak edit",
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: false,
      swab_antigen: true,
      antigen_price: 200000,
      pcr_price: 300000,
      operational_day_open: "senin,selasa,rabu,kamis",
      password: "newpasswordngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(2);
        expect(res.body).toHaveProperty("name");
        expect(res.body.name).toContain("edit klinik ngakak");
        expect(res.body).toHaveProperty("phone_number");
        expect(res.body.phone_number).toContain("11223344");
        expect(res.body).toHaveProperty("address");
        expect(res.body.address).toContain("jalan ngakak edit");
        expect(res.body).toHaveProperty("operational_time_open");
        expect(res.body.operational_time_open).toContain("09:00");
        expect(res.body).toHaveProperty("operational_time_close");
        expect(res.body.operational_time_close).toContain("17:00");
        expect(res.body).toHaveProperty("operational_day_open");
        expect(res.body.operational_day_open).toContain("senin");
        expect(res.body.operational_day_open).toContain("selasa");
        expect(res.body.operational_day_open).toContain("rabu");
        expect(res.body.operational_day_open).toContain("kamis");
        expect(res.body).toHaveProperty("swab_pcr");
        expect(res.body.swab_pcr).toBe(false);
        expect(res.body).toHaveProperty("swab_antigen");
        expect(res.body.swab_antigen).toBe(true);
        expect(res.body).toHaveProperty("pcr_price");
        expect(res.body.pcr_price).toBe(300000);
        expect(res.body).toHaveProperty("antigen_price");
        expect(res.body.antigen_price).toBe(200000);
        expect(res.body).toHaveProperty("password");
        expect(res.body.password).toContain("newpasswordngakak");
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if clinic not found", (done) => {
    let add = {
      name: "edit klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/5222")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Clinic not found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if name is empty", (done) => {
    let add = {
      name: "",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT NAME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if name is null", (done) => {
    let add = {
      name: null,
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT NAME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if email is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: null,
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT EMAIL");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if email is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message[0]).toContain("PLEASE INSERT EMAIL");
        expect(res.body.message[1]).toContain("NOT A VALID EMAIL FORMAT");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if email is not an email format", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "ngakak",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("NOT A VALID EMAIL FORMAT");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if phone_number is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: null,
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PHONE_NUMBER");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if phone_number is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PHONE_NUMBER");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if address is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: null, //jalan ngakak
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT ADDRESS");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if address is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "", //jalan ngakak
      operational_time_open: "09:00",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT ADDRESS");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time open is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: null,
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT OPEN TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time open is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "",
      operational_time_close: "17.00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT OPEN TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time close is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: null,
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT CLOSE TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time close is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT CLOSE TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational time close is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: null,
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT CLOSE TIME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("return error if swab pcr is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: null,
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT SWAB_PCR BOOLEAN");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if swab pcr is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: "",
      swab_antigen: false,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT SWAB_PCR BOOLEAN");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if swab antigen is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: null,
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT SWAB_ANTIGEN BOOLEAN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if swab antigen is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: "",
      antigen_price: 300000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT SWAB_ANTIGEN BOOLEAN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if antigen price is less than 0", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: -200,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("MINIMAL ANTIGEN PRICE IS 0");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if pcr price is less than 0", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: -10,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("MINIMAL PCR PRICE IS 0");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational day open is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: null,
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT OPERATIONAL DAY OPEN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if operational day open is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: "",
      password: "ngakak",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "PLEASE INSERT OPERATIONAL DAY OPEN"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if password is null", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: null,
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PASSWORD");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if password is empty", (done) => {
    let add = {
      name: "klinik ngakak",
      email: "editklinikngakak@mail.com",
      phone_number: "125445123689",
      address: "jalan ngakak",
      imageURL: `ngakakimg`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      swab_pcr: true,
      swab_antigen: false,
      antigen_price: 400000,
      pcr_price: 200000,
      operational_day_open: "senin,selasa,rabu,kamis,jumat",
      password: "",
    };
    request(app)
      .put("/clinic/edit/2")
      .send(add)
      .then((res) => {
        console.log(res.body);
        console.log("LINE 1751");
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("PLEASE INSERT PASSWORD");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("delete a clinic", () => {
  test("delete a clinic", (done) => {
    request(app)
      .delete("/clinic/22")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          `Clinic with name 'klinik ngakak' successfully deleted`
        );
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if clinic not found", (done) => {
    request(app)
      .delete("/clinic/5555")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(`Clinic not found`);
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

afterAll(async () => {
  await Clinic.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
