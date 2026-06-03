import Buku from "../models/buku.model.js";
import pinjams from "../models/pinjams.model.js";
import detail_pinjams from "../models/detail_pinjams.model.js";
import Mahasiswas from "../models/mahasiswa.model.js";

 /*relasi antara mahasiswa dengan tabel pinjam, agar ketika seleksi pada
 tabel pinjam yang muncul tidak hanya nim, tapi juga nama
 */
 Mahasiswas.hasMany(pinjams, {  foreignKey: "nim"});

pinjams.belongsTo(Mahasiswas, {  foreignKey: "nim"});

/*relasi antara Buku dengan tabel DetilPinjam, agar ketika seleksi pada
 tabel DetilPinjam yang muncul tidak hanya buku_id, tapi juga nama_bukunya
 */
Buku.hasMany(detail_pinjams, { foreignKey: "buku_id" });

detail_pinjams.belongsTo(Buku, { foreignKey: "buku_id" });

/*relasi antara Pinjam dengan tabel DetilPinjam, agar ketika seleksi pada
 tabel Pinjam akan muncul data pada detail pinjam, serta ketika kita
melakukan save
 peminjaman buku kita tinggal panggil model DetilPinjam
 */
pinjams.hasMany(detail_pinjams, { foreignKey: "pinjam_id"});
detail_pinjams.belongsTo(pinjams, { foreignKey: "pinjam_id" });

export {
  Buku,
  pinjams,
  detail_pinjams,
  Mahasiswas
};