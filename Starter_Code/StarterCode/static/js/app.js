// Load the data from the JSON file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function(data){ 

        // Get the necessary data for the chart
        var sample_values = data.samples[0].sample_values.slice(0, 10);
        var otu_ids = data.samples[0].otu_ids.slice(0, 10);
        var otu_labels = data.samples[0].otu_labels.slice(0, 10);

        // Sort the data in ascending order
        var sortedIndices = sample_values.map((_, index) => index).sort((a, b) => sample_values[a] - sample_values[b]);
        sample_values = sortedIndices.map(index => sample_values[index]);
        otu_ids = sortedIndices.map(index => otu_ids[index]);
        otu_labels = sortedIndices.map(index => otu_labels[index]);

        // Create the trace for the bar chart
        var trace = {
        x: sample_values,
        y: otu_ids.map(function(id) {
            return "OTU " + id;
        }),
        text: otu_labels,
        type: "bar",
        orientation: "h"
        };

        // Create the data array
        var data = [trace];

        // Set the layout for the chart
        var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        // Render the chart using Plotly.js
        Plotly.newPlot("bar", data, layout);
    })

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function(data) {
        // Get the necessary data for the chart
        var otu_ids = data.samples[0].otu_ids;
        var sample_values = data.samples[0].sample_values;
        var markerSize = data.samples[0].sample_values;
        var markerColors = data.samples[0].otu_ids;
        var textValues = data.samples[0].otu_labels;

        // Create the trace for the bubble chart
        var trace = {
        x: otu_ids,
        y: sample_values,
        text: textValues,
        mode: "markers",
        marker: {
            size: markerSize,
            color: markerColors,
            colorscale:'Viridis'
        }
        };

        // Create the data array
        var data = [trace];

        // Set the layout for the chart
        var layout = {
            title: "Bacteria Cultures per Sample",
            xaxis: { title: "OTU IDs" },
            yaxis: { title: "Sample Values", range: [0, Math.max(...sample_values) + 100] }
            };

        // Render the chart using Plotly.js
        Plotly.newPlot("bubble", data, layout);
    })


    // Load the data from the JSON file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function(data) {
        // Get the test subject IDs
        var testSubjectIds = data.names;

        // Select the test subject ID dropdown
        var testSubjectDropdown = d3.select("#selDataset");

        // Add options to the dropdown
        testSubjectDropdown.selectAll("option")
          .data(testSubjectIds)
          .enter()
          .append("option")
          .attr("value", function(d) {
            return d;
          })
          .text(function(d) {
            return d;
          });

        // Set the default option
        var defaultId = testSubjectIds[0];
        testSubjectDropdown.property("value", defaultId);

        // Initialize the page with the default data
        optionChanged(defaultId);
    })

    function optionChanged(selectedId) {
        // Fetch the metadata from the JSON file
        d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
          .then(function(data) {
            // Find the metadata for the selected ID
            var metadata = data.metadata.find(obj => obj.id == selectedId);
  
            // Select the sample-metadata div
            var sampleMetadata = d3.select("#sample-metadata");
  
            // Clear any existing metadata
            sampleMetadata.html("");
  
            // Display each key-value pair in the metadata
            Object.entries(metadata).forEach(([key, value]) => {
              var capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the key
              sampleMetadata.append("p").text(`${capitalizedKey}: ${value}`);
            });
          })}