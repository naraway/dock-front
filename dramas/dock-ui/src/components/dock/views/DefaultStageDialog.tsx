import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDock } from '~/hooks';
import { ns } from '~/index';

export const DefaultStageDialog = ({
  open,
  onClickCancel,
  onClickOk,
}: {
  open: boolean;
  onClickCancel: (event?: any) => void;
  onClickOk: (event?: any) => void;
}) => {
  const { t } = useTranslation(ns);
  const { session, context, applyDefaultFirst, applyDefaultStage } = useDock();

  const [defaultFirst, setDefaultFirst] = useState(session?.defaultFirstForStage ?? false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDefaultFirst(event.target.checked);
  };

  const handleCancel = () => {
    if (onClickCancel) {
      onClickCancel();
    }
  };

  const handleOk = async () => {
    await applyDefaultFirst(defaultFirst);
    await applyDefaultStage(context.stage?.id ?? '');

    if (onClickOk) {
      onClickOk();
    }
  };

  return (
    <Dialog open={open} maxWidth="xs">
      <DialogTitle>{t('Default Workspace')}</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2}>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <TextField
              fullWidth
              contentEditable={false}
              label={t('Workgroup')}
              value={context.cineroom?.name}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              contentEditable={false}
              label={t('Workspace')}
              value={context.stage?.name}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={defaultFirst} onChange={handleChange} />}
                label={t('Set as default')}
              />
              <FormHelperText>
                {t('If the default switch is turned on, you use it as the default workspace on login.')}
                {t('Or else, you use the latest workspace on login.')}
              </FormHelperText>
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{t('Cancel')}</Button>
        <Button onClick={handleOk}>{t('OK')}</Button>
      </DialogActions>
    </Dialog>
  );
};
