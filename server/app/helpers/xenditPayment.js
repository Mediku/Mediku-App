const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: 'xnd_development_BmAbQP5LRkUeT3dGaxpyzXlAdhnlGS8i65pqw3oKFP1Y93KKF65Nycpu5R8KfN',
});
const { Invoice, Disbursement } = x;
const invoiceSpecificOptions = {};
const disbursementSpecificOptions = {};
const XenditInvoice = new Invoice(invoiceSpecificOptions);
const XenditDisbursement = new Disbursement(disbursementSpecificOptions);

module.exports = { XenditInvoice, XenditDisbursement };