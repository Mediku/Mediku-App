const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: process.env.SK_PAYMENT,
});
const { Invoice, Disbursement, Payout } = x;
const invoiceSpecificOptions = {};
// const disbursementSpecificOptions = {};
// const payoutSpecificOptions = {};
const XenditInvoice = new Invoice(invoiceSpecificOptions);
// const XenditDisbursement = new Disbursement(disbursementSpecificOptions);
// const XenditPayout = new Payout(payoutSpecificOptions);

// module.exports = { XenditInvoice, XenditDisbursement, XenditPayout };
module.exports = { XenditInvoice };