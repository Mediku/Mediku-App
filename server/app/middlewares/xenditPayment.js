const x = new require('xendit-node')({ secretKey: process.env.SK_PAYMENT });

const { Payout } = x;
const payoutSpecificOptions = {};
const p = new Payout(payoutSpecificOptions);

const resp = await p.createPayout({
  externalID: 'demo_2392329329',
  amount: 23000,
  email: 'demo@xendit.co'
});
console.log(resp);