function ImportConveYourReport(url) {
  let json = UrlFetchApp.fetch(url);
  let res = JSON.parse(json.getContentText());
  if (!res || res.status !== 'ok' || !res.data) {
    return `failed: ${res.message}`;
  }

  let data = res.data;
  let headers = [];

  let dataRows = data.data || [];
  let sheetRows = [];
  let addSheetRow = row => {
    const sheetRow = headers.map(header => {
      let value = row[header];
      return value === undefined ? null : value;
    })
    console.log(sheetRow)
    sheetRows.push(sheetRow)
  };


  if (data.fields) {
    headers = Object.keys(data.fields);
  }
  else {
    headers = Object.keys(dataRows[0] || []);
  }

  dataRows.forEach(addSheetRow)

  sheetRows.unshift(headers)

  return sheetRows

}
