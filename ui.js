// Arayüz İşlemleri Bu Kısımda Yapılıyor

// Film İle İlgili Bilgileri Site İçinde Girmek İçin Constructor'a İhtiyacımız Var
// Yapılacak İşlemler Class İçinde Oluşturulacak Constructor'da Yapılacak
class UI
{

    // ' project.js ' Dosyasında Oluşturulan Yeni Film Ekleme Fonksiyonunun Sonucu Bu Kısıma Alınıyor
    static AddFilmToUI (NewFilm)
    {
        /*
        // Bu Kod Yapılan İşlemin Çalışma Kontrolü İçin Kullanılanılır
        //  ve F12 İle Gidilen Konsol Ekranında İşlem Başarılı
        //  Mı Diye Kontrol Edilir
        console.log(NewFilm);
        */

    /*
    // Bu Yapıyı Kodlama İle Tekrar Bu Hale Getireceğiz
    <!-- <tr>
    <td><img src="" class="img-fluid img-thumbnail"></td>
    <td></td>
    <td></td>
    <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
    </tr> -->
    */

        // İlk Olarak Film Bilgilerinin Olduğu Tabloyu Seçmek Gerekiyor
        // Bunun İçin Tablonun ID'si ' films ' Olan ' tbody ' yi Seçiyoruz
        const FilmList = document.getElementById("films");
        
        /*
        // Film Bilgilerinin Arayüze Eklenmesi İçin 
        // Ekleme İşleminin Yapılacağı Tablonun Seçilip 
        // Seçilmediğinin Kontrolünü Yapıyoruz
        // Ekranda ' tbody ' ve tbody'nin ' id ' si' 
        // Olan films'i Görürsek Seçilme İşlemi Yapılmış Demektir
        // Yazısı Görünürse 
        // Seçme İşlemi Yapılmış Demektir
        console.log(FilmList);
        */

        // Film Bilgilerini Arayüze Yazdırmamız Gerekiyor Bu Aşamada
        // Yeni Film Bilgileri Eklendikçe Daha Önce Eklenen Bilgilerin Silinmesini 
        // Engellemek İçin ' += ' Kullanıyoruz

        // Arayüze Yazdırma İşleminde Bilginin Alınacağı Yerin 
        // Adının Kendi İsteğimize Göre Verdiğiz Adının Yerine 
        // kod Ekranındaki Halinin Yazılması Gerekiyor
        // NewFilm.URL Değil NewFilm.url Gibi Olması Gerekiyor
        FilmList.innerHTML += 
                `<tr>
                    <td><img src="${NewFilm.url}" class="img-fluid img-thumbnail"></td>
                    <td>${NewFilm.title}</td>
                    <td>${NewFilm.director}</td>
                    <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
                </tr>`
    }

    // Film Bilgilerini TextBox Kutusuna Girdikten Sonra Ekle Tuşuna Basıldığında 
    // TextBox Kutularının Silinmesini İstiyorsak Yapılması Gereken Bir İşlemdir
    static clearInputs (Element1,Element2,Element3)
    {
        Element1.value = "";
        Element2.value = "";
        Element3.value = "";
    }

    static displayMessages (message,type) 
                                            // 'message' Kısmı Görüntülenecek Olan Mesaj
                                            // 'type' Kısmı Görüntülenecek Olan Mesajın Tipi
    {
        // Hata Mesajının 'div' Kodunu Eklemek İçin
        // Class'ı '.card-body' Olan İlk 'div' Elementini Seçiyoruz
        const CardBody = document.querySelector(".card-body");

        // 'div' Elementini Oluşturuyoruz
        const Div = document.createElement("div");

        // Oluşturduğumuz 'div' Elementinin Değerlerini Giriyoruz
        // O Anki Duruma Göre Çıkacak Uyarının 
        // Tipinin Belirlenmesini Otomatik Hale Getiriyoruz
        Div.className = `alert alert-${type}`;

        // Uyarının Mesajında Ekranda Görünecek Mesaj
        Div.textContent = message;

        // Oluşturduğumuz ve Değerlerini Eklediğimiz 'div' Elementini
        // Class 'ı '.card-body' Olan İlk 'div' Elementinin Alt Elemanı Olarak Ekliyoruz
        CardBody.appendChild(Div);

        // Ekrandaki Uyarı Mesajının Süresi
        setTimeout 
        (
            function()
            {
                Div.remove();
            },1000
        );
    }

    // Storage'da Yer Alan Film Bilgilerini Arayüze Ekliyoruz
    static LoadAllFilms (films)
    {
        // Storage'ki Film Bilgilerini Arayüze Yüklerden Bilgilerin 
        // Görüntülenmesi İçin Görüntülenmesini İstediğimiz Tabloyu
        // Seçmek Gerekiyor Bunun İçin index.html de 
        // ID'si 'films' Olan 'tbody'yi Yani Tabloyu Seçiyoruz
        const FilmList = document.getElementById("films");

        // Storage'da Yer Alan Film Bilgilerini Arayüze Eklemek İçin
        // Tek Tek Taramak Gerekiyor
        films.forEach(function(film)
        {
            // Storage'daki Film Bilgilerini 'FilmList'in 'İnnerHTML' Özelliğine Gönderiyoruz
            FilmList.innerHTML +=
                    `<tr>
                            <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>
                            <td>${film.title}</td>
                            <td>${film.director}</td>
                            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
                    </tr>`;
        });
    }

    static DeleteFilmFromUI (Element)
    {
        // Film Sil Tuşunun Bulunduğu Satırın Tümünü Seçip Kaldırıyor
        Element.parentElement.parentElement.remove();
    }

    // 'ui.js' Dosyasında Arayüzde Yer Alan Tüm Film Bilgilerini Silmek İçin
    // 'ui'a 'ClearAllFilmsFromUI' Fonksiyonu İle Film
    // Bilgilerinin Girildiği Tabloyu Seçerek Gönderiyoruz
    static ClearAllFilmsFromUI()
    {
        // Arayüzde Film Bilgilerinin Girildiği Tabloyu Seçmemiz Gerekiyor
        const FilmList = document.getElementById("films");

        /*
        // Arayüzde Yer Alan Film Bilgilerinin Hepsi Silmek İçin 
        // Kullanılabilecek Yöntemlerden Birisidir
        // Ancak Bu Yöntem Biraz Yavaş Çalışan Bir Yöntemdir
        FilmList.innerHTML = "";
        */

        // 'ui.js' Dosyasında Arayüzdeki Film Bilgilerini Silmek İçin
        // 'while' Döngüsü Kullanarak Arayüzde Film Bilgisi Varmı Diye
        // İlk Sırada Başlayarak Kontrol Edecek
        while(FilmList.firstElementChild !== null)
        {
            // İlk Sırada Film Bilgisi Varsa Bu Bilgiyi Silecek
            // Bu İşlem Tüm Film Bilgilerini Silene Kadar Devam Edecek
            FilmList.firstElementChild.remove();
        }
    }

}