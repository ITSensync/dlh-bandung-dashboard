import DateFormatter from "./DateFormatter";

async function konsentrasiHarian(data, statistik, tanggal) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

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
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

  const header2 = worksheet.addRow([
    'Waktu',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
  ])

  header2.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

  worksheet.mergeCells(`A${header.number}:A${header2.number}`)

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

async function konsentrasiMingguan(data, periode) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Konsentrasi Mingguan')

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

  worksheet.mergeCells('AX2:AX5')

  // const offsetX = (18 - 77) / 2
  worksheet.addImage(rightImageId, {
    tl: { col: 49, row: 1 },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('B3:AW3')
  const titleCellHeader1 = worksheet.getCell('B3')
  titleCellHeader1.value = 'LAPORAN KONSENTRASI MINGGUAN'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.mergeCells('B4:AW4')
  const [startPeriode, endPeriode] = periode.split(' s/d ')
  const titleCellSubHeader = worksheet.getCell('B4')
  titleCellSubHeader.value = `${DateFormatter.formatIDDate(startPeriode, false)} s/d ${DateFormatter.formatIDDate(endPeriode, false)}`
  titleCellSubHeader.font = { bold: false, size: 12 }
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

  // Ambil nama parameter dari jam pertama
  const hariDenganData = data.find((d) => Array.isArray(d.jam) && d.jam.length > 0);

  let parameters = [];
  if (hariDenganData) {
    parameters = Object.keys(hariDenganData.jam[0]).filter((k) => k !== 'jam');
  } else {
    // fallback kalau semua kosong — ambil dari statistik
    parameters = Object.keys(data[0].statistik || {});
  }

  // Row 1: Header tanggal
  const header1 = ['Waktu'];
  data.forEach((item) => {
    header1.push(new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }));
    for (let i = 1; i < parameters.length; i++) header1.push('');
  });
  const headerWaktu = worksheet.addRow(header1);

  headerWaktu.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
  })

  // Gabung sel tanggal
  let startCol = 2;
  data.forEach(() => {
    worksheet.mergeCells(1, startCol, 1, startCol + parameters.length - 1);
    startCol += parameters.length;
  });

  // Row 2: Header nama parameter
  const header2 = [''];
  data.forEach(() => {
    header2.push(...parameters.map((p) => generateTextParameter(p)));
  });
  const headerParam = worksheet.addRow(header2);

  headerParam.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
  })

  // Row 3: Satuan
  const satuanMap = {
    pm10: 'µg/m³',
    pm25: 'µg/m³',
    so2: 'µg/m³',
    co: 'µg/m³',
    o3: 'µg/m³',
    no2: 'µg/m³',
    hc: 'µg/m³',
  };
  const header3 = [''];
  data.forEach(() => {
    header3.push(...parameters.map((p) => satuanMap[p] || ''));
  });
  const headerUnit = worksheet.addRow(header3);

  headerUnit.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
  })

  // GABUNG SEL WAKTU HORIZONTAL
  worksheet.mergeCells('B6:H6')
  worksheet.mergeCells('I6:O6')
  worksheet.mergeCells('P6:V6')
  worksheet.mergeCells('W6:AC6')
  worksheet.mergeCells('AD6:AJ6')
  worksheet.mergeCells('AK6:AQ6')
  worksheet.mergeCells('AR6:AX6')

  // Gabung sel 'Waktu' secara vertikal
  worksheet.mergeCells('A6:A8');
  worksheet.getCell('A6').value = 'Waktu';
  worksheet.getCell('A6').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('A8').font = { bold: true };

  // Styling semua header
  worksheet.getRow(headerWaktu.number).font = { bold: true };
  worksheet.getRow(headerParam.number).font = { bold: true };
  worksheet.getRow(headerUnit.number).font = { italic: true };

  worksheet.getRow(headerWaktu.number).alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(headerParam.number).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  worksheet.getRow(headerUnit.number).alignment = { horizontal: 'center', vertical: 'middle' };

  // Buat daftar jam unik dari hari pertama
  const jamList = data[0].jam.length > 0 ? data[0].jam.map((j) => j.jam) : generateJamList();

  // Tambahkan setiap baris jam
  jamList.forEach((jam) => {
    const rowData = [jam]; // kolom pertama: waktu

    data.forEach((hari) => {
      parameters.forEach((param) => {
        const nilai = toNumber(hari.jam.find((x) =>
          x.jam.startsWith(jam) || jam.startsWith(x.jam)
        )?.[param]);

        rowData.push(nilai);
      });
    });

    const row = worksheet.addRow(rowData);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
    })
  });

  const stats = ['min', 'mean', 'max', 'p95', 'p98'];
  stats.forEach((key) => {
    const rowData = [key.toUpperCase()]; // kolom pertama nama statistik

    data.forEach((hari) => {
      parameters.forEach((param) => {
        const val = toNumber(hari.statistik?.[param]?.[key]);
        rowData.push(val);
      });
    });

    const row = worksheet.addRow(rowData);

    row.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECF0F5' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  worksheet.columns = Array.from({ length: 57 }, () => ({ width: 12 }));

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_Konsentrasi_${periode}.xlsx`)
}

async function konsentrasiBulanan(dataBulanan, bulan, tahun, parameter) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

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

async function konsentrasiTahunan(dataTahunan, tahun, sensor) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const leftLogo = await fetch('/dlh2.png').then((r) => r.arrayBuffer());
  const rightLogo = await fetch('/pemkot.png').then((r) => r.arrayBuffer());

  const mapBulan = {
    Januari: 'January',
    Februari: 'February',
    Maret: 'March',
    April: 'April',
    Mei: 'May',
    Juni: 'June',
    Juli: 'July',
    Agustus: 'August',
    September: 'September',
    Oktober: 'October',
    November: 'November',
    Desember: 'December',
  };

  const bulanList = Object.keys(mapBulan);

  const tanggalList = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  for (const bulan of bulanList) {
    const isi = dataTahunan[mapBulan[bulan]] || {};
    const worksheet = workbook.addWorksheet(bulan);

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

    worksheet.mergeCells('AF2:AF5')
    worksheet.addImage(rightImageId, {
      tl: { col: 31, row: 1 },
      ext: { width: 80, height: 80 },
    })

    worksheet.mergeCells('B3:AE3')
    const titleCellHeader1 = worksheet.getCell('B3')
    titleCellHeader1.value = `LAPORAN KONSENTRASI ${tahun}`
    titleCellHeader1.font = { bold: true, size: 16 }
    titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.mergeCells('B4:AE4')
    const titleCellHeader2 = worksheet.getCell('B4')
    titleCellHeader2.value = `Parameter: ${sensor}`
    titleCellHeader2.font = { bold: true, size: 14 }
    titleCellHeader2.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.mergeCells('B5:AE5')
    const titleCellSubHeader = worksheet.getCell('C5')
    titleCellSubHeader.value = bulan
    titleCellSubHeader.font = { bold: false, size: 12 }
    titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.addRow([]);

    // === HEADER KOLOM ===
    const header = ['Waktu', ...tanggalList];
    const rowHeader = worksheet.addRow(header);
    rowHeader.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center' };
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

    // Ambil jam dari tanggal pertama atau generate default
    const semuaHari = Object.values(isi);
    const hariPertama = semuaHari.find((h) => h?.jam?.length);
    const jamList =
      hariPertama && hariPertama.jam?.length
        ? hariPertama.jam.map((j) => j.jam)
        : generateJamList();

    // === ISI DATA PER JAM ===
    jamList.forEach((jam) => {
      const row = [jam];
      tanggalList.forEach((tgl) => {
        const tanggalKey = Object.keys(isi).find((k) => k.endsWith(`-${tgl}`));
        const hari = tanggalKey ? isi[tanggalKey] : null;
        const nilai = hari?.jam?.find((j) => j.jam === jam)?.nilai ?? '';
        row.push(nilai);
      });
      const jamRow = worksheet.addRow(row);

      jamRow.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center"
        }
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    });

    // === TAMBAHKAN STATISTIK DI BAWAH ===
    const stats = ['min', 'mean', 'max', 'p95', 'p98'];
    stats.forEach((key) => {
      const row = [key.toUpperCase()];
      tanggalList.forEach((tgl) => {
        const tanggalKey = Object.keys(isi).find((k) => k.endsWith(`-${tgl}`));
        const val = tanggalKey ? isi[tanggalKey]?.[key] ?? '' : '';
        row.push(val);
      });

      const r = worksheet.addRow(row);
      r.eachCell((c) => {
        c.font = { bold: true };
        c.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ECF0F5' },
        };
        c.alignment = { horizontal: 'center', vertical: 'middle' };
        c.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    worksheet.columns = Array.from({ length: 32 }, () => ({ width: 12 }));
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `Laporan_Tahunan_${sensor}_${tahun}.xlsx`);
}

async function avgKonsentrasiBulanan(data, statistik, periode) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Rata-Rata Konsentrasi Bulanan')

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
  titleCellHeader1.value = 'LAPORAN RATA-RATA KONSENTRASI BULANAN'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  const [startPeriode, endPeriode] = periode.split(' s.d ')
  worksheet.mergeCells('B4:G4')
  const titleCellSubHeader = worksheet.getCell('B4')
  titleCellSubHeader.value = `${DateFormatter.formatIDDate(startPeriode, false)} s.d ${DateFormatter.formatIDDate(endPeriode, false)}`
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
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

  const header2 = worksheet.addRow([
    'Waktu',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
  ])

  header2.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

  worksheet.mergeCells(`A${header.number}:A${header2.number}`)

  data.forEach((item) => {
    const row = worksheet.addRow([
      item.tanggal,
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

  const stats = ['Min', 'Mean', 'Maks']

  stats.forEach((key) => {
    const values = statistik[key] ?? Array(7).fill(0);
    const row = worksheet.addRow([key.toUpperCase(), ...values]);

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
  saveAs(blob, `Laporan_Rata-Rata_Konsentrasi_${periode}.xlsx`)
}

async function avgKonsentrasiTahunan(data, statistik, periode) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Rata-Rata Konsentrasi Tahunan')

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
  titleCellHeader1.value = 'LAPORAN RATA-RATA KONSENTRASI TAHUNAN'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  const [startPeriode, endPeriode] = periode.split(' s.d ')
  worksheet.mergeCells('B4:G4')
  const titleCellSubHeader = worksheet.getCell('B4')
  titleCellSubHeader.value = `${DateFormatter.formatIDDate(startPeriode, true)} s.d ${DateFormatter.formatIDDate(endPeriode, true)}`
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
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

  const header2 = worksheet.addRow([
    'Waktu',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
    'µg/m³',
  ])

  header2.eachCell((cell) => {
    cell.font = { bold: true }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
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

  worksheet.mergeCells(`A${header.number}:A${header2.number}`)

  data.forEach((item) => {
    const row = worksheet.addRow([
      item.tanggal,
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

  const stats = ['Min', 'Mean', 'Maks']

  stats.forEach((key) => {
    const values = statistik[key] ?? Array(7).fill(0);

    const row = worksheet.addRow([key.toUpperCase(), ...values]);

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
  saveAs(blob, `Laporan_Rata-Rata_Konsentrasi_${periode}.xlsx`)
}

async function ispuHarian(data, tanggal) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

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
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();

  if (dataBulanan.length == 0) {
    const worksheet = workbook.addWorksheet(`Tgl. -}`)

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
    titleCellSubHeader.value = '-'
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

    const empty = worksheet.addRow([`Tidak Ada Data ISPU`])

    empty.font = {
      bold: true, size: 12,
    }
    empty.alignment = {
      wrapText: true
    }

    worksheet.columns = [
      { width: 12 },
    ]

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(blob, `Laporan_ISPU_${periode}.xlsx`)

    return
  }


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

async function ispuTahunan(dataTahunan, tahun) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

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
      col: 0 + 0.2, row: 1,
    },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('M2:M5')

  worksheet.addImage(rightImageId, {
    tl: { col: 12 + 0.3, row: 1 },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('B3:L3')
  const titleCellHeader1 = worksheet.getCell('B3')
  titleCellHeader1.value = 'INDEKS STANDAR PENCEMARAN UDARA'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.mergeCells('B4:L4')
  worksheet.getCell('B4').value = 'Tanggal'
  const titleCellSubHeader = worksheet.getCell('C4')
  titleCellSubHeader.value = tahun
  titleCellSubHeader.font = { bold: false, size: 14 }
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

  const header = worksheet.addRow([
    'Tanggal',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
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

  const kategoriColors = {
    'Baik': '00B050',        // Hijau
    'Sedang': '0070C0',      // BIRU
    'Tidak Sehat': 'FFFF00', // KUNING
    'Sangat Tidak Sehat': 'FF0000', // Merah
    'Berbahaya': '000000',   // HITAM
  };

  const countKategori = {
    'Baik': 0,
    'Sedang': 0,
    'Tidak Sehat': 0,
    'Sangat Tidak Sehat': 0,
    'Berbahaya': 0,
  };

  dataTahunan.forEach((data) => {
    const row = worksheet.addRow([
      data.tanggal,
      data.januari.param,
      data.februari.param,
      data.maret.param,
      data.april.param,
      data.mei.param,
      data.juni.param,
      data.juli.param,
      data.agustus.param,
      data.september.param,
      data.oktober.param,
      data.november.param,
      data.desember.param,
    ])

    row.height = 30

    const bulanKeys = [
      'januari', 'februari', 'maret', 'april', 'mei', 'juni',
      'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
    ];


    row.eachCell((cell, colNumber) => {
      cell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true }
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
        left: { style: 'thin' }
      }

      if (colNumber === 1) return;

      const bulan = bulanKeys[colNumber - 2]; // karena kolom 2 = Januari
      const kategori = data[bulan]?.kategori;
      const color = kategoriColors[kategori] || null;

      cell.font = {
        color: {
          argb: kategori === 'Tidak Sehat' ? '000000' : 'ffffff'
        }
      }

      if (kategori && countKategori[kategori] !== undefined) {
        countKategori[kategori]++;
      }

      if (color) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color },
        };
      }
    })
  })

  worksheet.columns = Array.from({ length: 13 }, () => ({ width: 16 }));

  // STATISTIK ISPU PER HARI

  worksheet.addRow([]);
  const mergeStart = 1; // mulai dari kolom A
  const mergeEnd = 10;   // sampai kolom J untuk "JUMLAH HARI"
  worksheet.mergeCells(worksheet.lastRow.number + 1, mergeStart, worksheet.lastRow.number + 1, mergeEnd);
  const jumlahHariCell = worksheet.getRow(worksheet.lastRow.number).getCell(mergeStart);
  jumlahHariCell.value = 'JUMLAH HARI';
  jumlahHariCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D9D9D0' },
  };
  jumlahHariCell.font = { bold: true, size: 16 };
  jumlahHariCell.alignment = { horizontal: 'center', vertical: 'middle' };
  jumlahHariCell.border = {
    top: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
    left: { style: 'thin' },
  };

  const kategoriRow = worksheet.addRow([
    'Baik',
    '',
    'Sedang',
    '',
    'Tidak Sehat',
    '',
    'Sangat Tidak Sehat',
    '',
    'Berbahaya',
  ]);

  kategoriRow.eachCell((cell) => {
    cell.font = { bold: false, size: 12 };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
      left: { style: 'thin' },
    };
  });

  worksheet.mergeCells(`A${kategoriRow.number}:B${kategoriRow.number}`)
  worksheet.mergeCells(`C${kategoriRow.number}:D${kategoriRow.number}`)
  worksheet.mergeCells(`E${kategoriRow.number}:F${kategoriRow.number}`)
  worksheet.mergeCells(`G${kategoriRow.number}:H${kategoriRow.number}`)
  worksheet.mergeCells(`I${kategoriRow.number}:J${kategoriRow.number}`)

  const jumlahRow = worksheet.addRow([
    countKategori['Baik'],
    '',
    countKategori['Sedang'],
    '',
    countKategori['Tidak Sehat'],
    '',
    countKategori['Sangat Tidak Sehat'],
    '',
    countKategori['Berbahaya'],
  ]);

  jumlahRow.eachCell((cell) => {
    cell.font = { bold: false, size: 14 };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
      left: { style: 'thin' },
    };
  });

  worksheet.mergeCells(`A${jumlahRow.number}:B${jumlahRow.number}`)
  worksheet.mergeCells(`C${jumlahRow.number}:D${jumlahRow.number}`)
  worksheet.mergeCells(`E${jumlahRow.number}:F${jumlahRow.number}`)
  worksheet.mergeCells(`G${jumlahRow.number}:H${jumlahRow.number}`)
  worksheet.mergeCells(`I${jumlahRow.number}:J${jumlahRow.number}`)

  writeLegendIspu(worksheet);

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_ISPU_${tahun}.xlsx`)
}

async function cuacaHarian(data, statistik, tanggal) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

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
  titleCellHeader1.value = 'LAPORAN CUACA HARIAN'
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

async function cuacaMingguan(data, periode) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laporan Cuaca Mingguan')

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

  worksheet.mergeCells('BE2:BE5')

  // const offsetX = (18 - 77) / 2
  worksheet.addImage(rightImageId, {
    tl: { col: 56, row: 1 },
    ext: { width: 80, height: 80 },
  })

  worksheet.mergeCells('B3:BD3')
  const titleCellHeader1 = worksheet.getCell('B3')
  titleCellHeader1.value = 'LAPORAN CUACA MINGGUAN'
  titleCellHeader1.font = { bold: true, size: 16 }
  titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

  worksheet.mergeCells('B4:BD4')
  const [startPeriode, endPeriode] = periode.split(' s/d ')
  const titleCellSubHeader = worksheet.getCell('B4')
  titleCellSubHeader.value = `${DateFormatter.formatIDDate(startPeriode, false)} s/d ${DateFormatter.formatIDDate(endPeriode, false)}`
  titleCellSubHeader.font = { bold: false, size: 12 }
  titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }


  // Ambil nama parameter dari jam pertama
  const hariDenganData = data.find((d) => Array.isArray(d.jam) && d.jam.length > 0);

  let parameters = [];
  if (hariDenganData) {
    parameters = Object.keys(hariDenganData.jam[0]).filter((k) => k !== 'jam');
  } else {
    // fallback kalau semua kosong — ambil dari statistik
    parameters = Object.keys(data[0].statistik || {});
  }

  // Row 1: Header tanggal
  const header1 = ['Waktu'];
  data.forEach((item) => {
    header1.push(new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }));
    for (let i = 1; i < parameters.length; i++) header1.push('');
  });
  const headerWaktu = worksheet.addRow(header1);

  headerWaktu.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
  })

  // Gabung sel tanggal
  let startCol = 2;
  data.forEach(() => {
    worksheet.mergeCells(1, startCol, 1, startCol + parameters.length - 1);
    startCol += parameters.length;
  });

  // Row 2: Header nama parameter
  const header2 = [''];
  data.forEach(() => {
    header2.push(...parameters.map((p) => generateTextParameter(p)));
  });
  const headerParam = worksheet.addRow(header2);

  headerParam.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
  })

  // Row 3: Satuan (jika mau, bisa ubah manual)
  const satuanMap = {
    ws: 'm/s',
    wd: '°',
    humidity: '%',
    temperature: '°C',
    pressure: 'hPa',
    sr: 'W/m²',
    rain_intensity: 'mm/h',
    uv: 'index',
  };
  const header3 = [''];
  data.forEach(() => {
    header3.push(...parameters.map((p) => satuanMap[p] || ''));
  });
  const headerUnit = worksheet.addRow(header3);

  headerUnit.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    }

    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' },
    };
  })

  // GABUNG SEL WAKTU HORIZONTAL
  worksheet.mergeCells('B6:I6')
  worksheet.mergeCells('J6:Q6')
  worksheet.mergeCells('R6:Y6')
  worksheet.mergeCells('Z6:AG6')
  worksheet.mergeCells('AH6:AO6')
  worksheet.mergeCells('AP6:AW6')
  worksheet.mergeCells('AX6:BE6')

  // Gabung sel 'Waktu' secara vertikal
  worksheet.mergeCells('A6:A8');
  worksheet.getCell('A6').value = 'Waktu';
  worksheet.getCell('A6').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('A8').font = { bold: true };

  // Styling semua header
  worksheet.getRow(headerWaktu.number).font = { bold: true };
  worksheet.getRow(headerParam.number).font = { bold: true };
  worksheet.getRow(headerUnit.number).font = { italic: true };

  worksheet.getRow(headerWaktu.number).alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(headerParam.number).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  worksheet.getRow(headerUnit.number).alignment = { horizontal: 'center', vertical: 'middle' };

  // --- MULAI ISI DATA ---

  const jamList = data[0].jam.length > 0 ? data[0].jam.map((j) => j.jam) : generateJamList();

  // Tambahkan setiap baris jam
  jamList.forEach((jam) => {
    const rowData = [jam]; // kolom pertama: waktu

    data.forEach((hari) => {
      parameters.forEach((param) => {
        const nilai = toNumber(hari.jam.find((x) =>
          x.jam.startsWith(jam) || jam.startsWith(x.jam)
        )?.[param]);

        rowData.push(nilai);
      });
    });

    const row = worksheet.addRow(rowData);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
    })
  });

  // Tambahkan baris statistik (Min, Mean, Maks, P95, P98)
  const stats = ['min', 'mean', 'max', 'p95', 'p98'];
  stats.forEach((key) => {
    const rowData = [key.toUpperCase()]; // kolom pertama nama statistik

    data.forEach((hari) => {
      parameters.forEach((param) => {
        const val = toNumber(hari.statistik?.[param]?.[key]);
        rowData.push(val);
      });
    });

    const row = worksheet.addRow(rowData);

    // Styling khusus baris statistik
    row.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle' }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECF0F5' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  worksheet.columns = Array.from({ length: 57 }, () => ({ width: 12 }));

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  saveAs(blob, `Laporan_Cuaca_${periode}.xlsx`)
}

async function cuacaBulanan(dataBulanan, bulan, tahun, parameter) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

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

async function CuacaTahunan(dataTahunan, tahun, sensor) {
  const ExcelJS = window.ExcelJS;
  const saveAs = window.saveAs;

  if (!ExcelJS || !saveAs) {
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const leftLogo = await fetch('/dlh2.png').then((r) => r.arrayBuffer());
  const rightLogo = await fetch('/pemkot.png').then((r) => r.arrayBuffer());

  const mapBulan = {
    Januari: 'January',
    Februari: 'February',
    Maret: 'March',
    April: 'April',
    Mei: 'May',
    Juni: 'June',
    Juli: 'July',
    Agustus: 'August',
    September: 'September',
    Oktober: 'October',
    November: 'November',
    Desember: 'December',
  };

  const bulanList = Object.keys(mapBulan);

  const tanggalList = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  for (const bulan of bulanList) {
    const isi = dataTahunan[mapBulan[bulan]] || {};
    const worksheet = workbook.addWorksheet(bulan);

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

    worksheet.mergeCells('AF2:AF5')
    worksheet.addImage(rightImageId, {
      tl: { col: 31, row: 1 },
      ext: { width: 80, height: 80 },
    })

    worksheet.mergeCells('B3:AE3')
    const titleCellHeader1 = worksheet.getCell('B3')
    titleCellHeader1.value = `LAPORAN KONSENTRASI ${tahun}`
    titleCellHeader1.font = { bold: true, size: 16 }
    titleCellHeader1.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.mergeCells('B4:AE4')
    const titleCellHeader2 = worksheet.getCell('B4')
    titleCellHeader2.value = `Parameter: ${sensor}`
    titleCellHeader2.font = { bold: true, size: 14 }
    titleCellHeader2.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.mergeCells('B5:AE5')
    const titleCellSubHeader = worksheet.getCell('C5')
    titleCellSubHeader.value = bulan
    titleCellSubHeader.font = { bold: false, size: 12 }
    titleCellSubHeader.alignment = { horizontal: 'center', vertical: 'middle' }

    worksheet.addRow([]);

    // === HEADER KOLOM ===
    const header = ['Waktu', ...tanggalList];
    const rowHeader = worksheet.addRow(header);
    rowHeader.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center' };
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

    // Ambil jam dari tanggal pertama atau generate default
    const semuaHari = Object.values(isi);
    const hariPertama = semuaHari.find((h) => h?.jam?.length);
    const jamList =
      hariPertama && hariPertama.jam?.length
        ? hariPertama.jam.map((j) => j.jam)
        : generateJamList();

    // === ISI DATA PER JAM ===
    jamList.forEach((jam) => {
      const row = [jam];
      tanggalList.forEach((tgl) => {
        const tanggalKey = Object.keys(isi).find((k) => k.endsWith(`-${tgl}`));
        const hari = tanggalKey ? isi[tanggalKey] : null;
        const nilai = hari?.jam?.find((j) => j.jam === jam)?.nilai ?? '';
        row.push(nilai);
      });
      const jamRow = worksheet.addRow(row);

      jamRow.eachCell((cell) => {
        cell.alignment = {
          horizontal: "center"
        }
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    });

    // === TAMBAHKAN STATISTIK DI BAWAH ===
    const stats = ['min', 'mean', 'max', 'p95', 'p98'];
    stats.forEach((key) => {
      const row = [key.toUpperCase()];
      tanggalList.forEach((tgl) => {
        const tanggalKey = Object.keys(isi).find((k) => k.endsWith(`-${tgl}`));
        const val = tanggalKey ? isi[tanggalKey]?.[key] ?? '' : '';
        row.push(val);
      });

      const r = worksheet.addRow(row);
      r.eachCell((c) => {
        c.font = { bold: true };
        c.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ECF0F5' },
        };
        c.alignment = { horizontal: 'center', vertical: 'middle' };
        c.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    worksheet.columns = Array.from({ length: 32 }, () => ({ width: 12 }));
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `Laporan_Tahunan_${changeWeeatherSensor(sensor.toLowerCase())}_${tahun}.xlsx`);
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

function generateJamList(short = false) {
  const list = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');

      if (short) {
        list.push(`${hh}:${mm}`);
      } else {
        list.push(`${hh}:${mm}:00`);
      }
    }
  }
  return list;
}

function toNumber(val) {
  if (val === undefined || val === null || val === '') return '';
  const num = Number(val);
  return isNaN(num) ? '' : num;
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

function changeWeeatherSensor(value) {
  switch (true) {
    case value === 'temperature':
      return 'Suhu'
    case value === 'humidity':
      return 'Kelembapan'
    case value === 'ws':
      return 'Kecepatan Angin'
    case value === 'wd':
      return 'Arah Angin'
    case value === 'pressure':
      return 'Tekanan Udara'
    case value === 'sr':
      return 'Solar Radiasi'
    case value === 'rain_intensity':
      return 'Curah Hujan'
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
  konsentrasiHarian,
  konsentrasiMingguan,
  konsentrasiBulanan,
  konsentrasiTahunan,
  avgKonsentrasiBulanan,
  avgKonsentrasiTahunan,
  ispuHarian,
  ispuBulanan,
  ispuTahunan,
  cuacaHarian,
  cuacaMingguan,
  cuacaBulanan,
  CuacaTahunan,
}

