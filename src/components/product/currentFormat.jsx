import React from 'react'
import Numeral from 'numeral'
function currentFormat({amount}) {
    const formattedAmount=Numeral(amount).format("$0,0.00")
  return (
    <div>
      {formattedAmount}
    </div>
  )
}

export default currentFormat
