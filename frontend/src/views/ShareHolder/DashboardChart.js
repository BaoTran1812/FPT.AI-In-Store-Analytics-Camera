import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
 
  Row,

} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import TableChart from "./TableChart";
import TrafficandSales from "./TrafficandSales";
import Demographics from "./Demographics";
import CustomerVisit from "./CustomerVisit";


const brandPrimary = getStyle("--primary");

const brandInfo = getStyle("--info");


const parseDomain = () => [
  0,
  Math.max(
    Math.max.apply(
      null,
      data01.map((entry) => entry.value)
    ),
    Math.max.apply(
      null,
      data02.map((entry) => entry.value)
    )
  ),
];

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent",
        },
      },
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,255,255,.3)",
      borderColor: "transparent",
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: "facebook" },
  { data: [1, 13, 9, 17, 34, 41, 38], label: "twitter" },
  { data: [78, 81, 80, 45, 34, 12, 40], label: "linkedin" },
  { data: [35, 23, 56, 22, 97, 23, 64], label: "google" },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: "rgba(255,255,255,.1)",
        borderColor: "rgba(255,255,255,.55)",
        pointHoverBackgroundColor: "#fff",
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "New Clients",
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Recurring Clients",
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: "Pageviews",
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: "Organic",
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: "CTR",
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: "Bounce Rate",
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        backgroundColor: "transparent",
        borderColor: variant ? variant : "#c2cfd6",
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

const data01 = [
  { hour: "8a", index: 1, value: 100 },
  { hour: "9a", index: 1, value: 150 },
  { hour: "10a", index: 1, value: 160 },
  { hour: "11a", index: 1, value: 170 },
  { hour: "12a", index: 1, value: 180 },
  { hour: "1p", index: 1, value: 144 },
  { hour: "2p", index: 1, value: 166 },
  { hour: "3p", index: 1, value: 145 },
  { hour: "4p", index: 1, value: 150 },
  { hour: "5p", index: 1, value: 170 },
  { hour: "6p", index: 1, value: 180 },
  { hour: "7p", index: 1, value: 165 },
  { hour: "8p", index: 1, value: 130 },
  { hour: "9p", index: 1, value: 140 },
];

const data02 = [
  { hour: "8a", index: 1, value: 100 },
  { hour: "9a", index: 1, value: 150 },
  { hour: "10a", index: 1, value: 160 },
  { hour: "11a", index: 1, value: 160 },
  { hour: "12a", index: 1, value: 180 },
  { hour: "1p", index: 1, value: 144 },
  { hour: "2p", index: 1, value: 166 },
  { hour: "3p", index: 1, value: 145 },
  { hour: "4p", index: 1, value: 150 },
  { hour: "5p", index: 1, value: 160 },
  { hour: "6p", index: 1, value: 180 },
  { hour: "7p", index: 1, value: 165 },
  { hour: "8p", index: 1, value: 130 },
  { hour: "9p", index: 1, value: 140 },
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.data1 = [];
    this.data8am = [];
    this.data9am = [];
    this.data10am = [];
    this.data11am = [];
    this.data12pm = [];
    this.data1pm = [];
    this.data2pm = [];
    this.data3pm = [];
    this.data4pm = [];
    this.data5pm = [];
    this.data6pm = [];
    this.data7pm = [];
    this.data8pm = [];
    this.data9pm = [];
    this.id_array = [];
    this.storeName = [];
    this.dataCustomer = [];
    this.colorVisit = "";
    this.colorDwelltime = "";
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.max_totalVisit = this.max_totalVisit.bind(this);
    this.parsingData = this.parsingData.bind(this);
    this.dataDemography = this.dataDemography.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      demography_data: "",
      data: "",
      new_data: "",
      copy_data: "",
      color: "",
      offset: 0,
      copy: "",
      perPage: 3,
      currentPage: 0,
      width: 0,
      height: 0,
      total_visit: "",
      under20: "",
      over20: "",
      over30: "",
      over40: "",
      num_male: "",
      num_female: "",
      num_unknown: "",
      data_customer: [],
      storeName: [],
      heatMap: [],
      id: "",
      store1: true,
      store2: false,
      store3: false,
      mainChart: {
        labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        datasets: [
          {
            label: "Number of visitors in the day",
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: this.data1,
          },
        ],
      },
      mainChartOpts: {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: "index",
          position: "nearest",
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return {
                backgroundColor:
                  chart.data.datasets[tooltipItem.datasetIndex].borderColor,
              };
            },
          },
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
                max: 1000,
              },
            },
          ],
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      },
    };
    this.updateData = this.updateData.bind(this);
    this.updateDemography = this.updateDemography.bind(this);
    this.merge_objects = this.merge_objects.bind(this);
    // this.handlePageClick = this.handlePageClick.bind(this);
    this.receivedData = this.receivedData.bind(this);
    this.max_averageDwelltime = this.max_averageDwelltime.bind(this);
    this.handleColorVisit = this.handleColorVisit.bind(this);
    this.handleColorDwelltime = this.handleColorDwelltime.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.separateCustomerVisit = this.separateCustomerVisit.bind(this);
    this.customerHeatMap = this.customerHeatMap.bind(this);
    this.getStoreName = this.getStoreName.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    // Your parse code
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    this.parsingData();
    this.dataDemography();
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  parsingData() {
    var csvFilePath = require("./Counting.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData,
    });
  }

  dataDemography() {
    var csvFilePath = require("./demography_HCM1215D3T2.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateDemography,
    });
  }

  updateDemography(result) {
    const data = result.data;
    this.setState({ demography_data: data });

    // Find total number of customers in different age range
    let cus_under20 = 0;

    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_under20 += parseInt(this.state.demography_data[i]["Under 20"]);
    }
    this.setState({ under20: cus_under20 });

    let cus_over20 = 0;
    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_over20 += parseInt(this.state.demography_data[i]["20-30"]);
    }
    this.setState({ over20: cus_over20 });

    let cus_over30 = 0;
    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_over30 += parseInt(this.state.demography_data[i]["30-40"]);
    }
    this.setState({ over30: cus_over30 });

    let cus_over40 = 0;
    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_over40 += parseInt(this.state.demography_data[i]["Above 40"]);
    }
    this.setState({ over40: cus_over40 });

    let cus_male = 0;
    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_male += parseInt(this.state.demography_data[i]["Male"]);
    }
    this.setState({ num_male: cus_male });

    let cus_female = 0;
    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_female += parseInt(this.state.demography_data[i]["Female"]);
    }
    this.setState({ num_female: cus_female });

    let cus_unknown = 0;
    for (let i = 0; i < this.state.demography_data.length; i++) {
      cus_unknown += parseInt(this.state.demography_data[i]["Unknown"]);
    }
    this.setState({ num_unknown: cus_unknown });

    let mon_8am = 0;
    let mon_9am = 0;
    let mon_10am = 0;
    let mon_11am = 0;
    let mon_12pm = 0;
    let mon_1pm = 0;
    let mon_2pm = 0;
    let mon_3pm = 0;
    let mon_4pm = 0;
    let mon_5pm = 0;
    let mon_6pm = 0;
    let mon_7pm = 0;
    let mon_8pm = 0;
    let mon_9pm = 0;

    let tue_8am = 0;
    let tue_9am = 0;
    let tue_10am = 0;
    let tue_11am = 0;
    let tue_12pm = 0;
    let tue_1pm = 0;
    let tue_2pm = 0;
    let tue_3pm = 0;
    let tue_4pm = 0;
    let tue_5pm = 0;
    let tue_6pm = 0;
    let tue_7pm = 0;
    let tue_8pm = 0;
    let tue_9pm = 0;

    let wed_8am = 0;
    let wed_9am = 0;
    let wed_10am = 0;
    let wed_11am = 0;
    let wed_12pm = 0;
    let wed_1pm = 0;
    let wed_2pm = 0;
    let wed_3pm = 0;
    let wed_4pm = 0;
    let wed_5pm = 0;
    let wed_6pm = 0;
    let wed_7pm = 0;
    let wed_8pm = 0;
    let wed_9pm = 0;

    let thur_8am = 0;
    let thur_9am = 0;
    let thur_10am = 0;
    let thur_11am = 0;
    let thur_12pm = 0;
    let thur_1pm = 0;
    let thur_2pm = 0;
    let thur_3pm = 0;
    let thur_4pm = 0;
    let thur_5pm = 0;
    let thur_6pm = 0;
    let thur_7pm = 0;
    let thur_8pm = 0;
    let thur_9pm = 0;

    let fri_8am = 0;
    let fri_9am = 0;
    let fri_10am = 0;
    let fri_11am = 0;
    let fri_12pm = 0;
    let fri_1pm = 0;
    let fri_2pm = 0;
    let fri_3pm = 0;
    let fri_4pm = 0;
    let fri_5pm = 0;
    let fri_6pm = 0;
    let fri_7pm = 0;
    let fri_8pm = 0;
    let fri_9pm = 0;

    let sat_8am = 0;
    let sat_9am = 0;
    let sat_10am = 0;
    let sat_11am = 0;
    let sat_12pm = 0;
    let sat_1pm = 0;
    let sat_2pm = 0;
    let sat_3pm = 0;
    let sat_4pm = 0;
    let sat_5pm = 0;
    let sat_6pm = 0;
    let sat_7pm = 0;
    let sat_8pm = 0;
    let sat_9pm = 0;

    let sun_8am = 0;
    let sun_9am = 0;
    let sun_10am = 0;
    let sun_11am = 0;
    let sun_12pm = 0;
    let sun_1pm = 0;
    let sun_2pm = 0;
    let sun_3pm = 0;
    let sun_4pm = 0;
    let sun_5pm = 0;
    let sun_6pm = 0;
    let sun_7pm = 0;
    let sun_8pm = 0;
    let sun_9pm = 0;

    for (let j = 0; j < this.state.data.length; j++) {
      if (
        this.state.data[j].day === "Monday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        mon_8am += parseInt(this.state.data[j].hour_08);
        mon_9am += parseInt(this.state.data[j].hour_09);
        mon_10am += parseInt(this.state.data[j].hour_10);
        mon_11am += parseInt(this.state.data[j].hour_11);
        mon_12pm += parseInt(this.state.data[j].hour_12);
        mon_1pm += parseInt(this.state.data[j].hour_13);
        mon_2pm += parseInt(this.state.data[j].hour_14);
        mon_3pm += parseInt(this.state.data[j].hour_15);
        mon_4pm += parseInt(this.state.data[j].hour_16);
        mon_5pm += parseInt(this.state.data[j].hour_17);
        mon_6pm += parseInt(this.state.data[j].hour_18);
        mon_7pm += parseInt(this.state.data[j].hour_19);
        mon_8pm += parseInt(this.state.data[j].hour_20);
        mon_9pm += parseInt(this.state.data[j].hour_21);
      } else if (
        this.state.data[j].day === "Tuesday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        tue_8am += parseInt(this.state.data[j].hour_08);
        tue_9am += parseInt(this.state.data[j].hour_09);
        tue_10am += parseInt(this.state.data[j].hour_10);
        tue_11am += parseInt(this.state.data[j].hour_11);
        tue_12pm += parseInt(this.state.data[j].hour_12);
        tue_1pm += parseInt(this.state.data[j].hour_13);
        tue_2pm += parseInt(this.state.data[j].hour_14);
        tue_3pm += parseInt(this.state.data[j].hour_15);
        tue_4pm += parseInt(this.state.data[j].hour_16);
        tue_5pm += parseInt(this.state.data[j].hour_17);
        tue_6pm += parseInt(this.state.data[j].hour_18);
        tue_7pm += parseInt(this.state.data[j].hour_19);
        tue_8pm += parseInt(this.state.data[j].hour_20);
        tue_9pm += parseInt(this.state.data[j].hour_21);
      } else if (
        this.state.data[j].day === "Wednesday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        wed_8am += parseInt(this.state.data[j].hour_08);
        wed_9am += parseInt(this.state.data[j].hour_09);
        wed_10am += parseInt(this.state.data[j].hour_10);
        wed_11am += parseInt(this.state.data[j].hour_11);
        wed_12pm += parseInt(this.state.data[j].hour_12);
        wed_1pm += parseInt(this.state.data[j].hour_13);
        wed_2pm += parseInt(this.state.data[j].hour_14);
        wed_3pm += parseInt(this.state.data[j].hour_15);
        wed_4pm += parseInt(this.state.data[j].hour_16);
        wed_5pm += parseInt(this.state.data[j].hour_17);
        wed_6pm += parseInt(this.state.data[j].hour_18);
        wed_7pm += parseInt(this.state.data[j].hour_19);
        wed_8pm += parseInt(this.state.data[j].hour_20);
        wed_9pm += parseInt(this.state.data[j].hour_21);
      } else if (
        this.state.data[j].day === "Thursday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        thur_8am += parseInt(this.state.data[j].hour_08);
        thur_9am += parseInt(this.state.data[j].hour_09);
        thur_10am += parseInt(this.state.data[j].hour_10);
        thur_11am += parseInt(this.state.data[j].hour_11);
        thur_12pm += parseInt(this.state.data[j].hour_12);
        thur_1pm += parseInt(this.state.data[j].hour_13);
        thur_2pm += parseInt(this.state.data[j].hour_14);
        thur_3pm += parseInt(this.state.data[j].hour_15);
        thur_4pm += parseInt(this.state.data[j].hour_16);
        thur_5pm += parseInt(this.state.data[j].hour_17);
        thur_6pm += parseInt(this.state.data[j].hour_18);
        thur_7pm += parseInt(this.state.data[j].hour_19);
        thur_8pm += parseInt(this.state.data[j].hour_20);
        thur_9pm += parseInt(this.state.data[j].hour_21);
      } else if (
        this.state.data[j].day === "Friday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        fri_8am += parseInt(this.state.data[j].hour_08);
        fri_9am += parseInt(this.state.data[j].hour_09);
        fri_10am += parseInt(this.state.data[j].hour_10);
        fri_11am += parseInt(this.state.data[j].hour_11);
        fri_12pm += parseInt(this.state.data[j].hour_12);
        fri_1pm += parseInt(this.state.data[j].hour_13);
        fri_2pm += parseInt(this.state.data[j].hour_14);
        fri_3pm += parseInt(this.state.data[j].hour_15);
        fri_4pm += parseInt(this.state.data[j].hour_16);
        fri_5pm += parseInt(this.state.data[j].hour_17);
        fri_6pm += parseInt(this.state.data[j].hour_18);
        fri_7pm += parseInt(this.state.data[j].hour_19);
        fri_8pm += parseInt(this.state.data[j].hour_20);
        fri_9pm += parseInt(this.state.data[j].hour_21);
      } else if (
        this.state.data[j].day === "Saturday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        sat_8am += parseInt(this.state.data[j].hour_08);
        sat_9am += parseInt(this.state.data[j].hour_09);
        sat_10am += parseInt(this.state.data[j].hour_10);
        sat_11am += parseInt(this.state.data[j].hour_11);
        sat_12pm += parseInt(this.state.data[j].hour_12);
        sat_1pm += parseInt(this.state.data[j].hour_13);
        sat_2pm += parseInt(this.state.data[j].hour_14);
        sat_3pm += parseInt(this.state.data[j].hour_15);
        sat_4pm += parseInt(this.state.data[j].hour_16);
        sat_5pm += parseInt(this.state.data[j].hour_17);
        sat_6pm += parseInt(this.state.data[j].hour_18);
        sat_7pm += parseInt(this.state.data[j].hour_19);
        sat_8pm += parseInt(this.state.data[j].hour_20);
        sat_9pm += parseInt(this.state.data[j].hour_21);
      } else if (
        this.state.data[j].day === "Sunday" &&
        this.state.data[j].totalVisit !== "" &&
        this.state.data[j].hour_20 !== ""
      ) {
        sun_8am += parseInt(this.state.data[j].hour_08);
        sun_9am += parseInt(this.state.data[j].hour_09);
        sun_10am += parseInt(this.state.data[j].hour_10);
        sun_11am += parseInt(this.state.data[j].hour_11);
        sun_12pm += parseInt(this.state.data[j].hour_12);
        sun_1pm += parseInt(this.state.data[j].hour_13);
        sun_2pm += parseInt(this.state.data[j].hour_14);
        sun_3pm += parseInt(this.state.data[j].hour_15);
        sun_4pm += parseInt(this.state.data[j].hour_16);
        sun_5pm += parseInt(this.state.data[j].hour_17);
        sun_6pm += parseInt(this.state.data[j].hour_18);
        sun_7pm += parseInt(this.state.data[j].hour_19);
        sun_8pm += parseInt(this.state.data[j].hour_20);
        sun_9pm += parseInt(this.state.data[j].hour_21);
      }
    }
    let cus_data = [];

    this.data8am.push(
      mon_8am,
      tue_8am,
      wed_8am,
      thur_8am,
      fri_8am,
      sat_8am,
      sun_8am
    );
    this.data9am.push(
      mon_9am,
      tue_9am,
      wed_9am,
      thur_9am,
      fri_9am,
      sat_9am,
      sun_9am
    );
    this.data10am.push(
      mon_10am,
      tue_10am,
      wed_10am,
      thur_10am,
      fri_10am,
      sat_10am,
      sun_10am
    );
    this.data11am.push(
      mon_11am,
      tue_11am,
      wed_11am,
      thur_11am,
      fri_11am,
      sat_11am,
      sun_11am
    );
    this.data12pm.push(
      mon_12pm,
      tue_12pm,
      wed_12pm,
      thur_12pm,
      fri_12pm,
      sat_12pm,
      sun_12pm
    );
    this.data1pm.push(
      mon_1pm,
      tue_1pm,
      wed_1pm,
      thur_1pm,
      fri_1pm,
      sat_1pm,
      sun_1pm
    );
    this.data2pm.push(
      mon_2pm,
      tue_2pm,
      wed_2pm,
      thur_2pm,
      fri_2pm,
      sat_2pm,
      sun_2pm
    );
    this.data3pm.push(
      mon_3pm,
      tue_3pm,
      wed_3pm,
      thur_3pm,
      fri_3pm,
      sat_3pm,
      sun_3pm
    );
    this.data4pm.push(
      mon_4pm,
      tue_4pm,
      wed_4pm,
      thur_4pm,
      fri_4pm,
      sat_4pm,
      sun_4pm
    );
    this.data5pm.push(
      mon_5pm,
      tue_5pm,
      wed_5pm,
      thur_5pm,
      fri_5pm,
      sat_5pm,
      sun_5pm
    );
    this.data6pm.push(
      mon_6pm,
      tue_6pm,
      wed_6pm,
      thur_6pm,
      fri_6pm,
      sat_6pm,
      sun_6pm
    );
    this.data7pm.push(
      mon_7pm,
      tue_7pm,
      wed_7pm,
      thur_7pm,
      fri_7pm,
      sat_7pm,
      sun_7pm
    );
    this.data8pm.push(
      mon_8pm,
      tue_8pm,
      wed_8pm,
      thur_8pm,
      fri_8pm,
      sat_8pm,
      sun_8pm
    );
    this.data9pm.push(
      mon_9pm,
      tue_9pm,
      wed_9pm,
      thur_9pm,
      fri_9pm,
      sat_9pm,
      sun_9pm
    );
    cus_data.push(
      this.data8am,
      this.data9am,
      this.data10am,
      this.data11am,
      this.data12pm,
      this.data1pm,
      this.data2pm,
      this.data3pm,
      this.data4pm,
      this.data5pm,
      this.data6pm,
      this.data7pm,
      this.data8pm,
      this.data9pm
    );
    this.setState({ data_customer: cus_data });
  }

  getStoreName() {
    let storeName = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (storeName.length === 0) {
        storeName.push(this.state.data[i].shop_name);
      } else if (i > 0) {
        if (this.state.data[i].shop_name !== this.state.data[i - 1].shop_name) {
          storeName.push(this.state.data[i].shop_name);
        }
      }
    }
    return storeName;
  }

  separateCustomerVisit() {
    let cus_array = [];
    let store_array = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (store_array.length === 0) {
        store_array.push(this.state.data[i]);
      } else if (i > 0) {
        if (this.state.data[i].shop_name === this.state.data[i - 1].shop_name) {
          store_array.push(this.state.data[i]);
          if (i === this.state.data.length - 1) {
            cus_array.push(store_array);
          }
        } else {
          cus_array.push(store_array);
          store_array = [];
          store_array.push(this.state.data[i]);
        }
      }
    }
    return cus_array;
  }

  customerHeatMap() {
    let customer_data = this.separateCustomerVisit();
    let heatMap_data = [];
    for (let i = 0; i < customer_data.length; i++) {
      let mon_8am = 0;
      let mon_9am = 0;
      let mon_10am = 0;
      let mon_11am = 0;
      let mon_12pm = 0;
      let mon_1pm = 0;
      let mon_2pm = 0;
      let mon_3pm = 0;
      let mon_4pm = 0;
      let mon_5pm = 0;
      let mon_6pm = 0;
      let mon_7pm = 0;
      let mon_8pm = 0;
      let mon_9pm = 0;

      let tue_8am = 0;
      let tue_9am = 0;
      let tue_10am = 0;
      let tue_11am = 0;
      let tue_12pm = 0;
      let tue_1pm = 0;
      let tue_2pm = 0;
      let tue_3pm = 0;
      let tue_4pm = 0;
      let tue_5pm = 0;
      let tue_6pm = 0;
      let tue_7pm = 0;
      let tue_8pm = 0;
      let tue_9pm = 0;

      let wed_8am = 0;
      let wed_9am = 0;
      let wed_10am = 0;
      let wed_11am = 0;
      let wed_12pm = 0;
      let wed_1pm = 0;
      let wed_2pm = 0;
      let wed_3pm = 0;
      let wed_4pm = 0;
      let wed_5pm = 0;
      let wed_6pm = 0;
      let wed_7pm = 0;
      let wed_8pm = 0;
      let wed_9pm = 0;

      let thur_8am = 0;
      let thur_9am = 0;
      let thur_10am = 0;
      let thur_11am = 0;
      let thur_12pm = 0;
      let thur_1pm = 0;
      let thur_2pm = 0;
      let thur_3pm = 0;
      let thur_4pm = 0;
      let thur_5pm = 0;
      let thur_6pm = 0;
      let thur_7pm = 0;
      let thur_8pm = 0;
      let thur_9pm = 0;

      let fri_8am = 0;
      let fri_9am = 0;
      let fri_10am = 0;
      let fri_11am = 0;
      let fri_12pm = 0;
      let fri_1pm = 0;
      let fri_2pm = 0;
      let fri_3pm = 0;
      let fri_4pm = 0;
      let fri_5pm = 0;
      let fri_6pm = 0;
      let fri_7pm = 0;
      let fri_8pm = 0;
      let fri_9pm = 0;

      let sat_8am = 0;
      let sat_9am = 0;
      let sat_10am = 0;
      let sat_11am = 0;
      let sat_12pm = 0;
      let sat_1pm = 0;
      let sat_2pm = 0;
      let sat_3pm = 0;
      let sat_4pm = 0;
      let sat_5pm = 0;
      let sat_6pm = 0;
      let sat_7pm = 0;
      let sat_8pm = 0;
      let sat_9pm = 0;

      let sun_8am = 0;
      let sun_9am = 0;
      let sun_10am = 0;
      let sun_11am = 0;
      let sun_12pm = 0;
      let sun_1pm = 0;
      let sun_2pm = 0;
      let sun_3pm = 0;
      let sun_4pm = 0;
      let sun_5pm = 0;
      let sun_6pm = 0;
      let sun_7pm = 0;
      let sun_8pm = 0;
      let sun_9pm = 0;

      let arr8am = [];
      let arr9am = [];
      let arr10am = [];
      let arr11am = [];
      let arr12pm = [];
      let arr1pm = [];
      let arr2pm = [];
      let arr3pm = [];
      let arr4pm = [];
      let arr5pm = [];
      let arr6pm = [];
      let arr7pm = [];
      let arr8pm = [];
      let arr9pm = [];
      let week_arr = [];

      for (let j = 0; j < customer_data[i].length; j++) {
        if (customer_data[i][j].day === "Monday") {
          mon_8am += parseInt(customer_data[i][j].hour_08);
          mon_9am += parseInt(customer_data[i][j].hour_09);
          mon_10am += parseInt(customer_data[i][j].hour_10);
          mon_11am += parseInt(customer_data[i][j].hour_11);
          mon_12pm += parseInt(customer_data[i][j].hour_12);
          mon_1pm += parseInt(customer_data[i][j].hour_13);
          mon_2pm += parseInt(customer_data[i][j].hour_14);
          mon_3pm += parseInt(customer_data[i][j].hour_15);
          mon_4pm += parseInt(customer_data[i][j].hour_16);
          mon_5pm += parseInt(customer_data[i][j].hour_17);
          mon_6pm += parseInt(customer_data[i][j].hour_18);
          mon_7pm += parseInt(customer_data[i][j].hour_19);
          mon_8pm += parseInt(customer_data[i][j].hour_20);
          mon_9pm += parseInt(customer_data[i][j].hour_21);
        } else if (customer_data[i][j].day === "Tuesday") {
          tue_8am += parseInt(customer_data[i][j].hour_08);
          tue_9am += parseInt(customer_data[i][j].hour_09);
          tue_10am += parseInt(customer_data[i][j].hour_10);
          tue_11am += parseInt(customer_data[i][j].hour_11);
          tue_12pm += parseInt(customer_data[i][j].hour_12);
          tue_1pm += parseInt(customer_data[i][j].hour_13);
          tue_2pm += parseInt(customer_data[i][j].hour_14);
          tue_3pm += parseInt(customer_data[i][j].hour_15);
          tue_4pm += parseInt(customer_data[i][j].hour_16);
          tue_5pm += parseInt(customer_data[i][j].hour_17);
          tue_6pm += parseInt(customer_data[i][j].hour_18);
          tue_7pm += parseInt(customer_data[i][j].hour_19);
          tue_8pm += parseInt(customer_data[i][j].hour_20);
          tue_9pm += parseInt(customer_data[i][j].hour_21);
        } else if (customer_data[i][j].day === "Wednesday") {
          wed_8am += parseInt(customer_data[i][j].hour_08);
          wed_9am += parseInt(customer_data[i][j].hour_09);
          wed_10am += parseInt(customer_data[i][j].hour_10);
          wed_11am += parseInt(customer_data[i][j].hour_11);
          wed_12pm += parseInt(customer_data[i][j].hour_12);
          wed_1pm += parseInt(customer_data[i][j].hour_13);
          wed_2pm += parseInt(customer_data[i][j].hour_14);
          wed_3pm += parseInt(customer_data[i][j].hour_15);
          wed_4pm += parseInt(customer_data[i][j].hour_16);
          wed_5pm += parseInt(customer_data[i][j].hour_17);
          wed_6pm += parseInt(customer_data[i][j].hour_18);
          wed_7pm += parseInt(customer_data[i][j].hour_19);
          wed_8pm += parseInt(customer_data[i][j].hour_20);
          wed_9pm += parseInt(customer_data[i][j].hour_21);
        } else if (
          customer_data[i][j].day === "Thursday" &&
          customer_data[i][j].totalVisit !== ""
        ) {
          thur_8am += parseInt(customer_data[i][j].hour_08);
          thur_9am += parseInt(customer_data[i][j].hour_09);
          thur_10am += parseInt(customer_data[i][j].hour_10);
          thur_11am += parseInt(customer_data[i][j].hour_11);
          thur_12pm += parseInt(customer_data[i][j].hour_12);
          thur_1pm += parseInt(customer_data[i][j].hour_13);
          thur_2pm += parseInt(customer_data[i][j].hour_14);
          thur_3pm += parseInt(customer_data[i][j].hour_15);
          thur_4pm += parseInt(customer_data[i][j].hour_16);
          thur_5pm += parseInt(customer_data[i][j].hour_17);
          thur_6pm += parseInt(customer_data[i][j].hour_18);
          thur_7pm += parseInt(customer_data[i][j].hour_19);
          thur_8pm += parseInt(customer_data[i][j].hour_20);
          thur_9pm += parseInt(customer_data[i][j].hour_21);
        } else if (customer_data[i][j].day === "Friday") {
          fri_8am += parseInt(customer_data[i][j].hour_08);
          fri_9am += parseInt(customer_data[i][j].hour_09);
          fri_10am += parseInt(customer_data[i][j].hour_10);
          fri_11am += parseInt(customer_data[i][j].hour_11);
          fri_12pm += parseInt(customer_data[i][j].hour_12);
          fri_1pm += parseInt(customer_data[i][j].hour_13);
          fri_2pm += parseInt(customer_data[i][j].hour_14);
          fri_3pm += parseInt(customer_data[i][j].hour_15);
          fri_4pm += parseInt(customer_data[i][j].hour_16);
          fri_5pm += parseInt(customer_data[i][j].hour_17);
          fri_6pm += parseInt(customer_data[i][j].hour_18);
          fri_7pm += parseInt(customer_data[i][j].hour_19);
          fri_8pm += parseInt(customer_data[i][j].hour_20);
          fri_9pm += parseInt(customer_data[i][j].hour_21);
        } else if (customer_data[i][j].day === "Saturday") {
          sat_8am += parseInt(customer_data[i][j].hour_08);
          sat_9am += parseInt(customer_data[i][j].hour_09);
          sat_10am += parseInt(customer_data[i][j].hour_10);
          sat_11am += parseInt(customer_data[i][j].hour_11);
          sat_12pm += parseInt(customer_data[i][j].hour_12);
          sat_1pm += parseInt(customer_data[i][j].hour_13);
          sat_2pm += parseInt(customer_data[i][j].hour_14);
          sat_3pm += parseInt(customer_data[i][j].hour_15);
          sat_4pm += parseInt(customer_data[i][j].hour_16);
          sat_5pm += parseInt(customer_data[i][j].hour_17);
          sat_6pm += parseInt(customer_data[i][j].hour_18);
          sat_7pm += parseInt(customer_data[i][j].hour_19);
          sat_8pm += parseInt(customer_data[i][j].hour_20);
          sat_9pm += parseInt(customer_data[i][j].hour_21);
        } else if (customer_data[i][j].day === "Sunday") {
          sun_8am += parseInt(customer_data[i][j].hour_08);
          sun_9am += parseInt(customer_data[i][j].hour_09);
          sun_10am += parseInt(customer_data[i][j].hour_10);
          sun_11am += parseInt(customer_data[i][j].hour_11);
          sun_12pm += parseInt(customer_data[i][j].hour_12);
          sun_1pm += parseInt(customer_data[i][j].hour_13);
          sun_2pm += parseInt(customer_data[i][j].hour_14);
          sun_3pm += parseInt(customer_data[i][j].hour_15);
          sun_4pm += parseInt(customer_data[i][j].hour_16);
          sun_5pm += parseInt(customer_data[i][j].hour_17);
          sun_6pm += parseInt(customer_data[i][j].hour_18);
          sun_7pm += parseInt(customer_data[i][j].hour_19);
          if (customer_data[i][j].hour_20 !== "") {
            sun_8pm += parseInt(customer_data[i][j].hour_20);
          } else {
            sun_8pm = 0;
          }
          sun_9pm += parseInt(customer_data[i][j].hour_21);
        }
      }
      arr8am.push(
        mon_8am,
        tue_8am,
        wed_8am,
        thur_8am,
        fri_8am,
        sat_8am,
        sun_8am
      );
      arr9am.push(
        mon_9am,
        tue_9am,
        wed_9am,
        thur_9am,
        fri_9am,
        sat_9am,
        sun_9am
      );
      arr10am.push(
        mon_10am,
        tue_10am,
        wed_10am,
        thur_10am,
        fri_10am,
        sat_10am,
        sun_10am
      );
      arr11am.push(
        mon_11am,
        tue_11am,
        wed_11am,
        thur_11am,
        fri_11am,
        sat_11am,
        sun_11am
      );
      arr12pm.push(
        mon_12pm,
        tue_12pm,
        wed_12pm,
        thur_12pm,
        fri_12pm,
        sat_12pm,
        sun_12pm
      );
      arr1pm.push(
        mon_1pm,
        tue_1pm,
        wed_1pm,
        thur_1pm,
        fri_1pm,
        sat_1pm,
        sun_1pm
      );
      arr2pm.push(
        mon_2pm,
        tue_2pm,
        wed_2pm,
        thur_2pm,
        fri_2pm,
        sat_2pm,
        sun_2pm
      );
      arr3pm.push(
        mon_3pm,
        tue_3pm,
        wed_3pm,
        thur_3pm,
        fri_3pm,
        sat_3pm,
        sun_3pm
      );
      arr4pm.push(
        mon_4pm,
        tue_4pm,
        wed_4pm,
        thur_4pm,
        fri_4pm,
        sat_4pm,
        sun_4pm
      );
      arr5pm.push(
        mon_5pm,
        tue_5pm,
        wed_5pm,
        thur_5pm,
        fri_5pm,
        sat_5pm,
        sun_5pm
      );
      arr6pm.push(
        mon_6pm,
        tue_6pm,
        wed_6pm,
        thur_6pm,
        fri_6pm,
        sat_6pm,
        sun_6pm
      );
      arr7pm.push(
        mon_7pm,
        tue_7pm,
        wed_7pm,
        thur_7pm,
        fri_7pm,
        sat_7pm,
        sun_7pm
      );
      arr8pm.push(
        mon_8pm,
        tue_8pm,
        wed_8pm,
        thur_8pm,
        fri_8pm,
        sat_8pm,
        sun_8pm
      );
      arr9pm.push(
        mon_9pm,
        tue_9pm,
        wed_9pm,
        thur_9pm,
        fri_9pm,
        sat_9pm,
        sun_9pm
      );
      week_arr.push(
        arr8am,
        arr9am,
        arr10am,
        arr11am,
        arr12pm,
        arr1pm,
        arr2pm,
        arr3pm,
        arr4pm,
        arr5pm,
        arr6pm,
        arr7pm,
        arr8pm,
        arr9pm
      );
      heatMap_data.push(week_arr);
    }
    return heatMap_data;
  }

  updateData(result) {
    const data = result.data;

    const newArray = result.data.map((a) => Object.assign({}, a));
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({ data: data }, function () {
      this.setState({ new_data: this.merge_objects(newArray) }, function () {
        this.receivedData();
      });
    });

    const heatMapData = this.customerHeatMap();
    this.setState({ heatMap: heatMapData });

    const getStore = this.getStoreName();
    this.setState({ storeName: getStore });

    // Find the totalVist number of all stores
    let total_visits = 0;
    for (let i = 0; i < this.state.new_data.length; i++) {
      total_visits += parseInt(this.state.new_data[i].totalVisit);
    }
    this.setState({ total_visit: total_visits });

    let data_monday = 0;
    let data_tuesday = 0;
    let data_wednesday = 0;
    let data_thursday = 0;
    let data_friday = 0;
    let data_saturday = 0;
    let data_sunday = 0;

    for (let j = 0; j < this.state.data.length; j++) {
      if (
        this.state.data[j].day === "Monday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_monday += parseInt(this.state.data[j].totalVisit);
      } else if (
        this.state.data[j].day === "Tuesday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_tuesday += parseInt(this.state.data[j].totalVisit);
      } else if (
        this.state.data[j].day === "Wednesday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_wednesday += parseInt(this.state.data[j].totalVisit);
      } else if (
        this.state.data[j].day === "Thursday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_thursday += parseInt(this.state.data[j].totalVisit);
      } else if (
        this.state.data[j].day === "Friday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_friday += parseInt(this.state.data[j].totalVisit);
      } else if (
        this.state.data[j].day === "Saturday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_saturday += parseInt(this.state.data[j].totalVisit);
      } else if (
        this.state.data[j].day === "Sunday" &&
        this.state.data[j].totalVisit !== ""
      ) {
        data_sunday += parseInt(this.state.data[j].totalVisit);
      }
    }

    this.data1.push(data_monday);
    this.data1.push(data_tuesday);
    this.data1.push(data_wednesday);
    this.data1.push(data_thursday);
    this.data1.push(data_friday);
    this.data1.push(data_saturday);
    this.data1.push(data_sunday);

    let new_mainChart = {
      labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      datasets: [
        {
          label: "Number of visitors in the day",
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: "#fff",
          borderWidth: 2,
          data: this.data1,
        },
      ],
    };
    this.setState({ mainChart: new_mainChart });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  // get the maximum visit for the progress bar
  max_totalVisit() {
    let max = parseInt(this.state.new_data[0].totalVisit);
    for (let i = 0; i < this.state.new_data.length; i++) {
      if (parseInt(this.state.new_data[i].totalVisit) > max) {
        max = this.state.new_data[i].totalVisit;
      }
    }
    return max;
  }

  max_averageDwelltime() {
    let max = parseFloat(this.state.new_data[0].averageDwelltime);
    for (let i = 0; i < this.state.new_data.length; i++) {
      if (parseFloat(this.state.new_data[i].averageDwelltime) > max) {
        max = this.state.new_data[i].averageDwelltime;
      }
    }
    return max;
  }

  merge_objects(copy) {
    let new_array = [];
    let sumVisit = 0;
    let sumDwellTime = 0;
    let timeCount = 1;

    for (let i = 0; i < copy.length; i++) {
      let cannot_find = 0;
      if (new_array.length === 0) {
        new_array.push(copy[i]);
      } else {
        for (let j = 0; j < new_array.length; j++) {
          if (
            new_array[j].shop_name === copy[i].shop_name &&
            copy[i].totalVisit !== "" &&
            copy[i].averageDwelltime !== ""
          ) {
            sumVisit =
              parseInt(copy[i].totalVisit) + parseInt(new_array[j].totalVisit);
            new_array[j].totalVisit = sumVisit.toString();
            sumDwellTime =
              parseFloat(copy[i].averageDwelltime) +
              parseFloat(new_array[j].averageDwelltime);
            new_array[j].averageDwelltime = sumDwellTime.toString();
            timeCount += 1;
            if (i === copy.length - 1) {
              new_array[j].averageDwelltime = (
                new_array[j].averageDwelltime / timeCount
              ).toFixed(2);
            }
          } else {
            // after looping through all elements in new_array and cannot find the object => append it
            cannot_find += 1;
            if (
              cannot_find === new_array.length &&
              copy[i].totalVisit !== "" &&
              i !== copy.length - 1
            ) {
              new_array[j].averageDwelltime = (
                new_array[j].averageDwelltime / timeCount
              ).toFixed(2);
              new_array.push(copy[i]);
              timeCount = 1;
              break;
            }
          }
        }
      }
    }
    return new_array;
  }

  receivedData() {
    const data = this.state.new_data;
    // const slice = data.slice(
    //   this.state.offset,
    //   this.state.offset + this.state.perPage
    // );

    const postData = data.map((pd) => (
      <TableChart
        state={pd}
        maxVisit={this.max_totalVisit}
        maxDwelltime={this.max_averageDwelltime}
        newColorVisit={this.handleColorVisit(pd)}
        newColorDwelltime={this.handleColorDwelltime(pd)}
      />
    ));

    this.setState({
      // pageCount: Math.ceil(data.length / this.state.perPage),

      postData,
    });
  }

  handleColorVisit(pd) {
    if (parseInt(pd.totalVisit) <= this.max_totalVisit() * 0.4) {
      this.colorVisit = "danger";
      return this.colorVisit;
    } else if (parseInt(pd.totalVisit) >= this.max_totalVisit() * 0.8) {
      this.colorVisit = "success";
      return this.colorVisit;
    } else {
      this.colorVisit = "warning";
      return this.colorVisit;
    }
  }

  handleColorDwelltime(pd) {
    if (parseFloat(pd.averageDwelltime) <= this.max_averageDwelltime() * 0.4) {
      this.colorDwelltime = "danger";
      return this.colorDwelltime;
    } else if (
      parseFloat(pd.averageDwelltime) >=
      this.max_averageDwelltime() * 0.8
    ) {
      this.colorDwelltime = "success";
      return this.colorDwelltime;
    } else {
      this.colorDwelltime = "warning";
      return this.colorDwelltime;
    }
  }
  handleButton = (event) => {
    if (event.target.name === "HCM382LBT") {
      this.setState({ store1: true });
      this.setState({ store2: false });
      this.setState({ store3: false });
    } else if (event.target.name === "HCM408LTT") {
      this.setState({store2:true})
      this.setState({ store1: false });
      this.setState({ store3: false });
    } else if (event.target.name === "HCM1215D3T2") {
      this.setState({store3:true})
      this.setState({ store1: false });
      this.setState({ store2: false });
    }
  };

  // handlePageClick = (e) => {
  //   const selectedPage = e.selected;
  //   const offset = selectedPage * this.state.perPage;

  //   this.setState(
  //     {
  //       currentPage: selectedPage,
  //       offset: offset,
  //     },
  //     () => {
  //       this.receivedData();
  //     }
  //   );
  // };

  // handlePageChange(pageNumber) {
  //   console.log(`active page is ${pageNumber}`);
  //   this.setState({ activePage: pageNumber });
  // }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    let data = this.state.heatMap;
    console.log(data)
    switch (this.props.match.params.id) {
      case "1":
        return (
          <div className="animated fadeIn">
            <Row className="flex-chart">
              <Col className="col-md-4">
                <Card className="text-white bg-info">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <ButtonDropdown
                        id="card1"
                        isOpen={this.state.card1}
                        toggle={() => {
                          this.setState({ card1: !this.state.card1 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem disabled>Disabled action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </ButtonGroup>
                    <div className="text-value">{this.state.total_visit}</div>
                    <div>Total Visits</div>
                  </CardBody>
                  <div
                    className="chart-wrapper mx-3"
                    style={{ height: "70px" }}
                  >
                    <Line
                      data={cardChartData2}
                      options={cardChartOpts2}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>

              <Col className="col-md-4">
                <Card className="text-white bg-warning">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <Dropdown
                        id="card3"
                        isOpen={this.state.card3}
                        toggle={() => {
                          this.setState({ card3: !this.state.card3 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </ButtonGroup>
                    <div className="text-value">22,643</div>
                    <div>Transactions</div>
                  </CardBody>
                  <div className="chart-wrapper" style={{ height: "70px" }}>
                    <Line
                      data={cardChartData3}
                      options={cardChartOpts3}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>

              <Col className="col-md-4">
                <Card className="text-white bg-danger">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <ButtonDropdown
                        id="card4"
                        isOpen={this.state.card4}
                        toggle={() => {
                          this.setState({ card4: !this.state.card4 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </ButtonGroup>
                    <div className="text-value">22,643</div>
                    <div>Conversion Rate</div>
                  </CardBody>
                  <div
                    className="chart-wrapper mx-3"
                    style={{ height: "70px" }}
                  >
                    <Bar
                      data={cardChartData4}
                      options={cardChartOpts4}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="5">
                        <CardTitle className="mb-0">Traffic</CardTitle>
                        <div className="small text-muted">November 2015</div>
                      </Col>
                      <Col sm="7" className="d-none d-sm-inline-block">
                        <Button color="primary" className="float-right">
                          <i className="icon-cloud-download"></i>
                        </Button>
                        <ButtonToolbar
                          className="float-right"
                          aria-label="Toolbar with button groups"
                        >
                          <ButtonGroup
                            className="mr-3"
                            aria-label="First group"
                          >
                            <Button
                              color="outline-secondary"
                              onClick={() => this.onRadioBtnClick(1)}
                              active={this.state.radioSelected === 1}
                            >
                              Day
                            </Button>
                            <Button
                              color="outline-secondary"
                              onClick={() => this.onRadioBtnClick(2)}
                              active={this.state.radioSelected === 2}
                            >
                              Month
                            </Button>
                            <Button
                              color="outline-secondary"
                              onClick={() => this.onRadioBtnClick(3)}
                              active={this.state.radioSelected === 3}
                            >
                              Year
                            </Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <div className="callout callout-info">
                          <small className="text-muted">Total Visits</small>
                          <br />
                          <strong className="h4">
                            {this.state.total_visit}
                          </strong>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="callout callout-danger">
                          <small className="text-muted">Transactions</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="callout callout-warning">
                          <small className="text-muted">Conversion Rate</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </div>
                      </Col>
                    </Row>

                    <div
                      className="chart-wrapper"
                      style={{ height: 300 + "px", marginTop: 40 + "px" }}
                    >
                      <Line
                        data={this.state.mainChart}
                        options={this.state.mainChartOpts}
                        height={300}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        );
      case "2":
        return <TrafficandSales state={this.state} />;
      case "3":
        return <Demographics state={this.state} />;
      case "4":
        return (
          <Row>
            <Col>
              <Card>
                <CardHeader className="displayCard">
                  <div>StoreName</div>
                  <div className="buttons">
                    <Button
                      color="primary"
                      onClick={this.handleButton}
                      name="HCM382LBT"
                    >
                      HCM382LBT
                    </Button>{" "}
                    
                    
                    <Button
                      color="secondary"
                      onClick={this.handleButton}
                      name="HCM408LTT"
                    >
                      HCM408LTT
                    </Button>{" "}
                    <Button
                      color="success"
                      onClick={this.handleButton}
                      name="HCM1215D3T2"
                    >
                      HCM1215D3T2
                    </Button>{" "}
                  </div>
                </CardHeader>
                {this.state.store1 ? <CustomerVisit
                      state={this.state.heatMap}
        
                      index = {0}
                    /> : null}
                {this.state.store2 ? <CustomerVisit
                      state={this.state.heatMap}
                     
                      index = {1}
                    /> : null}
                {this.state.store3 ? <CustomerVisit
                      state={this.state.heatMap}
                     
                      index = {2}
                    /> : null}
              </Card>
            </Col>
          </Row>
        );

      default:
        return (
          <div className="animated fadeIn">
            <Row className="flex-chart">
              <Col className="col-md-4">
                <Card className="text-white bg-info">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <ButtonDropdown
                        id="card1"
                        isOpen={this.state.card1}
                        toggle={() => {
                          this.setState({ card1: !this.state.card1 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem disabled>Disabled action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </ButtonGroup>
                    <div className="text-value">{this.state.total_visit}</div>
                    <div>Total Visits</div>
                  </CardBody>
                  <div
                    className="chart-wrapper mx-3"
                    style={{ height: "70px" }}
                  >
                    <Line
                      data={cardChartData2}
                      options={cardChartOpts2}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>

              <Col className="col-md-4">
                <Card className="text-white bg-warning">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <Dropdown
                        id="card3"
                        isOpen={this.state.card3}
                        toggle={() => {
                          this.setState({ card3: !this.state.card3 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </ButtonGroup>
                    <div className="text-value">22,643</div>
                    <div>Transactions</div>
                  </CardBody>
                  <div className="chart-wrapper" style={{ height: "70px" }}>
                    <Line
                      data={cardChartData3}
                      options={cardChartOpts3}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>

              <Col className="col-md-4">
                <Card className="text-white bg-danger">
                  <CardBody className="pb-0">
                    <ButtonGroup className="float-right">
                      <ButtonDropdown
                        id="card4"
                        isOpen={this.state.card4}
                        toggle={() => {
                          this.setState({ card4: !this.state.card4 });
                        }}
                      >
                        <DropdownToggle
                          caret
                          className="p-0"
                          color="transparent"
                        >
                          <i className="icon-settings"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Action</DropdownItem>
                          <DropdownItem>Another action</DropdownItem>
                          <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </ButtonGroup>
                    <div className="text-value">22,643</div>
                    <div>Conversion Rate</div>
                  </CardBody>
                  <div
                    className="chart-wrapper mx-3"
                    style={{ height: "70px" }}
                  >
                    <Bar
                      data={cardChartData4}
                      options={cardChartOpts4}
                      height={70}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="5">
                        <CardTitle className="mb-0">Traffic</CardTitle>
                        <div className="small text-muted">November 2015</div>
                      </Col>
                      <Col sm="7" className="d-none d-sm-inline-block">
                        <Button color="primary" className="float-right">
                          <i className="icon-cloud-download"></i>
                        </Button>
                        <ButtonToolbar
                          className="float-right"
                          aria-label="Toolbar with button groups"
                        >
                          <ButtonGroup
                            className="mr-3"
                            aria-label="First group"
                          >
                            <Button
                              color="outline-secondary"
                              onClick={() => this.onRadioBtnClick(1)}
                              active={this.state.radioSelected === 1}
                            >
                              Day
                            </Button>
                            <Button
                              color="outline-secondary"
                              onClick={() => this.onRadioBtnClick(2)}
                              active={this.state.radioSelected === 2}
                            >
                              Month
                            </Button>
                            <Button
                              color="outline-secondary"
                              onClick={() => this.onRadioBtnClick(3)}
                              active={this.state.radioSelected === 3}
                            >
                              Year
                            </Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <div className="callout callout-info">
                          <small className="text-muted">Total Visits</small>
                          <br />
                          <strong className="h4">
                            {this.state.total_visit}
                          </strong>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="callout callout-danger">
                          <small className="text-muted">Transactions</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </div>
                      </Col>
                      <Col sm="4">
                        <div className="callout callout-warning">
                          <small className="text-muted">Conversion Rate</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </div>
                      </Col>
                    </Row>

                    <div
                      className="chart-wrapper"
                      style={{ height: 300 + "px", marginTop: 40 + "px" }}
                    >
                      <Line
                        data={this.state.mainChart}
                        options={this.state.mainChartOpts}
                        height={300}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
  }
}

export default Dashboard;
