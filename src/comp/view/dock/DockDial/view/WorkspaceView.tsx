import {
  ApartmentOutlined as PavilionIcon,
  ArtTrackOutlined as StageIcon, DownloadDoneOutlined,
  ExpandMore,
  Grid3x3Outlined,
  LoginOutlined,
  LogoutOutlined, MultipleStopOutlined,
  PersonOutline,
  PictureInPictureAltOutlined,
  Public as StationIcon,
  PushPinOutlined,
  QuestionMark as UnknownIcon,
  WorkspacesOutlined as CineroomIcon,
} from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Popover, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { TenantType } from '@nara-way/accent';
import React, { Fragment, useEffect, useState } from 'react';
import { ActiveStage, useAuth, useDock } from '../../../../module';
import { TreeItem } from '../model';
import DefaultStageDialogView from './DefaultStageDialogView';
import { grey } from '@mui/material/colors';

const WorkspaceView =
  ({
     onStage = (stage: ActiveStage) => undefined,
     onLogin = () => undefined,
     onLogout = () => undefined,
   }: {
    onStage?: (stage: ActiveStage) => void,
    onLogin?: () => void,
    onLogout?: () => void,
  }) => {
    const theme = useTheme();
    const auth = useAuth();
    const dock = useDock();

    const [state, setState] = useState<{
      open: boolean,
      publicServantActive: boolean,
      anchorEl: HTMLButtonElement | null,
      officeIds: string[],
      activeItem: string,
    }>({
      open: false,
      publicServantActive: false,
      anchorEl: null,
      officeIds: [],
      activeItem: '',
    });

    useEffect(() => {
    }, [dock.activeStage]);

    const handleWorkspaceContext = async (event: any) => {
      await setState({ ...state, anchorEl: event.target as HTMLButtonElement, open: !state.open });
    };

    const handleClickLogin = () => {
      if (onLogin) {
        onLogin();
      }
    };

    const handleClickLogout = async () => {
      if (onLogout) {
        onLogout();
      }
    };

    const handleClickStage = async (stage: ActiveStage | undefined) => {
      if (!stage) {
        return;
      }

      await dock.switchStage(stage.id);
      await dock.reload();
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
      const tree: TreeItem = {
        id: '',
        name: '',
        type: TenantType.Station,
        accessible: false,
        children: [],
      };

      if (!dock.activeDock) {
        return tree;
      }

      const pavilion = dock.activeDock.pavilion;
      if (pavilion) {
        tree.id = pavilion.id;
        tree.name = pavilion.name;
        tree.type = TenantType.Pavilion;
        tree.accessible = false;
      }

      const cinerooms = dock.activeDock.cinerooms;
      if (cinerooms) {
        cinerooms.forEach(cineroom => {
          const cineroomTree: TreeItem = {
            id: cineroom.cineroom.id,
            name: cineroom.cineroom.name,
            type: TenantType.Cineroom,
            accessible: false,
            children: [],
          };

          tree.children.push(cineroomTree);

          const stages = cineroom.stages;
          if (stages) {
            stages.forEach(stage => {
              const stageTree: TreeItem = {
                id: stage.stage.id,
                name: stage.stage.name,
                type: TenantType.Stage,
                accessible: false,
                children: [],
              };

              cineroomTree.children.push(stageTree);

              const kollections = stage.kollections;
              if (kollections) {
                kollections.forEach(kollection => {
                  const kollectionTree: TreeItem = {
                    id: kollection.path,
                    name: kollection.kollection.name,
                    type: undefined,
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

    const getIcon = (type?: TenantType) => {
      switch (type) {
        case TenantType.Station:
          return <StationIcon color="action" sx={{ pt: '4px', mb: '-6px', mr: '4px' }}/>;
        case TenantType.Pavilion:
          return <PavilionIcon color="action" sx={{ pt: '4px', mb: '-6px', mr: '4px' }}/>;
        case TenantType.Cineroom:
          return <CineroomIcon color="action" sx={{ pt: '4px', mb: '-6px', mr: '4px' }}/>;
        case TenantType.Stage:
          return <StageIcon color="primary" sx={{ pt: '4px', mb: '-6px', mr: '4px' }}/>;
      }
      return <UnknownIcon color="secondary" sx={{ pt: '4px', mb: '-6px', mr: '4px' }}/>;
    };

    const findStage = (stageId: string) => {
      let stage: ActiveStage | undefined;

      if (dock.activeDock) {
        dock.activeDock.cinerooms.some(cineroom => {
          return cineroom.stages.some(item => {
            if (item.stage.id === stageId) {
              stage = new ActiveStage(item.stage.id, item.stage.name, item.kollections);
              return true;
            }
          });
        });
      }

      return stage;
    };

    const renderTree = (tree: TreeItem) => {
      if (tree.type === TenantType.Stage) {
        return (
          tree.id === dock.activeStage?.id ? (
            <Box
              key={tree.id}
              sx={{
                color: (tree.accessible ? theme.palette.primary.main : theme.palette.text.primary),
                cursor: (tree.accessible ? 'pointer' : 'default'),
              }}
              display="flex"
              justifyContent="flex-start"
            >
              <Typography
                sx={{
                  cursor: tree.id === dock.activeStage?.id ? 'default' : 'pointer',
                  display: 'inline-block',
                  fontSize: '14px',
                  marginLeft: theme.spacing(7),
                  verticalAlign: 'middle',
                  padding: theme.spacing(1),
                }}
              >
                {tree.type === TenantType.Stage ? (
                  <Box sx={{ fontWeight: 'normal', color: theme.palette.primary.main }}>
                    {tree.name}
                  </Box>
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
              onClick={() => handleClickStage(findStage(tree.id))}
            >
              <Box
                sx={{
                  color: (tree.accessible ? theme.palette.primary.main : theme.palette.text.primary),
                  cursor: (tree.accessible ? 'pointer' : 'default'),
                }}
                display="flex"
                justifyContent="flex-start"
              >
                <Typography
                  sx={{
                    cursor: tree.id === dock.activeStage?.id ? 'default' : 'pointer',
                    display: 'inline-block',
                    fontSize: '14px',
                    marginLeft: theme.spacing(4),
                    verticalAlign: 'middle',
                    paddingRight: theme.spacing(8),
                  }}
                >
                  {tree.type === TenantType.Stage ? (
                    <Box sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                      {tree.name}
                    </Box>
                  ) : (
                    tree.name
                  )}
                </Typography>
              </Box>
            </Button>
          )
        );
      }

      return (
        <Box
          key={tree.id}
          paddingLeft={tree.type === TenantType.Pavilion ? '0px' : tree.type === TenantType.Cineroom ? '16px' : '30px'}
        >
          <Box
            style={{
              color: (tree.accessible ? (theme.palette.mode === 'light' ? grey[900] : grey[50]) : grey[500]),
              cursor: (tree.accessible ? 'pointer' : 'default'),
            }}
            display="flex"
            justifyContent="flex-start"
          >
            <ExpandMore/>
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
            <Box sx={{ position: 'absolute', right: 10 }}>
              {getIcon(tree.type)}
            </Box>
          </Box>
          {
            Array.isArray(tree.children) && tree.children.length > 0 && (
              tree.children.map((child) => renderTree(child))
            )
          }
        </Box>
      );
    };

    return (
      <Fragment>
        <Tooltip title="Context" placement="top">
          <IconButton
            color="inherit"
            size="large"
            onClick={handleWorkspaceContext}
          >
            <Grid3x3Outlined/>
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
          {auth.loggedIn && dock.activeCineroom && dock.activeStage && (
            <Fragment>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ ml: 2, mr: 4, mt: 1, mb: 1 }}
              >
                <Box
                  justifyContent="flex-start"
                  display="inline-flex"
                  alignItems="center"
                >
                  <PictureInPictureAltOutlined sx={{ ml: 1, mr: 2 }}/>
                  <Typography variant="body2">
                    {`${dock.activeCineroom.name} > ${dock.activeStage.name}`}
                  </Typography>
                </Box>
                <Tooltip title="Set default...">
                  <IconButton
                    onClick={handleClickDefault}
                    sx={{ mr: '-10px' }}
                  >
                    <PushPinOutlined/>
                  </IconButton>
                </Tooltip>
              </Box>
              <Divider/>

              <Box
                padding={3}
                pb={1}
                sx={{ width: '240px' }}
              >
                {renderTree(getTree())}
              </Box>

              <Divider/>

              <Box>
                <Button
                  fullWidth
                  color="inherit"
                  startIcon={<LogoutOutlined/>}
                  onClick={handleClickLogout}
                  sx={{ padding: 2 }}>
                  Logout
                </Button>
              </Box>
            </Fragment>
          )}
          {(!auth || !auth.loggedIn) && (
            <>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ ml: 2, mr: 4, mt: 2, mb: 2 }}
              >
                <PersonOutline sx={{ ml: 1 }}/>
                <Typography variant="body2">
                  Please Login.
                </Typography>
              </Stack>
              <Divider/>
              <Box sx={{ width: '240px' }}>
                <Button
                  fullWidth
                  color="inherit"
                  startIcon={<LoginOutlined/>}
                  onClick={handleClickLogin}
                  sx={{ padding: 2 }}>
                  Login
                </Button>
              </Box>
            </>
          )}
        </Popover>
        {defaultOpen && (
          <DefaultStageDialogView
            open={defaultOpen}
            onClickCancel={handleDefaultCancel}
            onClickOk={handleDefaultOk}
          />
        )}
      </Fragment>
    );
  };

export default WorkspaceView;
