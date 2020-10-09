// Use the D3 library to read in samples.json.
d3.json('samples.json').then(data => {

    console.log(data);

    var dataSample = data.samples[0]
    console.log(dataSample)

    var id = data.samples[0].id;
    console.log(id)

    var otuData = data.samples[0].otu_ids.slice(0, 10).reverse();
    console.log(otuData)

    let otuIDs = []

    for (let j = 0; j < otuData.length; j++) {[
        otuID = `OTU ${otuData[j]}`,
        otuIDs.push(otuID)
    ]};
    console.log(otuIDs)

    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    console.log(sampleValues)

    var otuLabels = data.samples[0].otu_labels.slice(0, 10).reverse();

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    barData = [{
        x: sampleValues,
        y: otuIDs,
        type: 'bar',
        orientation: 'h',
        text: otuLabels  
    }];
    
    var barLayout = {
        title: "Top 10 OTUs Found",
        xaxis: { title: "Number Found"},
        yaxis: { title: "OTU ID"}
    };

    Plotly.newPlot("bar", barData, barLayout);

});
