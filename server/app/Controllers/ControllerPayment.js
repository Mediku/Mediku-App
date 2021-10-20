const { XenditInvoice, XenditDisbursement } = require('../helpers/xenditPayment')

class ControllerXendit {
  static async createInvoice(req, res, next) {
    // const { id, email } = req.user
    const { email } = req.user;
    const { amount } = req.body;
    const randomID = Math.random().toString(36).slice(2);
    try {
      const invoice = await XenditInvoice.createInvoice({
        externalID: `invoice-lender-${randomID}`,
        payerEmail: email,
        description: `Invoice for loan ${randomID}`,
        amount,
        shouldSendEmail: true,
      });
      // invoice.invoiceURL (link)
      res.status(200).json({
        externalID: invoice.external_id,
        invoiceURL: invoice.invoice_url,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createWithdrawal(req, res, next) {
    //disburse ke lender
    // const { lenderID } = req.body;
    try {
      const loan = {
        // id: "123",
        initialLoan: 250000,
        lender: {
          bankCode: "OVO",
          accountHolderName: "Test",
          accountNumber: "1234567890",
        },
      };

      const disbursement = await XenditDisbursement.create({
        externalID: `invoice-lender-omjja9ma5u`,
        bankCode: loan.lender.bankCode,
        accountHolderName: loan.lender.accountHolderName,
        accountNumber: loan.lender.accountNumber,
        description: `withdrawal for invoice-lender-omjja9ma5u`,
        amount: loan.initialLoan,
      });
      res.status(200).json(disbursement)
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async paymentAccepted(req, res, next) {
    //disburse ke lender
    // const { lenderID } = req.body;
    try {
      const loan = {
        id: "123",
        initialLoan: 100000,
        lender: {
          bankCode: "BCA",
          accountHolderName: "Test",
          accountNumber: "1234567890",
        },
      };
      const disbursement = await XenditDisbursement.create({
        externalID: `disburse-${loan.id}`,
        bankCode: loan.lender.bankCode,
        accountHolderName: loan.lender.accountHolderName,
        accountNumber: loan.lender.accountNumber,
        description: `withdrawal for ${loan.id}`,
        amount: loan.initialLoan,
      });
      res.status(200).json({
        status: 'SUCCESS',
        user_id: disbursement.user_id,
        external_id: disbursement.external_id,
        amount: disbursement.amount,
        bank_code: disbursement.bank_code,
        account_holder_name: disbursement.account_holder_name,
        disbursement_description: disbursement.disbursement_description,
        id: disbursement.id
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = ControllerXendit