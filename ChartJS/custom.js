var xmlhttp = new XMLHttpRequest();
var url =
  'https://water.usace.army.mil/a2w/CWMS_CRREL.cwms_data_api.get_report_json?p_location_id=2063051&p_parameter_type=Flow%3AStor%3APrecip%3AStage%3AElev&p_last=30&p_last_unit=days&p_unit_system=EN&p_format=JSON';
const ctx = document.getElementById('canvas');
xmlhttp.open('GET', url, true);
xmlhttp.send();

//perhaps we create the maps for each location here and call them
//in the function below
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data); // logs the whole api

    var daily = data[0]['Elev'][0]['time'];
    console.log('lets find out: ' + daily);
    //logs todays date e.g. 07-Mar-2023 19:00 GMT

    /**
     * imo we can map out the x-axis with a 30 day span here
     * once that map is created, within this if statement,
     * the var 'daily' will represent the entire x-axis
     *
     * line 33 'labels' will be set to 'labels: time' and gg
     */

    var time = daily.map(function (elem) {
      return elem.time;
    });
    console.log(time);

    // var lakeElevation = data[0]['data'][0][1];
    // console.log(lakeElevation); //logs the lake elevation
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: 'Lake Elevation', //'elev' in the api
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'transparent',
          borderColor: 'blue',
          borderWidth: 4,
        },
        {
          label: 'Conservation Pool',
          data: [3, 3, 3, 3, 3, 3, 3],
          backgroundColor: 'transparent',
          borderColor: 'yellow',
          borderWidth: 2,
        },
      ],
    },
    options: {
      elements: {
        line: {
          tension: 0, //less tension == smoother curve -- not accessed properly atm
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
