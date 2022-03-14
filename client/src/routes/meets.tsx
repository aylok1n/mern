import { Button, styled } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import MeetCard from "../components/meetCard"
import { AuthContext } from "../context/AuthContext"
import { useFetch } from "../hooks/useFetch"

interface RandomUser {
    _id: string,
    name: string,
    image: string
}

export const Meets = () => {
    const { request } = useFetch()
    const [randomUsers, setRandomUsers] = useState<RandomUser[]>([])
    const auth = useContext(AuthContext)
    const Btn = styled(Button)({
        borderColor: '#000000',
        color: '#000000'
    })
    useEffect(() => {
        request({
            url: 'api/search/meets',
            headers: {
                Authorization: `Bearer ${auth.user ? auth.user.token : ''}`
            }
        }).then(res => setRandomUsers(res.users))
    }, [])
    return (
        <>
            <h1 className="pt-3 text-center">Выбирай девушку, которая тебе симпатична</h1>
            <div className="py-14 flex flex-wrap gap-5">
                {randomUsers.map((e:any, i:number) => (
                    <MeetCard
                        name={e?.name}
                        desc={e?.desc}
                        userImg={e?.image}
                        key={i}
                    />
                ))}
            </div>
            <Btn variant="outlined">Не нравится ни одна</Btn>
        </>
    )
}