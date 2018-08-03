export default {
      tags: [
        { name: "tricking", index: 0, color: "#00caff" },
        { name: "training", index: 1, color: "#bada55" },
        { name: "js", index: 2, color: "#dd0048" },
        { name: "weight", index: 3, color: "#11dd99" },
        { name: "running", index: 4, color: "#99cdcd" }
      ],
      tasks: [
        {
          index: 0,
          projectIndex: 0,
          description: "000",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "14:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 1,
          projectIndex: 0,
          description: "111",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "15:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 2,
          projectIndex: 1,
          description: "222",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "12:30" },
          end: { date: "21.10.2017", time: "13:30" },
          tagsIndexes: [0, 1, 2, 3]
        },
        {
          index: 3,
          projectIndex: 1,
          description: "333",
          totalMinutes: 5,
          start: { date: "21.10.2017", time: "13:30" },
          end: { date: "21.10.2017", time: "13:35" },
          tagsIndexes: [0, 1, 2, 3]
        }
      ],
      projects: [
        {
          name: "Vue.js",
          description: "vue learning process",
          time: 0,
          index: 0,
          color: "#fcc600"
        },
        {
          name: "Rx.js",
          description: "reactive learning",
          time: 0,
          index: 1,
          color: "#09fccf"
        }
      ],
      lastIndex: 1,
      error: null,
      isLoading: false,
      isLoggedIn: false,
      user: { email: "ihavenonameTaras@gmail.com" }
    };