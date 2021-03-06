import { Button, CircularProgress, Skeleton, styled } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import MeetCard from "../components/meetCard"
import MeetCardShort from "../components/meetCardShort"
import { AuthContext } from "../context/AuthContext"
import { useFetch } from "../hooks/useFetch"

interface RandomUser {
    _id: string,
    name: string,
    image: string
}

export const Meets = () => {
    const { request, loader } = useFetch()
    const [randomUsers, setRandomUsers] = useState<RandomUser[]>([])
    const auth = useContext(AuthContext)
    const Btn = styled(Button)({
        borderColor: '#000000',
        color: '#000000'
    })

    const getMeets = () => {
        request({
            url: 'api/search/meets',
            headers: {
                Authorization: `Bearer ${auth.user ? auth.user.token : ''}`
            }
        }).then(res => setRandomUsers(res.users))
    }

    const chooseOne = (id: string) => {
        console.log(id)
    }

    useEffect(() => {
        getMeets()
    }, [])

    return (
        <>
            <h1 className="pt-3 text-center">Твой выбор:</h1>
            <div className="py-14 flex flex-wrap justify-center gap-5 min-h-30rem">
                {randomUsers?.map((e: any, i: number) => (
                    <div
                        key={i}
                        className="relative"
                    >
                        <div className="hidden sm:block">
                            <div className={loader ? "opacity-0" : ""}>
                                <MeetCard
                                    name={e?.name}
                                    desc={e?.desc}
                                    userImg={e?.image}
                                    chooseCard={() => {
                                        chooseOne(e?._id)
                                        getMeets()
                                    }}
                                />
                            </div>
                            <Skeleton
                                sx={{
                                    borderRadius: '2rem',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '15rem',
                                    minHeight: '22rem'
                                }}
                                variant="rectangular"
                            />
                        </div>
                        <div className="sm:hidden">
                            <MeetCardShort
                                data={e}
                                chooseCard={() => {
                                    chooseOne(e?._id)
                                    getMeets()
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Btn disabled={loader} onClick={getMeets} variant="outlined">Не нравится ни одна</Btn>
        </>
    )
}