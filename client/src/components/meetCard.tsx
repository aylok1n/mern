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
    const [currentCard, setCurrentCard] = React.useState(false)

    const cardMove = (e: any) => {
        setCardPos({
            x: e.pageX - startPos.x,
            y: e.pageY - startPos.y
        })
        Math.abs(e.pageX - startPos.x) >= maxDistance ? setCurrentCard(true) : setCurrentCard(false)
    }

    const getStartPositions = (e: any) => {
        setTouchable(false)
        setCurrentCard(false)
        setCardPos({
            x: 0,
            y: 0
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
            className={`relative pref ${touchable ? "z-50" : "transition-all"}`}>
            {currentCard && <p className="absolute blink text-green top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dashed border-green border-4 p-2">Выбрать</p>}
            <div
                style={{ backgroundImage: 'url(' + props.userImg + ')' }}
                className="meetCard flex items-end">
                <div className="z-10">
                    <p className="capitalize">{props.name}</p>
                    <h3>{props.desc}</h3>
                </div>
            </div>
        </div>
    )
}

export default MeetCard;