import "./numOfCus.css"

export default function NumOfCus({num, handleNum, handleStartOrder}){
  const message = num ? "注文を始める" : "ようこそ"
  return (
    <div className="NumOfCus">
      <p>人数を入力してください</p>

      <div>
        <a className={num !== 0 ? "button" : "button ghostbutton"} onClick={() => handleNum(false)}>-</a>
        <a className="num">{num}</a>
        <a className="button" onClick={() => handleNum(true)}>+</a>
      </div>

      <p className="message" onClick={handleStartOrder}>{message}</p>
    </div>
  )
}
