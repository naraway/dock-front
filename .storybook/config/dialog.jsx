import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {DialogNoticeType} from "@nara-way/prologue";
import {CheckCircleOutlined, ErrorOutlineOutlined, HelpOutlineOutlined, InfoOutlined} from "@mui/icons-material";
import * as React from "react";

const DialogView = props => {
  //
  const renderTitle = dialog => {
    const {title, noticeType } = dialog;
    return title && (
      <DialogTitle>
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid item><Typography variant={"h6"}>{title}</Typography></Grid>
          <Grid item style={{marginTop: 2}}>{renderTitleIcon(noticeType)}</Grid>
        </Grid>
      </DialogTitle>
    );
  };

  const renderTitleIcon = noticeType => {
    //
    switch (noticeType) {
      case DialogNoticeType.Check:
        return <CheckCircleOutlined />;
      case DialogNoticeType.Info:
        return <InfoOutlined />;
      case DialogNoticeType.Danger:
        return <ErrorOutlineOutlined />;
      case DialogNoticeType.Question:
        return <HelpOutlineOutlined />;
      default:
        return null;
    }
  };

  const renderContent = dialog => {
    //
    const message = dialog.message;
    if (typeof message === 'string') {
      return <DialogContent dangerouslySetInnerHTML={{ __html: message }} />;
    } else {
      return <DialogContent>{message}</DialogContent>;
    }
  };

  const renderActions = (index, dialog) => {
    //
    const { onClose } = props;
    const {confirmButton, cancelButton} = dialog;
    return (
      <DialogActions sx={{minWidth: '240px'}}>
        {cancelButton && (
          <Button color="inherit" onClick={() => onClose(index, cancelButton)}>{cancelButton.content}</Button>
        )}
        <Button color="inherit" onClick={() => onClose(index, confirmButton)}>{confirmButton.content}</Button>
      </DialogActions>
    );
  };

  const { index, dialog } = props;
  return (
    <Dialog key={`dialog-${index}`} open sx={{ fontFamily: 'arial'}}>
      {renderTitle(dialog)}
      {renderContent(dialog)}
      {renderActions(index, dialog)}
    </Dialog>
  );
};

export default DialogView;
