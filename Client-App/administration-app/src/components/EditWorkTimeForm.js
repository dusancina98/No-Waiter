import { useContext, useEffect, useState } from "react";
import { colorConstants } from "../constants/ColorConstants";
import { ObjectContext } from "../contexts/ObjectContext";
import { objectService } from "../services/ObjectService";
import TimeField from 'react-simple-timefield';
import { modalConstants } from "../constants/ModalConstants";
import React from "react";

const EditWorkTimeForm = () => {
	const { objectState, dispatch } = useContext(ObjectContext);

	const [mondayTimeFrom, setMondayTimeFrom] = useState(0);
    const [mondayTimeTo, setMondayTimeTo] = useState(0);

    const [thuesdayTimeFrom, setThuesdayTimeFrom] = useState(0);
    const [thuesdayTimeTo, setThuesdayTimeTo] = useState(0);

    const [wednesdayTimeFrom, setWednesdayTimeFrom] = useState(0);
    const [wednesdayTimeTo, setWednesdayTimeTo] = useState(0);

    const [thursdayTimeFrom, setThursdayTimeFrom] = useState(0);
    const [thursdayTimeTo, setThursdayTimeTo] = useState(0);

    const [fridayTimeFrom, setFridayTimeFrom] = useState(0);
    const [fridayTimeTo, setFridayTimeTo] = useState(0);

    const [saturdayTimeFrom, setSaturdayTimeFrom] = useState(0);
    const [saturdayTimeTo, setSaturdayTimeTo] = useState(0);

    const [sundayTimeFrom, setSundayTimeFrom] = useState(0);
    const [sundayTimeTo, setSundayTimeTo] = useState(0);

    const [mondayWorking, setMondayWorking] = useState(0);
    const [thuesdayWorking, setThuesdayWorking] = useState(0);
    const [wednesdayWorking, setWednesdayWorking] = useState(0);
    const [thursdayWorking, setThursdayWorking] = useState(0);
    const [fridayWorking, setFridayWorking] = useState(0);
    const [saturdayWorking, setSaturdayWorking] = useState(0);
    const [sundayWorking, setSundayWorking] = useState(0);

    useEffect(() => {
		setMondayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.TimeFrom);
		setMondayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.TimeTo);
        setMondayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.Working);
		setThuesdayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.TimeFrom);
		setThuesdayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.TimeTo);
        setThuesdayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.TUESDAY.Working);
		setWednesdayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.TimeFrom);
		setWednesdayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.TimeTo);
        setWednesdayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.Working);
		setThursdayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.TimeFrom);
        setThursdayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.TimeTo);
        setThursdayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.Working);
		setFridayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.TimeFrom);
		setFridayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.TimeTo);
        setFridayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.Working);
		setSaturdayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.TimeFrom);
		setSaturdayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.TimeTo);
        setSaturdayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.Working);
		setSundayTimeFrom(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.TimeFrom);
        setSundayTimeTo(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.TimeTo);
        setSundayWorking(objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.Working);
	}, [objectState.objectInfo.object]);

	const handleObjectUpdate = (e) => {
		e.preventDefault();

        if(validWorkTimes()){
            let object = {
                Id: objectState.objectDetails.object.Id,
                WorkTime : {
                    EntityDTO: {
                        Id: objectState.objectInfo.object.EntityDTO.WorkTime.Id,
                        WorkDays: {
                            SUNDAY :{
                                Working: sundayWorking,
                                TimeFrom: sundayTimeFrom,
                                TimeTo: sundayTimeTo,
                            },
                            TUESDAY :{
                                Working: thuesdayWorking,
                                TimeFrom: thuesdayTimeFrom,
                                TimeTo: thuesdayTimeTo,
                            },
                            THURSDAY :{
                                Working: thursdayWorking,
                                TimeFrom: thursdayTimeFrom,
                                TimeTo: thursdayTimeTo,
                            },
                            SATURDAY :{
                                Working: saturdayWorking,
                                TimeFrom: saturdayTimeFrom,
                                TimeTo: saturdayTimeTo,
                            },
                            MONDAY :{
                                Working: mondayWorking,
                                TimeFrom: mondayTimeFrom,
                                TimeTo: mondayTimeTo,
                            },
                            FRIDAY :{
                                Working: fridayWorking,
                                TimeFrom: fridayTimeFrom,
                                TimeTo: fridayTimeTo,
                            },
                            WEDNESDAY:{
                                Working: wednesdayWorking,
                                TimeFrom: wednesdayTimeFrom,
                                TimeTo: wednesdayTimeTo,
                            },
                        }
                    }
                },
            };
            objectService.updateObjectWorkTime(object, dispatch);
        }else{
            alert('INVALID')
        }
	};

    const validWorkTimes = () =>{
        if(mondayWorking){
            var mondayTimeFromVar = mondayTimeFrom.split(":");
            var mondayTimeToVar = mondayTimeTo.split(":");
        
            if(Number(mondayTimeFromVar[0]) > Number(mondayTimeToVar[0])){
                return false
            }

            if(Number(mondayTimeFromVar[0]) === Number(mondayTimeToVar[0])){
                if(Number(mondayTimeFromVar[1]) > Number(mondayTimeToVar[1]))
                    return false
            }
        }

        if(thuesdayWorking){
            var thuesdayTimeFromVar = thuesdayTimeFrom.split(":");
            var thuesdayTimeToVar = thuesdayTimeTo.split(":");
        
            if(Number(thuesdayTimeFromVar[0]) > Number(thuesdayTimeToVar[0])){
                return false
            }

            if(Number(thuesdayTimeFromVar[0]) === Number(thuesdayTimeToVar[0])){
                if(Number(thuesdayTimeFromVar[1]) > Number(thuesdayTimeToVar[1]))
                    return false
            }
        }

        if(wednesdayWorking){
            var wednesdayTimeFromVar = wednesdayTimeFrom.split(":");
            var wednesdayTimeToVar = wednesdayTimeTo.split(":");
        
            if(Number(wednesdayTimeFromVar[0]) > Number(wednesdayTimeToVar[0])){
                return false
            }

            if(Number(wednesdayTimeFromVar[0]) === Number(wednesdayTimeToVar[0])){
                if(Number(wednesdayTimeFromVar[1]) > Number(wednesdayTimeToVar[1]))
                    return false
            }
        }

        if(thursdayWorking){
            var thursdayTimeFromVar = thursdayTimeFrom.split(":");
            var thursdayTimeToVar = thursdayTimeTo.split(":");
        
            if(Number(thursdayTimeFromVar[0]) > Number(thursdayTimeToVar[0])){
                return false
            }

            if(Number(thursdayTimeFromVar[0]) === Number(thursdayTimeToVar[0])){
                if(Number(thursdayTimeFromVar[1]) > Number(thursdayTimeToVar[1]))
                    return false
            }
        }

        if(fridayWorking){
            var fridayTimeFromVar = fridayTimeFrom.split(":");
            var fridayTimeToVar = fridayTimeTo.split(":");
        
            if(Number(fridayTimeFromVar[0]) > Number(fridayTimeToVar[0])){
                return false
            }

            if(Number(fridayTimeFromVar[0]) === Number(fridayTimeToVar[0])){
                if(Number(fridayTimeFromVar[1]) > Number(fridayTimeToVar[1]))
                    return false
            }
        }

        if(saturdayWorking){
            var saturdayTimeFromVar = saturdayTimeFrom.split(":");
            var saturdayTimeToVar = saturdayTimeTo.split(":");
        
            if(Number(saturdayTimeFromVar[0]) > Number(saturdayTimeToVar[0])){
                return false
            }

            if(Number(saturdayTimeFromVar[0]) === Number(saturdayTimeToVar[0])){
                if(Number(saturdayTimeFromVar[1]) > Number(saturdayTimeToVar[1]))
                    return false
            }
        }

        if(sundayWorking){
            var sundayTimeFromVar = sundayTimeFrom.split(":");
            var sundayTimeToVar = sundayTimeTo.split(":");
        
            if(Number(sundayTimeFromVar[0]) > Number(sundayTimeToVar[0])){
                return false
            }

            if(Number(sundayTimeFromVar[0]) === Number(sundayTimeToVar[0])){
                if(Number(sundayTimeFromVar[1]) > Number(sundayTimeToVar[1]))
                    return false
            }
        }

        return true

    }
	return (
        <React.Fragment>
		<form className="forms-sample" method="put" onSubmit={handleObjectUpdate}>
            <div className="form-group">
                <h5>WorkTime</h5>
            </div>
			<div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Monday</label>
                <div class="col-sm-3 mt-1">
                    <TimeField 
                        value={mondayTimeFrom} 
                        onChange={(event,time) =>setMondayTimeFrom(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  />
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={mondayTimeTo} 
                        onChange={(event,time) =>setMondayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  /> 
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        value={mondayWorking}
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.MONDAY.Working}
                        onChange={(e) => setMondayWorking(e.target.value)}
                        id="flexCheckChecked" />
                    <label class="form-check-label mt-1" for="flexCheckChecked">
                        Working
                    </label>
                </div>
            </div>
			<div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Thuesday</label>

                <div class="col-sm-3 mt-1">
                    <TimeField 
                        value={thuesdayTimeFrom} 
                        onChange={(event,time) =>setThuesdayTimeFrom(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  /> 
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={thuesdayTimeTo} 
                        onChange={(event,time) =>setThuesdayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />  
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        value={thuesdayWorking}
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.Working}
                        onChange={(e) => setThuesdayWorking(e.target.value)}
                        id="flexCheckChecked" />
                    <label class="form-check-label mt-1" for="flexCheckChecked">
                        Working
                    </label>
                </div>
            </div>
			<div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Wednesday</label>

                <div class="col-sm-3 mt-1">
                    <TimeField 
                        value={wednesdayTimeFrom} 
                        onChange={(event,time) =>setWednesdayTimeFrom(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />  
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={wednesdayTimeTo} 
                        onChange={(event,time) =>setWednesdayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    /> 
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        value={wednesdayWorking}
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.WEDNESDAY.Working}
                        onChange={(e) => setWednesdayWorking(e.target.value)}
                        id="flexCheckChecked" />
                    <label class="form-check-label mt-1" for="flexCheckChecked">
                        Working
                    </label>
                </div>
            </div>
			<div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Thursday</label>

                <div class="col-sm-3 mt-1">
                    <TimeField 
                            value={thursdayTimeFrom} 
                            onChange={(event,time) =>setThursdayTimeFrom(time)}
                            input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                        className="form-control row" 
                                        type="text" />}  
                        />  
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={thursdayTimeTo} 
                        onChange={(event,time) =>setThursdayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />    
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        value={thursdayWorking}
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.THURSDAY.Working}
                        onChange={(e) => setThursdayWorking(e.target.value)}
                        id="flexCheckChecked" />
                    <label class="form-check-label mt-1" for="flexCheckChecked">
                        Working
                    </label>
                </div>
            </div>
            <div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Friday</label>

                <div class="col-sm-3 mt-1">
                    <TimeField 
                        value={fridayTimeFrom} 
                        onChange={(event,time) =>setFridayTimeFrom(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={fridayTimeTo} 
                        onChange={(event,time) =>setFridayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        value={fridayWorking}
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.FRIDAY.Working}
                        onChange={(e) => setFridayWorking(e.target.value)}
                        id="flexCheckChecked" />
                    <label class="form-check-label mt-1" for="flexCheckChecked">
                        Working
                    </label>
                </div>
            </div>
            <div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Saturday</label>

                <div class="col-sm-3 mt-1">
                    <TimeField 
                        value={saturdayTimeFrom} 
                        onChange={(event,time) =>setSaturdayTimeFrom(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={saturdayTimeTo} 
                        onChange={(event,time) =>setSaturdayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        value={saturdayWorking}
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SATURDAY.Working}
                        onChange={(e) => setSaturdayWorking(e.target.value)}
                        id="flexCheckChecked" />
                    <label class="form-check-label mt-1" for="flexCheckChecked">
                        Working
                    </label>
                </div>
            </div>
            <div class="row">
                <label for="monday" class="col-sm-3 col-form-label">Sunday</label>

                <div class="col-sm-3 mt-1">
                    <TimeField 
                        value={sundayTimeFrom} 
                        onChange={(event,time) =>setSundayTimeFrom(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />
                </div>
                <div class="col-sm-3  mt-1">
                    <TimeField 
                        value={sundayTimeTo} 
                        onChange={(event,time) =>setSundayTimeTo(time)}
                        input={<input readOnly={objectState.objectDetails.workTimeReadOnly} 
                                      className="form-control row" 
                                      type="text" />}  
                    />
                </div> 
                <div  class="col-sm-3  mt-1">
                    <input 
                        class="form-check-input mt-2" 
                        type="checkbox" 
                        value={sundayWorking}
                        disabled={objectState.objectDetails.workTimeReadOnly} 
                        defaultChecked={objectState.objectInfo.object.EntityDTO.WorkTime.EntityDTO.WorkDays.SUNDAY.Working}
                        onChange={(e) => setSundayWorking(e.target.value)}
                        id="flexCheckChecked" />
                        <label class="form-check-label mt-1" for="flexCheckChecked">
                            Working
                        </label>
                </div>
                 <button
                    type="submit"
                    className="btn btn-success mt-2 ml-2"
                    hidden={objectState.objectDetails.workTimeReadOnly}
                    style={{ background: colorConstants.COLOR_GREEN, borderColor: colorConstants.COLOR_GREEN }}
                    >
                        Save worktime
                    </button>
                
            </div>
		</form>
            <button hidden={!objectState.objectDetails.workTimeReadOnly} className="btn btn-primary mt-2 mr-3"  onClick={() => dispatch({ type: modalConstants.ALLOW_OBJECT_WORKTIME_INPUT_FIELDS })}>
                Edit worktime
            </button>
        </React.Fragment>
	);
};

export default EditWorkTimeForm;
