import { Buku, pinjams, detail_pinjams, Mahasiswas} from "../models/model.js"; //diambil dari models yg kodenya udah 
                                                                              //dijadiin 1 di file model.
import { Sequelize, where } from "sequelize";

// Peminjaman -> DetailPeminjaman : pinjam_id
// DetailPeminjaman -> Buku : buku_id

// Peminjaman -> Buku ??
// Peminjaman -> DetailPeminjaman -> Buku : pinjam_id, buku_id

// Peminjaman -> Mahasiswa : nim

export const returnAllBooks = async (req, res) => {
  //untuk mengembalikan semua buku
  try {
    const details = await detail_pinjams.findAll({
      where: {
        pinjam_id: req.params.pinjam_id,
        status: 1
      }
    });
    // Gimana caranya supaya ketika pengembalian qty/jumlah di tabel buku itu bertambah

    details.forEach(async (detail) => {
      const buku = await Buku.findOne({
        where: { id: detail.buku_id },
      })
      await buku.update(
        {
          jumlah: buku.jumlah + detail.jml_pinjam,
        },
      );
      await buku.reload();
      detail.status = 2;
      await detail.save();
    });

    res.json({message: "Sukses"});
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const getAllPinjam = async (req, res) => {
  try {
    // Kita ingin mengambil seluruh data peminjaman
    // Kita juga perlu tau siapa yang meminjam -> Mahasiswa
    // Kita juga perlu tau Buku yang dipinjam
    // Tetapi, untuk mengambil Buku kita perlu Detail Peminjaman
    const data = await pinjams.findAll({
      // include digunakan untuk memanggil entitas yang terhubung
      // kalau disini berarti memanggil data mahasiswa yang terhubung ke pinjams
      include: [
        { model: Mahasiswas },
        // Karena di tabel pinjams tidak ada kolom untuk menghubungkan ke Buku
        // Maka perlu dihubungkan dulu ke detail pinjams, baru bisa ke buku
        { model: detail_pinjams, include: [Buku] },
      ],
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const insertPinjam = async (req, res) => {
  try {
    const pinjam = await pinjams.create(
      {
        tanggal_pinjam: req.body.tanggal_pinjam,
        tanggal_kembali: req.body.tanggal_kembali, //tgl_pinjam kebawah itu array
        nim: req.body.nim,
        pegawai_id: req.body.pegawai_id,

        detail_pinjams: req.body.detail_pinjams
      },
      {
        include: [
          {
            model: detail_pinjams,
            as: "detail_pinjams"
          }
        ]
      }
    );

    if (pinjams && req.body.detail_pinjams) { 
      for (let i = 0; i < req.body.detail_pinjams.length; i++) {
        Buku.decrement(
          {jumlah: req.body.detail_pinjams[i].jml_pinjam},
          {where: {kode_buku: req.body.detail_pinjams[i].buku_id}}
        );
      }
    }
//pinjam && (and) untuk memastikan bahwa semua nilai benar, bukan salah satunya
//req body itu di postman yg menampilkan detail pinjam
//for i=0 brati dia menampilkan baris dari 1- sesuai yang ada di baris .
//buku decrement itu dia pengaruh di jml_pinjam, dengan loaksinya di detail pinjam. dengna buku id.
//ssehingga yang berubah di db adalah kurangnya jumlah di bukus , dia berkurangnya sesuai dengan apa yg ditulis
//di jml_pinjam, kalau maunya 1 maka yg kurang 1, dari jumlah 10 min 1 jadi 9.
    res.json({
      message: "Peminjaman berhasil",
      data: req.body.detail_pinjams
    });

  } catch (error) {
    res.json({
      message: error.message
    });
  }
};

export const tambahPinjambaru = async (req, res) => {
  try {
    const data = await pinjams.create(req.body);
    res.json({ message: "Data Pinjam berhasil disimpan" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const cariPinjamByID = async (req, res) => {
  try {
    const data = await pinjams.findAll({
      where: {
        nim: req.params.id,
      },
      include: [
        {
          model: Mahasiswas,
          model: detail_pinjams,
          include: [
            {
              model: Buku,
            },
          ],
        },
      ],
    });
    res.json(data[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const cariPinjamByNIM = async (req, res) => {
  try {
    const data = await pinjams.findAll({
      where: {
        nim: req.params.id,
      },
      include: [
        { model: Mahasiswas, attributes: ["nama"] },
        { model: detail_pinjams, include: Buku },
      ],
    });
    res.json(data[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updatePinjam = async (req, res) => {
  try {
    await pinjams.update(req.body, {
      where: {
        nim: req.params.nim,
      },
    });
    res.json({ message: "Data Mahasiswa berhasil diupdate" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletePinjam = async (req, res) => {
  try {
    await pinjams.destroy({
      where: {
        nim: req.params.id,
      },
    });
    res.json({ message: "Data Mahasiswa berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
//kode kembali buku pada tugas 1
export const returnOneBook = async (req, res) => {
  //untuk mengembalikan 1 buku
  try {
    const { pinjam_id, detail_id } = req.params;

    const detail = await detail_pinjams.findOne({
      where: { pinjam_id: req.params.pinjam_id, id: req.params.detail_id },
      //pinjam id di dapat dr db detail_pinjams, wajib ada req.params,
      //req.params itu di sesuaikan dg pinjams routes
    });
    detail.update({
      status: 2,
      tanggal_kembali: new Date(),
    });
    detail.reload();

    if (!detail) {
      return res
        .status(404)
        .json({ message: "Data tidak ditemukan, cek ID lagi!" });
    }
    await detail_pinjams.update(
      { status: 2, tanggal_kembali: new Date() },
      { where: { id: detail.id } },
    );
    // Gimana caranya supaya ketika pengembalian qty/jumlah di tabel buku itu bertambah

    const buku = await Buku.findOne({
      //dia ambil data buku
      where: { kode_buku: detail.buku_id }, //gunain id/kode_buku
    });

    if (buku) {
      await buku.update(
        //untuk update buku yg di import buku
        {
          jumlah: buku.jumlah + detail.jml_pinjam,
        },
        // {
        //   where: { kode_buku: detail.buku_id },
        // },
      );
    }
    res.json({ message: "1 buku berhasil dikembalikan" });
  } catch (error) {
    res.json({ message: error.message });
  }
};


//ini untuk mengembalikan buku

export const pengembalianBuku = async (req, res) => {
  try {
    for (const item of req.body.buku_kembali) {
      // cari detail pinjam
      const detail = await detail_pinjams.findOne({
        where: {
          id: item.detail_pinjam_id,
          status: 1,
        },
      });

      if (!detail) {
        return res.json({
          message: "Data pinjam tidak ditemukan",
        });
      }

      // validasi pengembalian si buku
      if (item.jml_kembali > detail.jml_pinjam) {
        return res.json({
          message: "Jumlah kembali melebihi jumlah pinjam",
        });
      }

      // jika buku kembali semua
      if (item.jml_kembali == detail.jml_pinjam) {
        await detail_pinjams.update(
          {
            status: 2,
          },
          {
            where: {
              id: detail.id,
            },
          },
        );
      } else {
        // insert riwayat, jika pengembalian sebagian
        await detail_pinjams.create({
          pinjam_id: detail.pinjam_id,
          buku_id: detail.buku_id,
          jml_pinjam: item.jml_kembali,
          status: 2,
        });

        // update sisa pinjaman yg berada di detail pinjams, yg jumlah pinjam
        await detail_pinjams.update(
          {
            jml_pinjam: detail.jml_pinjam - item.jml_kembali,
          },
          {
            where: {
              id: detail.id,
            },
          },
        );
      }

      // tambah stok buku, mengembalikan buku yg udah dipinjam dibalikin ke awal lgi.
      await Buku.increment("jumlah", {
        by: item.jml_kembali,
        where: {
          kode_buku: detail.buku_id,
        },
      });
    }

    res.json({
      message: "Pengembalian berhasil",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

//pencarian by nim
export const cariBukuDipinjam = async (req, res) => {
  try {
    const data = await pinjams.findAll({
      attributes: [],

      where: {
        nim: req.params.nim,
      },

      include: [
        {
          model: Mahasiswas,
          //as: "mahasiswa",
          attributes: ["nama"],
        },

        {
          model: detail_pinjams,
          //as: "detail_pinjams",
          attributes: ["id", "jml_pinjam", "status"],

          where: {
            status: 1,
          },

          include: [
            {
              model: Buku,
              attributes: ["judul"],
            },
          ],
        },
      ],
    });

    res.json(data);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const laporanPengembalian = async (req, res) => {
  try {
    const data = await pinjams.findAll({
      attributes: ["tanggal_pinjam", "tanggal_kembali"],

      //where: {
        //nim: req.params.nim,
      //},

      include: [
        {
          model: Mahasiswas,

          as: "mahasiswa",

          attributes: ["nama"],
        },

        {
          model: detail_pinjams,

          as: "detail_pinjams",

          where: {
            status: 2,
          },

          attributes: ["status" ,"jml_pinjam", "updated_at"],

          include: [
            {
              model: Buku,

              as: "buku",

              attributes: ["judul"],
            },
          ],
        },
      ],
    });

    const hasil = data.map((p) => ({
      nama_mahasiswa: p.mahasiswa?.nama || "-",
      

      tanggal_pinjam: p.tanggal_pinjam,

      buku: (p.detail_pinjams || []).map((d) => {
        // tanggal batas pengembalian
        const batasKembali = new Date(p.tanggal_kembali);

        // tanggal sekarang (real time)
        const sekarang = new Date();

        // hitung selisih hari
        const tanggalPengembalian = new Date(d.updated_at);

        let terlambat = Math.ceil(
          (tanggalPengembalian - batasKembali) / (1000 * 60 * 60 * 24),
        );

        // jika belum terlambat
        if (terlambat < 0) {
          terlambat = 0;
        }

        return {

          judul_buku: d.buku?.judul || "-",

          status: d.status,

          jumlah_pinjam: `${d.jml_pinjam} buku`, 
          //fungsi dri `${}...` yg buat muncul di postman 1 buku

          tanggal_pengembalian: d.updated_at,

          jumlah_hari_terlambat: terlambat,
        };
      }),
    }));

    res.json(hasil);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};