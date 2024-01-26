import {Button, ClickAwayListener, Divider, Grid, MenuItem, MenuList, Paper, Popover} from '@mui/material';
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
import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StrokeColorIcon from '@mui/icons-material/BorderColor';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ClosedPolygonIcon from '@mui/icons-material/ChangeHistory';
import OpenPolygonIcon from '@mui/icons-material/ShowChart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PropTypes from 'prop-types';
import ImageFormField from './ImageFormField';
import CursorIcon from "../icons/Cursor";
import {styled} from "@mui/material/styles";
import {SketchPicker} from "react-color";



const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
  '&:first-of-type': {
    borderRadius: theme.shape.borderRadius,
  },
  '&:not(:first-of-type)': {
    borderRadius: theme.shape.borderRadius,
  },
  border: 'none',
  margin: theme.spacing(0.5),
}));

const StyledDivider = styled(Divider)(({theme}) => ({
  margin: theme.spacing(1, 0.5),
}));

function AnnotationFormDrawing(props) {
  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="overline">
              Drawing
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <StyledToggleButtonGroup
                value={props.value}
                exclusive
                onChange={props.onChange}
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
              <StyledDivider
                flexItem
                orientation="vertical"
              />
              <StyledToggleButtonGroup
                value={props.value}
                exclusive
                onChange={props.onChange}
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
            </Paper>
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
                onClick={props.onClick}
              >
                <StrokeColorIcon style={{ fill: props.fill }} />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton
                value="strokeColor"
                aria-label="select line weight"
                onClick={props.onClick1}
              >
                <LineWeightIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton
                value="fillColor"
                aria-label="select color"
                onClick={props.onClick}
              >
                <FormatColorFillIcon style={{ fill: props.fill1 }} />
                <ArrowDropDownIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <StyledDivider flexItem orientation="vertical" />
            { /* close / open polygon mode only for freehand drawing mode. */
          props.activeTool === 'freehand'
            ? (
              <ToggleButtonGroup
                size="small"
                value={props.value}
                onChange={props.onChange}
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
          <Grid item xs={8} style={{ marginBottom: 10 }}>
            <ImageFormField xs={8} value={props.value1} onChange={props.onChange1} />
          </Grid>
          <Grid item xs={4} style={{ marginBottom: 10 }}>
            <Button variant="contained" onClick={props.onClick2}>
              <AddPhotoAlternateIcon />
            </Button>
          </Grid>
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
            // eslint-disable-next-line react/destructuring-assignment
            color={state[currentColorType] || {}}
            onChangeComplete={updateStrokeColor}
        />
      </Popover>
    </div>
  );
}

AnnotationFormDrawing.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  fill: PropTypes.string,
  onClick1: PropTypes.func,
  fill1: PropTypes.string,
  activeTool: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  value1: PropTypes.shape({ id: PropTypes.any }),
  onChange1: PropTypes.func,
  onClick2: PropTypes.func,
};

export default AnnotationFormDrawing;
