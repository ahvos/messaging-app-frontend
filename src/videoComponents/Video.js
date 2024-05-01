import { useState, useEffect } from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";


export default function Video(props) {
    const { users, tracks } = props;
    const [gridSpacing, setGridSpacing] = useState(12);
  
    useEffect(() => {
        setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
    }, [users, tracks]);
  
    return (
        <Grid container style={{ height: "100%", justifyContent: "center", alignItems: "center"}} >
            <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer
                    videoTrack={tracks[1]}
                    style={{ height: "75%", width: "75%" }}
                />
            </Grid>
            {users.length > 0 &&
                users.map((user) => {
                    if (user.videoTrack) {
                        return (
                            <Grid item xs={gridSpacing}>
                                <AgoraVideoPlayer
                                    videoTrack={user.videoTrack}
                                    key={user.uid}
                                    style={{ height: "75%", width: "75%" }}
                                />
                            </Grid>
                        );
                    } else return null;
                })}
        </Grid>
    );
}
