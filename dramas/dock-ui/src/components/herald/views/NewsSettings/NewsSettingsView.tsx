import {KollectionNewsPreference, KollectionNewsPreferenceCdo, NewsPreference} from "@nara-way/herald-core";
import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs} from "@mui/material";
import {KollectionNewsPreferenceView} from "~/components/herald/views/KollectionNewsPreference";
import {NewsPreferenceView} from "~/components";
import {useHerald} from "~/hooks/useHerald";
import {NameValue, NameValueList} from "@nara-way/accent";

export const NewsSettingsView = ({open, newsPreference, kollectionNewsPreference, citizenId, kollectionName, onSave, onClose}: {
    open: boolean;
    newsPreference: NewsPreference;
    kollectionNewsPreference: KollectionNewsPreference;
    citizenId: string;
    kollectionName: string;
    onSave?: () => void;
    onClose?: () => void;
}) => {
    //
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    const {
        registerNewsPreference, modifyNewsPreference,
        registerKollectionNewsPreference, modifyKollectionNewsPreference
    } = useHerald();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        //
        setSelectedTab(newValue);
    }

    const handleOnClickSave = () => {
        //
        if (newsPreference.id !== undefined) {
            handleModifyNewsPreference(newsPreference);
        } else {
            createNewsPreference(newsPreference);
        }

        if (kollectionNewsPreference.id !== undefined) {
            handleModifyKollectionNewsPreference(kollectionNewsPreference);
        }
        else {
            createKollectionNewsPreference(kollectionNewsPreference);
        }

        if (onSave) {
            onSave();
        }
    }

    const createKollectionNewsPreference = (kollectionNewsPreference: KollectionNewsPreference) => {
        //
        const kollectionNewsPreferenceCdo = {
            citizenId: citizenId,
            newsBlocked: kollectionNewsPreference.newsBlocked,
            kollection: kollectionName,
            showNews: kollectionNewsPreference.showNews,
            showNewsMessage: kollectionNewsPreference.showNewsMessage,
        } as KollectionNewsPreferenceCdo;

        registerKollectionNewsPreference(kollectionNewsPreferenceCdo);
    }

    const createNewsPreference = (newsPreference: NewsPreference) => {
        //
        const newsPreferenceCdo = {
            citizenId: citizenId,
            newsBlocked: newsPreference.newsBlocked,
            badgeAllowed: newsPreference.badgeAllowed,
            showNews: newsPreference.showNews,
            showNewsMessage: newsPreference.showNewsMessage,
        };

        registerNewsPreference(newsPreferenceCdo);
    }

    const handleModifyNewsPreference = (newsPreference: NewsPreference) => {
        //
        const badgeAllowedValue = {name: 'badgeAllowed', value: String(newsPreference.badgeAllowed)} as NameValue;
        const newsBlockedValue = {name: 'newsBlocked', value: String(newsPreference.newsBlocked)} as NameValue;
        const showNewsValue = {name: 'showNews', value: String(newsPreference.showNews)} as NameValue;
        const showMessageValue = {name: 'showNewsMessage', value: String(newsPreference.showNewsMessage)} as NameValue;

        const nameValues = {
            nameValues: [
                newsBlockedValue,
                showNewsValue,
                showMessageValue,
                badgeAllowedValue
            ]
        } as NameValueList;

        modifyNewsPreference(newsPreference.id, nameValues);
    }

    const handleModifyKollectionNewsPreference = (kollectionNewsPreference: KollectionNewsPreference) => {
        //
        const newsBlockedValue = {name: 'newsBlocked', value: String(kollectionNewsPreference.newsBlocked)} as NameValue;
        const showNewsValue = {name: 'showNews', value: String(kollectionNewsPreference.showNews)} as NameValue;
        const showMessageValue = {name: 'showNewsMessage', value: String(kollectionNewsPreference.showNewsMessage)} as NameValue;

        const nameValues = {
            nameValues: [
                newsBlockedValue,
                showNewsValue,
                showMessageValue,
            ]
        } as NameValueList;

        modifyKollectionNewsPreference(newsPreference.id, nameValues);
    }

    const handleOnClickClose = () => {
        //
        if (onClose) {
            onClose();
        }
    }

    return (
        <Dialog open={open} maxWidth={'xs'}>
            <DialogTitle>
                News Preference Settings
            </DialogTitle>
            <DialogContent style={{paddingBottom: '0'}}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}>
                    <Tab
                        label="News"/>
                    <Tab
                        label="Kollection News"/>
                </Tabs>
                <Box style={{padding: '1rem', height: '11rem'}}>
                    {selectedTab === 0 ?
                        <NewsPreferenceView newsPreference={newsPreference}/>
                        :
                        <KollectionNewsPreferenceView kollectionNewsPreference={kollectionNewsPreference}/>
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleOnClickSave}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleOnClickClose}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
