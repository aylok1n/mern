import { Container, List, ListItem, ListItemButton, ListItemText } from "@mui/material"

export const ProfilePage = () => {
  return (
    <Container maxWidth="lg" >
      <div className="flex flex-row flex-1 p-4">
        <div className="flex flex-col w-40 bg-slate-200 rounded-lg overflow-hidden">
          <div className="h-40">
            <img className="w-full" src="https://avatars.githubusercontent.com/u/61543608?v=4" />
          </div>
          <List className="w-full flex flex-1 flex-col" disablePadding>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Edit name" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div className="pl-4">
          <span className="text-2xl font-semibold">User VeryVeryLongName</span>
        </div>
      </div>
    </Container>
  )
}