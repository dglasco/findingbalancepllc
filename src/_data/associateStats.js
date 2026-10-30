/* The published fee ranges, computed from associates.js rather than typed out.

   The ranges appeared in six places across two templates and a schema block,
   which is five chances for one of them to be wrong after somebody raises a
   fee. Every one of them now reads from here. An associate who has not given
   us a number is left out of the range instead of being guessed at, so adding
   a seventh associate changes the copy on the site with no edit to the copy. */

import associates from "./associates.js";

const nums = (key) => associates.map((a) => a[key]).filter((n) => typeof n === "number");
const lo = (key) => Math.min(...nums(key));
const hi = (key) => Math.max(...nums(key));
const money = (n) => `$${n}`;

export default {
  count: associates.length,

  // Individual 50-minute sessions.
  individualLow: money(lo("feeIndividual")),
  individualHigh: money(hi("feeIndividual")),
  individualRange: `${money(lo("feeIndividual"))} to ${money(hi("feeIndividual"))}`,

  // Couples and family, which only some associates offer.
  couplesLow: money(lo("feeCouples")),
  couplesHigh: money(hi("feeCouples")),
  couplesRange: `${money(lo("feeCouples"))} to ${money(hi("feeCouples"))}`,
  couplesCount: nums("feeCouples").length,

  // The lowest sliding-scale place anyone publishes.
  slidingFrom: money(lo("feeSlidingFrom")),
  slidingCount: nums("feeSlidingFrom").length,

  // For the AggregateOffer on /therapy/associates/.
  schemaLow: String(lo("feeSlidingFrom")),
  schemaHigh: String(Math.max(hi("feeIndividual"), hi("feeCouples"))),
};
