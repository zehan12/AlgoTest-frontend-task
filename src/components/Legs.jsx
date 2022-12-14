import { Fragment, useState, useEffect } from "react"
import LegList from "./LegList";
import Segment from "./Segment";
import { PROPERTIES, STRIKE_VALUE, INITIAL } from "../utils/constant";
import { db, LEGS } from "../firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "./Loading";



const Legs = () => {


    const legsCollectionRef = collection(db, LEGS);

    //! add legItems in state
    const [legItems, setLegItems] = useState([])
    // const [legItems, setLegItems] = useState(JSON.parse(localStorage.getItem("LEG")) || [])

    const fetchLegs = async () => {
        const data = await getDocs(legsCollectionRef);      
        setLegItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        fetchLegs()
        toast.success("Legs Fetched")
    }, [])


    const handleClick = () => {
        setLegAdd(!legAdd);
    }

    const [legAdd, setLegAdd] = useState(false);

    //* options states initialised with default value
    const [totalLeg, setTotalLeg] = useState(1);
    const [position, setPosition] = useState(INITIAL.position);
    const [optionType, setOptionType] = useState(INITIAL.optionType);
    const [expiry, setExpiry] = useState(INITIAL.expiry);
    const [strike, setStrike] = useState(INITIAL.strike);
    const [strikeType, setStrikeType] = useState(INITIAL.strikeType);
    const [upper, setUpper] = useState(200);
    const [lower, setLower] = useState(50);
    const [premium, setPremium] = useState(50);
    const [plusMinus, setPlusMinus] = useState("+");
    const [multiplier, setMultiplier] = useState(0.5);

    const [loading, setLoading] = useState(false);

    const handleChange = ({ target }) => {
        const { name, value } = target
        switch ( name ) {
            case PROPERTIES.totalLot :
                return setTotalLeg(value);
            case PROPERTIES.position :
                return setPosition(value);
            case PROPERTIES.optionType :
                return setOptionType(value);
            case PROPERTIES.expiry :
                return  setExpiry(value);
            case PROPERTIES.strike :
                return setStrike(value);
            case PROPERTIES.strikeType :
                return setStrikeType(value);
            case PROPERTIES.premium : 
                return setPremium(value);
            case PROPERTIES.upper :
                return setUpper(value);
            case PROPERTIES.lower :
                return setLower(value);
            case PROPERTIES.plusMinus :
                return setPlusMinus(value);
            case PROPERTIES.multiplier :
                return setMultiplier(value);
               default:
                   return
        }
    }

    const handleSubmit = async (e) => {

        setLoading(true)

        e.preventDefault();
        let StrikeParameter = strike === STRIKE_VALUE.strikeType ? strikeType :
            strike === STRIKE_VALUE.premiumRange ? { Lower: lower, Upper: upper } :
                strike === STRIKE_VALUE.closestPremium ? { Premium: premium } :
                    strike === STRIKE_VALUE.straddleWidth ? { Adjustment: plusMinus, Multiplier: multiplier } : ""


        await addDoc(legsCollectionRef, {
            createId: Date.now(), PositionType: position, Lots: totalLeg,
            ExpiryKind: expiry, EntryType: strike, StrikeParameter, InstrumentKind: optionType,
            LegStopLossEnable: false, LegStopLoss: { Type: INITIAL.type, Value: 0, },
            LegTargetEnable: false, LegTarget: { Type: INITIAL.type, Value: 0, },
            LegTrailSLEnable: false, LegTrailSL: { Type: INITIAL.type, Value: { InstrumentMove: 0, StopLossMove: 0, } },
            LegMomentumEnable: false, LegMomentum: { Type: INITIAL.type, Value: 0 },
            LegReentrySLEnable: false, LegReentrySL: { Type: INITIAL.type, Value: 1 },
            LegReentryTPEnable: false, LegReentryTP: { Type: INITIAL.type, Value: 1 }
        });


        toast.success("leg Added")
        setLoading(false)
        fetchLegs()
    }




    const handleDelete = async (id) => {
        toast.success(`Leg ID:${id} is Deleted`)
        const legDoc = doc(db, LEGS, id);
        await deleteDoc(legDoc.data());
        fetchLegs()
    }

   

    const handleCreateCopy = async (id) => {
        const legRef = doc(db, LEGS, id);
        const legSnap = await getDoc(legRef);
        await addDoc(legsCollectionRef, legSnap.data());
        fetchLegs();
        toast.success("Leg Added")
    }


    const handleItems = async (id, { target }) => {
        const { name, value } = target;
        let newFields
        const legDoc = doc(db, LEGS, id);
        if (target.type === "checkbox" && target.checked !== undefined) {
            newFields = { [name]: target.checked };
        }
        else {
            newFields = { [name]: value };
        }
        await updateDoc(legDoc, newFields);
        fetchLegs()
    };

    return (
        <Fragment>
            <div
                className="border-4-black mx-auto"
                style={{ width: "80%" }}>
                <div className="flex justify-between px-7 pb-1 pt-7 border-b-[1px]" >
                    <h2 className="font-bold">Legs</h2>
                    <button
                        className={`font-bold text-l text-[#375A9E] ${legAdd ? "opacity-[.2]" : ""}`}
                        onClick={handleClick}>
                        + Add Leg{legAdd}
                    </button>
                </div>
                {
                    legAdd ? <Fragment>
                        <Segment
                            handleChange={handleChange}
                            totalLeg={totalLeg}
                            position={position}
                            optionType={optionType}
                            expiry={expiry}
                            strike={strike}
                            strikeType={strikeType}
                            upper={upper}
                            lower={lower}
                            premium={premium}
                            plusMinus={plusMinus}
                            multiplier={multiplier}
                        />
                        <div className="p-4 bg-[#F6F6F6]" >
                            <button className="px-14 py-1 bg-[#375A9E] text-white text-sm font-semibold rounded-full mr-2"
                                disable={loading}
                                onClick={(e) => handleSubmit(e)}
                            >{loading ? <Loading text={"Adding Leg"} />
                                : "Add Leg"}</button>
                            <button
                                className="px-14 py-1 bg-white text-[#375A9E] text-sm font-semibold rounded-full ml-2"
                                onClick={() => setLegAdd(false)}>Cancel</button>
                        </div>
                    </Fragment> : ""
                }
            </div>
            <LegList
                legItems={legItems}
                handleDelete={handleDelete}
                handleItems={handleItems}
                handleCreateCopy={handleCreateCopy}
            />
        </Fragment>
    )
}

export default Legs;