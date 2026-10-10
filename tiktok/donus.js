// TikTok izninden sonra gelen kodu ekranda gösterir; hiçbir yere göndermez.
// Kod adres çubuğundan ve tarayıcı geçmişinden silinir.
const adres = new URL(location.href);
const kod = adres.searchParams.get('code');
const hata = adres.searchParams.get('error');
history.replaceState(null, '', adres.pathname);

const $ = (id) => document.getElementById(id);

if (kod) {
  const metin = `code=${encodeURIComponent(kod)}&state=${encodeURIComponent(adres.searchParams.get('state') || '')}`;
  $('baslik').textContent = 'İzin verildi';
  $('aciklama').textContent = 'Aşağıdaki metni kopyalayıp Claude\'a gönder. Kod birkaç dakika içinde geçersiz olur.';
  $('kod').textContent = metin;
  $('kod').hidden = false;
  $('kopyala').hidden = false;
  $('kopyala').addEventListener('click', async () => {
    await navigator.clipboard.writeText(metin);
    $('kopyala').textContent = 'Kopyalandı';
  });
} else if (hata) {
  $('baslik').textContent = 'İzin verilmedi';
  $('aciklama').textContent = `TikTok bir hata döndürdü: ${hata}. Bağlantıyı yeniden açıp tekrar dene.`;
}
