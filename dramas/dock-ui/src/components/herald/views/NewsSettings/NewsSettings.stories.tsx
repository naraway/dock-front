import {Box, Button} from "@mui/material";
import {KollectionNewsPreference, NewsPreference} from "@nara-way/herald-core";
import React from "react";
import {NewsSettingsView} from "~/components/herald/views/NewsSettings/NewsSettingsView";

export default {
    component: NewsSettingsView,
    argTypes: {}
};

const newsPreference = {
    newsBlocked: false,
    badgeAllowed: true,
    showNews: true,
    showNewsMessage: true
} as NewsPreference;

const kollectionNewsPreference = {
    newsBlocked: false,
    showNews: true,
    showNewsMessage: true
} as KollectionNewsPreference;

const Template = () => {
    //
    const [isOpen, setIsOpen] = React.useState(false);
    const citizenId = "1:1:1";
    const kollectioName = "asan-medigation";

    const handleButtonClick = () => {
        //
        setIsOpen(true);
    }

    const handleOnSave = () => {
        //
    }

    const handleOnCancel = () => {
        //
        setIsOpen(false);
    }

    return (
        <Box>
            <NewsSettingsView
                open={isOpen}
                newsPreference={newsPreference}
                kollectionNewsPreference={kollectionNewsPreference}
                citizenId={citizenId}
                kollectionName={kollectioName}
                onSave={handleOnSave}
                onClose={handleOnCancel}
            />
            <Button
                onClick={handleButtonClick}
                variant="contained">
                Show News Preference
            </Button>
        </Box>
    );
};

export const Default = Template.bind({});
