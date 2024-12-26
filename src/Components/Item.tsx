import {useState} from "react"
import "./item.css"
import type { Order } from "../App.tsx"

type ItemProps = {
  item : Order
  handleCart : (obj : Order)=>void
}

export default function Item({item, handleCart} : ItemProps){
  const [isPopup, setIsPopup] = useState<boolean>(false)
  const [numOfItems, setNumOfItems] = useState<number>(1)

  const {url, name, price} : Order = item

  return(
    <div className="item">
      <img src={url} width="300px"className="menuimg"/>
      <a className="itemname">{name} {price}円</a>
      <a className="itemopen" onClick={
        () => {
          setIsPopup(true)
          setNumOfItems(1)
        }
      }>注文する</a>
      {
        isPopup && 
        <div className="popup">
          <div>
            <img src={url}/>
            <a className="popupname" >{name} {price}円</a>
            <span className="close" onClick={() => setIsPopup(false)}></span>
            <a className="numofitems">
              <span onClick={
                () => {
                  if (numOfItems - 1)  {
                    setNumOfItems(numOfItems - 1)
                  }
                }
              }>-</span>{numOfItems}
              <span onClick={() => setNumOfItems(numOfItems + 1)}>+</span>
            </a>
            <a className="intocart" onClick={
              () => {
                handleCart({name, price, numOfItems})
                setIsPopup(false)
              }
            }>カートに入れる</a>
          </div>
        </div>
      }
    </div>
  )
}
