import { Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import MeetCard from "../components/meetCard";
import { useAuth } from "../hooks/useAuth";

export const ProfilePage = () => {
  const auth = useAuth()
  const currentUser = auth.user

  return (
    <Container maxWidth="lg" >
      <div className="flex flex-row flex-1 p-4">
        <MeetCard
          userImg={currentUser?.image}
          name={currentUser?.name}
          desc={currentUser?.desc}
          noTouch={true}
        />
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
    </Container>
  )
}