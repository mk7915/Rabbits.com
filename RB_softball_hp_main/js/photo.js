// 画像のソース配列を仮定
var images = ["1.jpg", "2.jpg", "3.jpg"];

function openModal(src, index) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = src.split('/').pop(); // 画像名をキャプションとして使用

    // 左矢印の動作
    document.querySelector('.arrow.left').onclick = function() {
        if (index > 0) {
            openModal(images[index - 1], index - 1);
        }
    };
    
    // 右矢印の動作
    document.querySelector('.arrow.right').onclick = function() {
        if (index < images.length - 1) {
            openModal(images[index + 1], index + 1);
        }
    };

    // モーダルを閉じる
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function(event) { 
        event.stopPropagation(); // イベントの伝播を防止
        modal.style.display = "none";
    }
}

// 画像エレメントにイベントリスナーを設定する例
document.querySelectorAll('.image').forEach((img, idx) => {
    img.onclick = function() {
        openModal(this.src, idx);
    };
});



