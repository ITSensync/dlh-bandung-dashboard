import {
  mdiAccountWrench,
  mdiCalendarToday,
  mdiClockOutline,
  mdiFileDocumentOutline,
  mdiGauge,
} from '@mdi/js'

export default [
  {
    to: '/summary',
    icon: mdiFileDocumentOutline,
    label: 'Summary',
  },
  {
    to: '/ispu',
    label: 'ISPU',
    icon: mdiGauge,
  },
  {
    to: '/konsentrasi',
    label: 'Konsentrasi',
    icon: mdiClockOutline,
  },
  {
    to: '/laporan',
    label: 'Laporan',
    icon: mdiCalendarToday,
  },
  {
    to: '/maintenance',
    label: 'Maintenance',
    icon: mdiAccountWrench,
  },
  // {
  //   to: '/presence-monthly',
  //   label: 'Per Bulan',
  //   icon: mdiCalendarMonth,
  // },
  // {
  //   to: '/presence-person',
  //   label: 'Per Orang',
  //   icon: mdiAccountTie,
  // },
  // {
  //   to: '/tables',
  //   label: 'Tables',
  //   icon: mdiTable,
  // },
  // {
  //   to: '/forms',
  //   label: 'Forms',
  //   icon: mdiSquareEditOutline,
  // },
  // {
  //   to: '/ui',
  //   label: 'UI',
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   to: '/responsive',
  //   label: 'Responsive',
  //   icon: mdiResponsive,
  // },
  // {
  //   to: '/',
  //   label: 'Styles',
  //   icon: mdiPalette,
  // },
  // {
  //   to: '/profile',
  //   label: 'Profile',
  //   icon: mdiAccountCircle,
  // },
  // {
  //   to: '/login',
  //   label: 'Login',
  //   icon: mdiLock,
  // },
  // {
  //   to: '/error',
  //   label: 'Error',
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One',
  //     },
  //     {
  //       label: 'Item Two',
  //     },
  //   ],
  // },
]
