const { Registration, Clinic, User } = require("../models");
const sendNodemailer = require("../helpers/nodemailer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ControllerRegistrationClinic {
  static async findAllTodayRegistration(req, res, next) {
    const result = await Registration.findAll({
      where: {
        ClinicId: req.user.id,
        is_paid: true,
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    res.status(200).json(result);
  }

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
  // dashboard
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
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async deleteRegistration(req, res, next) {
    const { id } = req.params;
    try {
      const foundRegistration = await Registration.findByPk(id);
      await Registration.destroy({ where: { id } });
      res.status(200).json({
        message: `Registration with ID : ${foundRegistration.id} has been deleted`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editIsTestedRegistration(req, res, next) {
    const { id } = req.params;
    try {
      const data = {
        is_tested: true,
      };
      const foundRegistration = await Registration.findByPk(id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      if (!foundRegistration) {
        throw { name: "Data Not Found" };
      }
      await Registration.update(data, {
        where: { id: foundRegistration.id },
        returning: true,
      });
      res.status(200).json({
        message: `user ${foundRegistration.User.full_name} is already tested`,
      });
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

      await Registration.update(
        { test_result: req.body.test_result },
        { where: { id }, returning: true }
      );
      sendNodemailer(
        foundRegistration.User.email,
        `Your test result from clinic ${foundRegistration.Clinic.name}`,
        null,
        `<!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        
        <head>
          <title></title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
          <!--[if !mso]><!-->
          <!--<![endif]-->
          <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
            }
        
            th.column {
              padding: 0
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            @media (max-width:720px) {
              .row-content {
                width: 100% !important;
              }
        
              .image_block img.big {
                width: auto !important;
              }
        
              .mobile_hide {
                display: none;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
        
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
            }
          </style>
        </head>
        
        <body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
            <tbody>
              <tr>
                <td>
                  <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #7787b5;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="700">
                            <tbody>
                              <tr>
                                <th class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px;">
                                  <div class="spacer_block" style="height:10px;line-height:10px;">&#8202;</div>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="700">
                            <tbody>
                              <tr>
                                <th class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px;">
                                  <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td style="padding-bottom:15px;padding-left:5px;padding-right:5px;padding-top:15px;width:100%;">
                                        <div align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/722932_705872/Screen%20Shot%202021-10-21%20at%2006.08.39.png" style="display: block; height: auto; border: 0; width: 246px; max-width: 100%;" width="246" alt="Image" title="Image"></div>
                                      </td>
                                    </tr>
                                  </table>
                                  <div class="spacer_block mobile_hide" style="height:20px;line-height:20px;">&#8202;</div>
                                  <div class="spacer_block" style="height:5px;line-height:5px;">&#8202;</div>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #e9e9f6; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1011/Patternvirus.png'); background-position: center top; background-repeat: repeat;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="700">
                            <tbody>
                              <tr>
                                <th class="column" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 15px; padding-right: 15px; padding-top: 45px; padding-bottom: 45px;">
                                  <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td>
                                        <div style="font-family: sans-serif">
                                          <div style="font-size: 12px; color: #50639c; line-height: 1.2; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif;">
                                            <p style="margin: 0; font-size: 12px; mso-line-height-alt: 14.399999999999999px;">&nbsp;</p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td style="padding-bottom:15px;width:100%;padding-right:0px;padding-left:0px;">
                                        <div align="center" style="line-height:10px"><img class="big" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1011/wash_hands_hero.png" style="display: block; height: auto; border: 0; width: 670px; max-width: 100%;" width="670" alt="Image" title="Image"></div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td style="padding-bottom:10px;padding-left:10px;padding-right:20px;padding-top:10px;">
                                        <div style="font-family: sans-serif">
                                          <div style="font-size: 12px; color: #555555; line-height: 1.5; font-family: Roboto, Tahoma, Verdana, Segoe, sans-serif;">
                                            <p style="margin: 0; font-size: 12px; text-align: center; letter-spacing: 1px;">YOUR COVID TEST RESULT :${req.body.test_result}<br>NAME : ${foundRegistration.User.full_name}<br>EMAIL: ${foundRegistration.User.email}<br>CLINIC : ${foundRegistration.Clinic.name}<br><br>TERIMA KASIH</p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table><!-- End -->
        </body>
        
        </html>`
      );
      res.status(200).json({
        message: `Registration with ID : ${foundRegistration.id} has been updated`,
      });
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
    if (req.body.is_paid == true) {
      is_paid = true;
    } else {
      is_paid = false;
    }
    if (req.body.is_tested == true) {
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
