const app = require('../app')
const request = require('supertest')
const { User, Registration, sequelize } = require('../models')
const { queryInterface } = sequelize
const { signToken } = require('../helpers/jwt')


const user = {
  full_name: 'testing bosku',
  email: 'test1@mail.com',
  password: 'rahasia123',
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
  RW: "02"
}

const registration = {
  id: 1,
  service_name: "swab",
  total_price: 200000,
  date: "2021-10-22",
  time: "16:00",
  ClinicId: 1,
  is_tested: false,
  is_paid: false,
  UserId: 1
}

let userToken, createdRegistration
let invalidToken =
  "22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvbm9AbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMTYzNDYyfQ.WhdvxtOveekRlXU0-KbuFv7vvsZsciDBKSDugxIX19g";

beforeAll((done) => {
  User.create(user)
    .then((data) => {
      userToken = signToken({ id: data.id, email: data.email }, "rahasia123");
      done();
    })
    .catch((err) => {
      done(err);
    });
});

beforeAll((done) => {
  Registration.create(registration)
    .then((data) => {
      createdRegistration = data
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /xendits/invoice/:id [CASE SUCCESS]", () => {
  test("Should return Object with properties like invoice_id, external_id, status, amount, merchant_name, payer_email, expiry_date, invoiceURL, description with status code 201", (done) => {
    request(app)
      .post(`/xendits/invoice/${createdRegistration.id}`)
      .set("access_token", userToken)
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("invoice_id", response.body.invoice_id)
        expect(response.body).toHaveProperty("external_id", response.body.external_id)
        expect(response.body).toHaveProperty("status", response.body.status)
        expect(response.body).toHaveProperty("amount", response.body.amount)
        expect(response.body).toHaveProperty("merchant_name", response.body.merchant_name)
        expect(response.body).toHaveProperty("payer_email", response.body.payer_email)
        expect(response.body).toHaveProperty("expiry_date", response.body.expiry_date)
        expect(response.body).toHaveProperty("invoiceURL", response.body.invoiceURL)
        expect(response.body).toHaveProperty("description", response.body.description)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

// describe("PATCH /xendits/invoice/:id/status [CASE SUCCESS]", () => {
//   test("Should return Object with message 'Hoooraayy! your payment has confirmed by Xendit please wait the schedule of antigen that you paid from clinic adkfaulgfh, there'll be on touch in your email inbox', with status code 200", (done) => {
//     request(app)
//       .patch(`/xendits/invoice/${createdRegistration.id}/status`)
//       .set("access_token", userToken)
//       .then(response => {
//         expect(response.status).toBe(201)
//         expect(response.body).toHaveProperty("invoice_id", response.body.invoice_id)
//         expect(response.body).toHaveProperty("external_id", response.body.external_id)
//         expect(response.body).toHaveProperty("status", response.body.status)
//         expect(response.body).toHaveProperty("amount", response.body.amount)
//         expect(response.body).toHaveProperty("merchant_name", response.body.merchant_name)
//         expect(response.body).toHaveProperty("payer_email", response.body.payer_email)
//         expect(response.body).toHaveProperty("expiry_date", response.body.expiry_date)
//         expect(response.body).toHaveProperty("invoiceURL", response.body.invoiceURL)
//         expect(response.body).toHaveProperty("description", response.body.description)
//         done()
//       })
//       .catch(err => {
//         done(err)
//       })
//   })
// })

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
  // await Clinic.destroy({
  //   where: {},
  //   truncate: true,
  //   cascade: true,
  //   restartIdentity: true,
  // });

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