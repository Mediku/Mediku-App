const app = require('../app')
const request = require('supertest')
const { User, Registration, Clinic, sequelize } = require('../models')
const { queryInterface } = sequelize
const { signToken } = require('../helpers/jwt')

let userToken, clinicToken
let invalidToken =
  "22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJvbm9AbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjIxMTYzNDYyfQ.WhdvxtOveekRlXU0-KbuFv7vvsZsciDBKSDugxIX19g";

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

const clinic = {
  name: "adkfaulgfh",
  email: "testing1@mail.com",
  password: "testingaja",
  phone_number: "54685189",
  address: "jalan suka-suka clinic",
  operational_time_open: "09:00",
  operational_time_close: "17:00",
  operational_day_open: "Senin,Selasa,Rabu,Kamis,Jumat",
  swab_antigen: true,
  swab_pcr: true,
  antigen_price: 500000,
  pcr_price: 450000
}

// describe('GET /registrations [CASE SUCCESS]', () => {
//   beforeAll(done => {
//     Clinic.create(user2)
//       .then(_ => {
//         done()
//       })
//       .catch(err => {
//         done(err)
//       })
//   })

//   afterAll(done => {
//     queryInterface
//       .bulkDelete('Users', {})
//       .then(() => done())
//       .catch(err => done(err));
//   });
// })
