import { Button } from "../counter/button/Button"

export const CounterConfig = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <div className="input">
            <label>max value:</label>
            <input type="number" />
        </div>
        <div className="input">
            <label>start value:</label>
            <input type="text" />
        </div>
      </div>
      <div className="wrapperButtons">
        <Button disabled onClick={()=>{}}>Set</Button>
      </div>
    </div>
  )
}

