import React from "react"

export const MeetCard = (props: any) => {
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

    return (
        <div
            style={{
                transform: 'translate(' + cardPos.x + 'px ,' + cardPos.y + 'px) rotate(' + cardPos.x / (props.maxDistance / 30) + 'deg)'
            }}
            onMouseMove={e => touchable && cardMove(e)}
            onMouseDown={e => {
                setStartPos({ x: e.pageX, y: e.pageY })
                setTouchable(true)
            }}
            onMouseUp={() => {
                setTouchable(false)
                setCardPos({
                    x:0,
                    y:0
                })
            }}
            className={`relative ${touchable && "z-50"}`}>
            <div
                style={{
                    backgroundImage: 'url(' + props.userImg + ')'
                }}
                className="meetCard flex items-end">
                <div className="z-10 pref">
                    <p>{props.name}</p>
                    <h3>{props.desc}</h3>
                </div>
            </div>
        </div>
    )
}

export default MeetCard;