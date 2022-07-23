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
import { TenantType } from '@nara-way/accent';
import React, { useEffect, useState } from 'react';
import { ActiveStage, useAuth, useDock } from '../../../../module';
import { TreeItem } from '../model';
import DefaultStageDialogView from './DefaultStageDialogView';


const WorkspaceView =
  ({
     onStage = (stage: ActiveStage) => undefined,
     onLogout = () => undefined,
     onLogin = () => undefined,
   }: {
    onStage?: (stage: ActiveStage) => void,
    onLogout?: () => void,
    onLogin?: () => void,
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

    const handleClickLogout = async () => {
      if (onLogout) {
        onLogout();
      }
    };

    const handleClickLogin = () => {
      if (onLogin) {
        onLogin();
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

    const handleClose = () => {
      setState({ ...state, open: !state.open });
    };

    const [defaultOpen, setDefaultOpen] = useState(false);
    const handleClickDefault = () => {
      setDefaultOpen(true);
    };

    const handleDefaultCancel = () => {
      setDefaultOpen(false);
    };

    const handleDefaultOk = () => {
      setDefaultOpen(false);
    };

    const getTree = (): TreeItem => {
      const tree: TreeItem = {
        id: '',
        name: '',
        type: TenantType.Station,
        accessible: false,
        children: [],
      };

      if (!dock || !dock.activeDock) {
        return tree;
      }

      const space = dock.activeDock;

      const pavilion = space.pavilion;
      if (pavilion) {
        tree.id = pavilion.id;
        tree.name = pavilion.name;
        tree.type = TenantType.Pavilion;
        tree.accessible = false;
      }

      const cinerooms = space.cinerooms;
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
          return <StationIcon fontSize="small" color="action"
                              style={{ paddingTop: '4px', marginBottom: '-6px', marginRight: '4px' }}/>;
        case TenantType.Pavilion:
          return <PavilionIcon fontSize="small" color="action"
                               style={{ paddingTop: '4px', marginBottom: '-6px', marginRight: '4px' }}/>;
        case TenantType.Cineroom:
          return <CineroomIcon fontSize="small" color="action"
                               style={{ paddingTop: '4px', marginBottom: '-6px', marginRight: '4px' }}/>;
        case TenantType.Stage:
          return <StageIcon fontSize="small" color="primary"
                            style={{ paddingTop: '4px', marginBottom: '-6px', marginRight: '4px' }}/>;
      }

      return <UnknownIcon fontSize="small" color="secondary"
                          style={{ paddingTop: '4px', marginBottom: '-6px', marginRight: '4px' }}/>;
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
              style={{
                cursor: (tree.accessible ? 'pointer' : 'default'),
                color: (tree.accessible ? '#000' : '#999'),
              }}
              display="flex"
              justifyContent="flex-start"
            >
              <Typography
                style={{
                  cursor: tree.id === dock.activeStage?.id ? 'default' : 'pointer',
                  display: 'inline-block',
                  fontSize: '14px',
                  marginLeft: theme.spacing(7),
                  verticalAlign: 'middle',
                  padding: theme.spacing(1),
                  color: theme.palette.primary.main,
                }}
              >
                {tree.type === TenantType.Stage ? (
                  <b>{tree.name}</b>
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
                style={{
                  cursor: (tree.accessible ? 'pointer' : 'default'),
                  color: (tree.accessible ? '#000' : '#999'),
                }}
                display="flex"
                justifyContent="flex-start"
              >
                <Typography
                  style={{
                    cursor: tree.id === dock.activeStage?.id ? 'default' : 'pointer',
                    display: 'inline-block',
                    fontSize: '14px',
                    marginLeft: theme.spacing(4),
                    verticalAlign: 'middle',
                    paddingRight: theme.spacing(8),
                  }}
                >
                  {tree.type === TenantType.Stage ? (
                    <b style={{ color: '#000' }}>{tree.name}</b>
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
              cursor: (tree.accessible ? 'pointer' : 'default'),
              color: (tree.accessible ? '#000' : '#999'),
            }}
            display="flex"
            justifyContent="flex-start"
          >
            <ExpandMore/>
            <Typography
              style={{
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
            <Box style={{ position: 'absolute', right: '10px' }}>
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
      <>
        <Tooltip title="Context" placement="top">
          <IconButton
            color="inherit"
            size={"large"}
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
          {auth && auth.loggedIn && dock && dock.activeCineroom && dock.activeStage && (
            <>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                  marginLeft: 2,
                  marginRight: 4,
                  marginTop: 1,
                  marginBottom: 1,
                }}
              >
                <Box
                  justifyContent={'flex-start'}
                  display={'inline-flex'}
                  alignItems={'center'}
                >
                  <PictureInPictureAltOutlined sx={{ marginLeft: 1, marginRight: 2 }}/>
                  <Typography variant={'body2'}>
                    {`${dock.activeCineroom.name} > ${dock.activeStage.name}`}
                  </Typography>
                </Box>
                <Tooltip title={'Set default...'}>
                  <IconButton
                    onClick={handleClickDefault}
                    sx={{
                      marginRight: '-10px',
                    }}
                  >
                    <PushPinOutlined fontSize={'small'}/>
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
                  startIcon={<LogoutOutlined fontSize="small"/>}
                  onClick={handleClickLogout}
                  sx={{ padding: 2 }}>
                  Logout
                </Button>
              </Box>
            </>
          )}
          {(!auth || !auth.loggedIn) && (
            <>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  marginLeft: 2,
                  marginRight: 4,
                  marginTop: 2,
                  marginBottom: 2,
                }}
                alignItems={'center'}
              >
                <PersonOutline sx={{ marginLeft: 1 }}/>
                <Typography variant={'body2'}>
                  Please Login.
                </Typography>
              </Stack>
              <Divider/>
              <Box
                sx={{
                  width: '240px',
                }}
              >
                <Button
                  fullWidth
                  color="inherit"
                  startIcon={<LoginOutlined fontSize="small"/>}
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
      </>
    );
  };

export default WorkspaceView;
