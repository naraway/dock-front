import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {DialogNoticeType} from "@nara/prologue";
import {CheckCircleOutlined, ErrorOutlineOutlined, HelpOutlineOutlined, InfoOutlined} from "@mui/icons-material";
import * as React from "react";

const DialogView = ({index, dialog, onClose}) => {
  useEffect(() => {
    if (window) {
      window.document.addEventListener('keydown', handleKeyDown);
      window.document.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (window) {
        window.document.addEventListener('keydown', handleKeyDown);
        window.document.removeEventListener('keyup', handleKeyUp);
      }
    };
  }, []);

  const renderTitle = (dialog) => {
    const {title, noticeType} = dialog;
    return title && (
      <DialogTitle>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item><Typography variant="h6">{title}</Typography></Grid>
          <Grid item style={{marginTop: 2}}>{renderTitleIcon(noticeType)}</Grid>
        </Grid>
      </DialogTitle>
    );
  };

  const renderTitleIcon = (noticeType) => {
    switch (noticeType) {
      case DialogNoticeType.Check:
        return <CheckCircleOutlined color="info"/>;
      case DialogNoticeType.Info:
        return <InfoOutlined color="info"/>;
      case DialogNoticeType.Danger:
        return <ErrorOutlineOutlined color="warning"/>;
      case DialogNoticeType.Question:
        return <HelpOutlineOutlined color="info"/>;
      default:
        return null;
    }
  };

  const renderContent = (dialog) => {
    const message = dialog.message;

    if (typeof message === 'string') {
      return (
        <DialogContent dangerouslySetInnerHTML={{__html: message}}/>
      );
    } else {
      return (
        <DialogContent>{message}</DialogContent>
      );
    }
  };

  const renderActions = (index, dialog) => {
    const cancelButton = dialog.cancelButton;

    return (
      <DialogActions sx={{minWidth: '240px'}}>
        {cancelButton && (
          <Button color="inherit" onClick={handleClickCancel}>
            Cancel
          </Button>
        )}
        <Button color="inherit" onClick={handleClickOk}>
          OK
        </Button>
      </DialogActions>
    );
  };

  const handleClickCancel = () => onClose(index, dialog.cancelButton);
  const handleClickOk = () => onClose(index, dialog.confirmButton);

  const handleKeyDown = (event) => {
    if (event.target.tagName !== 'DIV') {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    if (event.key === 'Enter') {
      handleClickOk();
    }
  };

  const handleKeyUp = (event) => {
    if (event.target.tagName !== 'DIV') {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    if (event.key === 'Escape') {
      handleClickCancel();
    }
  };

  return (
    <Dialog key={`dialog-${index}`} open sx={{fontFamily: 'arial'}}>
      {renderTitle(dialog)}
      {renderContent(dialog)}
      {renderActions(index, dialog)}
    </Dialog>
  );
};

export default DialogView;
