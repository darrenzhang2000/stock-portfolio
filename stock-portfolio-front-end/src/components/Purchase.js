import React from "react"

const Purchase = (props) => {
  return (
    <form name="purchase" onSubmit={props.onSubmitHandler}>
      <ul>{props.errors ? props.errors.map((err, index) => <li key={index}>{err.msg}</li>) : null}</ul>
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
          Quantity
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
