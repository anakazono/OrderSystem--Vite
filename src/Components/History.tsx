import "./history.css"
import { Order } from "../App.tsx"

type HistoryProps = {
  orders : Order[]
  num : number
}

export default function History({orders, num} : HistoryProps){
  const ordersPrices : number[] = orders.map<number>((i : Order) => i.price * (i.numOfItems ?? 0))
  const iniVal : number = 0
  const sumOfOrdersPrices : number = ordersPrices.reduce((acc, curVal) => acc + curVal, iniVal)

  const ordersList = orders.map((i : Order, n : number) => {
    return(
      <li key={n}><p>{i.name}{i.price}円 {i.numOfItems}個</p></li>
    )
  })

  return(
    <div className="history">
      <ul>{ordersList}</ul>
      <p>{sumOfOrdersPrices}円 (1人当たり {Math.floor(sumOfOrdersPrices / num)}円)</p>
    </div>
  )
}
