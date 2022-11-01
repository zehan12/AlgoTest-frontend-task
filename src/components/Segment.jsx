import { Fragment, useState } from "react"
import ClosestPremium from "./strikes/ClosestPremium";
import PremiumRange from "./strikes/PremiumRange";
import StraddleWidth from "./strikes/StraddleWidth";
import StrikeType from "./strikes/StrikeType";


const Segment = ({
  handleChange,
  totalLeg,
  position,
  optionType,
  expiry,
  strike,
  strikeType,
  lower,
  upper,
  premium,
  plusMinus,
  multiplier
}) => {
  const [selected, setSelected] = useState("futures");

  const handleClick = ({ target }) => {
    const { innerText } = target;
    if (innerText === "Options") {
      setSelected("options")
    } else {
      setSelected("futures")
    }
  }


  // const RenderStrikes = ( type ) => {
  //   switch( type ) {
  //     case "Strike Type":
  //       return <StrikeType />
  //     case "Premium Range":
  //       return <PremiumRange />
  //     case "Closest Range":
  //       return <ClosestRange />
  //     case "Straddle Width":
  //       return <StraddleWidth />
  //     default :
  //       return ""
  //   }
  // }


  return (
    <Fragment>
      <div>
        <div
          className="flex  align-middle justify-center">
          {/* //  style={{ display: "flex", alignItems: "center", justifyContent: "center" }} */}
          <h3 className="font-bold">Select segments </h3>
          <div style={{ display: "flex" }}>
            <button
              className="text-sm ml-3  pr-3 pl-4 p-1 rounded-l-full	"
              style={{ backgroundColor: selected === "futures" ? "#375A9E" : "white", color: selected === "futures" ? "white" : "#3F3F3F" }}
              onClick={(e) => handleClick(e)}>Futures</button>
            <button
              className="text-sm pr-4 pl-3 rounded-r-full"
              style={{ backgroundColor: selected === "options" ? "#375A9E" : "white", color: selected === "options" ? "white" : "#3F3F3F" }}
              onClick={(e) => handleClick(e)}>Options</button>
          </div>
        </div>

        {
          selected === "futures" ? <Fragment>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}

              className="flex border-red-900 border-4 justify-evenly p-5"
            >
              <div>
                <h4 className="text-l font-bold">Total lot</h4>
                <input
                  name="totalLot"
                  className="border-black m-3 px-3 rounded-full h-5 w-14"
                  // onKeyDown={""}
                  onChange={(e) => handleChange(e)}
                  type="number" min="1"
                  value={totalLeg}
                />

              </div>
              <div>
                <h4 className="text-l font-bold">Postion</h4>
                <select className="m-3 text-xs px-2 rounded-full w-18" name="position" value={position} onChange={(e) => handleChange(e)}>
                  <option value="Sell">Sell</option>
                  <option value="Buy">Buy</option>
                </select>
              </div>
            </div>
          </Fragment>
            :
            <Fragment>
              <div style={{ display: "flex", flexDirection: "row" }}
                className="flex border-red-900 border-4 justify-evenly p-5"
              >
                <div>
                  <h4 className="text-l font-bold">Total lot</h4>
                  <input
                    className="border-black m-3 px-3 rounded-full h-5 w-14"
                    type="number" min="1" value={totalLeg}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <h4 className="text-l font-bold">Postion</h4>
                  <select className="m-3 text-xs px-2 rounded-full w-18" name="position" value={position} onChange={(e) => handleChange(e)}>
                    <option value="Sell">Sell</option>
                    <option value="Buy">Buy</option>
                  </select>
                </div>
                <div>
                  <h4 className="text-l font-bold">Option Type</h4>
                  <select className="m-3 text-xs w-18 px-2 rounded-full" name="optionType" value={optionType} onChange={(e) => handleChange(e)}>
                    <option value="Call">Call</option>
                    <option value="Buy">Buy</option>
                  </select>
                </div>
                <div>
                  <h4 className="text-l font-bold">Expiry</h4>
                  <select className="m-3 text-xs w-18 px-2 rounded-full" name="expiry" value={expiry} onChange={(e) => handleChange(e)}>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <h4 className="text-l font-bold">SelectedStrike Criteria</h4>
                  <select className="m-3 text-xs  px-3 rounded-full w-34" name="strike" value={strike} onChange={(e) => handleChange(e)}>
                    <option value="Strike Type">Strike Type</option>
                    <option value="Premium Range">Premium Range</option>
                    <option value="Closest Premium">Closest Premium</option>
                    <option value="Straddle Width">Straddle Width</option>
                  </select>
                </div>
                {
                  strike === "Strike Type" ?
                    <StrikeType
                      handleChange={handleChange}
                      strikeType={strikeType}
                    />
                    : strike === "Premium Range" ?
                      <PremiumRange
                        handleChange={handleChange}
                        lower={lower}
                        upper={upper}
                      />
                      : strike === "Closest Premium" ?
                        <ClosestPremium
                          handleChange={handleChange}
                          premium={premium}
                        />
                        : strike === "Straddle Width" ? <StraddleWidth
                          handleChange={handleChange}
                          plusMinus={plusMinus}
                          multiplier={multiplier}
                        />
                          : ""
                }
              </div>
            </Fragment>
        }
      </div>
    </Fragment>
  )
}

export default Segment;