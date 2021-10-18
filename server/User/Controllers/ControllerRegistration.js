const { Registration } = require("../models");

class ControllerRegistration {
  static async findAll(req, res, next) {
    try {
      const result = await Registration.findAll({
        where: { UserId: req.user.id },
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  // dashboard
  static async findOneRegistration(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Registration.findByPk(id);
      if (!result) {
        throw { name: "Data Not Found" };
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      next(err);
    }
  }
  // client-user untuk create patient
  static async createRegistration(req, res, next) {
    let is_paid;
    const { service_name, total_price, date, time, ClinicId } = req.body;
    if (req.body.is_paid == "true") {
      is_paid = true;
    } else {
      is_paid = false;
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
      });
      res.status(201).json(result);
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

  static async editRegistration(req, res, next) {
    let is_paid;
    const { id } = req.params;
    const { service_name, total_price, date, time, ClinicId } = req.body;
    const UserId = req.user.id;
    if (req.body.is_paid == "true") {
      is_paid = true;
    } else {
      is_paid = false;
    }
    const data = {
      service_name,
      total_price,
      date,
      time,
      ClinicId,
      UserId,
      is_paid,
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

module.exports = ControllerRegistration;
