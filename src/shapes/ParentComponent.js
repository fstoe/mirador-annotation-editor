import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layer } from 'react-konva';


import Rectangle from './Rectangle';
import EllipseNode from './EllipseNode';
import TextNode from './TextNode';
import LineNode from './LineNode';
import ArrowNode from './ArrowNode';
import Polygon from './Polygon';
import Freehand from './Freehand';
import ImageShape from './Image';

/** Loads Konva and display in function of their type */

function ParentComponent({
  shapes, onShapeClick, selectedShapeId, activeTool,
  scale, width, height,onTransformEnd,handleDragEnd
}) {
  // TODO Simplify these state
  const [selectedShape, setSelectedShape] = useState(null);

  useEffect(() => {
    if (shapes.length === 1 && !selectedShapeId) {
      setSelectedShape(shapes[0]);
    }
  }, [shapes, selectedShapeId]);

  useEffect(() => {

  }, [selectedShape]);

  /**
    * Triggered onShapeClick provided function when a shape is clicked
    * @param {object} shape
    */
  const handleShapeClick = (shape) => {
    onShapeClick(shape);
    setSelectedShape(shape);


  };

  return (
    <Layer
    width={width}
    height={height}
    scaleX={scale}
    scaleY={scale}
    
    >
      {shapes.map((shape, i) => {
     
        const isSelected = selectedShapeId === shape.id;
        switch (shape.type) {
          case 'rectangle':
            return (
              <Rectangle
                {...{
                  ...shape, activeTool, isSelected, onShapeClick: handleShapeClick, shape,
                  onTransformEnd,handleDragEnd
                }}
                key={i}
              />
            );
          case 'text':
            return (
              <TextNode
                {...{
                  ...shape, activeTool, isSelected, onShapeClick: handleShapeClick, shape,
                  onTransformEnd,handleDragEnd
                }}
                key={i}
              />
            );
          case 'ellipse':
            return (
              <EllipseNode
                {...{
                  ...shape, activeTool, isSelected, onShapeClick: handleShapeClick, shape,
                  onTransformEnd,handleDragEnd
                }}
                key={i}
              />
            );
          case 'freehand':
            return (
              <Freehand
                {...{
                  ...shape, activeTool, isSelected, onShapeClick: handleShapeClick, shape,
                  onTransformEnd,handleDragEnd
                }}
                key={i}
              />
            );
          case 'polygon':
            return (
              <Polygon
                {...{
                  ...shape, activeTool, isSelected, onShapeClick: handleShapeClick, shape,
                  onTransformEnd,handleDragEnd
                }}
                key={i}
              />
            );

            case 'arrow':
              return (
                <ArrowNode
                  {...{
                    ...shape,
                     activeTool, 
                     isSelected, 
                     onShapeClick: handleShapeClick,
                     shape,
                     onTransformEnd,handleDragEnd

                  }}
                  key={i}
                />
              );
             
          case 'image':
            return (
              <ImageShape
                {...{
                  ...shape, activeTool, isSelected, onShapeClick: handleShapeClick, shape,
                  onTransformEnd,handleDragEnd,
                  src: shape.src,
                }}
                key={i}
              />
            );
          default:
            return null;
        }
      })}
    </Layer>
  );
}

ParentComponent.propTypes = {
  shapes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShapeClick: PropTypes.func.isRequired,
  selectedShapeIdProp: PropTypes.string,
  activeTool: PropTypes.string.isRequired,
};

ParentComponent.defaultProps = {
  selectedShapeIdProp: null,
};

export default ParentComponent;
