import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextFormSection from './TextFormSection';
import TargetFormSection from './TargetFormSection';
import ManifestNetworkFormSection from './ManifestNetworkFormSection';
import uuid from 'draft-js/lib/uuid';
import { maeTargetToIiifTarget, template } from '../AnnotationFormUtils';
import AnnotationFormFooter from './AnnotationFormFooter';

/** Form part for edit annotation content and body */
function NetworkCommentTemplate(
  {
    annotation,
    currentTime,
    manifestType,
    setCurrentTime,
    setSeekTo,
    windowId,
    saveAnnotation,
    closeFormCompanionWindow,
    canvases,
  },
) {


  let maeAnnotation = annotation;

  if (!maeAnnotation.id) {
    // If the annotation does not have maeData, the annotation was not created with mae
    maeAnnotation = {
      body: {
        id: uuid(),
        type: 'TextualBody',
        value: '',
      },
      maeData: {
        manifestNetwork: '',
        target: null,
        templateType: template.MANIFEST_TYPE,
      },
      motivation: 'commenting',
      target: null,
    };
  }

  const [annotationState, setAnnotationState] = useState(maeAnnotation);


  const updateManifestNetwork = (manifestNetwork) => {
    // TODO probably can be simplified
    const newMaeData = annotationState.maeData;
    newMaeData.manifestNetwork = manifestNetwork;
    setAnnotationState({
      ...annotationState,
      maeData: newMaeData,
    });
  };

  /**
   * Update the annotation's Body
   * */
  const updateAnnotationTextBody = (newTextValue) => {
    const newBody = annotationState.body;
    newBody.value = newTextValue;
    setAnnotationState({
      ...annotationState,
      body: newBody,
    });
  };

  const updateTargetState = (target) => {
    const newMaeData = annotationState.maeData;
    newMaeData.target = target;
    setAnnotationState({
      ...annotationState,
      maeData: newMaeData,
    });
  };

  const saveFunction = () => {
    canvases.forEach(async (canvas) => {
      // Adapt target to the canvas
      // eslint-disable-next-line no-param-reassign
      annotationState.target = maeTargetToIiifTarget(annotationState.maeData.target, canvas.id);
      saveAnnotation(annotationState, canvas.id);
    });
    closeFormCompanionWindow();
  };

  return (
    <div style={{ padding: '5px' }}>
      <ManifestNetworkFormSection
        manifestNetwork={annotation.maeData.manifestNetwork}
        onChange={updateManifestNetwork}
      />
      <TextFormSection
        annoHtml={annotationState.body.value}
        updateAnnotationBody={updateAnnotationTextBody}
      />
      <TargetFormSection
        currentTime={currentTime}
        manifestType={manifestType}
        onChangeTarget={updateTargetState}
        setCurrentTime={setCurrentTime}
        setSeekTo={setSeekTo}
        spatialTarget={false}
        target={annotationState.maeData.target}
        timeTarget
        windowId={windowId}
      />
      <AnnotationFormFooter
        closeFormCompanionWindow={closeFormCompanionWindow}
        saveAnnotation={saveFunction}
      />
    </div>
  );
}

NetworkCommentTemplate.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  annotation: PropTypes.object.isRequired,
  currentTime: PropTypes.number.isRequired,
  manifestType: PropTypes.string.isRequired,
  setCurrentTime: PropTypes.func.isRequired,
  setSeekTo: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  saveAnnotation: PropTypes.func.isRequired,
  closeFormCompanionWindow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  canvases: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NetworkCommentTemplate;
