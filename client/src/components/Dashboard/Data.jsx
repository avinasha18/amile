
export const data = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        data: [200, 600, 400, 620, 750, 600],
        backgroundColor: (context) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF8000', '#00FF80', '#F0EF22'];
          return colors[context.dataIndex % colors.length];
        },
        borderColor: (context) => {
          const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#FF8000', '#00FF80', '#E4EF12'];
          return colors[context.dataIndex % colors.length];
        },
        borderWidth: 1,
      },
    ],
  };
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
        ticks: {
          stepSize: 200,
        },
      },
    },
  };
  export const Cdata = {
    datasets: [{
      data: [75, 25],
      backgroundColor: [
        'rgb(65, 105, 225)',  // Royal Blue
        'rgb(230, 230, 250)', // Lavender
      ],
      borderWidth: 0,
    }],
  };
  export const Coptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  
  export const carouselItems = [
    {
      type: "Certification courses",
      title: "Master the in-demand skills!",
      description: "Get govt.-accredited certification and level-up your resume.",
      buttonText: "Know more",
      color: "#007bff",
      icon: "🎓"
    },
    {
      type: "Certification courses",
      title: "Special offer for students pursuing your degree!",
      description: "Get 55% + 10% OFF on online trainings",
      buttonText: "Know more",
      color: "#17a2b8",
      icon: "💼"
    },
    {
      type: "Campus Competition",
      title: "PepShe Supply Chain",
      description: "For female UG students across India",
      buttonText: "Register now",
      color: "#28a745",
      sponsor: "PEPSICO",
      bulletPoints: [
        "Chance to work for PepsiCo India",
        "Meet & learn from FMCG leaders"
      ]
    }
  ];