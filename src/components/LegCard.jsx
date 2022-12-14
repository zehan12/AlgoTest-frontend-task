import { Fragment, useState } from "react"
import ClosestPremiumCard from "./strikesOptions/ClosestPremiumCard";
import PremiumRangeCard from "./strikesOptions/PremiumRangeCard";
import SelectStrikesCriteria from "./strikesOptions/SelectStrikesCriteria";
import StraddleWidthCard from "./strikesOptions/StraddleWidthCard";
import StrikesTypes from "./strikesOptions/StrikesTypes";
import { FaRegCopy } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { simpleMomentumOptions, targetProfitAndStopLossOptions, reEntryArray } from "../utils/constant";
import AddValueCard from "./AddValueCard";



const LegCard = ({
    id,
    handleDelete,
    handleItems,
    Lots,
    positionType,
    expiryKind,
    instrumentKind,
    entryType,
    strikeParamemter,

    legMomentumValue,


    legTargetValue,

    legStopLossValue,

    legTrailSLEnable,
    legTrailSLValue,

    legReentryTPValue,

    legReentrySLValue,

    handleCreateCopy
}) => {

    const handleTrailSl = (id, e) => {
        let clone = { ...legTrailSLValue }
        clone.Value[e.target.name] = +e.target.value
        handleItems(id, { target: { name: "LegTrailSL", value: { ...clone } } })
    }

    const handleType = (id, e) => {
        let clone = { ...legTrailSLValue };
        clone.Type = e.target.value
        handleItems(id, { target: { name: "LegTrailSL", value: { ...clone } } })
    }

    const handleTypes = (id, e, targetObj) => {
        let clone = { ...targetObj };
        clone.Type = e.target.value;
        handleItems(id, { target: { name: e.target.name, value: { ...clone } } })
    }

    const handleEnableDisable = ({ id, name, initialOption, isChecked, targetObj }) => {
        const option = isChecked ? "None" : initialOption;
        let clone = { ...targetObj };
        clone.Type = option
        if (isChecked) {
            clone.Value = 0
        }
        handleItems(id, { target: { name: name, value: { ...clone } } })
    }

    const handleValues = (id, e, targetObj) => {
        let clone = { ...targetObj };
        clone.Value = +e.target.value;
        handleItems(id, { target: { name: e.target.name, value: { ...clone } } })
    }

    const [Type, setType] = useState(entryType)

    const handleEntry = ({ target }) => {
        const { value } = target
        setType(value)
    }

    const handleStrike = (id, value) => {
        let val = { target: { name: "StrikeParameter", value: value } };
        handleItems(id, val)
    }

    const handlePremiumRange = (id, lower, upper) => {
        let val = { target: { name: "StrikeParameter", value: { Lower: lower, Upper: upper } } }
        handleItems(id, val)
    }

    const handlePremium = (id, value) => {
        let val = { target: { name: "StrikeParameter", value: { Premium: value } } };
        handleItems(id, val)
    }

    const handleStraddle = (id, sign, value) => {
        let val = { target: { name: "StrikeParameter", value: { Adjustment: sign, Multiplier: value } } }
        handleItems(id, val)
    }



    const renderStrikes = (Type) => {
        switch (Type) {
            case "Strike Type":
                return (
                    <StrikesTypes
                        id={id}
                        handleStrike={handleStrike}
                        strikeParamemter={strikeParamemter}
                    />
                )
            case "Premium Range":
                return (
                    <PremiumRangeCard
                        id={id}
                        handlePremiumRange={handlePremiumRange}
                        strikeParamemter={strikeParamemter}
                    />
                )
            case "Closest Premium":
                return (
                    <ClosestPremiumCard
                        id={id}
                        handlePremium={handlePremium}
                        strikeParamemter={strikeParamemter}
                    />
                )
            case "Straddle Width":
                return (
                    <StraddleWidthCard
                        id={id}
                        strikeParamemter={strikeParamemter}
                        handleStraddle={handleStraddle}
                    />
                )
            default:
                return "";
        }
    }


    return (
        <Fragment>
            <div className="bg-[#EFEFEF] rounded-md m-auto my-6 relative" style={{ width: "80%" }}>
                <div className="flex flex-col absolute top-0 right-0 h-16 w-16 ml-2 pl-12 ">
                    <div
                        onClick={() => handleDelete(id)}
                        className="p-2 bg-red-400 border rounded-full h-7 w-7 text-white">
                        <ImCross size={10} />
                    </div>
                    <div
                        onClick={() => { handleCreateCopy(id) }}
                        className="mt-3 p-1 bg-white text-blue-300 border rounded-full h-7 w-7">
                        <FaRegCopy />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-baseline pt-5">
                    <h4 className="font-bold">
                        Lots:
                    </h4>
                    <input
                        className="border-black m-3 px-3 rounded-full h-5 w-14"
                        type="number" min="1"
                        name="Lots"
                        value={Lots}
                        onChange={(e) => handleItems(id, e)} />
                    <select className="m-2 bg-[#375A9E] text-white text-xs font-semibold border-x-4 border-[#375A9E] w-18 py-1 px-2 rounded-full"
                        name="PositionType" value={positionType}
                        onChange={(e) => handleItems(id, e)}
                    >
                        <option value="Sell">Sell</option>
                        <option value="Buy">Buy</option>
                    </select>

                    <select className="m-2 bg-[#375A9E] text-white text-xs font-semibold  border-x-4 border-[#375A9E] w-18 py-1 px-2 rounded-full" name="ExpiryKind" value={expiryKind} onChange={(e) => handleItems(id, e)}>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>

                    <select className="m-2 bg-[#375A9E] text-white text-xs font-semibold  border-x-4 border-[#375A9E] w-18 py-1 px-2 rounded-full" name="InstrumentKind" value={instrumentKind} onChange={(e) => handleItems(id, e)}>
                        <option value="Call">Call</option>
                        <option value="Buy">Buy</option>
                    </select>


                    <SelectStrikesCriteria
                        entryType={entryType}
                        id={id}
                        handleItems={handleItems}
                        handleEntry={handleEntry}
                    />

                    {
                        renderStrikes(Type)
                    }

                </div>


                <div className="flex flex-wrap justify-evenly px-10">

                    <AddValueCard
                        id={id}
                        name={"LegMomentum"}
                        componentName={"Simple Momentum"}
                        checkboxName={"LegMomentumEnable"}
                        handleEnableDisable={handleEnableDisable}
                        targetObj={legMomentumValue}
                        arrayOfOptions={simpleMomentumOptions}
                        handleTypes={handleTypes}
                        handleValues={handleValues}
                    />


                    <AddValueCard
                        id={id}
                        name={"LegTarget"}
                        componentName={"Target Profit"}
                        checkboxName={"LegTargetEnable"}
                        handleEnableDisable={handleEnableDisable}
                        targetObj={legTargetValue}
                        arrayOfOptions={targetProfitAndStopLossOptions}
                        handleTypes={handleTypes}
                        handleValues={handleValues}
                    />


                    <AddValueCard
                        id={id}
                        name={"LegStopLoss"}
                        componentName={"Stop Loss"}
                        checkboxName={"LegStopLossEnable"}
                        handleEnableDisable={handleEnableDisable}
                        targetObj={legStopLossValue}
                        arrayOfOptions={targetProfitAndStopLossOptions}
                        handleTypes={handleTypes}
                        handleValues={handleValues}
                    />

                    <div className="m-1 p-1 py-3  flex-col">
                        <div className="flex items-center">
                            <input
                                className="h-[9px] w-[9px] accent-[#375A9E]"
                                type="checkbox" name="LegTrailSLEnable" value={!!legTrailSLEnable} onChange={(e) => { handleItems(id, e) }} />
                            <h4 className="mx-2 text-sm">Trail SL</h4>
                        </div>
                        <div className={`flex  ${!legTrailSLEnable ? "opacity-75" : ""}`} >
                            <select
                                disabled={!legTrailSLEnable}
                                className="my-2  bg-[#375A9E] text-white text-xs font-semibold border-x-4 border-[#375A9E] w-20 py-1 px-2 rounded-full" name="LegTrailSL" value={legTrailSLValue.Type}
                                onChange={(e) => handleType(id, e)}
                            >
                                <option value="Points">Points</option>
                                <option value="Premium">Premium</option>

                            </select>
                            <div>
                                <input
                                    disabled={!legTrailSLEnable}
                                    className="text-sm m-3  rounded-full border-4 border-white  h-5 w-20"
                                    type="number" min="0" value={legTrailSLValue.Value.instrumentMove}
                                    name="InstrumentMove"
                                    onChange={(e) => handleTrailSl(id, e)} />
                            </div>
                            <div>
                                <input
                                    disabled={!legTrailSLEnable}
                                    className="text-sm m-3  rounded-full border-4 border-white  h-5 w-20"
                                    type="number" min="0" value={legTrailSLValue.Value.StopLossMove}
                                    name="StopLossMove"
                                    onChange={(e) => handleTrailSl(id, e)} />
                            </div>
                        </div>
                    </div>

                    <AddValueCard
                        id={id}
                        name={"LegReentryTP"}
                        componentName={"Re-entry on Tgt"}
                        checkboxName={"LegReentryTPEnable"}
                        handleEnableDisable={handleEnableDisable}
                        targetObj={legReentryTPValue}
                        arrayOfOptions={reEntryArray}
                        handleTypes={handleTypes}
                        handleValues={handleValues}
                    />
                </div>

                <div className="flex justify-center md:flex-auto ">
                    <AddValueCard
                        id={id}
                        name={"LegReentrySL"}
                        componentName={"Re-entry on SL"}
                        checkboxName={"LegReentrySLEnable"}
                        handleEnableDisable={handleEnableDisable}
                        targetObj={legReentrySLValue}
                        arrayOfOptions={reEntryArray}
                        handleTypes={handleTypes}
                        handleValues={handleValues}
                    />
                </div>
            </div>
        </Fragment>
    )
}


export default LegCard;
