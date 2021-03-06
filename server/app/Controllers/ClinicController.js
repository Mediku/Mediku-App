const { Clinic } = require("../models");
const { checkPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");

class ClinicController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const clinic = await Clinic.findOne({
        where: {
          email,
        },
      });
      
      if (clinic) {
        const checkPass = checkPassword(password, clinic.password);
        if (checkPass) {
          const access_token = signToken({
            id: clinic.id,
            email: clinic.email,
          });
          
          res.status(200).json({
            id: clinic.id,
            name: clinic.name,
            email: clinic.email,
            imageURL: clinic.imageURL,
            access_token,
          });
        } else {
          throw { name: "Unauthorized" };
        }
      } else {
        throw { name: "Unauthorized" };
      }
    } catch (err) {
      console.log(err)
      next(err);
    }
  }

  static async create(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone_number: req.body.phone_number,
      address: req.body.address,
      imageURL: req.body.imageURL,
      operational_time_open: req.body.operational_time_open,
      operational_time_close: req.body.operational_time_close,
      operational_day_open: req.body.operational_day_open,
      swab_pcr: req.body.swab_pcr,
      swab_antigen: req.body.swab_antigen,
      pcr_price: Number(req.body.pcr_price),
      antigen_price: Number(req.body.antigen_price),
    };
    try {
      const clinic = await Clinic.create(data);
      let days = clinic.operational_day_open.split(",");
      res.status(201).json({
        message: "Clinic successfully registered",
        id: clinic.id,
        email: clinic.email,
        name: clinic.name,
        phone_number: clinic.phone_number,
        address: clinic.address,
        imageURL: clinic.imageURL,
        operational_time_open: clinic.operational_time_open,
        operational_time_close: clinic.operational_time_close,
        operational_day_open: days,
        swab_pcr: clinic.swab_pcr,
        swab_antigen: clinic.swab_antigen,
        pcr_price: clinic.pcr_price,
        antigen_price: clinic.antigen_price,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    let list = await Clinic.findAll({});
    for (let obj of list) {
      obj.operational_day_open = obj.operational_day_open.split(",");
    }
    res.status(200).json({
      message: "Succeded in getting all list",
      list,
    });
  }

  static async listById(req, res, next) {
    try {
      let data = await Clinic.findByPk(req.params.id);
      if (!data) {
        throw {
          name: "Not Found",
          message: `Clinic with id ${req.params.id} not found`,
        };
      }
      data.operational_day_open = data.operational_day_open.split(",");
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async Update(req, res, next) {
    try {
      const id = req.params.id;
      const name = req.body.name;
      const email = req.body.email;
      const phone_number = req.body.phone_number;
      const address = req.body.address;
      const imageURL = req.body.imageURL;
      const operational_time_open = req.body.operational_time_open;
      const operational_time_close = req.body.operational_time_close;
      const operational_day_open = req.body.operational_day_open;
      const swab_pcr = req.body.swab_pcr;
      const swab_antigen = req.body.swab_antigen;
      const pcr_price = req.body.pcr_price;
      const antigen_price = req.body.antigen_price;
      const password = req.body.password;
      const data = await Clinic.findByPk(id);
      if (data) {
        const result = await Clinic.update(
          {
            name,
            email,
            phone_number,
            address,
            operational_time_close,
            operational_time_open,
            operational_day_open,
            swab_pcr,
            swab_antigen,
            pcr_price,
            antigen_price,
            imageURL,
            password
          },
          {
            where: { id: data.id },
            returning: true,
          }
        );
        res.status(200).json(result[1][0]);
      } else {
        throw { name: "Not Found" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const clinic = await Clinic.findByPk(req.params.id);
      if (!clinic) {
        throw { name: "Not Found" };
      }
      await Clinic.destroy({
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).json({
        message: `Clinic with name '${clinic.name}' successfully deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClinicController;
