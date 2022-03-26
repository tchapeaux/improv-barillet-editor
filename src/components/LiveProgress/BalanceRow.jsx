import React from "react";
import range from "lodash.range";

import Bubble from "./Bubble";
import { BUBBLE_STATES } from "./LiveProgress";

import percent from "../../utils/percent";

export default function BalanceRow({
  labelLeft,
  labelRight,
  quantityLeft,
  quantityRight,
}) {
  const percentValue =
    quantityLeft + quantityRight > 0
      ? percent(quantityLeft, quantityLeft + quantityRight)
      : 0;

  return (
    <div className="balance-row">
      <p>{labelLeft}</p>

      <div className="live-progress-bubbles">
        {range(quantityLeft).map((idx) => (
          <Bubble key={idx} state={BUBBLE_STATES.SEEN} />
        ))}
      </div>

      <p>{percentValue}%</p>

      <div className="live-progress-bubbles">
        {range(quantityRight).map((idx) => (
          <Bubble key={idx} state={BUBBLE_STATES.SEEN} />
        ))}
      </div>

      <p>{labelRight}</p>
    </div>
  );
}
