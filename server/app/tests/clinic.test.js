const request = require("supertest");
const app = require("../app");
const { Clinic } = require("../models");

beforeAll(() => {
  let clinics = [];
  for (let i = 1; i <= 20; i++) {
    let data = {
      name: `user ${i}`,
      email: `useremail${i}@mail.com`,
      password: `passworduser${i}`,
      phone_number: `45621685412${i}`,
      address: `jalan klinik gang ${i}`,
      operational_time_open: "09:00",
      operational_time_close: "17:00",
      operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
      swab_antigen: i % 3 === 0 ? true : false,
      swab_pcr: i % 2 === 0 ? true : false,
      antigen_price: 30000 * i,
      pcr_price: 20000 * i,
    };
    clinics.push(data);
  }
  Clinic.bulkCreate(clinics);
});

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

afterAll(async () => {
  await Clinic.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
