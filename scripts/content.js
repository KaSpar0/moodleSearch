const sites = document.querySelectorAll('.boxwidthwide')[1].querySelector('ul');

const csvArray = [['Nazwa strony', 'Link', 'Wersja Moodle']];

[].forEach.call(sites.children, function (site) {
  if (site.querySelectorAll('a').length === 0) {
    csvArray.push([site.textContent, '', '']);
  } else if (site.querySelectorAll('a').length === 1) {
    const url = site.querySelector('a').getAttribute('href');
    csvArray.push([site.querySelector('a').textContent, url, '']);
  } else if (site.querySelectorAll('a').length === 2) {
    csvArray.push([
      site.querySelectorAll('a')[1].textContent,
      site.querySelectorAll('a')[1].getAttribute('href'),
      '',
    ]);
  }
});

const downloadCsv = function () {
  const csvContent = csvArray
    .map((arr) => {
      return arr
        .map((el) => {
          if (typeof el != 'string') return '';
          return el.replaceAll(',', '');
        })
        .join(',');
    })
    .join('\n')
    .replaceAll();

  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'Moodle Sites.csv';
  hiddenElement.click();
};

sites.insertAdjacentHTML(
  'afterbegin',
  `
    <button id="download-file">Download CSV File</button>
  `
);
document.getElementById('download-file').addEventListener('click', downloadCsv);
