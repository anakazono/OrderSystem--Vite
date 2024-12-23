import { useState } from "react"
import Item from "./Item.tsx"
import "./menu.css"
import type { Sort } from "../App.tsx"

export default function Menu({handleCart, itemsArray}){
  const [sortOfItem, setSortOfItem] = useState<Sort | null>(null)

  const allItems = itemsArray.map((i, n) => {
    return(
      <li className="menuli" key={n}>
        <Item item={i} handleCart={handleCart}/>
      </li>
    )
  })
  
  const mainItems = itemsArray.map((i, n) => {
    if(i.sort === "MAIN"){
      return(
        <li className="menuli" key={n}>
          <Item item={i} handleCart={handleCart}/>
        </li>
      )
    }
  })

  const subItems = itemsArray.map((i, n) => {
    if(i.sort === "SUB"){
      return(
        <li className="menuli" key={n}>
          <Item item={i} handleCart={handleCart}/>
        </li>
      )
    }
  })
  
  const sortItems = () => {
    if(sortOfItem === null){
      return allItems
    }else if(sortOfItem === "MAIN"){
      return mainItems
    }else if(sortOfItem === "SUB"){
      return subItems
    }
  }
  const items = sortItems()

  return(
    <div className="menu">
      <ul className="menusort">
        <li className={sortOfItem === null ? "focused" : "unfocused"} onClick={() => setSortOfItem(null)}>ALL</li>
        <li className={sortOfItem === "MAIN" ? "focused" : "unfocused"} onClick={() => setSortOfItem("MAIN")}>MAIN</li>
        <li className={sortOfItem === "SUB" ? "focused" : "unfocused"} onClick={() => setSortOfItem("SUB")}>SUB</li>
      </ul>
      <ul className="menuul">{items}</ul>
    </div>
  )
}
