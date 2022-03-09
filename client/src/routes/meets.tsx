import { Button, styled } from "@mui/material"
import MeetCard from "../components/meetCard"

export const Meets = () => {
    const users = [
        {
            name: "Юля Кандакова",
            desc: "Вот бы мальчишку...",
            userImg: "https://n1s1.starhit.ru/88/e1/69/88e169bf202b3e6bc7f9dd411b70f7c4/368x460_0_cee6389f5412c30ed5384e92235a9f6e@1080x1350_0xac120003_19503755701636307290.jpg",
        },
        {
            name: "Юля Кандакова",
            desc: "Вот бы мальчишку...",
            userImg: "https://n1s1.starhit.ru/88/e1/69/88e169bf202b3e6bc7f9dd411b70f7c4/368x460_0_cee6389f5412c30ed5384e92235a9f6e@1080x1350_0xac120003_19503755701636307290.jpg",
        },
        {
            name: "Юля Кандакова",
            desc: "Вот бы мальчишку...",
            userImg: "https://n1s1.starhit.ru/88/e1/69/88e169bf202b3e6bc7f9dd411b70f7c4/368x460_0_cee6389f5412c30ed5384e92235a9f6e@1080x1350_0xac120003_19503755701636307290.jpg",
        },
    ]
    const Btn = styled(Button)({
        borderColor: '#000000',
        color: '#000000'
    })
    return (
        <>
            <h1 className="pt-3">Выбирай девушку, которая тебе симпатична</h1>
            <div className="py-14 flex flex-wrap gap-5">
                {users.map((e, i) => (
                    <MeetCard
                        name={e.name}
                        desc={e.desc}
                        userImg={e.userImg}
                        key={i}
                    />
                ))}
            </div>
            <Btn variant="outlined">Не нравится ни одна</Btn>
        </>
    )
}