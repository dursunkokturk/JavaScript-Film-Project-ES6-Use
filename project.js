// Film İle İlgili Bilgileri Girip Tabloya Eklemek İçin 
// İlk Olarak Bilgileri Girdiğimiz Formu Seçmek Gerekiyor
const Form = document.getElementById("film-form");

// Film Adını Gireceğimiz TextBox Kutusunu Seçiyoruz
const TitleElement = document.querySelector("#title");

// Film Yönetmenini Gireceğimiz TextBox Kutusunu Seçiyoruz
const DirectorElement = document.querySelector("#director");

// Film URL 'sini Gireceğimiz TextBox Kutusunu Seçiyoruz
const URLElement = document.querySelector("#url");

// Film Bilgilerinin Yazılı Girildiği Tablotu Seçiyoruz
// Bu Kısımda Amaç Film Bilgilerini Arayüzden Silmek
const CardBody = document.querySelectorAll(".card-body")[1];

// Tüm Filmleri Sil Butonuna Basıldığında 
// Arayüzde ve Storage'da Yer Alan 
// Film Bilgilerini Silmek İçin Tüm Filmleri Sil 
// Butonunu Seçmek Gerekiyor
// Tüm Filmleri Sil Botununu ID'sini Kullanarak Seçiyoruz
const Clear = document.getElementById("clear-films");

//Tüm Eventleri Başlatma
AllEventListeners();

function AllEventListeners()
{
    // Ekleme Butonuna Tıklandığında Ekleme İşlemini Yaptıracak
    Form.addEventListener("submit",AddFilm);

    document.addEventListener("DOMContentLoaded",function()
    {
        // Storage'a Eklenen Filmleri 'storage.js' Dosyasındaki 
        // Film Ekleme Aşamasındaki Tekrar Tekrar Yapılacak
        // İşlemi Tek Fonksiyona Çevirme Kısmındaki Fonksiyonu Çağırarak
        // Storage daki Film Bilgilerini Array Olarak Çağırıyoruz
        let Films = Storage.GetFilmsFromStorage();

        // Storage'dan Array Tipinde Aldığımız Bilgileri Arayüze Gönderiyoruz
        UI.LoadAllFilms(Films);
    });

    // Filmi Arayüzden Silmek İçin İlk Olarak Silme İşleminin 
    // Yapılacağı Tabloyu Seçiyoruz
    CardBody.addEventListener("click",DeleteFilm);

    // Arayüzde Tüm Filmleri Sil Botonuna Basıldığında 
    // Tüm Filmleri Sil Fonksiyonu Çalıştırılacak
    Clear.addEventListener("click",ClearAllFilms);
}

function AddFilm(Event)
{
    // Film Adının Yazılı Olduğu TextBox Kutusundaki Değeri Alıyoruz
    const Title = TitleElement.value;

    // Film Yönetmeninin Yazılı Olduğu TextBox Kutusundaki Değeri Alıyoruz
    const Director = DirectorElement.value;

    // Film URL sinin Yazılı Olduğu TextBox Kutusundaki Değeri Alıyoruz
    const URL = URLElement.value;

    // Film Adı Yönetmen Adı Yada URL nin 
    // Yazılı Olduğu TextBox lardan 
    // Herhangi Biri Boş İse Hata Verecek
    if (Title === "" || Director === "" || URL === "")
    {
        // Hata
        UI.displayMessages("Tüm Alanları Doldurmanız Gerekiyor","danger");
    }

    // Film Adı Yönetmen Adı Yada URL nin Yazılı Olduğu 
    // TextBox lardan Herhangi Biri Boş Değil İse
    // Film Ekleme İşlemi Yapılacak

    // Daha Önceden ' film.js ' Dosyasında Oluşturulan Film Constructor'ında 
    // Film Adı İçin Title 
    // Film Yönetmen İçin Director ve 
    // Film Linki İçin URL Kullanılmıştı
    else
    {
        // Film Bilgilerini Eklemek İçin film.js
        // Dosyasında Oluşturulan ' film ' constructor'ından
        // Title , Director ve URL Bilgilerini Alıyoruz
        const NewFilm = new Film(Title,Director,URL);

        // Arayüze Film Ekleme İşlemi Yapılıyor
        UI.AddFilmToUI(NewFilm);

        // Eklenen Film Bilgilerini Storage'a Ekler
        Storage.AddFilmToStorage(NewFilm);

        // Film Ekleme İşlemi Aşamasında Herhangi 
        // Bir Sorun Çıkmazsa Ekranda Çıkacak Uyarı Mesajı
        UI.displayMessages("Film Başarılı Bir Şekilde Eklendi","success");
    }

    UI.clearInputs(TitleElement,DirectorElement,URLElement);

    Event.preventDefault();
}

// Arayüzden Filmi Sil Tuşuna Basıldığında Filmi Silmek İstiyoruz
function DeleteFilm(Event)
{
    // ID'si 'delete-film' Olan Tuşu Basılırsa Film Silinecek
    if (Event.target.id === "delete-film")
    {
        UI.DeleteFilmFromUI(Event.target);

        // Arayüzde Silmek İçin Seçilen Filmin Bilgilerini 
        // 'storage.js' Dosyasındaki Silme Fonksiyonuna 
        // DeleteFilmFromStorage Fonksiyonunu Gönderiyoruz
        Storage.DeleteFilmFromStorage(Event.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        /*
        // Storage'da Kayıtlı Olan Filmi Silme İşlemini Yapıyoruz
        // Bu İşlemi Yaparken Filmi Sil Butonunun
        // Olduğu Satırın Tamamını Seçmemiz Gerekiyor
        // Bu İşlemin Doğru Olup Olmadığını Kontrol Ediyoruz
        console.log(Event.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        */
        UI.displayMessages("Silme İşlemi Başarılı","success");
    }
}

// Film Bilgilerini Arayüzden ve Storage'dan Silmek İçin 
// 'ui.js' ve 'storage.js' Dosyalarına 
// Gereken Fonksiyon Yönlendirmelerini Yapıyoruz
function ClearAllFilms()
{
    if (confirm("Tüm Filmleri Silmek İstediğinizden Emin Misiniz?"))
    {
    // Tüm Film Bilgilerini Arayüzden Silmek İçin
    // 'ui.js' Dosyasındaki Silme Fonksiyonuna İşlemi Gönderiyoruz
    UI.ClearAllFilmsFromUI();

    // Tüm Film Bilgilerini Storage'dan Siliyoruz
    Storage.ClearAllFilmsFromStorage();
    }
}