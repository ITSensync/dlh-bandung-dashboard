import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import DateFormatter from '@/utils/DateFormatter'

export const useMainStore = defineStore('main', () => {
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
    presenceToday,
    presenceMonthly,
    presenceRangeByDate,
    presenceByPerson,
    setUser,
    fetchSampleClients,
    fetchSampleHistory,
    fetchPresenceToday,
    fetchPresenceMonthly,
    fetchRangePresence,
    fetchPresencePerson,
  }
})
