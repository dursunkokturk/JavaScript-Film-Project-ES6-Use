class Storage
{

    static AddFilmToStorage (NewFilm)
    {
        // Film Kontrol Etme İşlemini Çağırıyoruz
        let Films = this.GetFilmsFromStorage();

        // Eklenmek İstenen Film Bilgilerinin Kontrolünü Yaptık
        // Eklenmek İstenen Film Bilgileri Yoksa İse Storage'da Boş Yer Açtık
        // Eklemek İstediğimiz Film Bilgilerini Eklerken Daha Önceden 
        // Kayıtlı Olan Değer Varsa Onun Üzerine Değil 
        // Ondan Sonraki Sıraya Eklenmesi Gerekiyor

        // Bu Kısımda Eklenen Film Bilgileri String Olarak Değil Obje Olarak Ekleniyor
        Films.push(NewFilm);

        // Storage'a Film Bilgileri Obje Olarak Kaydedilemeyeceğinden 
        // String Tipine Çevirmek Gerekiyor
        localStorage.setItem("Films",JSON.stringify(Films));
    }

    // Film Bilgilerini Kontrol Etme İşlemini Farklı Yerlerde 
    // Tekrar Kullanma Durumu Olabileceğinden 
    // Aynı Kodları Tekrar Tekrar Yazmaya Gereke Kalmaması İçin 
    // Ekleme İşlemini İhtiyaç Olduğunda Çağırılarak Kullanılabilmesi
    // İçin Fonksiyon Haline Getirmek Avantajlı Bir Durumdur
    static GetFilmsFromStorage()
    {
        /*
        // Film Ekleme İşleminin Eklenip Eklenmediğinin Kontrolü
        console.log(NewFilm);
        */

    let Films;
    // Storage'a Eklenmek İstenen Film Bilgilerinin Atandığı 
    // ' Films ' Değişkeni Üzerinden 
    // Storage'da Varmı Diye Bakılacak
    // Eğer Yoksa İse Storage'da Boş Bir Yer Açılacak
    if (localStorage.getItem("Films") === null)
    {
        Films = [];
    }
    else
    {
        // Eklenmek İstenen Film Bilgileri Storage'da Varsa Bu Bilgileri
        // Array Tipinde Alıyoruz
        Films = JSON.parse(localStorage.getItem("Films"));
    }

    return Films;
    }

    // 'storage.js' Dosyasında Storage'daki Film Bilgilerini
    // Storage'dan Silmek İçin ve Silme İşleminin Daha Hızlı Olması İçin
    // Storage'a 'DeleteFilmFromStorage' Fonksiyonu Oluşturup
    // Arayüzdeki Film Bilgilerini Storage'da Olanlar İle 
    // Karşılaştırıp Silmesi İçin 'DeleteFilmFromStorage' Fonksiyonu 
    // Üzerinden Arayüzdeki Film Bilgilerini Gönderiyoruz
    static DeleteFilmFromStorage(FilmTitle)
    {
        // Daha Önceden Düzenlediğimiz GetFilmFromStorage Fonksiyonunu Kullanarak 
        // Array Tipinde Storage'da Kayıtlı Olan Film Bilgilerini Alıyoruz
        let Films = this.GetFilmsFromStorage();

        // Storage'da Kayıtlı Film Bilgileri 
        // Üzerinde Tarama Yapmamız Gerekiyor
        Films.forEach(function(film,index)
        {
            // Arayüzde Silmek İstediğimiz Film Bilgilerinde 
            // Film Adı Storage'daki Film Adı İle Aynı İse Silme İşlemi Yapılıyor
            if(film.title === FilmTitle)
            {
                Films.splice(index,1);
            }
        });

        // Seçili Olan Film Silme İşleminden Sonra 
        // Geride Kalan Film Bilgilerini Arayüzde Görüntülüyuruz
        localStorage.setItem("Films",JSON.stringify(Films));
    }

    // 'storage.js' Dosyasında Storage'da Yer Alan
    // Tüm Film Bilgilerini Silmek İçin Storage'a 
    // 'ClearAllFilmsFromStorage' Fonksiyonu
    // İle Silme İşlemi İçin Komut Gönderiliyor
    static ClearAllFilmsFromStorage()
    {
        // Storage'da Yer Alan Film Bilgilerinin 
        // Key Bilgisi 'films' Olduğu İçin 
        // Key Bilgisini Sildiğimiz Anda Tüm Filmler Silinecek
        localStorage.removeItem("Films");
    }

}