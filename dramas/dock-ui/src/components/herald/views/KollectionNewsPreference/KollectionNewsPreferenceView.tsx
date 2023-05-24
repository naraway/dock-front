import {KollectionNewsPreference} from "@nara-way/herald-core";
import React, {useEffect} from "react";
import {Grid, Switch, Typography} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import FeedSharpIcon from "@mui/icons-material/FeedSharp";
import LocalPostOfficeSharpIcon from "@mui/icons-material/LocalPostOfficeSharp";
import NotificationsActiveSharpIcon from "@mui/icons-material/NotificationsActiveSharp";


export const KollectionNewsPreferenceView = ({kollectionNewsPreference}: {
    kollectionNewsPreference: KollectionNewsPreference;
}) => {
    //
    const [newsBlocked, setNewsBlocked] = React.useState<boolean>(false);
    const [badgeAllowed, setBadgeAllowed] = React.useState<boolean>(false);
    const [showNews, setShowNews] = React.useState<boolean>(false);
    const [showNewsMessage, setShowNewsMessage] = React.useState<boolean>(false);

    useEffect(() => {
        if (kollectionNewsPreference) {
            setNewsBlocked(kollectionNewsPreference.newsBlocked);
            setBadgeAllowed(kollectionNewsPreference.badgeAllowed);
            setShowNews(kollectionNewsPreference.showNews);
            setShowNewsMessage(kollectionNewsPreference.showNewsMessage);
        }
    }, [kollectionNewsPreference]);

    const handleNewsBlocked = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked;
        setNewsBlocked(value);
        kollectionNewsPreference.newsBlocked = value;

        setBadgeAllowed(!value);
        kollectionNewsPreference.badgeAllowed = !value;

        setShowNews(!value);
        kollectionNewsPreference.showNews = !value;

        setShowNewsMessage(!value);
        kollectionNewsPreference.showNewsMessage = !value;
    };

    const handleBadgeAllowed = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked
        setBadgeAllowed(value);
        kollectionNewsPreference.badgeAllowed = value;
        if (value && newsBlocked) {
            setNewsBlocked(false);
            kollectionNewsPreference.newsBlocked = false;
        }
    };

    const handleShowNews = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked
        setShowNews(value);
        kollectionNewsPreference.showNews = value;

        setShowNewsMessage(value);
        kollectionNewsPreference.showNewsMessage = value;
    };

    const handleShowNewsMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked
        setShowNewsMessage(value);
        kollectionNewsPreference.showNewsMessage = value;

        if (!showNews && value) {
            setShowNews(true);
            kollectionNewsPreference.showNews = true;
        }
    };

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={1}>
                <BlockIcon/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={7}>
                <Typography style={{fontWeight: "bold"}}>
                    News Blocked
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Switch
                    onChange={(e) => {
                        handleNewsBlocked(e);
                    }}
                    checked={newsBlocked}/>
            </Grid>
            <Grid item xs={1}>
                <NotificationsActiveSharpIcon/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={7}>
                <Typography style={{fontWeight: "bold"}}>
                    Badge Allowed
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Switch
                    onChange={(e) => {
                        handleBadgeAllowed(e);
                    }}
                    checked={badgeAllowed}
                />
            </Grid>

            <Grid item xs={1}>
                <FeedSharpIcon/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={7}>
                <Typography style={{fontWeight: "bold"}}>
                    Show News
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Switch
                    onChange={(e) => {
                        handleShowNews(e);
                    }}
                    checked={showNews}/>
            </Grid>

            <Grid item xs={1}>
                <LocalPostOfficeSharpIcon/>
            </Grid>
            <Grid item xs={1}/>
            <Grid item xs={7}>
                <Typography style={{fontWeight: "bold"}}>
                    Show Message
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Switch
                    onChange={(e) => {
                        handleShowNewsMessage(e);
                    }}
                    checked={showNewsMessage}
                />
            </Grid>
        </Grid>
    );
};
