import React, {useEffect} from "react";
import {Grid, Switch, Typography} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import NotificationsActiveSharpIcon from "@mui/icons-material/NotificationsActiveSharp";
import FeedSharpIcon from "@mui/icons-material/FeedSharp";
import LocalPostOfficeSharpIcon from "@mui/icons-material/LocalPostOfficeSharp";
import {NewsPreference} from "@nara-way/herald-core";

export const NewsPreferenceView = ({newsPreference}: { newsPreference: NewsPreference; }) => {
    //
    const [newsBlocked, setNewsBlocked] = React.useState<boolean>(false);
    const [badgeAllowed, setBadgeAllowed] = React.useState<boolean>(false);
    const [showNews, setShowNews] = React.useState<boolean>(false);
    const [showNewsMessage, setShowNewsMessage] = React.useState<boolean>(false);

    useEffect(() => {
        if (newsPreference) {
            setNewsBlocked(newsPreference.newsBlocked);
            setBadgeAllowed(newsPreference.badgeAllowed);
            setShowNews(newsPreference.showNews);
            setShowNewsMessage(newsPreference.showNewsMessage);
        }
    }, [newsPreference]);

    const handleNewsBlocked = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked;
        setNewsBlocked(value);
        newsPreference.newsBlocked = value;

        setBadgeAllowed(!value);
        newsPreference.badgeAllowed = !value;
        setShowNews(!value);
        newsPreference.showNews = !value;
        setShowNewsMessage(!value);
        newsPreference.showNewsMessage = !value;
    };

    const handleBadgeAllowed = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked
        setBadgeAllowed(value);
        newsPreference.badgeAllowed = value;
        if (value && newsBlocked) {
            setNewsBlocked(false);
            newsPreference.newsBlocked = false;
        }
    };

    const handleShowNews = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked
        setShowNews(value);
        setShowNewsMessage(value);

        newsPreference.showNews = value;
        newsPreference.showNewsMessage = value;
    };

    const handleShowNewsMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        //
        const value = event.target.checked
        setShowNewsMessage(value);
        newsPreference.showNewsMessage = value;

        if(!showNews && value) {
            setShowNews(true);
            newsPreference.showNews = true;
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
