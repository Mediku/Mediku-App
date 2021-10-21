const { User, Registration } = require("../models");

const authorizationUser = async (req, res, next) => {
  const id = +req.params.id;
  try {
    const foundRegistration = await Registration.findByPk(id);
    if (foundRegistration) {
      if (req.user.id == foundRegistration.UserId) {
        next();
      } else {
        throw { name: "You are not authorized" };
      }
    } else {
      throw { name: "Data Not Found" };
    }
  } catch (err) {
    next(err);
  }
};

const authorizationUserProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUser = await User.findByPk(id);
    if (foundUser) {
      if (req.user.id == foundUser.id) {
        next();
      } else {
        throw { name: "You are not authorized" };
      }
    } else {
      throw { name: "Data Not Found" };
    }
  } catch (err) {
    next(err);
  }
};

const authorizationClinic = async (req, res, next) => {
  const id = +req.params.id;
  try {
    const foundRegistration = await Registration.findByPk(id);
    if (foundRegistration) {
      if (req.user.id == foundRegistration.ClinicId) {
        next();
      } else {
        throw { name: "You are not authorized" };
      }
    } else {
      throw { name: "Data Not Found" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorizationUser,
  authorizationClinic,
  authorizationUserProfile,
};
