// Use the D3 library to read in samples.json.
let globalData = [] 

d3.json('samples.json').then(data => {
    globalData = data
    init(globalData);
}) 

function optionChanged(subjectID) {

    var dropdownID = globalData.samples.findIndex(s => s.id == subjectID)
   
    init(globalData, dropdownID);
}

function init(data, index = 0) {

    let otuData = data.samples[index].otu_ids;

    let otuIDs = []

    for (let j = 0; j < otuData.length; j++) {[
        otuID = `OTU ${otuData[j]}`,
        otuIDs.push(otuID)
    ]};

    let sampleValues = data.samples[index].sample_values;

    let otuLabels = data.samples[index].otu_labels;
  
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    let otuBarIDs = otuIDs.slice(0, 10).reverse();

    let sampleBarValues = sampleValues.slice(0, 10).reverse();

    let otuBarLabels = otuLabels.slice(0, 10).reverse();

    let barData = [{
        x: sampleBarValues,
        y: otuBarIDs,
        type: 'bar',
        orientation: 'h',
        text: otuBarLabels  
    }];
    
    let barLayout = {
        title: "Top 10 OTUs Found",
        xaxis: { title: "Number Found"},
        yaxis: { title: "OTU ID"}
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Create a bubble chart that displays each sample.
    let bubbleData = [{
        x: otuData,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuData 
        }
      }];
      
    let bubbleLayout = {
        title: 'OTU Results',
        xaxis: { title: 'OTU ID'},
        yaxis: { title: 'Number Found'},
      };
      
    Plotly.newPlot('bubble',bubbleData, bubbleLayout);

    // Display the sample metadata, i.e., an individual's demographic information.
    let metadata = data.metadata[index];
    
    let metaKeys = Object.keys(metadata);

    let metaValues = Object.values(metadata);

    let rowText = []
    
    // Clear existing table
    d3.select('#sample-metadata').html("");

    for (let j = 0; j < metaKeys.length; j++) {
        let row = `${metaKeys[j]}: ${metaValues[j]}`
        rowText.push(row)
    };

    d3.select('#sample-metadata').selectAll('tr')
        .data(rowText)
        .enter()
        .append('tr')
        .text(d => d)

     // Update all of the plots any time that a new sample is selected.
    let idDropdown = []

    data.samples.forEach(s => idDropdown.push(s.id))

    d3.select('#selDataset').selectAll('option')
        .data(idDropdown)
        .enter()
        .append('option')
        .text(d => d)
};

