const unpack = (data, key) => data.map(row => row[key]);

Plotly.d3.csv("top15.csv", social_data => {
    const platforms = unpack(social_data, 'Top Social Media Platforms');
    const users = unpack(social_data, 'Monthly Active Users in Millions');
    const countries = unpack(social_data, 'Country');

    const colorMap = {
        "US": "rgb(0, 119, 182)",
        "China": "rgb (193, 18, 31)",
        "UAE": "rgb(255, 214, 10)"
    };
    const data = Object.keys(colorMap).map(country => ({
        x: platforms.filter((_, i) => countries[i] === country),
        y: users.filter((_, i) => countries[i] === country),
        type: 'bar',
        name: country,
        marker: { color: colorMap[country] }
    }));
    // var data = [{
    //     x: platforms,
    //     y: users,
    //     type: 'bar',
    //     marker: {
    //         color: countries.map(country => colorMap[country])
    //     }
    // }];

    var layout = {

        title: 'Top 15 Social Media Platforms by Monthly Active Users',
           
        xaxis: {
            automargin: true,
            title: 'Social Media Platform',
            tickangle: -45,
            
        },
        yaxis: {
            title: 'Monthly Active Users (Millions)',
            automargin: true
        },
        showlegend: true,

        font: {

            size: 15,
            color: 'rgb(80,80,80)'
          },
        annotations: [{
            // x: 0,
            // y: 1.1,
            xref: 'paper',
            yref: 'paper',

            x: 0.4,
            xanchor: 'right',
            y: -0.8,
            yanchor: 'bottom',
            text: 'Most popular social networks worldwide: Statista',
            showarrow: false,

            font: {

                size: 12,
                color: 'rgb(80,80,80)'
              },
            
        }],
        margin: {
            l: 50,
            r: 50,
            b: 150, // Increased bottom margin to accommodate the annotation
            t: 100,
        }
        
    };

    Plotly.newPlot('chart1', data, layout);
});

const unpack2 = (data, key) => data.map(row => row[key]);

Plotly.d3.csv("newmap.csv", socialMediaData => {
    const location = unpack2(socialMediaData, 'geocode');
    const platform = unpack2(socialMediaData, 'most popular social media');
    const country = unpack2(socialMediaData, 'Country');

    const platformMap = {};
    platform.forEach((p, i) => {
        if (!platformMap[p]) {
            platformMap[p] = Object.keys(platformMap).length + 1;
        }
    });

    const platformValues = platform.map(p => platformMap[p]);

    const data = [{
        type: 'choropleth',
        locations: location,
        z: platformValues,
        text: socialMediaData.map(row => `${row['Country']}: ${row['most popular social media']}`),
        colorscale: [
            ['0.0', 'rgb(169,169,169)'],
            ['0.16', 'rgb(0, 119, 182)'],
            ['0.32', 'rgb(193, 18, 31)'],
            ['0.48', 'rgb(135,206,250)'],
            ['0.64', 'rgb(255,255,102)'],
            ['0.8', 'rgb(139,0,0)'],
            ['1.0', 'rgb(218,112,214)'],
        ],
        

        showscale: false,
        reversescale: false,
        marker: {
            line: {
                color: 'rgb(0,0,0)',
                width: 1
            }
        },
        showlegend: false
    }];
   
    var layout2 = {
        title: 'Top Social Platform by Country',
        geo: {
            showframe: true,
            showcoastlines: true,
            projection: {
                type: 'mercator'
            }
        },
        height: 600,
        width: 800,

        font: {

            size: 15,
            color: 'rgb(80,80,80)'
          },
        
        annotations: [{
            // x: 0.2,
            // y: 1.05,
            xref: 'paper',
            yref: 'paper',
            x: 0.4,
            xanchor: 'right',
            y: -0.1,
            yanchor: 'bottom',
            text: 'Social Media Stats: Statcounter',
            showarrow: false,
            font: {
                family: 'Arial',
                size: 12,
                color: 'rgb(80,80,80)'
            }
        }],

        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,



        }
    };

    Plotly.newPlot("chart2", data, layout2);
});

const unpack3 = (data, key) => data.map(row => row[key]);

Plotly.d3.csv("bubble.csv", data => {
    const countries = unpack3(data, 'Selected Countries');
    const population = unpack3(data, 'population2024');
    const internetFreedomScore = unpack3(data, 'InternetFreedomScore2023');
    const democracyIndex = unpack3(data, 'DemocracyIndex2023');

    const scaledPopulation = population.map(pop => Math.sqrt(pop) * .1);

    const colors = ['#rgb (0, 119, 182)', 'rgb (193, 18, 31)', 'rgb (255, 214, 10)', 'rgb (128, 237, 153)']; // Example colors
    const numColors = colors.length;

    // Map countries to colors in a cyclical manner
    const countryColors = {};
    countries.forEach((country, index) => {
        countryColors[country] = colors[index % numColors];
    });

    const trace = {
        x: internetFreedomScore,
        y: democracyIndex,
        mode: 'markers',
        marker: {
            size: scaledPopulation,
            color: countries.map(country => countryColors[country]),
            sizemode: 'area',
            sizeref: 1 // Adjust as needed
        },
        text: countries,
        type: 'scatter'
    };
    var layout3 = {
        title: 'Internet Freedom Score vs Democracy Index',
        xaxis: {
            title: 'Internet Freedom Score'
        },
        yaxis: {
            title: 'Democracy Index'
        },
        height: 600,
        font: {

            size: 15,
            color: 'rgb(80,80,80)'
          },

        annotations: [
            {
                x: 1.1,
                y: 1.07,
                xref: 'paper',
                yref: 'paper',
                text: 'Bubble size represents population',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'black'
                    
                }
            },
            {
                x: 0,
                y: -0.3,
                xref: 'paper',
                yref: 'paper',
            //     x: 0,
            // xanchor: 'right',
            // y: 1.07,
            // yanchor: 'bottom',
                text: 'Democracy Index: Our World in Data',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(80,80,80)'
                }
            }
        ],
        margin: {
            l: 50,
            r: 50,
            b: 150,
            t: 100,



        }
    
    };

    Plotly.newPlot('chart3', [trace], layout3);
});
