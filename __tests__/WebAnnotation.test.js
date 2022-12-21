import WebAnnotation from '../src/WebAnnotation';

/** */
function createSubject(args = {}) {
  return new WebAnnotation({
    body: 'body',
    canvasId: 'canvasId',
    fragsel: { t: '5,10', xywh: 'xywh' },
    id: 'id',
    svg: 'svg',
    tags: ['tags'],
    ...args,
  });
}

describe('WebAnnotation', () => {
  let subject = createSubject();
  describe('constructor', () => {
    it('sets instance accessors', () => {
      ['body', 'canvasId', 'id', 'svg'].forEach((prop) => {
        expect(subject[prop]).toBe(prop);
      });
      expect(subject.fragsel).toStrictEqual({ t: '5,10', xywh: 'xywh' });
    });
  });
  describe('target', () => {
    it('with svg and xywh', () => {
      expect(subject.target()).toEqual({
        selector: [
          {
            type: 'SvgSelector',
            value: 'svg',
          },
          {
            type: 'FragmentSelector',
            value: 't=5,10&xywh=xywh',
          },
        ],
        source: 'canvasId',
      });
    });
    it('with svg only', () => {
      subject = createSubject({ fragsel: null });
      expect(subject.target()).toEqual({
        selector: {
          type: 'SvgSelector',
          value: 'svg',
        },
        source: 'canvasId',
      });
    });
    it('with time interval only', () => {
      subject = createSubject({ fragsel: { t: '5,10' }, svg: null });
      expect(subject.target()).toEqual({
        selector: {
          type: 'FragmentSelector',
          value: 't=5,10',
        },
        source: 'canvasId',
      });
    });
    it('with time interval only - xywh present but null', () => {
      subject = createSubject({ fragsel: { t: '5,10', xywh: null }, svg: null });
      expect(subject.target()).toEqual({
        selector: {
          type: 'FragmentSelector',
          value: 't=5,10',
        },
        source: 'canvasId',
      });
    });
    it('with xywh only', () => {
      subject = createSubject({ fragsel: { xywh: 'xywh' }, svg: null });
      expect(subject.target()).toEqual({
        selector: {
          type: 'FragmentSelector',
          value: 'xywh=xywh',
        },
        source: 'canvasId',
      });
    });
    it('with xywh only - time interval present but null', () => {
      subject = createSubject({ fragsel: { t: null, xywh: 'xywh' }, svg: null });
      expect(subject.target()).toEqual({
        selector: {
          type: 'FragmentSelector',
          value: 'xywh=xywh',
        },
        source: 'canvasId',
      });
    });
    it('with no xywh or svg', () => {
      subject = createSubject({ fragsel: null, svg: null });
      expect(subject.target()).toBe('canvasId');
    });
  });
  describe('body', () => {
    it('with text and tags', () => {
      expect(subject.createBody()).toEqual([
        {
          type: 'TextualBody',
          value: 'body',
        },
        {
          purpose: 'tagging',
          type: 'TextualBody',
          value: 'tags',
        },
      ]);
    });
    it('with text only', () => {
      subject = createSubject({ tags: null });
      expect(subject.createBody()).toEqual({
        type: 'TextualBody',
        value: 'body',
      });
    });
    it('with tags only', () => {
      subject = createSubject({ body: null });
      expect(subject.createBody()).toEqual({
        purpose: 'tagging',
        type: 'TextualBody',
        value: 'tags',
      });
    });
  });
  describe('toJson', () => {
    it('generates a WebAnnotation', () => {
      expect(subject.toJson().type).toBe('Annotation');
    });
  });
});
