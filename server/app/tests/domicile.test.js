const app = require("../app");
const request = require("supertest");

describe("GET /provinces [CASE SUCCESS]", () => {
  test("Should return Array of Provinces with status code 200", (done) => {
    request(app)
      .get("/provinces")
      .then((response) => {
        expect(response.status).toBe(200);
        response.body.forEach((province) => {
          expect(province).toHaveProperty("id", expect.any(Number));
          expect(province).toHaveProperty("nama", expect.any(String));
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /regencies/:id [CASE SUCCESS]", () => {
  test("Should return Array of Regencies with status code 200", (done) => {
    request(app)
      .get("/regencies/12")
      .then((response) => {
        expect(response.status).toBe(200);
        response.body.forEach((regency) => {
          expect(regency).toHaveProperty("id", expect.any(Number));
          expect(regency).toHaveProperty("id_provinsi", expect.any(String));
          expect(regency).toHaveProperty("nama", expect.any(String));
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /districts/:id [CASE SUCCESS]", () => {
  test("Should return Array of Districts with status code 200", (done) => {
    request(app)
      .get("/districts/1275")
      .then((response) => {
        expect(response.status).toBe(200);
        response.body.forEach((district) => {
          expect(district).toHaveProperty("id", expect.any(Number));
          expect(district).toHaveProperty("id_kota", expect.any(String));
          expect(district).toHaveProperty("nama", expect.any(String));
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /subdistricts/:id [CASE SUCCESS]", () => {
  test("Should return Array of Districts with status code 200", (done) => {
    request(app)
      .get("/subdistricts/1275060")
      .then((response) => {
        expect(response.status).toBe(200);
        response.body.forEach((subdistrict) => {
          expect(subdistrict).toHaveProperty("id", expect.any(Number));
          expect(subdistrict).toHaveProperty(
            "id_kecamatan",
            expect.any(String)
          );
          expect(subdistrict).toHaveProperty("nama", expect.any(String));
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
