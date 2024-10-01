export const drivers = ["1", "2", "3"];

export const sessions_cols = [
  { accessor: "len_session", label: "length of session (min)" },
  { accessor: "days_ago", label: "days ago" },
  { accessor: "avg_speed", label: "average speed (mph)" },
  { accessor: "scr_change", label: "driver score change" },
];

export const sessions_rows = [
  [
    {
      id: 1,
      len_session: 54,
      days_ago: 21,
      avg_speed: 45,
      scr_change: 2,
    },

    {
      id: 2,
      len_session: 200,
      days_ago: 100,
      avg_speed: 70,
      scr_change: 0,
    },
  ],

  [
    {
      id: 3,
      len_session: 3,
      days_ago: 6,
      avg_speed: 10,
      scr_change: 20,
    },

    {
      id: 4,
      len_session: 14,
      days_ago: 1,
      avg_speed: 200,
      scr_change: -6,
    },
  ],

  [
    {
      id: 5,
      len_session: 132,
      days_ago: 51,
      avg_speed: 40,
      scr_change: 23,
    },

    {
      id: 6,
      len_session: 90,
      days_ago: 365,
      avg_speed: 96,
      scr_change: -30,
    },

    {
      id: 7,
      len_session: 54,
      days_ago: 13,
      avg_speed: 20,
      scr_change: 6,
    },
  ],
];

export const incidents_rows = [
  {
    id: 1,
    date: "date1",
    days_ago: 21,
    incident: "Acceleration",
    scr_change: -2,
  },

  {
    id: 2,
    date: "date2",
    days_ago: 18,
    incident: "Sick drift",
    scr_change: 50,
  },

  {
    id: 3,
    date: "date3",
    days_ago: 66,
    incident: "Harsh breaking",
    scr_change: -20,
  },
];
