$(document).ready(function () {
    LoadCalendar();
});

var today = new Date();
var todayDay = today.getUTCDate();
var selectedMonth = (today.getMonth() + 1);
var todayFixMonth = (today.getMonth() + 1);
var todayYear = today.getFullYear();

const monthNames = [
    "","Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];


//função que irá carregar o calendário
function LoadCalendar() {
    //pega o mês atual
    document.getElementById('month').innerHTML = monthNames[selectedMonth];
    //pega o ano atual
    document.getElementById('year').innerHTML = todayYear;

    //monta a tabela com os dias do mes;
    LoadMonth(selectedMonth);
}

function LoadMonth(monthNumber) {
    //pega o dia da semana que é dia 1°
    //-1 pois semana começa no domingo
    var indexDay1 = new Date(todayYear + "-" + monthNumber + "-01").getDay();

    //arrumar o erro de 1 dia que da nos ultimos 3 meses do ano
    if (selectedMonth >= 10) {
        indexDay1 += 1;
    }

    //abre a primeira linha da tabela
    var tableDays = "<tr>";

    //pega o numero de dias do mes
    var numberDaysOfMonth = new Date(todayYear, monthNumber, 0).getDate();

    //contador para os dias do mes
    var contadorMonth = 0;

    for (var i = 0; i < 38; i++) {

        //realiza a quebra de linha ao chega no fim dos 7 dias
        if (i == 7 || i == 14 || i == 21 || i == 28 || i == 35) {
            tableDays += "</tr> <tr>"
        }

        //verifica em que dia começa o mes e coloca espaços em branco nos dias anteriores
        //tamvem verifica em que dia termina o mes e coloca os  respectivos espaços
        if (i < indexDay1 || contadorMonth > numberDaysOfMonth - 1) {
            tableDays += "<td>&nbsp;</td>";
        }
        else {
            //verifica qual é a data atual para colocar uma cor verde indicando
            if (selectedMonth == todayFixMonth && todayDay == (contadorMonth + 1)) {
                tableDays += "<td> <div id=\"today-day\">" + (contadorMonth + 1) + "</div></td>";
            }
            else {
                tableDays += "<td> " + (contadorMonth + 1) + "</td>";
            }
            
            contadorMonth++;
        }
    }

    //fecha a ultima linha da tabela
    tableDays += "</tr>";

    //atribui o body gerado ao html
    document.getElementById('calendarDays').innerHTML = tableDays;
}

function NextMonth() {
    //caso o mes seja 12 (Dezembro) volta para janeiro
    //senao vai para o proximo mes
    if (selectedMonth == 12) {
        selectedMonth = 1;

    }
    else {
        selectedMonth++;
    }

    //carrega o nome do novo mes
    document.getElementById('month').innerHTML = monthNames[selectedMonth];

    //carrega a tabela do novo mes
    LoadMonth(selectedMonth);
}


function PreviewMonth() {
    //caso o mes seja 1 (Janeiro) volta para dezembro
    //senao vai para o mes anterior
    if (selectedMonth == 1) {
        selectedMonth = 12;
    }
    else {
        selectedMonth--;
    }

    //carrega o nome do novo mes
    document.getElementById('month').innerHTML = monthNames[selectedMonth];

    //carrega a tabela do novo mes
    LoadMonth(selectedMonth);
}