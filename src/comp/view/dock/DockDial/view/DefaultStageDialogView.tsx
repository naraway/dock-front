import { CloseOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  Switch,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useDock } from '../../../../module';

const DefaultStageDialogView =
  ({
     open = false,
     onClickCancel,
     onClickOk,
   }: {
    open: boolean,
    onClickCancel: (event?: any) => void,
    onClickOk: (event?: any) => void,
  }) => {
    const dock = useDock();

    const [defaultFirst, setDefaultFirst] = useState(dock.defaultFirst);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDefaultFirst(event.target.checked);
    };

    const handleClickCancel = () => {
      if (onClickCancel) {
        onClickCancel();
      }
    };

    const handleClickOk = async () => {
      await dock.toggleDefaultFirst(defaultFirst);
      await dock.updateDefaultStage(dock.activeStage?.id || '');
      dock.reload();

      if (onClickOk) {
        onClickOk();
      }
    };

    return (
      <Dialog open={open} maxWidth="xs">
        <DialogTitle>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
          >
            Default stage
            <IconButton onClick={handleClickCancel}>
              <CloseOutlined fontSize={'small'}/>
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                contentEditable={false}
                label={'Cineroom'}
                value={dock.activeCineroom?.name}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                contentEditable={false}
                label={'Stage'}
                value={dock.activeStage?.name}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={defaultFirst} onChange={handleChange}/>}
                  label="Set as default"
                />
                <FormHelperText>
                  If turned on, next login use default cineroom as set.
                  <br/>
                  Or else, next login use latest default cineroom as set.
                </FormHelperText>
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box mr={2} mb={2} ml={2}>
            <Button
              color={'primary'}
              onClick={handleClickCancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleClickOk}
            >
              OK
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  };

export default DefaultStageDialogView;
