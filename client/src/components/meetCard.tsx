export const MeetCard = (props: any) => {
    return (
        <div className="relative">
            <div
                style={{
                    backgroundImage: 'url(' + props.userImg + ')'
                }}
                className="meetCard flex items-end">
                <div className="z-10">
                    <p>{props.name}</p>
                    <h3>{props.desc}</h3>
                </div>
            </div>
        </div>
    )
}

export default MeetCard;