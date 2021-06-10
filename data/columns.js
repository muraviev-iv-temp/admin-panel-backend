const { states } = require('./states')
module.exports.columns = [    
    {
        id: 1,
        title: "Номер",
        type: "text",
        field: "number"
    },
    {
        id: 2,
        title: "Дата",
        type: "date",
        sortable: true,
        field: "date",
        filterable: true
    },
    {
        id: 3,
        title: "Статус",
        type: "enum",
        sortable: true,
        field: "state",
        filterable: true,
        values: states
    },
    {
        id: 4,
        title: "Позиций",
        type: "number",
        sortable: true,
        field: "count"
    },
    {
        id: 5,
        title: "Сумма",
        type: "sum",
        sortable: true,
        field: "sum",
        filterable: true
    },
    {
        id: 6,
        title: "ФИО покупателя",
        type: "text",
        field: "clientName"
    }
];
