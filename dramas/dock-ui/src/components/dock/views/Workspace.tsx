import {
  ApartmentOutlined as PavilionIcon,
  ArtTrackOutlined as StageIcon,
  ExpandMore,
  Grid3x3Outlined,
  LoginOutlined,
  LogoutOutlined,
  PersonOutline,
  PictureInPictureAltOutlined,
  Public as StationIcon,
  PushPinOutlined,
  QuestionMark as UnknownIcon,
  WorkspacesOutlined as CineroomIcon,
} from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Popover, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { TenantType } from '@nara-way/accent';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, useDock } from '~/hooks';
import { ns } from '~/index';
import { SessionStage, TreeItem } from '../../../models';
import { DefaultStageDialog } from './DefaultStageDialog';

export const Workspace = ({
  onStage = (stage: SessionStage) => undefined,
  onLogin = () => undefined,
  onLogout = () => undefined,
}: {
  onStage?: (stage: SessionStage) => void;
  onLogin?: () => void;
  onLogout?: () => void;
}) => {
  const { t } = useTranslation(ns);

  const theme = useTheme();
  const { authenticated } = useAuth();
  const { authorized, session, context, switchContext } = useDock();

  const [state, setState] = useState<{
    open: boolean;
    publicServantActive: boolean;
    anchorEl: HTMLButtonElement | null;
    officeIds: string[];
    activeItem: string;
  }>({
    open: false,
    publicServantActive: false,
    anchorEl: null,
    officeIds: [],
    activeItem: '',
  });

  useEffect(() => {}, [context.stage]);

  const handleWorkspaceContext = async (event: any) => {
    await setState({ ...state, anchorEl: event.target as HTMLButtonElement, open: !state.open });
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleStage = async (stage: SessionStage | undefined) => {
    if (!stage) {
      return;
    }

    if (window) {
      await switchContext({ url: window.location.pathname, stageId: stage.id });
    }

    if (onStage) {
      onStage(stage);
    }
  };

  const { anchorEl, open } = state;
  const handleClose = () => setState({ ...state, open: !state.open });

  const [defaultOpen, setDefaultOpen] = useState(false);
  const handleClickDefault = () => setDefaultOpen(true);
  const handleDefaultCancel = () => setDefaultOpen(false);
  const handleDefaultOk = () => setDefaultOpen(false);

  const getTree = () => {
    let tree: TreeItem = {
      id: '',
      name: '',
      type: TenantType.Station,
      accessible: false,
      children: [],
    };

    if (!session) {
      return tree;
    }

    const pavilion = session.pavilion;
    if (pavilion) {
      tree = {
        id: pavilion.id,
        name: pavilion.name,
        type: TenantType.Pavilion,
        accessible: false,
        children: [],
      };
    }

    const cinerooms = session.cinerooms;
    if (cinerooms) {
      cinerooms.forEach((cineroom) => {
        const cineroomTree: TreeItem = {
          id: cineroom.cineroom?.id ?? '',
          name: cineroom.cineroom?.name ?? '',
          type: TenantType.Cineroom,
          accessible: false,
          children: [],
        };

        tree.children.push(cineroomTree);

        const stages = cineroom.stages;
        if (stages) {
          stages.forEach((stage) => {
            const stageTree: TreeItem = {
              id: stage.stage?.id ?? '',
              name: stage.stage?.name ?? '',
              type: TenantType.Stage,
              accessible: false,
              children: [],
            };

            cineroomTree.children.push(stageTree);

            const kollections = stage.kollections;
            if (kollections) {
              kollections.forEach((kollection) => {
                const kollectionTree: TreeItem = {
                  id: kollection.path ?? '',
                  name: kollection.kollection?.name ?? '',
                  accessible: true,
                  children: [],
                };

                stageTree.children.push(kollectionTree);
              });
            }
          });
        }
      });
    }

    return tree;
  };

  const getIcon = (type?: keyof typeof TenantType) => {
    switch (type) {
      case TenantType.Station:
        return <StationIcon color="action" sx={{ pt: '4px', mb: '-6px', mr: '4px' }} />;
      case TenantType.Pavilion:
        return <PavilionIcon color="action" sx={{ pt: '4px', mb: '-6px', mr: '4px' }} />;
      case TenantType.Cineroom:
        return <CineroomIcon color="action" sx={{ pt: '4px', mb: '-6px', mr: '4px' }} />;
      case TenantType.Stage:
        return <StageIcon color="primary" sx={{ pt: '4px', mb: '-6px', mr: '4px' }} />;
    }
    return <UnknownIcon color="secondary" sx={{ pt: '4px', mb: '-6px', mr: '4px' }} />;
  };

  const findStage = (stageId: string) => {
    let stage: SessionStage | undefined;

    if (session) {
      session.cinerooms?.some((cineroom) => {
        return cineroom.stages?.some((item) => {
          if (item.stage?.id === stageId) {
            stage = {
              id: item.stage?.id,
              name: item.stage?.name,
              kollections: item.kollections,
            } as SessionStage;
            return true;
          }
        });
      });
    }

    return stage;
  };

  const renderTree = (tree: TreeItem) => {
    if (tree.type === TenantType.Stage) {
      return tree.id === context.stage?.id ? (
        <Box
          key={tree.id}
          sx={{
            color: tree.accessible ? theme.palette.primary.main : theme.palette.text.primary,
            cursor: tree.accessible ? 'pointer' : 'default',
          }}
          display="flex"
          justifyContent="flex-start"
        >
          <Typography
            sx={{
              cursor: tree.id === context.stage?.id ? 'default' : 'pointer',
              display: 'inline-block',
              fontSize: '14px',
              marginLeft: theme.spacing(7),
              verticalAlign: 'middle',
              padding: theme.spacing(1),
            }}
          >
            {tree.type === TenantType.Stage ? (
              <Box sx={{ fontWeight: 'normal', color: theme.palette.primary.main }}>{tree.name}</Box>
            ) : (
              tree.name
            )}
          </Typography>
        </Box>
      ) : (
        <Button
          key={tree.id}
          fullWidth
          color="inherit"
          sx={{
            justifyContent: 'start',
            textTransform: 'none',
            paddingLeft: theme.spacing(6),
            marginLeft: '-8px',
          }}
          onClick={() => handleStage(findStage(tree.id))}
        >
          <Box
            sx={{
              color: tree.accessible ? theme.palette.primary.main : theme.palette.text.primary,
              cursor: tree.accessible ? 'pointer' : 'default',
            }}
            display="flex"
            justifyContent="flex-start"
          >
            <Typography
              sx={{
                cursor: tree.id === context.stage?.id ? 'default' : 'pointer',
                display: 'inline-block',
                fontSize: '14px',
                marginLeft: theme.spacing(4),
                verticalAlign: 'middle',
                paddingRight: theme.spacing(8),
              }}
            >
              {tree.type === TenantType.Stage ? (
                <Box sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>{tree.name}</Box>
              ) : (
                tree.name
              )}
            </Typography>
          </Box>
        </Button>
      );
    }

    return (
      <Box
        key={tree.id}
        paddingLeft={tree.type === TenantType.Pavilion ? '0px' : tree.type === TenantType.Cineroom ? '16px' : '30px'}
      >
        <Box
          style={{
            color: tree.accessible ? (theme.palette.mode === 'light' ? grey[900] : grey[50]) : grey[500],
            cursor: tree.accessible ? 'pointer' : 'default',
          }}
          display="flex"
          justifyContent="flex-start"
        >
          <ExpandMore />
          <Typography
            sx={{
              display: 'inline-block',
              fontSize: '15px',
              marginLeft: theme.spacing(2),
              lineHeight: '30px',
              verticalAlign: 'middle',
              paddingRight: theme.spacing(8),
            }}
          >
            {tree.name}
          </Typography>
          <Box sx={{ position: 'absolute', right: 10 }}>{getIcon(tree.type)}</Box>
        </Box>
        {Array.isArray(tree.children) && tree.children.length > 0 && tree.children.map((child) => renderTree(child))}
      </Box>
    );
  };

  return (
    <Fragment>
      <Tooltip title={t('Context')} placement="top">
        <IconButton color="inherit" size="large" onClick={handleWorkspaceContext}>
          <Grid3x3Outlined />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClick={handleClose}
        onClose={handleClose}
      >
        {authenticated && context.cineroom && context.stage && (
          <Fragment>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ ml: 2, mr: 4, mt: 1, mb: 1 }}>
              <Box justifyContent="flex-start" display="inline-flex" alignItems="center">
                <PictureInPictureAltOutlined sx={{ ml: 1, mr: 2 }} />
                <Typography variant="body2">{`${context.cineroom.name} > ${context.stage.name}`}</Typography>
              </Box>
              <Tooltip title={t('Set default...')}>
                <IconButton onClick={handleClickDefault} sx={{ mr: '-10px' }}>
                  <PushPinOutlined />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />

            <Box padding={3} pb={1} sx={{ width: '240px' }}>
              {renderTree(getTree())}
            </Box>

            <Divider />

            <Box>
              <Button
                fullWidth
                color="inherit"
                startIcon={<LogoutOutlined />}
                onClick={handleLogout}
                sx={{ padding: 2 }}
              >
                {t('Logout')}
              </Button>
            </Box>
          </Fragment>
        )}
        {!authenticated && (
          <>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 2, mr: 4, mt: 2, mb: 2 }}>
              <PersonOutline sx={{ ml: 1 }} />
              <Typography variant="body2">{t('Please Login.')}</Typography>
            </Stack>
            <Divider />
            <Box sx={{ width: '240px' }}>
              <Button fullWidth color="inherit" startIcon={<LoginOutlined />} onClick={handleLogin} sx={{ padding: 2 }}>
                {t('Login')}
              </Button>
            </Box>
          </>
        )}
      </Popover>
      {defaultOpen && (
        <DefaultStageDialog open={defaultOpen} onClickCancel={handleDefaultCancel} onClickOk={handleDefaultOk} />
      )}
    </Fragment>
  );
};
