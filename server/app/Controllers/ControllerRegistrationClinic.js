const { Registration, Clinic, User } = require("../models");
const sendNodemailer = require("../helpers/nodemailer");

class ControllerRegistrationClinic {
  static async findAllTodayRegistration(req, res, next) {
    try {
      const result = await Registration.findAll({
        where: {
          id: req.user.id,
          createdAt: new Date(),
        },
      });
    } catch (err) {
      next(err);
    }
  } // belum kelar (is_paid = true)

  static async findAll(req, res, next) {
    try {
      const result = await Registration.findAll({
        where: { is_paid: true, ClinicId: req.user.id },
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

  static async deleteRegistration(req, res, next) {
    const { id } = req.params;
    try {
      const foundRegistration = await Registration.findByPk(id);
      if (!foundRegistration) {
        throw { name: "Data Not Found" };
      } else {
        await Registration.destroy({ where: { id } });
        res.status(200).json({
          message: `Registration with ID : ${foundRegistration.id} has been deleted`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editTestResult(req, res, next) {
    const id = req.params.id;
    try {
      const foundRegistration = await Registration.findByPk(id, {
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

      if (!foundRegistration) {
        throw { name: "Data Not Found" };
      } else {
        await Registration.update(
          { test_result: req.body.test_result },
          { where: { id }, returning: true }
        );
        sendNodemailer(
          foundRegistration.User.email,
          `Your test result from clinic ${foundRegistration.Clinic.name}`,
          `We have done the test with ${foundRegistration.service_name} and concluded that your test result is ${req.body.test_result}`
        );
        res.status(200).json({
          message: `Registration with ID : ${foundRegistration.id} has been updated`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editRegistration(req, res, next) {
    let is_paid;
    let is_tested;
    const { id } = req.params;
    const { service_name, total_price, date, time, ClinicId, test_result } =
      req.body;
    const UserId = req.user.id;
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
    const data = {
      service_name,
      total_price,
      date,
      time,
      ClinicId,
      UserId,
      is_paid,
      is_tested,
      test_result,
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

module.exports = ControllerRegistrationClinic;
