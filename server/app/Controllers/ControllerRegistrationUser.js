const { Registration, Clinic, User } = require("../models");
const sendNodemailer = require("../helpers/nodemailer");

class ControllerRegistrationUser {
  static async findOneRegistration(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Registration.findByPk(id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Clinic,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      if (!result) {
        throw { name: "Data Not Found" };
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      next(err);
    }
  }

  static async createRegistration(req, res, next) {
    let is_paid;
    let is_tested;
    const { service_name, total_price, date, time, ClinicId } = req.body;
    if (req.body.is_paid == "true") {
      is_paid = true;
    } else {
      is_paid = false;
    }
    if (req.body.is_tested == "true") {
      is_tested = true;
    } else {
      is_tested = false;
    }
    const UserId = req.user.id;
    try {
      const result = await Registration.create({
        service_name,
        total_price,
        date,
        time,
        is_paid,
        ClinicId,
        UserId,
        is_tested,
      });

      const clinic = await Clinic.findByPk(result.ClinicId);
      sendNodemailer(
        req.user.email,
        "Registration Succeess",
        `Hello, ${req.user.full_name}. Thank you for registering on Mediku. Here are your registration informations:

        Your name: ${req.user.full_name}
        Clinic name: ${clinic.name}
        Service name: ${result.service_name}
        Price: ${result.total_price}
        Date: ${result.date}
        
        Please go to the clinic you have registered`
      );
      sendNodemailer(
        clinic.email,
        `User Registration`,
        `A user have registered on your clinic.
        
        Name: ${req.user.full_name}
        Service nameL ${result.service_name}
        Date: ${result.date}`
      );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async findAllRegistrationForUserLoginned(req, res, next) {
    try {
      const result = await Registration.findAll({
        where: { UserId: req.user.id },
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: Clinic,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async editRegistration(req, res, next) {
    const { id } = req.params;
    const { service_name, total_price, date, time, ClinicId } = req.body;
    const UserId = req.user.id;
    const data = {
      service_name,
      total_price,
      date,
      time,
      ClinicId,
      UserId,
    };
    try {
      const result = await Registration.update(data, {
        where: { id },
        returning: true,
      });
      res.status(200).json(result[1][0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerRegistrationUser;
