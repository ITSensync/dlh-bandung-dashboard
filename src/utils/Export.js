import * as XLSX from "xlsx"
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'
import DateFormatter from "./DateFormatter";

function exportToExcel(data, fileName = 'data.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, fileName)
}

async function konsentrasiHarian(data, statistik, tanggal) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Konsentrasi Harian')

  const leftLogo = await fetch('/dlh2.png')
    .then((r) => r.arrayBuffer())
  const rightLogo = await fetch('/pemkot.png')
    .then((r) => r.arrayBuffer())

  const leftImageId = workbook.addImage({
    buffer: leftLogo,
    extension: 'png',
  })
  const rightImageId = workbook.addImage({
    buffer: rightLogo,
    extension: 'png',
  })

  worksheet.mergeCells('A2:A5')
  worksheet.addImage(leftImageId, {
    tl: {
      col: 0, row: 1,
    },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('H2:H5')
  worksheet.addImage(rightImageId, {
    tl: { col: 7, row: 1 },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('B3:G3')
  const titleCellHeader1 = worksheet.getCell('B3')
  titleCellHeader1.value = 'LAPORAN KONSENTRASI HARIAN'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.mergeCells('B4:G4')
  const titleCellSubHeader = worksheet.getCell('B4')
  titleCellSubHeader.value = DateFormatter.formatIDDate(tanggal)
  titleCellSubHeader.font = { bold: false, size: 12 }
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

  const header = worksheet.addRow([
    'Waktu',
    'PM₁₀',
    'PM₂.₅',
    'SO₂',
    'CO',
    'O₃',
    'NO₂',
    'HC',
  ])

  header.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { horizontal: 'center' }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  })

  data.forEach((item) => {
    const row = worksheet.addRow([
      item.jam,
      item.pm10,
      item.pm25,
      item.so2,
      item.co,
      item.o3,
      item.no2,
      item.hc,
    ])
    row.eachCell((cell) => {
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    })
  })

  const stats = ['min', 'mean', 'max', 'p95', 'p98']

  stats.forEach((key) => {
    const row = worksheet.addRow([
      key.toUpperCase(),
      ...Object.values(statistik).map((param) => param[key] ?? 0),
    ])

    // Styling
    row.eachCell((cell) => {
      // cell.alignment = { horizontal: 'center' }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECF0F5' },
      }
      cell.font = { bold: true }
    })
  })

  worksheet.columns = [
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
  ]

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_Konsentrasi_${tanggal}.xlsx`)
}

async function konsentrasiBulanan(dataBulanan, bulan, tahun, parameter) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Konsentrasi Bulanan');

  const leftLogo = await fetch('/dlh2.png').then(r => r.arrayBuffer());
  const rightLogo = await fetch('/pemkot.png').then(r => r.arrayBuffer());

  const leftImageId = workbook.addImage({
    buffer: leftLogo,
    extension: 'png',
  });
  const rightImageId = workbook.addImage({
    buffer: rightLogo,
    extension: 'png',
  });

  worksheet.mergeCells('A2:A5');
  worksheet.addImage(leftImageId, {
    tl: { col: 0, row: 1 },
    ext: { width: 80, height: 80 },
  });

  // === Buat tanggal statis 1–31 ===
  const tanggalList = Array.from({ length: 31 }, (_, i) => `${tahun}-${String(bulan).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`);

  worksheet.mergeCells(`AF2:AF5`);
  worksheet.addImage(rightImageId, {
    tl: { col: 31, row: 1 },
    ext: { width: 80, height: 80 },
  });

  worksheet.mergeCells('B2:AE2');
  const titleCellHeader1 = worksheet.getCell('B2');
  titleCellHeader1.value = 'LAPORAN KONSENTRASI BULANAN';
  titleCellHeader1.font = { bold: true, size: 16 };
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' };

  worksheet.mergeCells('B3:AE3');
  const titleCellHeader2 = worksheet.getCell('B3');
  titleCellHeader2.value = `Parameter: ${generateTextParameter(parameter.toLowerCase())}`;
  titleCellHeader2.font = { bold: true, size: 12 };
  titleCellHeader2.alignment = { horizontal: 'center', vertical: 'middle' };

  worksheet.mergeCells('B4:AE4');
  const titleCellSubHeader = worksheet.getCell('B4');
  titleCellSubHeader.value = `${DateFormatter.getNamaBulan(bulan)} ${tahun}`;
  titleCellSubHeader.font = { bold: false, size: 12 };
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' };

  // === Ambil list jam dari tanggal pertama yang punya data ===
  const firstDataTanggal = Object.keys(dataBulanan)[0];
  const jamList = dataBulanan[firstDataTanggal]?.jam?.map(j => j.jam) || [];

  // === Header ===
  const headerRow = ['JAM', ...tanggalList.map(tgl => tgl.split('-')[2])];
  const header = worksheet.addRow(headerRow);

  header.eachCell(cell => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // === Isi data tiap jam ===
  jamList.forEach(jam => {
    const rowData = [jam];

    tanggalList.forEach(tgl => {
      const jamObj = dataBulanan[tgl]?.jam?.find(j => j.jam === jam);
      rowData.push(jamObj ? jamObj.nilai : '');
    });

    const row = worksheet.addRow(rowData);

    row.eachCell(cell => {
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  const stats = ['min', 'mean', 'max', 'p95', 'p98'];
  stats.forEach(key => {
    const rowData = [key.toUpperCase()];
    tanggalList.forEach(tgl => {
      const statValue = dataBulanan[tgl]?.[key] ?? '';
      rowData.push(statValue);
    });

    const row = worksheet.addRow(rowData);
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECF0F5' },
      };
      cell.font = { bold: true };
    });
  });

  worksheet.columns = Array.from({ length: 32 }, () => ({ width: 12 }));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `Laporan_Konsentrasi_${generateTextParameter(parameter)}_${DateFormatter.getNamaBulan(bulan)}-${tahun}.xlsx`);
}

async function ispuHarian(data, tanggal) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan ISPU Harian')

  const leftLogo = await fetch('/dlh2.png')
    .then((r) => r.arrayBuffer())
  const rightLogo = await fetch('/pemkot.png')
    .then((r) => r.arrayBuffer())

  const leftImageId = workbook.addImage({
    buffer: leftLogo,
    extension: 'png',
  })
  const rightImageId = workbook.addImage({
    buffer: rightLogo,
    extension: 'png',
  })

  worksheet.mergeCells('A2:A5')
  worksheet.addImage(leftImageId, {
    tl: {
      col: 0, row: 1,
    },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('J2:J5')
  worksheet.addImage(rightImageId, {
    tl: { col: 9, row: 1 },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('B3:I3')
  const titleCellHeader1 = worksheet.getCell('B3')
  titleCellHeader1.value = 'INDEKS STANDAR PENCEMARAN UDARA'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.mergeCells('B4:I4')
  worksheet.getCell('B4').value = 'Tanggal'
  const titleCellSubHeader = worksheet.getCell('C4')
  titleCellSubHeader.value = DateFormatter.formatIDDate(tanggal)
  titleCellSubHeader.font = { bold: false, size: 12 }
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

  const header = worksheet.addRow([
    'Waktu',
    'PM₁₀',
    'PM₂.₅',
    'SO₂',
    'CO',
    'O₃',
    'NO₂',
    'HC',
    'Tertinggi'
  ])

  header.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { horizontal: 'center' }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  })

  const headerRowNumber = header.number
  worksheet.mergeCells(`I${headerRowNumber}:J${headerRowNumber}`)

  const tertinggiHeader = worksheet.getCell(`I${headerRowNumber}`)
  tertinggiHeader.value = 'Tertinggi'
  tertinggiHeader.alignment = { horizontal: 'center', vertical: 'middle' }
  tertinggiHeader.font = { bold: true }


  data.forEach((item) => {
    const row = worksheet.addRow([
      item.jam,
      item.pm10,
      item.pm25,
      item.so2,
      item.co,
      item.o3,
      item.no2,
      item.hc,
      generateTextParameter(item.tertinggi),
    ])

    const currentRow = row.number

    worksheet.mergeCells(`I${currentRow}:J${currentRow}`)

    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.font = { bold: colNumber == 10 }
      cell.alignment = {
        horizontal: 'center'
      }

      if (colNumber > 1 && colNumber < 9) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: generateColorCell(cell.value) },
        }
      }
    })
  })

  writeLegendIspu(worksheet)

  worksheet.columns = [
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
  ]

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_ISPU_${tanggal}.xlsx`)
}

async function ispuBulanan(dataBulanan, periode) {
  const workbook = new ExcelJS.Workbook();

  dataBulanan.forEach((dataHari) => {
    const date = dataHari.tanggal.split('-')[2]
    const worksheet = workbook.addWorksheet(`Tgl. ${date}`)

    const leftLogo = fetch('/dlh2.png')
      .then((r) => r.arrayBuffer())
    const rightLogo = fetch('/pemkot.png')
      .then((r) => r.arrayBuffer())

    const leftImageId = workbook.addImage({
      buffer: leftLogo,
      extension: 'png',
    })
    const rightImageId = workbook.addImage({
      buffer: rightLogo,
      extension: 'png',
    })

    worksheet.mergeCells('A2:A5')
    worksheet.addImage(leftImageId, {
      tl: {
        col: 0, row: 1,
      },
      ext: { width: 80, height: 80 },
    })

    worksheet.mergeCells('J2:J5')
    worksheet.addImage(rightImageId, {
      tl: { col: 9, row: 1 },
      ext: { width: 80, height: 80 },
    })

    worksheet.mergeCells('B3:I3')
    const titleCellHeader1 = worksheet.getCell('B3')
    titleCellHeader1.value = 'INDEKS STANDAR PENCEMARAN UDARA'
    titleCellHeader1.font = { bold: true, size: 16 }
    titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.mergeCells('B4:I4')
    worksheet.getCell('B4').value = 'Tanggal'
    const titleCellSubHeader = worksheet.getCell('C4')
    titleCellSubHeader.value = DateFormatter.formatIDDate(dataHari.tanggal)
    titleCellSubHeader.font = { bold: false, size: 12 }
    titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

    const header = worksheet.addRow([
      'Waktu',
      'PM₁₀',
      'PM₂.₅',
      'SO₂',
      'CO',
      'O₃',
      'NO₂',
      'HC',
      'Tertinggi'
    ])

    header.eachCell((cell) => {
      cell.font = { bold: true }
      cell.alignment = { horizontal: 'center' }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D9D9D9' },
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    })

    const headerRowNumber = header.number
    worksheet.mergeCells(`I${headerRowNumber}:J${headerRowNumber}`)

    const tertinggiHeader = worksheet.getCell(`I${headerRowNumber}`)
    tertinggiHeader.value = 'Tertinggi'
    tertinggiHeader.alignment = { horizontal: 'center', vertical: 'middle' }
    tertinggiHeader.font = { bold: true }


    dataHari.data.forEach((item) => {
      const row = worksheet.addRow([
        item.jam,
        item.pm10,
        item.pm25,
        item.so2,
        item.co,
        item.o3,
        item.no2,
        item.hc,
        generateTextParameter(item.tertinggi),
      ])

      const currentRow = row.number

      worksheet.mergeCells(`I${currentRow}:J${currentRow}`)

      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
        cell.font = { bold: colNumber === 10 }
        cell.alignment = {
          horizontal: 'center'
        }

        if (colNumber > 1 && colNumber < 9) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: generateColorCell(cell.value) },
          }
        }
      })
    })

    writeLegendIspu(worksheet)

    worksheet.columns = [
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
    ]
  })



  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_ISPU_${periode}.xlsx`)
}

async function cuacaHarian(data, statistik, tanggal) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Cuaca Harian')

  const leftLogo = await fetch('/dlh2.png')
    .then((r) => r.arrayBuffer())
  const rightLogo = await fetch('/pemkot.png')
    .then((r) => r.arrayBuffer())

  const leftImageId = workbook.addImage({
    buffer: leftLogo,
    extension: 'png',
  })
  const rightImageId = workbook.addImage({
    buffer: rightLogo,
    extension: 'png',
  })

  worksheet.mergeCells('A2:A5')
  worksheet.addImage(leftImageId, {
    tl: {
      col: 0, row: 1,
    },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('I2:I5')

  const offsetX = (18 - 77) / 2
  worksheet.addImage(rightImageId, {
    tl: { col: 10 + offsetX / 18, row: 1 },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('B3:H3')
  const titleCellHeader1 = worksheet.getCell('B3')
  titleCellHeader1.value = 'LAPORAN Cuaca HARIAN'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.mergeCells('B4:H4')
  const titleCellSubHeader = worksheet.getCell('B4')
  titleCellSubHeader.value = DateFormatter.formatIDDate(tanggal)
  titleCellSubHeader.font = { bold: false, size: 12 }
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

  const header = worksheet.addRow([
    'Waktu',
    'Kec. Angin (m/s)',
    'Arah Angin (°)',
    'Kelembapan (%)',
    'Suhu (°C)',
    'Tekanan (mBar)',
    'Solar Radiasi (W/m²)',
    'Curah Hujan (mm/jam)',
    'UV (Index)',
  ])

  header.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    }
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }
  })

  data.forEach((item) => {
    const row = worksheet.addRow([
      item.jam,
      item.ws,
      item.wd,
      item.humidity,
      item.temperature,
      item.pressure,
      item.sr,
      item.rain_intensity,
      item.uv,
    ])
    row.eachCell((cell) => {
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle'
      }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    })
  })

  const stats = ['min', 'mean', 'max', 'p95', 'p98']

  stats.forEach((key) => {
    const row = worksheet.addRow([
      key.toUpperCase(),
      ...Object.values(statistik).map((param) => param[key] ?? 0),
    ])

    // Styling
    row.eachCell((cell) => {
      // cell.alignment = { horizontal: 'center' }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECF0F5' },
      }
      cell.font = { bold: true }
    })
  })

  worksheet.columns = [
    { width: 12 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
  ]

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_Cuaca_${tanggal}.xlsx`)
}

async function cuacaBulanan(dataBulanan, bulan, tahun, parameter) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Cuaca Bulanan');

  const leftLogo = await fetch('/dlh2.png').then(r => r.arrayBuffer());
  const rightLogo = await fetch('/pemkot.png').then(r => r.arrayBuffer());

  const leftImageId = workbook.addImage({
    buffer: leftLogo,
    extension: 'png',
  });
  const rightImageId = workbook.addImage({
    buffer: rightLogo,
    extension: 'png',
  });

  worksheet.mergeCells('A2:A5');
  worksheet.addImage(leftImageId, {
    tl: { col: 0, row: 1 },
    ext: { width: 80, height: 80 },
  });

  // === Buat tanggal statis 1–31 ===
  const tanggalList = Array.from({ length: 31 }, (_, i) => `${tahun}-${String(bulan).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`);

  worksheet.mergeCells(`AF2:AF5`);
  worksheet.addImage(rightImageId, {
    tl: { col: 31, row: 1 },
    ext: { width: 80, height: 80 },
  });

  worksheet.mergeCells('B2:AE2');
  const titleCellHeader1 = worksheet.getCell('B2');
  titleCellHeader1.value = 'LAPORAN CUACA BULANAN';
  titleCellHeader1.font = { bold: true, size: 16 };
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' };

  worksheet.mergeCells('B3:AE3');
  const titleCellHeader2 = worksheet.getCell('B3');
  titleCellHeader2.value = `Parameter: ${generateTextParameter(parameter.toLowerCase())}`;
  titleCellHeader2.font = { bold: true, size: 12 };
  titleCellHeader2.alignment = { horizontal: 'center', vertical: 'middle' };

  worksheet.mergeCells('B4:AE4');
  const titleCellSubHeader = worksheet.getCell('B4');
  titleCellSubHeader.value = `${DateFormatter.getNamaBulan(bulan)} ${tahun}`;
  titleCellSubHeader.font = { bold: false, size: 12 };
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' };

  // === Ambil list jam dari tanggal pertama yang punya data ===
  const firstDataTanggal = Object.keys(dataBulanan)[0];
  const jamList = dataBulanan[firstDataTanggal]?.jam?.map(j => j.jam) || [];

  // === Header ===
  const headerRow = ['JAM', ...tanggalList.map(tgl => tgl.split('-')[2])];
  const header = worksheet.addRow(headerRow);

  header.eachCell(cell => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // === Isi data tiap jam ===
  jamList.forEach(jam => {
    const rowData = [jam];

    tanggalList.forEach(tgl => {
      const jamObj = dataBulanan[tgl]?.jam?.find(j => j.jam === jam);
      rowData.push(jamObj ? jamObj.nilai : '');
    });

    const row = worksheet.addRow(rowData);

    row.eachCell(cell => {
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  const stats = ['min', 'mean', 'max', 'p95', 'p98'];
  stats.forEach(key => {
    const rowData = [key.toUpperCase()];
    tanggalList.forEach(tgl => {
      const statValue = dataBulanan[tgl]?.[key] ?? '';
      rowData.push(statValue);
    });

    const row = worksheet.addRow(rowData);
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECF0F5' },
      };
      cell.font = { bold: true };
    });
  });

  worksheet.columns = Array.from({ length: 32 }, () => ({ width: 12 }));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `Laporan_Cuaca_${generateTextParameter(parameter)}_${DateFormatter.getNamaBulan(bulan)}-${tahun}.xlsx`);
}

function writeLegendIspu(worksheet) {
  const space = worksheet.addRow([])
  const titleLegendRow = space.number + 1

  worksheet.mergeCells(`A${titleLegendRow}:J${titleLegendRow}`)
  const titleLegend = worksheet.getCell(`A${titleLegendRow}`)
  titleLegend.value = 'Peraturan Menteri LHK RI P.14/MENLHK/SETJEN/KUM.1/7/2020'
  titleLegend.font = { bold: false, size: 12 }
  titleLegend.alignment = { horizontal: 'center', vertical: 'middle' }
  titleLegend.border = {
    top: { style: 'double' },
    left: { style: 'double' },
    bottom: { style: 'thin' },
    right: { style: 'double' },
  }

  const range = worksheet.addRow([
    '0-50', '', '51-100', '', '101-200', '', '201-300', '', '>300', ''
  ])
  const status = worksheet.addRow([
    'BAIK', '', 'SEDANG', '', 'TIDAK SEHAT', '', 'SANGAT TIDAK SEHAT', '', 'BERBAHAYA', ''
  ])

  range.height = 20
  range.alignment = {
    horizontal: 'center',
    vertical: 'middle'
  }
  range.eachCell((cell, colNumber) => {
    cell.font = {
      color: { argb: colNumber != 5 ? 'FFFFFF' : '' },
      bold: true
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: generateLegendCellColor(colNumber) },
    }

    if (colNumber == 1) {
      cell.border = {
        left: { style: 'double' },
      }
    }

    if (colNumber == 9) {
      cell.border = {
        right: { style: 'double' },
      }
    }
  })

  /* MERGE RANGE */
  const currentRangeRow = range.number
  worksheet.mergeCells(`A${currentRangeRow}:B${currentRangeRow}`)
  worksheet.mergeCells(`C${currentRangeRow}:D${currentRangeRow}`)
  worksheet.mergeCells(`E${currentRangeRow}:F${currentRangeRow}`)
  worksheet.mergeCells(`G${currentRangeRow}:H${currentRangeRow}`)
  worksheet.mergeCells(`I${currentRangeRow}:J${currentRangeRow}`)

  status.height = 20
  status.alignment = {
    horizontal: 'center',
    vertical: 'middle'
  }
  status.eachCell((cell, colNumber) => {
    cell.font = {
      color: { argb: colNumber != 5 ? 'FFFFFF' : '' },
      bold: true
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: generateLegendCellColor(colNumber) },
    }

    if (colNumber == 1) {
      cell.border = {
        left: { style: 'double' },
        bottom: { style: 'double' }
      }
    } else if (colNumber == 9) {
      cell.border = {
        right: { style: 'double' },
        bottom: { style: 'double' }
      }
    } else {
      cell.border = {
        bottom: { style: 'double' }
      }
    }
  })

  /* MERGE STATUS */
  const currentStatusRow = status.number
  worksheet.mergeCells(`A${currentStatusRow}:B${currentStatusRow}`)
  worksheet.mergeCells(`C${currentStatusRow}:D${currentStatusRow}`)
  worksheet.mergeCells(`E${currentStatusRow}:F${currentStatusRow}`)
  worksheet.mergeCells(`G${currentStatusRow}:H${currentStatusRow}`)
  worksheet.mergeCells(`I${currentStatusRow}:J${currentStatusRow}`)
}

function generateColorCell(value) {
  switch (true) {
    case value >= 0 && value <= 50:
      return '00B050'
    case value > 50 && value <= 100:
      return '0070C0'
    case value > 100 && value <= 200:
      return 'FFFF00'
    case value > 200 && value <= 300:
      return 'FF0000'
    case value > 300:
      return '000000'
    default:
      return '808080'
  }
}

function generateTextParameter(value) {
  switch (true) {
    case value === 'pm10':
      return 'PM₁₀'
    case value === 'pm25':
      return 'PM₂.₅'
    case value === 'so2':
      return 'SO₂'
    case value === 'no2':
      return 'NO₂'
    case value === 'o3':
      return 'O₃'
    case value === 'temperature':
      return 'Suhu (°C)'
    case value === 'humidity':
      return 'Kelembapan (%)'
    case value === 'ws':
      return 'Kecepatan Angin (m/s)'
    case value === 'wd':
      return 'Arah Angin (°)'
    case value === 'pressure':
      return 'Tekanan Udara (hPa)'
    case value === 'sr':
      return 'Solar Radiasi (W/m²)'
    case value === 'rain_intensity':
      return 'Curah Hujan (mm)'
    case value === 'uv':
      return 'Indeks UV'
    default:
      return value.toUpperCase();
  }
}

function generateLegendCellColor(colNumber) {
  switch (true) {
    case colNumber == 1:
      return '00B050'
    case colNumber == 3:
      return '0070C0'
    case colNumber == 5:
      return 'FFFF00'
    case colNumber == 7:
      return 'FF0000'
    case colNumber == 9:
      return '000000'
    default:
      return '808080'
  }
}

export default {
  exportToExcel,
  konsentrasiHarian,
  konsentrasiBulanan,
  ispuHarian,
  cuacaHarian,
  ispuBulanan,
  cuacaBulanan,
}

