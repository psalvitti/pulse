$(document).ready(function () {

  $.get("/static/data/tables/https/agencies.json", function(data) {
    renderTable(data.data);
  });

  alert('agencies')

  var renderTable = function(data) {
    $("table").DataTable({
      responsive: true,
      initComplete: Utils.searchLinks,

      data: data,

      columns: [
        {
          data: "Agency",
          render: Utils.linkAgency
        },
        {
          data: "Number of Domains",
          render: Utils.filterAgency("https")
        },
        {data: "Uses HTTPS"},
        {data: "Enforces HTTPS"},
        {data: "Strict Transport Security (HSTS)"},
        {data: "SSL Labs (A- or higher)"}
      ],

      // order by number of domains
      order: [[1, "desc"]],

      columnDefs: [
        {
          targets: 0,
          cellType: "td",
          createdCell: function (td) {
            td.scope = "row";
          }
        },
        {
          render: Utils.progressBar,
          targets: [2,3,4,5],
        }
      ],

      "oLanguage": {
        "oPaginate": {
          "sPrevious": "<<",
          "sNext": ">>"
        }
      },

      dom: 'Lftrip'

    });
  };

});
