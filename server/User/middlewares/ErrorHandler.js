module.exports = function (err, req, res, next) {
  let code = err.code || 500;
  let message = 'Internal Server Error';

  if (err.name === 'SequelizeUniqueConstraintError') {
    code = 400
    message = `${req.body.email} already registered`
  } else if (err.name === "SequelizeValidationError") {
    let errors = err.errors.map(l => {
      return l.message
    })
    code = 400
    message = errors
  } else if (err.name === 'Unauthorized') {
    code = 401
    message = 'Email/Password is wrong'
  } else if (err.name === 'JsonWebTokenError') {
    code = 401
    message = 'Invalid Token'
  } else if (err.name === "Please Login First") {
    code = 401
    message = "Please Login First"
  } else if (err.name === "Data Not Found") {
    code = 404
    message = "Data Not Found"
  }
  res.status(code).json({ message })
}