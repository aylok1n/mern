import React from "react"

export const MeetCard = (props: any) => {
    const maxDistance = props.maxDistance || 150
    const [startPos, setStartPos] = React.useState({
        x: 0,
        y: 0
    })
    const [touchable, setTouchable] = React.useState(false)
    const [cardPos, setCardPos] = React.useState({
        x: 0,
        y: 0
    })

    const cardMove = (e: any) => {
        setCardPos({
            x: e.pageX - startPos.x,
            y: e.pageY - startPos.y
        })
    }

    const getStartPositions = (e: any) => {
        setTouchable(false)
        setCardPos({
            x:0,
            y:0
        })
    }

    return (
        <div
            style={{
                transform: 'translate(' + cardPos.x + 'px ,' + cardPos.y + 'px) rotate(' + cardPos.x / (maxDistance / 30) + 'deg)'
            }}
            onMouseMove={e => touchable && cardMove(e)}
            onMouseDown={e => {
                setStartPos({ x: e.pageX, y: e.pageY })
                setTouchable(true)
                
            }}
            onMouseOut={getStartPositions}
            onMouseUp={getStartPositions}
            className={`relative ${touchable ? "z-50" : "transition-all"}`}>
            <div
                style={{
                    backgroundImage: 'url(' + props.userImg + ')'
                }}
                className="meetCard flex items-end">
                <div className="z-10 pref">
                    <p className="capitalize">{props.name}</p>
                    <h3>{props.desc}</h3>
                </div>
            </div>
        </div>
    )
}

export default MeetCard;