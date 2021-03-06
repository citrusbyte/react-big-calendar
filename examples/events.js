import cuid from 'cuid';

export default [
  {
    id: cuid(),
    title: 'All Day Event',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
    weight: 100,
  },
  {
    id: cuid(),
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
    styles: {
      backgroundColor: '#d4d4d4',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: '0',
      color: 'black',
      fontFamily: 'Arial',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    weight: 200,
  },
  {
    id: cuid(),
    title: 'All Day Event',
    allDay: true,
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
    weight: 200,
  },
  {
    id: cuid(),
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
    weight: 300,
  },
  {
    id: cuid(),
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
    weight: 400,
  },
  {
    id: cuid(),
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
    weight: 100,
  },
  {
    id: cuid(),
    title: 'Some Event 2',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
    weight: 200,
  },
  {
    id: cuid(),
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people',
    weight: 100,
  },
  {
    id: cuid(),
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
    weight: 200,
  },
  {
    id: cuid(),
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
    weight: 300,
  },
  {
    id: cuid(),
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
    weight: 400,
  },
  {
    id: cuid(),
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
    weight: 500,
  },
  {
    id: cuid(),
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
    weight: 600,
  },
  {
    id: cuid(),
    title: 'Birthday Party',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
    weight: 1200,
  },
  {
    id: cuid(),
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
    weight: 1300,
  },
  {
    id: cuid(),
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
    weight: 1400,
  },
];
