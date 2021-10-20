<<<<<<< HEAD
const { User, Registration } = require("../models");

=======
const { Registration, User } = require("../models");
>>>>>>> c32bfeed6b5594a6147a3ab8fde7b80c3e23a841
const authorizationUser = async (req, res, next) => {
  const id = +req.params.id;
  try {
    const foundRegistration = await Registration.findByPk(id);
    if (foundRegistration) {
      if (req.user.id == foundRegistration.UserId) {
        next();
<<<<<<< HEAD
=======
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
>>>>>>> c32bfeed6b5594a6147a3ab8fde7b80c3e23a841
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
<<<<<<< HEAD

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
=======
>>>>>>> c32bfeed6b5594a6147a3ab8fde7b80c3e23a841

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
