import { useState } from "react";
import { useClient } from "./settings";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import CallEndIcon from '@material-ui/icons/CallEnd';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Controls(props) {
    const client = useClient();
    const classes = useStyles();
    const { tracks, setStart, setInCall } = props;
    const [trackState, setTrackState] = useState({ video: true, audio: true });
  
    const mute = async (type) => {
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return { ...ps, audio: !ps.audio };
            });
        } 
        else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return { ...ps, video: !ps.video };
            });
        }
    };
  
    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    };
  
    
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item >
                <Button
                    variant="contained"
                    color={trackState.audio ? "primary" : "secondary"}
                    onClick={() => mute("audio")}
                >
                    {trackState.audio ? <MicIcon /> : <MicOffIcon />}
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color={trackState.video ? "primary" : "secondary"}
                    onClick={() => mute("video")}
                >
                    {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="default"
                    onClick={() => leaveChannel()}
                >
                    Leave
                    <CallEndIcon />
                </Button>
            </Grid>
        </Grid>
    );
    
    

    /*
    return (
        <div className={classes.buttonContainer}>
            <Button
                variant="contained"
                color={trackState.audio ? "primary" : "secondary"}
                className={classes.button}
                onClick={() => mute("audio")}
            >
                {trackState.audio ? <MicIcon /> : <MicOffIcon />}

            </Button>
            <Button
                variant="contained"
                color={trackState.video ? "primary" : "secondary"}
                className={classes.button}
                onClick={() => mute("video")}
            >
                {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
                
            </Button>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={() => leaveChannel()}
            >
                <CallEndIcon />
                Leave
            </Button>
        </div>
    );
    */
}
