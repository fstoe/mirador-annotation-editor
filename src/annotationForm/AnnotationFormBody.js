import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  TEMPLATE,
} from './AnnotationFormUtils';
import TextCommentTemplate from './TextCommentTemplate';
import ImageCommentTemplate from './ImageCommentTemplate';
import NetworkCommentTemplate from './NetworkCommentTemplate';
import DrawingTemplate from './DrawingTemplate';
import IIIFTemplate from './IIIFTemplate';
import TaggingTemplate from './TaggingTemplate';

import './debug.css';
import { playerReferences } from '../playerReferences';
import { AdvancedAnnotationEditor } from './AdvancedAnnotationEditor';

/**
 * This function contain the logic for loading annotation and render proper template type
 * * */
export default function AnnotationFormBody(
  {
    annotation,
    canvases,
    closeFormCompanionWindow,
    debugMode,
    saveAnnotation,
    templateType,
    windowId,
  },
) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <Grid container direction="column">
      { !showAdvanced && (
        <TemplateContainer item>
          {
          templateType.id === TEMPLATE.TEXT_TYPE && (
            <TextCommentTemplate
              annotation={annotation}
              closeFormCompanionWindow={closeFormCompanionWindow}
              saveAnnotation={saveAnnotation}
              windowId={windowId}
            />
          )
        }
          {
          templateType.id === TEMPLATE.IMAGE_TYPE && (
          <ImageCommentTemplate
            annotation={annotation}
            closeFormCompanionWindow={closeFormCompanionWindow}
            saveAnnotation={saveAnnotation}
            windowId={windowId}
          />
          )
        }
          {
          templateType.id === TEMPLATE.KONVA_TYPE && (
            <DrawingTemplate
              annotation={annotation}
              closeFormCompanionWindow={closeFormCompanionWindow}
              saveAnnotation={saveAnnotation}
              windowId={windowId}
            />
          )
        }
          {
          templateType.id === TEMPLATE.MANIFEST_TYPE && (
            <NetworkCommentTemplate
              annotation={annotation}
              closeFormCompanionWindow={closeFormCompanionWindow}
              saveAnnotation={saveAnnotation}
              windowId={windowId}
            />
          )
        }
          {
          templateType.id === TEMPLATE.IIIF_TYPE && (
            <IIIFTemplate
              annotation={annotation}
              closeFormCompanionWindow={closeFormCompanionWindow}
              saveAnnotation={saveAnnotation}
              canvases={canvases}
            />
          )
        }
            {templateType.id === TEMPLATE.TAGGING_TYPE && (
            <TaggingTemplate
              annotation={annotation}
              closeFormCompanionWindow={closeFormCompanionWindow}
              saveAnnotation={saveAnnotation}
              windowId={windowId}
            />
            )}
        </TemplateContainer>
      )}
      <Grid item>
        {showAdvanced && (
          <AdvancedAnnotationEditor
            value={annotation}
            onChange={(updatedAnnotation) => {
              // eslint-disable-next-line no-param-reassign
              annotation = updatedAnnotation;
            }}
            closeFormCompanionWindow={closeFormCompanionWindow}
            saveAnnotation={saveAnnotation}
          />
        )}
      </Grid>
      { debugMode && (
      <>
        <Typography>
          { playerReferences.getMediaType() }
          {' '}
        </Typography>
        <Typography>
          Scale
          {' '}
          { playerReferences.getScale() }
        </Typography>
        <Typography>
          Zoom
          {' '}
          { playerReferences.getZoom() }
          {' '}
        </Typography>
        <Typography>
          Image true Size
          {' '}
          { playerReferences.getWidth() }
          {' '}
          x
          {' '}
          { playerReferences.getHeight() }
        </Typography>
        <Typography>
          Container Size
          {' '}
          { playerReferences.getContainerWidth() }
          {' '}
          x
          {' '}
          { playerReferences.getContainerHeight() }
        </Typography>
        <Typography>
          Image Displayed
          {' '}
          { playerReferences.getDisplayedImageWidth() }
          {' '}
          x
          {' '}
          { playerReferences.getDisplayedImageHeight() }
        </Typography>
      </>
      )}
    </Grid>
  );
}

const TemplateContainer = styled(Grid)({
  margin: '0 10px',
});

AnnotationFormBody.propTypes = {
  annotation: PropTypes.shape({
    adapter: PropTypes.func,
    body: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
      }),
    ),
    defaults: PropTypes.objectOf(
      PropTypes.oneOfType(
        [PropTypes.bool, PropTypes.func, PropTypes.number, PropTypes.string],
      ),
    ),
    drawingState: PropTypes.string,
    manifestNetwork: PropTypes.string,
    target: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  canvases: PropTypes.object.isRequired,
  closeFormCompanionWindow: PropTypes.func.isRequired,
  debugMode: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  saveAnnotation: PropTypes.func.isRequired,
  templateType: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};
