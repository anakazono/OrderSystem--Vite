import {useState} from "react"
import NumOfCus from "./Components/NumOfCus.tsx"
import Item from "./Components/Item.tsx"
import Menu from "./Components/Menu.tsx"
import Cart from "./Components/Cart.tsx"
import History from "./Components/History.tsx"
import Settings from "./Components/Settings.tsx"
import "./app.css"

export type Sort = "MAIN" | "SUB"

export type Order = {
  name : string
  price : number
  numOfItems : number
  sort : Sort
}

type ScreenType = "MENU" | "HISTORY" | "SETTINGS"

type Items = {
  url : string
  name : string
  price : number
  sort : Sort
}

export default function App(){
  const [num, setNum] = useState<number>(0)
  const [startOrder, setStartOrder] = useState<boolean>(false)
  const [screen, setScreen] = useState<ScreenType>("MENU")
  const [cart, setCart] = useState<Order[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [itemsArray, setItemsArray] = useState<Items[]>([
    {
      url : "../public/調理加工食品類_餃子_017_202mm_81g.png",
      name : "餃子",
      price : 400,
      sort : "SUB"
    },
    {
      url : "../public/調理加工食品類_酢豚_009_170mm_292g.png",
      name : "酢豚",
      price : 600,
      sort : "MAIN"
    },
    {
      url : "../public/調理加工食品類_回鍋肉_002_152mm_211g.png",
      name : "回鍋肉",
      price : 800,
      sort : "MAIN"
    },
    {
      url : "../public/調理加工食品類_天津飯_013_179mm_330g.png",
      name : "天津飯",
      price : 500,
      sort : "MAIN"
    },
    {
      url : "../public/調理加工食品類_春巻き_023_202mm_176g.png",
      name : "春巻き",
      price : 300,
      sort : "SUB"
    }
  ])

  const handleNum = (i : boolean) => {
    if(i){
      setNum(num + 1)
    }else{
      if(num){
        setNum(num - 1)
      }else{
        return false
      }
    }
  }

  const handleStartOrder = () => num ? setStartOrder(true) : false

  const handleCart = (Obj: Order) => setCart([...cart, Obj])

  const removeCart = () => setCart([])

  const handleOrders = (Array : Order[]) => setOrders([...orders, ...Array])

  const delFromCart = (n : number) => {
    const cart_ = cart.slice()
    cart_.splice(n, 1)
    setCart(cart_)
  }

  const addItems = (newItem : Items) => {
    const newItemsArray = itemsArray.slice()
    newItemsArray.push(newItem)
    setItemsArray(newItemsArray)
  }

  const rmItems = (n : number) => {
    const newItemsArray = itemsArray.slice()
    newItemsArray.splice(n, 1)
    setItemsArray(newItemsArray)
  }

  if(!(startOrder)){
    return (
      <NumOfCus num={num} handleNum={handleNum} handleStartOrder={handleStartOrder}/>
    )
    
  }else{
    return (
      <div>
        <div className="menuhistory">
          <a onClick={() => setScreen("MENU")}><img src="../public/icon/icon_menu.svg"/><span><b>MENU</b></span></a>
          <a onClick={() => setScreen("HISTORY")}><img src="../public/icon/icon_budget.svg"/><span><b>CHECK</b></span></a>
          <a onClick={() => setScreen("SETTINGS")}><img src="../public/icon/icon_settings.svg"/><span><b>SETTINGS</b></span></a>
          <a onClick={() => setStartOrder(false)}><img src="../public/icon/icon_return.svg"/><span><b>GO BACK</b></span></a>
        </div>
        <Cart cart={cart} removeCart={removeCart} handleOrders={handleOrders} delFromCart={delFromCart}/>
        {screen === "MENU" && <Menu handleCart={handleCart} itemsArray={itemsArray}/>}
        {screen === "HISTORY" && <History orders={orders} num={num}/>}
        {screen === "SETTINGS" && <Settings itemsArray={itemsArray} addItems={addItems} rmItems={rmItems}/>}
      </div>
    )
  }
}
