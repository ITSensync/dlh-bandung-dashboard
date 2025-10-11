function convertToTime(isoDate) {
  if (!isoDate) {
    return "-"
  }
  const date = new Date(isoDate)

  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return time
}

function convertToDate(isoString) {

  const date = new Date(isoString)

  // Ambil tanggal berdasarkan hasil konversi WIB
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const result = `${day} ${getNamaBulan(month)} ${year}`

  return result
}

function getNamaBulan(bulan) {
  const namaBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  return namaBulan[parseInt(bulan) - 1]
}

function convertToNamedMonth(isoMonth) {
  const date = new Date(isoMonth + "-01")
  const options = { year: 'numeric', month: 'long' }
  const formattedMonth = date.toLocaleDateString('id-ID', options)

  return formattedMonth
}

function getTodayMonth() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const yearMonth = `${year}-${month}`

  return yearMonth
}

function formatToDate(iso) {
  const date = new Date(iso)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getDifferenceHour(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);

  const diffMs = end - start; // selisih dalam milidetik
  const diffMinutes = Math.floor(diffMs / 1000 / 60); // konversi ke menit

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours} jam ${minutes} menit`;
}

function getLocalIsoDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const localISO = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

  return localISO

}

export default {
  convertToTime,
  convertToDate,
  convertToNamedMonth,
  getTodayMonth,
  formatToDate,
  getDifferenceHour,
  getLocalIsoDate
}