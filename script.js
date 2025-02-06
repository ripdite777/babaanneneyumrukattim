let oyunAlani = document.getElementById("oyunAlani");
let babaanne = document.getElementById("babaanne");
let tokat = document.getElementById("tokat");
let puanGosterge = document.getElementById("puan");
let babaanneFirlama = document.getElementById("babaanneFirlama");
let carpmaSesi = document.getElementById("carpmaSesi");
let tokatSesi = document.getElementById("tokatSesi");
let oyunBitti = document.getElementById("oyunBitti");
let sonPuan = document.getElementById("sonPuan");
let dokunulmazlikUyari = document.getElementById("dokunulmazlikUyari");
let canlar = document.getElementById("canlar");
let bonusSesi = document.getElementById("bonusSesi");

let puan = 0;
let tirHizi = 5;
let seviyeler = {
    kolay: 3,
    normal: 5,
    zor: 8
};
let seviye = '';
let hitboxKucuk = true;
let hareketEdiyor = false;
let durmaSuresi = 0;
let dokunmaBaslangicX = 0;
let babaanneX = 0;
let dikenler = [];
let luckyBlocklar = [];
let can = 2;
let dokunulmazlik = false;
let dokunulmazlikSuresi = 0;

function setSeviye(yeniSeviye) {
    seviye = yeniSeviye;
    tirHizi = seviyeler[seviye];
    puan = 0;
    puanGosterge.innerText = "Puan: " + puan;
    clearDikenler();
    document.getElementById('seviyeSecim').style.display = 'none';
    oyunBaslat();
}

function oyunBaslat() {
    setInterval(tirOlustur, 1500);
    setInterval(ekleDiken, 2000);
    setInterval(luckyBlockOlustur, 12000);
}

function clearDikenler() {
    dikenler.forEach(diken => {
        diken.remove();
    });
    dikenler = [];
}

function ekleDiken() {
    if (seviye === 'zor') {
        let diken = document.createElement("img");
        diken.src = "diken.png";
        diken.classList.add("diken");
        diken.style.left = Math.random() * (oyunAlani.clientWidth - 30) + "px";
        oyunAlani.appendChild(diken);
        dikenler.push(diken);

        let dikenInterval = setInterval(() => {
            diken.style.top = (diken.offsetTop + tirHizi) + "px
