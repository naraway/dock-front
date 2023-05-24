import {Box, Button} from "@mui/material";
import React, {useEffect} from "react";
import {NewsListView} from "~/components/herald/views/NewsList/NewsListView";
import {useHerald} from "~/hooks/useHerald";
import { News} from "@nara-way/herald-core";

export default {
    component: NewsListView,
    argTypes: {}
};

const Template = () => {
    //
    const [isOpen, setIsOpen] = React.useState(false);
    const [newsList, setNewsList] = React.useState<News[]>([]);
    const {collectNews} = useHerald();
    const citizenId = '1:1:1', fromKollectie= 'medigation';

    useEffect( () => {
        //
        const fetchData = async () => {
            const response = collectNews(citizenId, fromKollectie);
            const data = await response;
            if (data) {
                setNewsList(data);
            }
        };
        fetchData();
    }, [citizenId, fromKollectie]);

    const handleOnClickClose = () => {
        //
        setIsOpen(false);
    }

    const handleOnClickAllRead = () => {
        //
    }

    const handleOnClickReadNews = (newsId: string) => {
        //
    }

    const handleButtonClick = () => {
        //
        setIsOpen(true);
    }

    return (
        <Box>
            <NewsListView
                open={isOpen}
                onClickClose={handleOnClickClose}
                onClickAllRead={handleOnClickAllRead}
                newsList={[]}
                onClickReadNews={handleOnClickReadNews}
            />
            <Button
                onClick={handleButtonClick}
                variant="contained">
                Show News List
            </Button>
        </Box>
    );
};

export const Default = Template.bind({});
