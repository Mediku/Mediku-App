const { XenditInvoice } = require('../helpers/xenditPayment')
const { Registration, Clinic } = require('../models')
const sendNodemailer = require("../helpers/nodemailer");

class ControllerXendit {
  static async createInvoice(req, res, next) { // kalau udah bayar
    const { id } = req.params
    const { email } = req.user;
    const randomID = Math.random().toString(36).slice(2);
    try {
      const foundRegistration = await Registration.findByPk(id)
      const invoice = await XenditInvoice.createInvoice({
        externalID: `${randomID}`,
        payerEmail: email,
        description: `Invoice for Service Antigen Test`,
        amount: foundRegistration.total_price,
        shouldSendEmail: true,
      });
      res.status(201).json({
        invoice_id: invoice.id,
        external_id: invoice.external_id,
        status: invoice.status,
        amount: invoice.amount,
        merchant_name: invoice.merchant_name,
        payer_email: invoice.payer_email,
        expiry_date: invoice.expiry_date,
        invoiceURL: invoice.invoice_url,
        description: invoice.description
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async checkStatusInvoice(req, res, next) {
    const { id } = req.params
    const { invoiceID } = req.body;
    try {
      const foundRegistration = await Registration.findByPk(id, {
        include: [
          {
            model: Clinic,
            attributes: { exclude: ["password"] }
          }
        ]
      })
      const invoiceStatus = await XenditInvoice.getInvoice({
        invoiceID,
      });
      if (invoiceStatus.status == 'PENDING') {
        res.status(200).json({ message: `sorry your payment still on process or maybe you haven't paid it, please click this site for payment processing --> ${invoiceStatus.invoice_url} or you can see your email inbox to check it` })
      } else if (invoiceStatus.status == 'PAID') {
        sendNodemailer(
          'rheina.tamara@outlook.com',
          "Registration Payment Succeess",
          `Hello, ${req.user.full_name}. Thank you for registering on Mediku. Here are your registration informations:
  
          Your name: ${req.user.full_name}
          Clinic name: ${foundRegistration.Clinic.name}
          Service name: ${foundRegistration.service_name}
          Price: ${foundRegistration.total_price}
          Date: ${foundRegistration.date}
          
          Please go to the clinic you have registered`
        );
        const data = {
          is_paid: true
        }
        let paid;
        const changeIsPaid = await Registration.update(data, { where: { id: foundRegistration.id }, returning: true })
        if (changeIsPaid[1][0].is_paid == true) {
          paid = `Hoooraayy! your payment has confirmed by Xendit please wait the schedule of ${foundRegistration.service_name} that you paid from clinic ${foundRegistration.Clinic.name}, there'll be on touch in your email inbox`
        }
        res.status(200).json({ message: paid })
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = ControllerXendit