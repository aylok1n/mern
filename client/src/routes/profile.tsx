import { Button, Container } from "@mui/material"
import { useState } from "react";
import MeetCard from "../components/meetCard";
import { useAuth } from "../hooks/useAuth";

const changeAvatar = () => {
  return (
    <div>
      <div className="py-5" >
        <p className="mb-3">Изменить фотографию:</p>
        <input type="file" />
      </div>
    </div>
  )
}

export const ProfilePage = () => {
  const [edit, setEdit] = useState<boolean>(false)
  const auth = useAuth()
  const currentUser = auth.user

  return (
    <Container maxWidth="lg" >
      <div className="flex flex-row flex-1 p-4 min-h-34rem">
        <div className="w-1/4">
          <MeetCard
            userImg={currentUser?.image}
            name={currentUser?.name}
            desc={currentUser?.desc}
            noTouch={true}
          />
          {!!edit && changeAvatar()}
        </div>
        <div className="pl-4">
          <div className="pb-4">
            <span className="text-2xl font-semibold capitalize">{currentUser?.name}</span>
            <p>{currentUser?.desc}</p>
          </div>
          <div>
            <h3>Ваш E-mail: {currentUser?.email}</h3>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button
          onClick={() => setEdit(!edit)}
          variant="contained">
          {!edit ? "Редактировать профиль" : "Сохранить изменения"}
        </Button>
      </div>
    </Container>
  )
}