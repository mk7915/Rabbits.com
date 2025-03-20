document.addEventListener('DOMContentLoaded', function () {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    createCalendar(currentYear, currentMonth);
    loadCalendarData();  // ロード時にカレンダーデータを読み込む
});

function createCalendar(year, month) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let calendarHTML = '';
    for (let i = 0; i < 2; i++) {
        let displayMonth = (month + i) % 12;
        let displayYear = year + (month + i >= 12 ? 1 : 0);
        let firstDay = new Date(displayYear, displayMonth, 1).getDay();
        let daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

        calendarHTML += `<div class="monthly-calendar"><table class="calendar"><caption>${monthNames[displayMonth]} ${displayYear}</caption><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody><tr>`;

        for (let j = 0; j < firstDay; j++) {
            calendarHTML += '<td class="weekday"></td>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let cellClass = 'weekday'; // Default class
            if ((firstDay + day - 1) % 7 === 0) {
                cellClass = 'sun';
                if (day > 1) calendarHTML += '</tr><tr>';
            } else if ((firstDay + day - 1) % 7 === 6) {
                cellClass = 'sat';
            }
            calendarHTML += `<td class="${cellClass}" data-day="${displayMonth}-${day}-${displayYear}">${day}</td>`;
        }

        calendarHTML += '</tr></tbody></table></div>';
    }
    document.getElementById('calendar-container').innerHTML = calendarHTML; // この行を確実に追加

    document.querySelectorAll('#calendar-container td').forEach(td => {
        td.addEventListener('click', function () {
            let currentText = this.textContent;
            let input = prompt("この日は活動日ですか？", currentText);
            if (input !== null) { // キャンセルされていない場合のみ処理を進める
                if (input !== "") {
                    this.textContent = input;
                    this.classList.add('marked-day'); // 新しいマーカースタイルを適用
                    saveCalendarData(this.dataset.day, input);  // 入力データを保存
                } else {
                    // 入力が空文字の場合、元の日付のみを表示し、マークを削除
                    this.textContent = currentText.match(/^\d+$/g) ? currentText : currentText.split(" ")[0]; // 日付だけを表示
                    this.classList.remove('marked-day'); // マーカースタイルを削除
                    localStorage.removeItem(this.dataset.day);  // ローカルストレージからデータを削除
                }
            }
        });
    });
}

function saveCalendarData(date, input) {
    localStorage.setItem(date, input);
}

function loadCalendarData() {
    document.querySelectorAll('#calendar-container td').forEach(td => {
        let savedData = localStorage.getItem(td.dataset.day);
        if (savedData) {
            td.textContent = savedData;
            td.classList.add('marked-day'); // 保存されたデータがある日付にマーカースタイルを再適用
        } else {
            td.classList.remove('marked-day'); // 保存されたデータがない場合はマーカースタイルを削除
        }
    });
}

