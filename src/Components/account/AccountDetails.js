import { Typography } from "@mui/material"

const AccountDetails = (props) => {
  const { user } = props;

  return (
    <>
      <Typography variant="h3">{user.firstName ? user.firstName : user.displayName}</Typography>
      <Typography variant="subtitle2">Username:</Typography>
      <Typography variant="body1">{user.displayName}</Typography>
      <Typography variant="subtitle2">Email:</Typography>
      <Typography variant="body1">{user.email}</Typography>
      <Typography variant="subtitle2">First name:</Typography>
      <Typography variant="body1">{user.firstName ? user.firstName : "No first name available."}</Typography>
      <Typography variant="subtitle2">Last name:</Typography>
      <Typography variant="body1">{user.lastName ? user.lastName : "No last name available."}</Typography>
    </>
  )
}

export default AccountDetails;