const app = require("../app");
const request = require("supertest");
const { User, Registration, Clinic, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");

let userToken;
let userToken2;
let clinicToken;
let clinicToken2;

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
  full_name: "testing 2 bosku",
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

const clinic = {
  name: "adkfaulgfh",
  email: "testing@mail.com",
  password: "testingaja",
  phone_number: "54685189",
  address: "jalan suka-suka clinic",
  operational_time_open: "09:00",
  operational_time_close: "17:00",
  operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
  swab_antigen: true,
  swab_pcr: true,
  antigen_price: 500000,
  pcr_price: 450000,
  imageURL: "AWIKWOKWAWKOAWKO",
};

const clinic2 = {
  name: "adkfaulgfh2",
  email: "testing2@mail.com",
  password: "testingaja",
  phone_number: "54685189",
  address: "jalan suka-suka clinic",
  operational_time_open: "09:00",
  operational_time_close: "17:00",
  operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
  swab_antigen: true,
  swab_pcr: true,
  antigen_price: 500000,
  pcr_price: 450000,
  imageURL: "AWIKWOKWAWKOAWKO",
};

beforeAll((done) => {
  User.create(user)
    .then((data2) => {
      userToken = signToken({ id: data2.id, email: data2.email }, "rahasia123");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

beforeAll((done) => {
  User.create(user2)
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

beforeAll((done) => {
  Clinic.create(clinic)
    .then((data2) => {
      clinicToken = signToken(
        { id: data2.id, email: data2.email },
        "rahasia123"
      );
      done();
    })
    .catch((err) => {
      done(err);
    });
});

beforeAll((done) => {
  Clinic.create(clinic2)
    .then((data2) => {
      clinicToken2 = signToken(
        { id: data2.id, email: data2.email },
        "rahasia123"
      );
      done();
    })
    .catch((err) => {
      done(err);
    });
});

let idbuatdelete;

describe("Registration for users", () => {
  test("successfully register as user", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: 1,
        is_paid: true,
      })
      .then((res) => {
        idbuatdelete = res.body.id;
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(1);
        expect(res.body).toHaveProperty("service_name");
        expect(res.body.service_name).toContain("swab");
        expect(res.body).toHaveProperty("total_price");
        expect(res.body.total_price).toBe(200000);
        expect(res.body).toHaveProperty("date");
        expect(res.body.date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body).toHaveProperty("time");
        expect(res.body.time).toContain("16:00");
        expect(res.body).toHaveProperty("is_paid");
        expect(res.body.is_paid).toBe(true);
        expect(res.body).toHaveProperty("ClinicId");
        expect(res.body.ClinicId).toBe(1);
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.UserId).toBe(1);
        expect(res.body).toHaveProperty("is_tested");
        expect(res.body.is_tested).toBe(false);
        expect(res.body).toHaveProperty("test_result");
        expect(res.body.test_result).toBe(null);
        expect(res.status).toBe(201);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if user have not logged in yet", (done) => {
    request(app)
      .post("/registrations/user")
      .send({
        service_name: null,
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if service_name is null", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: null,
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "Please fill the Service Name's Column"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if service_name is empty", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "",
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "Please fill the Service Name's Column"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if total_price is less than 0", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: -20,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "Price must be equal or more than 0"
        );
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if date is null", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: null,
        time: "16:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please fill the Date's Column");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if date is empty", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "",
        time: "16:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please fill the Date's Column");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if time is null", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: null,
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please fill the Time's Column");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if time is empty", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: "",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please fill the Time's Column");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if Clinic ID is null", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: null,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please choose at least one clinic");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("should return error if Clinic ID is empty", (done) => {
    request(app)
      .post("/registrations/user")
      .set("access_token", userToken)
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: "",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please choose at least one clinic");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("find one registration by user", () => {
  test("successfully find one registration data by user", (done) => {
    request(app)
      .get("/registrations/user/1")
      .set({ access_token: userToken })
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(1);
        expect(res.body).toHaveProperty("service_name");
        expect(res.body.service_name).toContain("swab");
        expect(res.body).toHaveProperty("total_price");
        expect(res.body.total_price).toBe(200000);
        expect(res.body).toHaveProperty("date");
        expect(res.body.date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body).toHaveProperty("time");
        expect(res.body.time).toContain("16:00");
        expect(res.body).toHaveProperty("is_paid");
        expect(res.body.is_paid).toBe(true);
        expect(res.body).toHaveProperty("ClinicId");
        expect(res.body.ClinicId).toBe(1);
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.UserId).toBe(1);
        expect(res.body).toHaveProperty("is_tested");
        expect(res.body.is_tested).toBe(false);
        expect(res.body).toHaveProperty("test_result");
        expect(res.body.test_result).toBe(null);
        expect(res.body).toHaveProperty("User");
        expect(res.body.User).toHaveProperty("id");
        expect(res.body.User).toHaveProperty("id");
        expect(res.body.User.id).toBe(1);
        expect(res.body.User).toHaveProperty("full_name");
        expect(res.body.User.full_name).toContain("testing bosku");
        expect(res.body.User).toHaveProperty("email");
        expect(res.body.User.email).toContain("test1@mail.com");
        expect(res.body.User).not.toHaveProperty("password");
        expect(res.body.User).toHaveProperty("phone_number");
        expect(res.body.User.phone_number).toContain("081208120812");
        expect(res.body.User).toHaveProperty("identity_card_number");
        expect(res.body.User.identity_card_number).toContain("01010101010");
        expect(res.body.User).toHaveProperty("identity_card_address");
        expect(res.body.User.identity_card_address).toContain(
          "test identity_card_address"
        );
        expect(res.body.User).toHaveProperty("gender");
        expect(res.body.User.gender).toContain("male");
        expect(res.body.User).toHaveProperty("date_of_birth");
        expect(res.body.User.date_of_birth).toContain("2020-04-10");
        expect(res.body.User).toHaveProperty("province");
        expect(res.body.User.province).toContain("Sumatera Utara");
        expect(res.body.User).toHaveProperty("regency");
        expect(res.body.User.regency).toContain("Kota Medan");
        expect(res.body.User).toHaveProperty("district");
        expect(res.body.User.district).toContain("Medan Kota");
        expect(res.body.User).toHaveProperty("sub_district");
        expect(res.body.User.sub_district).toContain("Pasar Baru");
        expect(res.body.User).toHaveProperty("RT");
        expect(res.body.User.RT).toContain("01");
        expect(res.body.User).toHaveProperty("RW");
        expect(res.body.User.RW).toContain("02");
        expect(res.body.Clinic).toHaveProperty("id");
        expect(res.body.Clinic.id).toBe(1);
        expect(res.body.Clinic).toHaveProperty("name");
        expect(res.body.Clinic.name).toContain("adkfaulgfh");
        expect(res.body.Clinic).toHaveProperty("email");
        expect(res.body.Clinic.email).toContain("testing@mail.com");
        expect(res.body.Clinic).toHaveProperty("phone_number");
        expect(res.body.Clinic.phone_number).toContain("54685189");
        expect(res.body.Clinic).toHaveProperty("address");
        expect(res.body.Clinic.address).toContain("jalan suka-suka clinic");
        expect(res.body.Clinic).toHaveProperty("operational_time_open");
        expect(res.body.Clinic.operational_time_open).toContain("09:00");
        expect(res.body.Clinic).toHaveProperty("operational_time_close");
        expect(res.body.Clinic.operational_time_close).toContain("17:00");
        expect(res.body.Clinic).toHaveProperty("operational_day_open");
        expect(res.body.Clinic.operational_day_open).toContain("senin");
        expect(res.body.Clinic.operational_day_open).toContain("selasa");
        expect(res.body.Clinic.operational_day_open).toContain("rabu");
        expect(res.body.Clinic.operational_day_open).toContain("kamis");
        expect(res.body.Clinic.operational_day_open).toContain("jumat");
        expect(res.body.Clinic).toHaveProperty("swab_pcr");
        expect(res.body.Clinic.swab_pcr).toBe(true);
        expect(res.body.Clinic).toHaveProperty("swab_antigen");
        expect(res.body.Clinic.swab_antigen).toBe(true);
        expect(res.body.Clinic).toHaveProperty("pcr_price");
        expect(res.body.Clinic.pcr_price).toBe(450000);
        expect(res.body.Clinic).toHaveProperty("antigen_price");
        expect(res.body.Clinic.antigen_price).toBe(500000);
        expect(res.body.Clinic).toHaveProperty("imageURL");
        expect(res.body.Clinic.imageURL).toContain("AWIKWOKWAWKOAWKO");
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if user haven't logged in yet", (done) => {
    request(app)
      .get("/registrations/user/1")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if user is searching for registration info for another user", (done) => {
    request(app)
      .get("/registrations/user/1")
      .set({ access_token: userToken2 })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("You are not authorized");
        expect(res.status).toBe(403);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if registration is not found", (done) => {
    request(app)
      .get("/registrations/user/5")
      .set({ access_token: userToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("registration info edit by user", () => {
  test("successfully edited a registration", (done) => {
    request(app)
      .put("/registrations/user/1")
      .set({ access_token: userToken })
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(1);
        expect(res.body).toHaveProperty("service_name");
        expect(res.body.service_name).toContain("swab");
        expect(res.body).toHaveProperty("total_price");
        expect(res.body.total_price).toBe(500000);
        expect(res.body).toHaveProperty("date");
        expect(res.body.date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body).toHaveProperty("time");
        expect(res.body.time).toContain("17:00");
        expect(res.body).toHaveProperty("is_paid");
        expect(res.body.is_paid).toBe(true);
        expect(res.body).toHaveProperty("ClinicId");
        expect(res.body.ClinicId).toBe(1);
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.UserId).toBe(1);
        expect(res.body).toHaveProperty("is_tested");
        expect(res.body.is_tested).toBe(false);
        expect(res.body).toHaveProperty("test_result");
        expect(res.body.test_result).toBe(null);
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if user haven't logged in yet`, (done) => {
    request(app)
      .put("/registrations/user/1")
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if user tries to edit another user's registration info`, (done) => {
    request(app)
      .put("/registrations/user/1")
      .set({ access_token: userToken2 })
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("You are not authorized");
        expect(res.status).toBe(403);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if registration info not found`, (done) => {
    request(app)
      .put("/registrations/user/5")
      .set({ access_token: userToken })
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("find one registration by clinic admin", () => {
  test("successfully find one registration data by clinic admin", (done) => {
    request(app)
      .get("/registrations/clinic/1")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(1);
        expect(res.body).toHaveProperty("service_name");
        expect(res.body.service_name).toContain("swab");
        expect(res.body).toHaveProperty("total_price");
        expect(res.body.total_price).toBe(500000);
        expect(res.body).toHaveProperty("date");
        expect(res.body.date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body).toHaveProperty("time");
        expect(res.body.time).toContain("17:00");
        expect(res.body).toHaveProperty("is_paid");
        expect(res.body.is_paid).toBe(true);
        expect(res.body).toHaveProperty("ClinicId");
        expect(res.body.ClinicId).toBe(1);
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.UserId).toBe(1);
        expect(res.body).toHaveProperty("is_tested");
        expect(res.body.is_tested).toBe(false);
        expect(res.body).toHaveProperty("test_result");
        expect(res.body.test_result).toBe(null);
        expect(res.body).toHaveProperty("User");
        expect(res.body.User).toHaveProperty("id");
        expect(res.body.User).toHaveProperty("id");
        expect(res.body.User.id).toBe(1);
        expect(res.body.User).toHaveProperty("full_name");
        expect(res.body.User.full_name).toContain("testing bosku");
        expect(res.body.User).toHaveProperty("email");
        expect(res.body.User.email).toContain("test1@mail.com");
        expect(res.body.User).not.toHaveProperty("password");
        expect(res.body.User).toHaveProperty("phone_number");
        expect(res.body.User.phone_number).toContain("081208120812");
        expect(res.body.User).toHaveProperty("identity_card_number");
        expect(res.body.User.identity_card_number).toContain("01010101010");
        expect(res.body.User).toHaveProperty("identity_card_address");
        expect(res.body.User.identity_card_address).toContain(
          "test identity_card_address"
        );
        expect(res.body.User).toHaveProperty("gender");
        expect(res.body.User.gender).toContain("male");
        expect(res.body.User).toHaveProperty("date_of_birth");
        expect(res.body.User.date_of_birth).toContain("2020-04-10");
        expect(res.body.User).toHaveProperty("province");
        expect(res.body.User.province).toContain("Sumatera Utara");
        expect(res.body.User).toHaveProperty("regency");
        expect(res.body.User.regency).toContain("Kota Medan");
        expect(res.body.User).toHaveProperty("district");
        expect(res.body.User.district).toContain("Medan Kota");
        expect(res.body.User).toHaveProperty("sub_district");
        expect(res.body.User.sub_district).toContain("Pasar Baru");
        expect(res.body.User).toHaveProperty("RT");
        expect(res.body.User.RT).toContain("01");
        expect(res.body.User).toHaveProperty("RW");
        expect(res.body.User.RW).toContain("02");
        expect(res.body.Clinic).toHaveProperty("id");
        expect(res.body.Clinic.id).toBe(1);
        expect(res.body.Clinic).toHaveProperty("name");
        expect(res.body.Clinic.name).toContain("adkfaulgfh");
        expect(res.body.Clinic).toHaveProperty("email");
        expect(res.body.Clinic.email).toContain("testing@mail.com");
        expect(res.body.Clinic).toHaveProperty("phone_number");
        expect(res.body.Clinic.phone_number).toContain("54685189");
        expect(res.body.Clinic).toHaveProperty("address");
        expect(res.body.Clinic.address).toContain("jalan suka-suka clinic");
        expect(res.body.Clinic).toHaveProperty("operational_time_open");
        expect(res.body.Clinic.operational_time_open).toContain("09:00");
        expect(res.body.Clinic).toHaveProperty("operational_time_close");
        expect(res.body.Clinic.operational_time_close).toContain("17:00");
        expect(res.body.Clinic).toHaveProperty("operational_day_open");
        expect(res.body.Clinic.operational_day_open).toContain("senin");
        expect(res.body.Clinic.operational_day_open).toContain("selasa");
        expect(res.body.Clinic.operational_day_open).toContain("rabu");
        expect(res.body.Clinic.operational_day_open).toContain("kamis");
        expect(res.body.Clinic.operational_day_open).toContain("jumat");
        expect(res.body.Clinic).toHaveProperty("swab_pcr");
        expect(res.body.Clinic.swab_pcr).toBe(true);
        expect(res.body.Clinic).toHaveProperty("swab_antigen");
        expect(res.body.Clinic.swab_antigen).toBe(true);
        expect(res.body.Clinic).toHaveProperty("pcr_price");
        expect(res.body.Clinic.pcr_price).toBe(450000);
        expect(res.body.Clinic).toHaveProperty("antigen_price");
        expect(res.body.Clinic.antigen_price).toBe(500000);
        expect(res.body.Clinic).toHaveProperty("imageURL");
        expect(res.body.Clinic.imageURL).toContain("AWIKWOKWAWKOAWKO");
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if clinic admin haven't logged in yet", (done) => {
    request(app)
      .get("/registrations/clinic/1")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if clinic admin is searching for registration info for another clinic", (done) => {
    request(app)
      .get("/registrations/clinic/1")
      .set({ access_token: clinicToken2 })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("You are not authorized");
        expect(res.status).toBe(403);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if registration is not found", (done) => {
    request(app)
      .get("/registrations/clinic/5")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("find all registration with unpaid status for clinic admin who is logging in", () => {
  test("find all registrations", (done) => {
    request(app)
      .get("/registrations/clinic")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0].id).toBe(1);
        expect(res.body[0]).toHaveProperty("service_name");
        expect(res.body[0].service_name).toContain("swab");
        expect(res.body[0]).toHaveProperty("total_price");
        expect(res.body[0].total_price).toBe(500000);
        expect(res.body[0]).toHaveProperty("date");
        expect(res.body[0].date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body[0]).toHaveProperty("time");
        expect(res.body[0].time).toContain("17:00");
        expect(res.body[0]).toHaveProperty("is_paid");
        expect(res.body[0].is_paid).toBe(true);
        expect(res.body[0]).toHaveProperty("ClinicId");
        expect(res.body[0].ClinicId).toBe(1);
        expect(res.body[0]).toHaveProperty("UserId");
        expect(res.body[0].UserId).toBe(1);
        expect(res.body[0]).toHaveProperty("is_tested");
        expect(res.body[0].is_tested).toBe(false);
        expect(res.body[0]).toHaveProperty("test_result");
        expect(res.body[0].test_result).toBe(null);
        expect(res.body[0]).toHaveProperty("User");
        expect(res.body[0].User).toHaveProperty("id");
        expect(res.body[0].User).toHaveProperty("id");
        expect(res.body[0].User.id).toBe(1);
        expect(res.body[0].User).toHaveProperty("full_name");
        expect(res.body[0].User.full_name).toContain("testing bosku");
        expect(res.body[0].User).toHaveProperty("email");
        expect(res.body[0].User.email).toContain("test1@mail.com");
        expect(res.body[0].User).not.toHaveProperty("password");
        expect(res.body[0].User).toHaveProperty("phone_number");
        expect(res.body[0].User.phone_number).toContain("081208120812");
        expect(res.body[0].User).toHaveProperty("identity_card_number");
        expect(res.body[0].User.identity_card_number).toContain("01010101010");
        expect(res.body[0].User).toHaveProperty("identity_card_address");
        expect(res.body[0].User.identity_card_address).toContain(
          "test identity_card_address"
        );
        expect(res.body[0].User).toHaveProperty("gender");
        expect(res.body[0].User.gender).toContain("male");
        expect(res.body[0].User).toHaveProperty("date_of_birth");
        expect(res.body[0].User.date_of_birth).toContain("2020-04-10");
        expect(res.body[0].User).toHaveProperty("province");
        expect(res.body[0].User.province).toContain("Sumatera Utara");
        expect(res.body[0].User).toHaveProperty("regency");
        expect(res.body[0].User.regency).toContain("Kota Medan");
        expect(res.body[0].User).toHaveProperty("district");
        expect(res.body[0].User.district).toContain("Medan Kota");
        expect(res.body[0].User).toHaveProperty("sub_district");
        expect(res.body[0].User.sub_district).toContain("Pasar Baru");
        expect(res.body[0].User).toHaveProperty("RT");
        expect(res.body[0].User.RT).toContain("01");
        expect(res.body[0].User).toHaveProperty("RW");
        expect(res.body[0].User.RW).toContain("02");
        expect(res.body[0].Clinic).toHaveProperty("id");
        expect(res.body[0].Clinic.id).toBe(1);
        expect(res.body[0].Clinic).toHaveProperty("name");
        expect(res.body[0].Clinic.name).toContain("adkfaulgfh");
        expect(res.body[0].Clinic).toHaveProperty("email");
        expect(res.body[0].Clinic.email).toContain("testing@mail.com");
        expect(res.body[0].Clinic).toHaveProperty("phone_number");
        expect(res.body[0].Clinic.phone_number).toContain("54685189");
        expect(res.body[0].Clinic).toHaveProperty("address");
        expect(res.body[0].Clinic.address).toContain("jalan suka-suka clinic");
        expect(res.body[0].Clinic).toHaveProperty("operational_time_open");
        expect(res.body[0].Clinic.operational_time_open).toContain("09:00");
        expect(res.body[0].Clinic).toHaveProperty("operational_time_close");
        expect(res.body[0].Clinic.operational_time_close).toContain("17:00");
        expect(res.body[0].Clinic).toHaveProperty("operational_day_open");
        expect(res.body[0].Clinic.operational_day_open).toContain("senin");
        expect(res.body[0].Clinic.operational_day_open).toContain("selasa");
        expect(res.body[0].Clinic.operational_day_open).toContain("rabu");
        expect(res.body[0].Clinic.operational_day_open).toContain("kamis");
        expect(res.body[0].Clinic.operational_day_open).toContain("jumat");
        expect(res.body[0].Clinic).toHaveProperty("swab_pcr");
        expect(res.body[0].Clinic.swab_pcr).toBe(true);
        expect(res.body[0].Clinic).toHaveProperty("swab_antigen");
        expect(res.body[0].Clinic.swab_antigen).toBe(true);
        expect(res.body[0].Clinic).toHaveProperty("pcr_price");
        expect(res.body[0].Clinic.pcr_price).toBe(450000);
        expect(res.body[0].Clinic).toHaveProperty("antigen_price");
        expect(res.body[0].Clinic.antigen_price).toBe(500000);
        expect(res.body[0].Clinic).toHaveProperty("imageURL");
        expect(res.body[0].Clinic.imageURL).toContain("AWIKWOKWAWKOAWKO");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if clinic admin haven't logged in yet", (done) => {
    request(app)
      .get("/registrations/clinic")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("find all registration that was created today by a user", () => {
  test("find all registrations created today", (done) => {
    request(app)
      .get("/registrations/clinic/today")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0].id).toBe(1);
        expect(res.body[0]).toHaveProperty("service_name");
        expect(res.body[0].service_name).toContain("swab");
        expect(res.body[0]).toHaveProperty("total_price");
        expect(res.body[0].total_price).toBe(500000);
        expect(res.body[0]).toHaveProperty("date");
        expect(res.body[0].date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body[0]).toHaveProperty("time");
        expect(res.body[0].time).toContain("17:00");
        expect(res.body[0]).toHaveProperty("is_paid");
        expect(res.body[0].is_paid).toBe(true);
        expect(res.body[0]).toHaveProperty("ClinicId");
        expect(res.body[0].ClinicId).toBe(1);
        expect(res.body[0]).toHaveProperty("UserId");
        expect(res.body[0].UserId).toBe(1);
        expect(res.body[0]).toHaveProperty("is_tested");
        expect(res.body[0].is_tested).toBe(false);
        expect(res.body[0]).toHaveProperty("test_result");
        expect(res.body[0].test_result).toBe(null);
        expect(res.body[0]).toHaveProperty("User");
        expect(res.body[0].User).toHaveProperty("id");
        expect(res.body[0].User).toHaveProperty("id");
        expect(res.body[0].User.id).toBe(1);
        expect(res.body[0].User).toHaveProperty("full_name");
        expect(res.body[0].User.full_name).toContain("testing bosku");
        expect(res.body[0].User).toHaveProperty("email");
        expect(res.body[0].User.email).toContain("test1@mail.com");
        expect(res.body[0].User).not.toHaveProperty("password");
        expect(res.body[0].User).toHaveProperty("phone_number");
        expect(res.body[0].User.phone_number).toContain("081208120812");
        expect(res.body[0].User).toHaveProperty("identity_card_number");
        expect(res.body[0].User.identity_card_number).toContain("01010101010");
        expect(res.body[0].User).toHaveProperty("identity_card_address");
        expect(res.body[0].User.identity_card_address).toContain(
          "test identity_card_address"
        );
        expect(res.body[0].User).toHaveProperty("gender");
        expect(res.body[0].User.gender).toContain("male");
        expect(res.body[0].User).toHaveProperty("date_of_birth");
        expect(res.body[0].User.date_of_birth).toContain("2020-04-10");
        expect(res.body[0].User).toHaveProperty("province");
        expect(res.body[0].User.province).toContain("Sumatera Utara");
        expect(res.body[0].User).toHaveProperty("regency");
        expect(res.body[0].User.regency).toContain("Kota Medan");
        expect(res.body[0].User).toHaveProperty("district");
        expect(res.body[0].User.district).toContain("Medan Kota");
        expect(res.body[0].User).toHaveProperty("sub_district");
        expect(res.body[0].User.sub_district).toContain("Pasar Baru");
        expect(res.body[0].User).toHaveProperty("RT");
        expect(res.body[0].User.RT).toContain("01");
        expect(res.body[0].User).toHaveProperty("RW");
        expect(res.body[0].User.RW).toContain("02");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("return error if clinic admin haven't logged in yet", (done) => {
    request(app)
      .get("/registrations/clinic/today")
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("registration info edit by clinic admin", () => {
  test("successfully edited a registration", (done) => {
    request(app)
      .put("/registrations/clinic/edit/1")
      .set({ access_token: clinicToken })
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: "15:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toBe(1);
        expect(res.body).toHaveProperty("service_name");
        expect(res.body.service_name).toContain("swab");
        expect(res.body).toHaveProperty("total_price");
        expect(res.body.total_price).toBe(200000);
        expect(res.body).toHaveProperty("date");
        expect(res.body.date).toContain("2021-10-22T00:00:00.000Z");
        expect(res.body).toHaveProperty("time");
        expect(res.body.time).toContain("15:00");
        expect(res.body).toHaveProperty("is_paid");
        expect(res.body.is_paid).toBe(false);
        expect(res.body).toHaveProperty("ClinicId");
        expect(res.body.ClinicId).toBe(1);
        expect(res.body).toHaveProperty("UserId");
        expect(res.body.UserId).toBe(1);
        expect(res.body).toHaveProperty("is_tested");
        expect(res.body.is_tested).toBe(false);
        expect(res.body).toHaveProperty("test_result");
        expect(res.body.test_result).toBe(null);
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if clinic admin haven't logged in yet`, (done) => {
    request(app)
      .put("/registrations/user/1")
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if clinic admin tries to edit another clinic's registration info`, (done) => {
    request(app)
      .put("/registrations/clinic/edit/1")
      .set({ access_token: clinicToken2 })
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("You are not authorized");
        expect(res.status).toBe(403);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if registration info not found`, (done) => {
    request(app)
      .put("/registrations/clinic/edit/5")
      .set({ access_token: clinicToken })
      .send({
        service_name: "swab",
        total_price: 500000,
        date: "2021-10-22",
        time: "17:00",
        ClinicId: 1,
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("registration info test result patch by clinic admin", () => {
  test("successfully edited the test result in a registration info", (done) => {
    request(app)
      .patch("/registrations/clinic/test/result/1")
      .set({ access_token: clinicToken })
      .send({
        test_result: "positive",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "Registration with ID : 1 has been updated"
        );
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if clinic admin haven't logged in yet`, (done) => {
    request(app)
      .patch("/registrations/clinic/test/result/1")
      .send({
        test_result: "positive",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Please Login First");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if clinic admin tries to edit another clinic's registration test result`, (done) => {
    request(app)
      .patch("/registrations/clinic/test/result/1")
      .set({ access_token: clinicToken2 })
      .send({
        test_result: "positive",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("You are not authorized");
        expect(res.status).toBe(403);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if registration info not found`, (done) => {
    request(app)
      .patch("/registrations/clinic/test/result/5")
      .set({ access_token: clinicToken })
      .send({
        test_result: "positive",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("edit isTested status on a registration info by a clinic admin", () => {
  test("successfully edited the isTested status in a registration info", (done) => {
    request(app)
      .patch("/registrations/clinic/istested/1")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "user testing bosku is already tested"
        );
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("registration info not found", (done) => {
    request(app)
      .patch("/registrations/clinic/istested/5")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("registration info delete by clinic admin", () => {
  beforeAll((done) => {
    request(app)
      .post("/registrations/user")
      .set({ access_token: userToken })
      .send({
        service_name: "swab",
        total_price: 200000,
        date: "2021-10-22",
        time: "16:00",
        ClinicId: 1,
        UserId: 1,
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("successfully deleted a registration info", (done) => {
    request(app)
      .delete("/registrations/clinic/2")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "Registration with ID : 2 has been deleted"
        );
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if clinic admin tries to edit another clinic's registration test result`, (done) => {
    request(app)
      .delete(`/registrations/clinic/${idbuatdelete}`)
      .set({ access_token: clinicToken2 })
      .send({
        test_result: "positive",
      })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("You are not authorized");
        expect(res.status).toBe(403);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test(`return error if registration info not found`, (done) => {
    request(app)
      .delete("/registrations/clinic/5")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Data Not Found");
        expect(res.status).toBe(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("successfully deleted a registration info", (done) => {
    request(app)
      .delete("/registrations/clinic/1")
      .set({ access_token: clinicToken })
      .then((res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain(
          "Registration with ID : 1 has been deleted"
        );
        expect(res.status).toBe(200);
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

  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Registration.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
