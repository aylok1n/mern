interface MeetCardShort {
    data: any,
    chooseCard: Function
}

function MeetCardShort(props:MeetCardShort) {
    return (
        <div className="h-32">
            <img  className="h-32" src={props.data?.image}/>
        </div>
    )
}

export default MeetCardShort;