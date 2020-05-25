import React from "react"

const Purchase = (props) => {
  return (
    <form name="purchase" onSubmit={props.onSubmitHandler}>
      <div>
        <label>
          Transfer
          <input
            type="text"
            id="ticker"
            name="ticker"
            placeholder="Ticker"
            onChange={props.onTickerChange}
          />
        </label>
      </div>
      <div>
        <label>
          Qty
          <input
            type="text"
            id="qty"
            name="qty"
            placeholder="Qty"
            onChange={props.onQtyChange}
          />
        </label>
      </div>
      <input type="submit" />
    </form>
  )
}

export default Purchase