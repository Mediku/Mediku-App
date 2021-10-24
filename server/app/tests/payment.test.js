const app = require("../app");
const request = require("supertest");
const { User, Registration, Clinic } = require("../models");
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

const registration = {
  service_name: "swab",
  total_price: 200000,
  date: "2021-10-22",
  time: "16:00",
  ClinicId: 1,
  is_tested: false,
  is_paid: false,
  UserId: 1,
};

const clinic = {
  name: "Klinik Mediku",
  email: "medikuapp1@gmail.com",
  password: "rahasia123",
  phone_number: "0811-1816-900",
  address: "Ruko ContraSehat, Jl. Palbiru Timur No.54A,Jakarta Selatan, Jakarta 12210",
  imageURL: "https://d1ojs48v3n42tp.cloudfront.net/provider_location_banner/678537_25-9-2020_12-0-26.jpeg",
  operational_time_open: "09:00",
  operational_time_close: "17:00",
  operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
  swab_antigen: true,
  swab_pcr: true,
  antigen_price: 250000,
  pcr_price: 450000,
}

let userToken, createdRegistration, invoiceID;
beforeAll((done) => {
  User.create(user)
    .then((data) => {
      userToken = signToken({ id: data.id, email: data.email }, "rahasia123");
      return Clinic.create(clinic)
    })
    .then((_) => {
      return Registration.create(registration)
    })
    .then(result => {
      createdRegistration = result
      done()
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /xendits/invoice/:id [CASE SUCCESS]", () => {
  test("Should return Object with properties like invoice_id, external_id, status, amount, merchant_name, payer_email, expiry_date, invoiceURL, description with status code 201", (done) => {
    request(app)
      .post(`/xendits/invoice/${createdRegistration.dataValues.id}`)
      .set("access_token", userToken)
      .then((response) => {
        invoiceID = response.body.invoice_id;
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(
          "invoice_id",
          response.body.invoice_id
        );
        expect(response.body).toHaveProperty(
          "external_id",
          response.body.external_id
        );
        expect(response.body).toHaveProperty("status", response.body.status);
        expect(response.body).toHaveProperty("amount", response.body.amount);
        expect(response.body).toHaveProperty(
          "merchant_name",
          response.body.merchant_name
        );
        expect(response.body).toHaveProperty(
          "payer_email",
          response.body.payer_email
        );
        expect(response.body).toHaveProperty(
          "expiry_date",
          response.body.expiry_date
        );
        expect(response.body).toHaveProperty(
          "invoiceURL",
          response.body.invoiceURL
        );
        expect(response.body).toHaveProperty(
          "description",
          response.body.description
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /xendits/invoice/:id/status [CASE SUCCESS]", () => {
  test("Should return Object with message 'Hoooraayy! your payment has confirmed by Xendit please wait the schedule of antigen that you paid from clinic adkfaulgfh, there'll be on touch in your email inbox', with status code 200", (done) => {
    request(app)
      .patch(`/xendits/invoice/${createdRegistration.dataValues.id}/status`)
      .set("access_token", userToken)
      .send({
        invoiceID: invoiceID,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// afterAll((done) => {
//   queryInterface
//     .bulkDelete("Users", {})
//     .then(() => {
//       return queryInterface.bulkDelete("Registrations", {});
//     })
//     .then(() => {
//       done();
//     })
//     .catch((err) => done(err));
// });

afterAll(async () => {
  await User.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await Clinic.destroy({
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
