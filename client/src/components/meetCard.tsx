export const MeetCard = (props: any) => {
    return (
        <div
            style={{
                backgroundImage: 'url(' + props.userImg + ')'
            }}
            className="meetCard flex items-end">
            <div>
                <p>{props.name}</p>
                <h3>{props.desc}</h3>
            </div>
        </div>
    )
}

export default MeetCard;