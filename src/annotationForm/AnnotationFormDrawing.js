import {
  Button, ClickAwayListener, Divider, Grid, MenuItem, MenuList, Paper, Popover,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import TitleIcon from '@mui/icons-material/Title';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import RectangleIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';
import PolygonIcon from '@mui/icons-material/Timeline';
import GestureIcon from '@mui/icons-material/Gesture';
import React, { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StrokeColorIcon from '@mui/icons-material/BorderColor';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ClosedPolygonIcon from '@mui/icons-material/ChangeHistory';
import OpenPolygonIcon from '@mui/icons-material/ShowChart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { SketchPicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import CursorIcon from '../icons/Cursor';
import ImageFormField from './ImageFormField';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '&:first-of-type': {
    borderRadius: theme.shape.borderRadius,
  },
  '&:not(:first-of-type)': {
    borderRadius: theme.shape.borderRadius,
  },
  border: 'none',
  margin: theme.spacing(0.5),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(1, 0.5),
}));

const StyledGridImageURL = styled(Grid)(({ theme }) => ({
  display:'flex',
}));

/** All the stuff to manage to choose the drawing tool */
function AnnotationFormDrawing({ updateToolState, toolState, handleImgChange }) {
  /** */
  const openChooseLineWeight = (e) => {
    updateToolState({
      ...toolState,
      lineWeightPopoverOpen: true,
      popoverLineWeightAnchorEl: e.currentTarget,
    });
  };

  /** Close color popover window */
  const closeChooseColor = (e) => {
    updateToolState({
      ...toolState,
      colorPopoverOpen: false,
      currentColorType: null,
      popoverAnchorEl: null,
    });
  };

  /** Update color : fillColor or strokeColor */
  const updateStrokeColor = (color) => {
    updateToolState({
      ...toolState,
      [toolState.currentColorType]: color.hex,
    });
  };
  /** */
  const openChooseColor = (e) => {
    updateToolState({
      ...toolState,
      colorPopoverOpen: true,
      currentColorType: e.currentTarget.value,
      popoverAnchorEl: e.currentTarget,
    });
  };

  /** */
  const handleCloseLineWeight = (e) => {
    updateToolState({
      ...toolState,
      lineWeightPopoverOpen: false,
      popoverLineWeightAnchorEl: null,
    });
  };

  /** */
  const handleLineWeightSelect = (e) => {
    updateToolState({
      ...toolState,
      lineWeightPopoverOpen: false,
      popoverLineWeightAnchorEl: null,
      strokeWidth: e.currentTarget.value,
    });
  };

  const changeTool = (e, tool) => {
    updateToolState({
      ...toolState,
      activeTool: tool,
    });
  };

  const changeClosedMode = (e) => {
    updateToolState({
      ...toolState,
      closedMode: e.currentTarget.value,
    });
  };

  /**
   *
   */
  const addImage = () => {
    const data = {
      id: image?.id,
      uuid: uuidv4(),
    };

    updateToolState({
      ...toolState,
      image: { id: null },
      imageEvent: data,
    });
  };

  const {
    activeTool,
    closedMode,
    image,
    lineWeightPopoverOpen,
    popoverLineWeightAnchorEl,
    fillColor,
    strokeColor,
    strokeWidth,
    colorPopoverOpen,
    popoverAnchorEl,
    currentColorType,
  } = toolState;

  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="overline">
              Overlay
            </Typography>
          </Grid>
          <Grid item xs={12}>
              <StyledToggleButtonGroup
                value={activeTool} // State or props ?
                exclusive
                onChange={changeTool}
                aria-label="tool selection"
                size="small"
              >
                <ToggleButton value="text" aria-label="select text">
                  <TitleIcon />
                </ToggleButton>
                <ToggleButton value="cursor" aria-label="select cursor">
                  <CursorIcon />
                </ToggleButton>
                <ToggleButton value="edit" aria-label="select cursor">
                  <FormatShapesIcon />
                </ToggleButton>
                <ToggleButton value="debug" aria-label="select cursor">
                  <AccessibilityNewIcon />
                </ToggleButton>
              </StyledToggleButtonGroup>
              <StyledToggleButtonGroup
                value={activeTool} // State or props ?
                exclusive
                onChange={changeTool}
                aria-label="tool selection"
                size="small"
              >
                <ToggleButton value="arrow" aria-label="add an arrow">
                  <ArrowOutwardIcon />
                </ToggleButton>
                <ToggleButton value="rectangle" aria-label="add a rectangle">
                  <RectangleIcon />
                </ToggleButton>
                <ToggleButton value="ellipse" aria-label="add a circle">
                  <CircleIcon />
                </ToggleButton>
                <ToggleButton value="polygon" aria-label="add a polygon">
                  <PolygonIcon />
                </ToggleButton>
                <ToggleButton value="freehand" aria-label="free hand polygon">
                  <GestureIcon />
                </ToggleButton>
              </StyledToggleButtonGroup>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="overline">
              Style
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              aria-label="style selection"
              size="small"
            >
              <ToggleButton
                value="strokeColor"
                aria-label="select color"
                onClick={openChooseColor}
              >
                <StrokeColorIcon style={{ fill: strokeColor }} />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton
                value="strokeColor"
                aria-label="select line weight"
                onClick={openChooseLineWeight}
              >
                <LineWeightIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton
                value="fillColor"
                aria-label="select color"
                onClick={openChooseColor}
              >
                <FormatColorFillIcon style={{ fill: fillColor }} />
                <ArrowDropDownIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <StyledDivider flexItem orientation="vertical" />
            { /* close / open polygon mode only for freehand drawing mode. */
          activeTool === 'freehand'
            ? (
              <ToggleButtonGroup
                size="small"
                value={closedMode}
                onChange={changeClosedMode}
              >
                <ToggleButton value="closed">
                  <ClosedPolygonIcon />
                </ToggleButton>
                <ToggleButton value="open">
                  <OpenPolygonIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            )
            : null
        }
          </Grid>
        </Grid>
        <Grid container>
          <StyledGridImageURL item xs={8}>
            <ImageFormField xs={8} value={image} onChange={handleImgChange}/>
            <Button variant="contained" onClick={addImage}>
              <AddPhotoAlternateIcon />
            </Button>
          </StyledGridImageURL>
        </Grid>
      </div>
      <Popover
        open={lineWeightPopoverOpen}
        anchorEl={popoverLineWeightAnchorEl}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleCloseLineWeight}>
            <MenuList autoFocus role="listbox">
              {[1, 3, 5, 10, 50].map((option, index) => (
                <MenuItem
                  key={option}
                  onClick={handleLineWeightSelect}
                  value={option}
                  selected={option == strokeWidth}
                  role="option"
                  aria-selected={option == strokeWidth}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popover>
      <Popover
        open={colorPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={closeChooseColor}
      >
        <SketchPicker
          color={toolState[currentColorType]}
          onChangeComplete={updateStrokeColor}
        />
      </Popover>
    </div>
  );
}

AnnotationFormDrawing.propTypes = {
  handleImgChange: PropTypes.func,
  toolState: PropTypes.object,
  updateToolState: PropTypes.func,
};

export default AnnotationFormDrawing;
