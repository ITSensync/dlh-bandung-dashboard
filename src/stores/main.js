import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import DateFormatter from '@/utils/DateFormatter'

export const useMainStore = defineStore('main', () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const today = DateFormatter.getLocalIsoDate()
  const formatted = today.split('T')[0]

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
  const latestGas = ref()
  const latestWeather = ref()
  const listIspuPM10 = ref([]);
  const listIspuPM25 = ref([]);
  const listDailyIspu = ref([])
  const listDaily30Minute = ref([]);
  const presenceToday = ref([])
  const presenceMonthly = ref([])
  const presenceRangeByDate = ref([])
  const presenceByPerson = ref([])

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
        hc: latestData.ispu_hc || '0',
        co: latestData.ispu_co,
        o3: latestData.ispu_o3,
        no2: latestData.ispu_no2,
        so2: latestData.ispu_so2,
        ket: latestData.keterangan,
        status: latestData.status_kategori,
        tanggal: latestData.tanggal,
        jam: latestData.jam
      }

      ispuLatest.value = latestIspu;
    })
  }

  function fetchIspuDaily(param, start = formatted, end = formatted) {
    axios.get(`${apiUrl}/get-ispu-filter.php?start=${start}&end=${end}`).then((result) => {
      const data = result.data.data || []

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
      } else {
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

  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json?v=3`)
      .then((result) => {
        clients.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchPresenceToday() {
    axios.get('https://api-absensi.getsensync.com/api/absensi/rekap').then((result) => {
      const data = result?.data || []

      const processedData = data.map((item) => {
        const result_diff = DateFormatter.getDifferenceHour(item.waktu_masuk, item.terakhir_terlihat)

        return {
          ...item,
          terakhir_terlihat: DateFormatter.convertToTime(item.terakhir_terlihat),
          waktu_masuk: DateFormatter.convertToTime(item.waktu_masuk),
          waktu_keluar: DateFormatter.convertToTime(item.waktu_keluar),
          tanggal: DateFormatter.convertToDate(item.terakhir_terlihat),
          jumlah_jam: result_diff
        }
      })

      presenceToday.value = processedData
    })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchPresenceMonthly(date) {
    axios.get(`https://api-absensi.getsensync.com/api/absensi/rekap/bulanan?bulan=${date}`).then((result) => {
      presenceMonthly.value = result?.data.sort((a, b) => b.jumlah_hadir - a.jumlah_hadir)
    })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchRangePresence(startDate, endDate) {
    var url = '';

    if (startDate && endDate) {
      url = `https://api-absensi.getsensync.com/api/absensi/rekap/rekap-range?start=${startDate}&end=${endDate}`;
    } else {
      url = `https://api-absensi.getsensync.com/api/absensi/rekap/${startDate}`
    }
    axios.get(url).then((result) => {
      const data = result?.data || []

      const processedData = data.map((item) => {
        const result_diff = DateFormatter.getDifferenceHour(item.waktu_masuk, item.terakhir_terlihat)

        return {
          ...item,
          terakhir_terlihat: DateFormatter.convertToTime(item.terakhir_terlihat),
          waktu_masuk: DateFormatter.convertToTime(item.waktu_masuk),
          waktu_keluar: DateFormatter.convertToTime(item.waktu_keluar),
          tanggal: DateFormatter.convertToDate(item.terakhir_terlihat),
          jumlah_jam: result_diff
        }
      })

      presenceRangeByDate.value = processedData
    })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchPresencePerson(mac_address, filterMonth) {
    axios.get(`https://api-absensi.getsensync.com/api/absensi/rekap/detail/${mac_address}`).then((result) => {
      const allData = result?.data || []

      const allProcessedData = allData.map((item) => {
        const result_diff = DateFormatter.getDifferenceHour(item.waktu_masuk, item.terakhir_terlihat)

        return {
          ...item,
          jumlah_jam: result_diff
        }
      })

      const filtered = allProcessedData.filter((item) => {
        const seenMonth = new Date(item.terakhir_terlihat).toISOString().slice(0, 7) // "YYYY-MM"
        return seenMonth === filterMonth
      })

      const resultData = filtered.map((item) => {
        return {
          ...item,
          terakhir_terlihat: DateFormatter.convertToTime(item.terakhir_terlihat),
          waktu_masuk: DateFormatter.convertToTime(item.waktu_masuk),
          waktu_keluar: DateFormatter.convertToTime(item.waktu_keluar),
          tanggal: DateFormatter.convertToDate(item.terakhir_terlihat),
        }
      })



      presenceByPerson.value = resultData

    })
      .catch((error) => {
        alert(error.message)
      })
  }

  return {
    userName,
    userEmail,
    userAvatar,
    isFieldFocusRegistered,
    clients,
    history,
    ispuLatest,
    latestGas,
    latestWeather,
    listDailyIspu,
    listIspuPM10,
    listIspuPM25,
    listDaily30Minute,
    presenceToday,
    presenceMonthly,
    presenceRangeByDate,
    presenceByPerson,
    setUser,
    fetchIspuLatest,
    fetchIspuDaily,
    fetch30Minute,
    fetchSampleClients,
    fetchSampleHistory,
    fetchPresenceToday,
    fetchPresenceMonthly,
    fetchRangePresence,
    fetchPresencePerson,
  }
})
