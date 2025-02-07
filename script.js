let oyunAlani;
let babaanne;
let tokat;
let puanGosterge;
let babaanneFirlama;
let carpmaSesi;
let tokatSesi;
let oyunBitti;
let sonPuan;
let dokunulmazlikUyari;
let canlar;
let bonusSesi;

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

window.addEventListener('load', function() {
    oyunAlani = document.getElementById("oyunAlani");
    babaanne = document.getElementById("babaanne");
    tokat = document.getElementById("tokat");
    puanGosterge = document.getElementById("puan");
    babaanneFirlama = document.getElementById("babaanneFirlama");
    carpmaSesi = document.getElementById("carpmaSesi");
    tokatSesi = document.getElementById("tokatSesi");
    oyunBitti = document.getElementById("oyunBitti");
    sonPuan = document.getElementById("sonPuan");
    dokunulmazlikUyari = document.getElementById("dokunulmazlikUyari");
    canlar = document.getElementById("canlar");
    bonusSesi = document.getElementById("bonusSesi");

    setSeviye('kolay'); // Başlangıç seviyesi
});
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

function luckyBlockOlustur() {
    let luckyBlock = document.createElement("img");
    luckyBlock.src = "luckyblock.png";
    luckyBlock.classList.add("luckyBlock");
    luckyBlock.style.left = Math.random() * (oyunAlani.clientWidth - 50) + "px";
    oyunAlani.appendChild(luckyBlock);
    luckyBlocklar.push(luckyBlock);

    let luckyBlockInterval = setInterval(() => {
        luckyBlock.style.top = (luckyBlock.offsetTop + tirHizi) + "px";

        if (carpistiMi(babaanne, luckyBlock)) {
            bonusSesi.play();
            luckyBlock.remove();
            clearInterval(luckyBlockInterval);
            luckyBlockEtkisi();
        }

        if (luckyBlock.offsetTop > oyunAlani.clientHeight) {
            luckyBlock.remove();
            clearInterval(luckyBlockInterval);
        }
    }, 30);
}

function luckyBlockEtkisi() {
    let etkiler = [-50, -100, -150, -200, 50, 0, 100, 200];
    let rastgeleEtki = etkiler[Math.floor(Math.random() * etkiler.length)];

    if (rastgeleEtki < 0) {
        puan += rastgeleEtki;
        puanGosterge.innerText = "Puan: " + puan;
        alert("Lucky Block'tan " + rastgeleEtki + " puan!");
    } else if (rastgeleEtki > 0) {
        puan += rastgeleEtki;
        puanGosterge.innerText = "Puan: " + puan;
        alert("Lucky Block'tan " + rastgeleEtki + " puan!");
    } else if (rastgeleEtki === 0) {
        dokunulmazlik = true;
        dokunulmazlikSuresi = 10;
        dokunulmazlikUyari.style.display = "block";
        setInterval(dokunulmazlikSayac, 1000);
        alert("10 saniye dokunulmazlık!");
    }
}

function dokunulmazlikSayac() {
    if (dokunulmazlikSuresi > 0) {
        dokunulmazlikSuresi--;
        dokunulmazlikUyari.innerText = "DOKUNULMAZSIN! (" + dokunulmazlikSuresi + ")";
    } else {
        dokunulmazlik = false;
        dokunulmazlikUyari.style.display = "none";
    }
}

function canKaybet() {
    can--;
    canlar.innerHTML = "";
    for (let i = 0; i < can; i++) {
        let canImg = document.createElement("img");
        canImg.src = "canHakki.png";
        canImg.alt = "Can";
        canlar.appendChild(canImg);
    }

    if (can === 0) {
        oyunBittiGoster();
        setTimeout(() => {
            alert("Babaannenin canları bitti! Oyun bitti.");
            location.reload();
        }, 800);
    }
}

function oyunBittiGoster() {
    oyunBitti.style.display = "flex";
    sonPuan.innerText = "Puan: " + puan;
    }
function carpistiMi(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    // Küçük hitbox (her seviyede aynı)
    aRect.width = aRect.width * 0.7; // Hitbox'ı biraz küçültüyoruz
    aRect.height = aRect.height * 0.7;

    return !(aRect.top > bRect.bottom || aRect.bottom < bRect.top || aRect.right < bRect.left || aRect.left > bRect.right);
}

function tokatAt() {
    if (hareketEdiyor) {
        tokat.style.display = "block";
        tokatSesi.play();
        setTimeout(() => {
            tokat.style.display = "none";
        }, 200);
        hareketEdiyor = false;
        durmaSuresi = 100;
    }
}

function babaanneHareket(event) {
    if (durmaSuresi > 0) {
        durmaSuresi--;
        return;
    }

    let touch = event.touches[0];
    let hareketX = touch.clientX - dokunmaBaslangicX;
    babaanneX += hareketX;

    let minX = 0;
    let maxX = oyunAlani.clientWidth - babaanne.width;

    if (babaanneX < minX) {
        babaanneX = minX;
    } else if (babaanneX > maxX) {
        babaanneX = maxX;
    }

    babaanne.style.left = babaanneX + "px";
    dokunmaBaslangicX = touch.clientX;
    hareketEdiyor = true;
}

babaanne.addEventListener("touchstart", function (event) {
    dokunmaBaslangicX = event.touches[0].clientX;
});

babaanne.addEventListener("touchmove", babaanneHareket);
babaanne.addEventListener("touchend", tokatAt);
