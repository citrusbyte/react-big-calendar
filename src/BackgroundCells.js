import PropTypes from 'prop-types';
import React from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import dates from './utils/dates';
import { segStyle } from './utils/eventLevels';
import { notify } from './utils/helpers';
import { elementType } from './utils/propTypes';
import { dateCellSelection, slotWidth, getCellAtX, pointInBox } from './utils/selection';
import Selection, { getBoundsForNode, isEvent } from './Selection';
import { RIGHT_CLICK_DAY_CELL } from './ContextMenuTypes';

class BackgroundCells extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    cellWrapperComponent: elementType,
    container: PropTypes.func,
    selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
    longPressThreshold: PropTypes.number,

    onSelectSlot: PropTypes.func.isRequired,
    onSelectEnd: PropTypes.func,
    onSelectStart: PropTypes.func,

    range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    rtl: PropTypes.bool,
    type: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selecting: false,
    };
  }

  componentDidMount() {
    this.props.selectable && this._selectable();
  }

  componentWillUnmount() {
    this._teardownSelectable();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();

    if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
  }

  render() {
    let { range, cellWrapperComponent: Wrapper, date: currentDate } = this.props;
    let { selecting, startIdx, endIdx, click } = this.state;

    return (
      <div className="rbc-row-bg">
        {range.map((date, index) => {
          let selected = selecting && index >= startIdx && index <= endIdx;
          return (
            <Wrapper key={index} value={date} range={range}>
              <div
                className="rbc-day-bg-wrapper"
                style={{ ...segStyle(1, range.length), height: '100%' }}
              >
                <ContextMenuTrigger
                  collect={props => ({ ...props, date })}
                  holdToDisplay={-1}
                  id={RIGHT_CLICK_DAY_CELL}
                >
                  <div
                    style={{ height: '100%' }}
                    className={cn('rbc-day-bg', {
                      'rbc-today': dates.isToday(date),
                      'rbc-selected-cell': selected,
                      'rbc-selected-cell-click': selected && click,
                      'rbc-off-range-bg': dates.month(currentDate) !== dates.month(date),
                    })}
                  />
                </ContextMenuTrigger>
              </div>
            </Wrapper>
          );
        })}
      </div>
    );
  }

  _selectable() {
    let node = findDOMNode(this);
    let selector = (this._selector = new Selection(this.props.container, {
      longPressThreshold: this.props.longPressThreshold,
    }));

    selector.on('selecting', box => {
      let { range, rtl } = this.props;

      let startIdx = -1;
      let endIdx = -1;

      if (!this.state.selecting) {
        notify(this.props.onSelectStart, [box]);
        this._initial = { x: box.x, y: box.y };
      }
      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node);

        ({ startIdx, endIdx } = dateCellSelection(this._initial, nodeBox, box, range.length, rtl));
      }

      this.setState({
        startIdx,
        endIdx,
        selecting: true,
        click: false,
      });
    });

    selector.on('beforeSelect', box => {
      this.setState({ selecting: false, click: false });
      if (this.props.selectable !== 'ignoreEvents') return;
      return !isEvent(findDOMNode(this), box);
    });

    selector.on('rightclick', point => {
      this.setState({ selecting: false, click: false });
      let rowBox = getBoundsForNode(node);
      let { range, rtl } = this.props;

      if (pointInBox(rowBox, point)) {
        let width = slotWidth(getBoundsForNode(node), range.length);
        let currentCell = getCellAtX(rowBox, point.x, width, rtl, range.length);

        this._rightClickSlot({
          startIdx: currentCell,
          endIdx: currentCell,
          action: 'click',
        });
      }
      this._initial = {};
    });

    selector.on('click', point => {
      this.setState({ selecting: false, click: false });
      if (!isEvent(findDOMNode(this), point)) {
        let rowBox = getBoundsForNode(node);
        let { range, rtl } = this.props;

        if (pointInBox(rowBox, point)) {
          let width = slotWidth(getBoundsForNode(node), range.length);
          let currentCell = getCellAtX(rowBox, point.x, width, rtl, range.length);

          this._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell,
            action: 'click',
          });
        }
      }

      this._initial = {};
    });

    selector.on('select', () => {
      this._selectSlot({ ...this.state, action: 'select' });
      this._initial = {};
      notify(this.props.onSelectEnd, [this.state]);
    });
  }

  _teardownSelectable() {
    if (!this._selector) return;
    this._selector.teardown();
    this._selector = null;
  }

  _selectSlot({ endIdx, startIdx, action }) {
    if (endIdx !== -1 && startIdx !== -1 && this.props.onSelectSlot) {
      this.props.onSelectSlot({
        start: startIdx,
        end: endIdx,
        action,
      });
      this.setState({
        startIdx,
        endIdx,
        selecting: true,
        click: action === 'click',
      });
    }
  }

  _rightClickSlot({ endIdx, startIdx, action }) {
    if (endIdx !== -1 && startIdx !== -1 && this.props.onRightClickSlot) {
      this.props.onRightClickSlot({
        start: startIdx,
        end: endIdx,
        action,
      });
      this.setState({
        startIdx,
        endIdx,
        selecting: true,
        click: action === 'click',
      });
    }
  }
}

export default BackgroundCells;
