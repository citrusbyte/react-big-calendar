import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import cn from 'classnames';

import { accessor } from '../../utils/propTypes';
import DraggableEventWrapper from './DraggableEventWrapper';
import { DayWrapper, DateCellWrapper } from './backgroundWrapper';

let html5Backend;

try {
  html5Backend = require('react-dnd-html5-backend');
} catch (err) {
  /* optional dep missing */
}

export default function withDragAndDrop(Calendar, { backend = html5Backend } = {}) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']).isRequired,
      components: PropTypes.object,
    };
    getChildContext() {
      return {
        onEventDrop: this.props.onEventDrop,
        onEventResize: this.props.onEventResize,
        onOutsideEventDrop: this.props.onOutsideEventDrop,
        startAccessor: this.props.startAccessor,
        endAccessor: this.props.endAccessor,
      };
    }

    constructor(...args) {
      super(...args);
      this.state = { isDragging: false };
    }

    componentWillMount() {
      let monitor = this.context.dragDropManager.getMonitor();
      this.monitor = monitor;
      this.unsubscribeToStateChange = monitor.subscribeToStateChange(this.handleStateChange);
    }

    componentWillUnmount() {
      this.monitor = null;
      this.unsubscribeToStateChange();
    }

    handleStateChange = () => {
      const isDragging = !!this.monitor.getItem();

      if (isDragging !== this.state.isDragging) {
        setTimeout(() => this.setState({ isDragging }));
      }
    };

    render() {
      const { selectable, components, ...props } = this.props;

      delete props.onEventDrop;
      delete props.onEventResize;
      delete props.onOutsideEventDrop;

      props.selectable = selectable ? 'ignoreEvents' : false;

      props.className = cn(
        props.className,
        'rbc-addons-dnd',
        this.state.isDragging && 'rbc-addons-dnd-is-dragging',
      );

      props.components = {
        ...components,
        eventWrapper: DraggableEventWrapper,
        dateCellWrapper: DateCellWrapper,
        dayWrapper: DayWrapper,
      };

      return <Calendar {...props} />;
    }
  }

  DragAndDropCalendar.propTypes = {
    endAccessor: accessor,
    onEventDrop: PropTypes.func.isRequired,
    onEventResize: PropTypes.func,
    onOutsideEventDrop: PropTypes.func,
    resizable: PropTypes.bool,
    startAccessor: accessor,
  };

  DragAndDropCalendar.defaultProps = {
    startAccessor: 'start',
    endAccessor: 'end',
  };

  DragAndDropCalendar.contextTypes = {
    dragDropManager: PropTypes.object,
  };

  DragAndDropCalendar.childContextTypes = {
    endAccessor: accessor,
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    onOutsideEventDrop: PropTypes.func,
    startAccessor: accessor,
  };

  if (backend === false) {
    return DragAndDropCalendar;
  } else {
    return DragDropContext(backend)(DragAndDropCalendar);
  }
}
