import React from "react";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import DoneIcon from '@mui/icons-material/Done';
import {News} from "@nara-way/herald-core";
import dayjs from "dayjs";

export const NewsListView = ({
     open,
     newsList,
     onClickReadNews,
     onClickAllRead,
     onClickClose } : {
    open: boolean;
    newsList: News[];
    onClickReadNews: (newsId: string) => void;
    onClickAllRead: () => void;
    onClickClose: () => void;
}) => {
    //
    const handleClose = () => {
        //
        onClickClose();
    };

    const handleAllRead = () => {
        //
        onClickAllRead();
    };

    const ListWrapper = styled("div")(({theme}) => ({
        backgroundColor: theme.palette.background.paper
    }));

    const handleNewsRead = (news: News) => {
        //
        onClickReadNews(news.id);
    }

    return (
        <Dialog open={open} maxWidth={"xs"} style={{height: '70vh'}}>
            <DialogTitle>News List</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1}>
                    <ListWrapper>
                        <List>
                            {
                                newsList?.length > 0 ?
                                    newsList.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            secondaryAction={
                                                <IconButton edge="end"
                                                            aria-label="delete"
                                                            onClick={(e) => {
                                                                handleNewsRead(item)
                                                            }}>
                                                    <DoneIcon/>
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {item.fromDrama?.charAt(0).toUpperCase()}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.message}
                                                secondary={dayjs(item.registeredOn).format("HH:mm MM/DD/YYYY")}
                                            />
                                        </ListItem>
                                    ))
                                    :
                                    <Typography>No Notifications</Typography>
                            }
                        </List>
                    </ListWrapper>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAllRead} variant={"contained"}>Mark All Read</Button>
                <Button onClick={handleClose} variant={"outlined"}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
