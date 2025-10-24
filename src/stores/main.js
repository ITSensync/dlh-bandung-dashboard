import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import DateFormatter from '@/utils/DateFormatter'

export const useMainStore = defineStore('main', () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const today = DateFormatter.getLocalIsoDate()
  const formatted = today.split('T')[0]
  const [yearNow, monthNow] = formatted.split('-')

  const userName = ref('Admin')
  const userEmail = ref('doe.doe.doe@example.com')

  const userAvatar = computed(
    () =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail.value.replace(
        /[^a-z0-9]+/gi,
        '-',
      )}`,
  )

  const isFieldFocusRegistered = ref(false)

  const clients = ref([])
  const history = ref([])
  const ispuLatest = ref()
  const latestPm = ref()
  const latestGas = ref()
  const latestWeather = ref()
  const listIspuPM10 = ref([]);
  const listIspuPM25 = ref([]);
  const listDailyIspu = ref([])
  const listDaily30Minute = ref([]);

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
  }

  function fetchIspuLatest() {
    axios.get(`${apiUrl}/get-ispu.php`).then((result) => {
      const data = result.data.data || []

      const latestData = data[0];

      const latestIspu = {
        pm25: latestData.ispu_pm25,
        pm10: latestData.ispu_pm10,
        hc: latestData.ispu_hc,
        co: latestData.ispu_co,
        o3: latestData.ispu_o3,
        no2: latestData.ispu_no2,
        so2: latestData.ispu_so2,
        ket: latestData.keterangan,
        status: latestData.status_kategori,
        tanggal: latestData.tanggal,
        jam: latestData.jam,
        rekomendasi: latestData.rekomendasi.kelompok
      }

      ispuLatest.value = latestIspu;
    })
  }

  function fetchIspuDaily(param, start = formatted, end = formatted) {
    axios.get(`${apiUrl}/get-ispu-filter.php?start=${start}&end=${end ? end : start}`).then((result) => {
      const data = result.data.data_ispu || []
      // console.log(data);

      if (param === 'pm10') {
        const pm10Data = data.map((item) => {

          return {
            jam: item.jam,
            pm10: item.ispu_pm10
          }
        }).reverse()

        listIspuPM10.value = pm10Data
      } else if (param === 'pm25') {
        const pm25Data = data.map((item) => {

          return {
            jam: item.jam,
            pm25: item.ispu_pm25
          }
        }).reverse()

        listIspuPM25.value = pm25Data
      } else {
        console.log(data)
        const dailyData = data.map((item) => {
          return {
            tanggal: item.tanggal,
            jam: item.jam,
            pm10: item.ispu_pm10,
            pm25: item.ispu_pm25,
            hc: item.ispu_hc,
            co: item.ispu_co,
            o3: item.ispu_o3,
            no2: item.ispu_no2,
            so2: item.ispu_so2,
            persentase: item.persentase,
          }
        })

        listDailyIspu.value = dailyData
      }
    })
  }

  function fetch30Minute(param, start = formatted, end = formatted) {
    axios.get(`${apiUrl}/get-data-filter.php?start=${start}&end=${end}`).then((result) => {
      const data = result.data.data || []

      if (param === 'gas') {
        const latestData = data[0];
        const formattedResponse = {
          hc: latestData.hc,
          co: latestData.co,
          o3: latestData.o3,
          no2: latestData.no2,
          so2: latestData.so2,
          tanggal: latestData.tanggal,
          jam: latestData.jam
        }

        latestGas.value = formattedResponse;
      } else if (param === 'weather') {
        const latestData = data[0];
        const formattedResponse = {
          ws: latestData.ws,
          wd: latestData.wd,
          temp: latestData.temperature,
          hum: latestData.humidity,
          press: latestData.pressure,
          rain: latestData.rain_intensity,
          solar: latestData.sr,
          uv: latestData.uv,
          tanggal: latestData.tanggal,
          jam: latestData.jam
        }

        latestWeather.value = formattedResponse;
      } else if (param === 'pm') {
        const latestData = data[0];
        const formattedResponse = {
          pm10: latestData.pm10,
          pm25: latestData.pm25,
          tanggal: latestData.tanggal,
          jam: latestData.jam
        }

        latestPm.value = formattedResponse;
      }
      else {
        const formattedData = data.map((item) => {
          return {
            pm25: item.pm25,
            pm10: item.pm10,
            hc: item.hc,
            co: item.co,
            o3: item.o3,
            no2: item.no2,
            so2: item.so2,
            ws: item.ws,
            wd: item.wd,
            temp: item.temperature,
            hum: item.humidity,
            press: item.pressure,
            rain: item.rain_intensity,
            solar: item.sr,
            uv: item.uv,
            tanggal: item.tanggal,
            jam: item.jam
          }
        });

        listDaily30Minute.value = formattedData
      }
    })
  }

  async function fetchKonsentrasiDaily(date = formatted) {
    const res = await axios.get(`${apiUrl}/laporan/konsentrasi-harian.php?tanggal=${date}`)

    return res.data
  }

  async function fetchKonsentrasiWeekly(week = '1', month = monthNow, year = yearNow) {
    const res = await axios.get(`${apiUrl}/laporan/konsentrasi-mingguan.php?minggu=${week}&bulan=${month}&tahun=${year}`)

    return res.data
  }

  async function fetchKonsentrasiMonthly(month = monthNow, year = yearNow, sensor = 'pm10') {
    const res = await axios.get(`${apiUrl}/laporan/konsentrasi-bulanan.php?bulan=${month}&tahun=${year}&parameter=${sensor}`)

    return res.data
  }

  async function fetchKonsentrasiYearly(year = yearNow, sensor = 'pm10') {
    const res = await axios.get(`${apiUrl}/laporan/konsentrasi-tahunan.php?tahun=${year}&parameter=${sensor}`)

    return res.data
  }

  async function fetchAvgKonsentrasiMonthly(month = monthNow, year = yearNow) {
    const res = await axios.get(`${apiUrl}/laporan/konsentrasi-avg-bulanan.php?bulan=${month}&tahun=${year}`)

    return res.data
  }

  async function fetchAvgKonsentrasiYearly(year = yearNow) {
    const res = await axios.get(`${apiUrl}/laporan/konsentrasi-avg-tahunan.php?tahun=${year}`)

    return res.data
  }

  async function fetchReportIspuDaily(date = formatted) {
    const res = await axios.get(`${apiUrl}/laporan/ispu-harian.php?tanggal=${date}`)

    return res.data
  }

  async function fetchReportIspuMonthly(month = monthNow, year = yearNow) {
    const res = await axios.get(`${apiUrl}/laporan/ispu-bulanan.php?bulan=${month}&tahun=${year}`)

    return res.data
  }

  async function fetchReportIspuYearly(year = yearNow) {
    const res = await axios.get(`${apiUrl}/laporan/ispu-tahunan.php?tahun=${year}`)

    return res.data
  }

  async function fetchReportWeatherDaily(date = formatted) {
    const res = await axios.get(`${apiUrl}/laporan/cuaca-harian.php?tanggal=${date}`)

    return res.data
  }

  async function fetchReportWeatherWeekly(week = '1', month = monthNow, year = yearNow) {
    const res = await axios.get(`${apiUrl}/laporan/cuaca-mingguan.php?minggu=${week}&bulan=${month}&tahun=${year}`)

    return res.data
  }

  async function fetchReportWeatherMonthly(month = monthNow, year = yearNow, sensor = 'ws') {
    const res = await axios.get(`${apiUrl}/laporan/cuaca-bulanan.php?bulan=${month}&tahun=${year}&parameter=${sensor}`)

    return res.data
  }




  return {
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    ispuLatest,
    latestPm,
    latestGas,
    latestWeather,
    listDailyIspu,
    listIspuPM10,
    listIspuPM25,
    listDaily30Minute,
    setUser,
    fetchIspuLatest,
    fetchIspuDaily,
    fetch30Minute,
    fetchKonsentrasiDaily,
    fetchKonsentrasiWeekly,
    fetchKonsentrasiMonthly,
    fetchAvgKonsentrasiMonthly,
    fetchAvgKonsentrasiYearly,
    fetchReportIspuDaily,
    fetchReportIspuMonthly,
    fetchReportIspuYearly,
    fetchReportWeatherDaily,
    fetchReportWeatherMonthly,
    fetchReportWeatherWeekly,
    fetchKonsentrasiYearly,
  }
})
