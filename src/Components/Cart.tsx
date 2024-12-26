import { useState } from "react"
import "./cart.css"
import type { Order } from "../App.tsx"

type CartProps = {
  cart : Order[] 
  removeCart : ()=>void
  handleOrders : (order : Order[])=>void
  delFromCart : (num : number)=>void
}

export default function Cart({cart, removeCart, handleOrders, delFromCart} : CartProps){
  const [cartOpen, setCartOpen] = useState<boolean>(false)

  const cartPrices : number[] = cart.map<number>((i : Order) => i.price * (i.numOfItems ?? 0))
  const initialValue : number = 0
  const sumOfCartPrices : number = cartPrices.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)

  const cartItems = cart.map((i : Order, n : number) => {
    return(
      <li key={n}><p>{i.name}{i.price}円 {i.numOfItems}個</p><span className="delitem" onClick={() => delFromCart(n)}></span></li>
    )
  })

  return(
    <div>
      {
        cartOpen
        ? <div className="cart">
            <div>
              <span className="cartclose" onClick={() => setCartOpen(false)}></span>
              <ul>{cartItems}</ul>
              <div className="innercart">
                <p className="cartprice">{sumOfCartPrices}円</p>
                <p className={
                  cart.length > 0
                  ? "cartorder"
                  : "cartorder noitemincartorder"
                } onClick={
                  () => {
                    handleOrders(cart)
                    removeCart()
                    setCartOpen(false)
                  }
                }>注文する</p>
              </div>
            </div>
          </div>
        : <a className={
            cart.length > 0
            ? "cartopen"
            : "cartopen noitemincart"
          } 
          onClick={() => {
              setCartOpen(true)
            }
          }><img src="../../public/icon/icon_cart.svg"/></a>
      }
    </div>
  )
}
