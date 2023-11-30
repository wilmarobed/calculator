import { Box } from '@mui/material';

const Notification = (props) => {

    const { type, message, open } = props;
    const backgroundColor = type === "error" ? "#DF2700" : "#00AB08"

    return (
        <> {open && <Box style={{ background: backgroundColor, color: "#FFFFFF", padding: "10px 20px", position: "fixed", top: "10px", right: "10px" }}>
            {message}
        </Box>}</>
    )
}
export default Notification;