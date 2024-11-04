/*
SQLyog Community
MySQL - 10.4.22-MariaDB : Database - adiputro_psytest
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`adiputro_psytest` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `adiputro_psytest`;

/*Table structure for table `applicant` */

DROP TABLE IF EXISTS `applicant`;

CREATE TABLE `applicant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `job_vacancy_id` bigint(10) NOT NULL,
  `nama` varchar(1000) NOT NULL,
  `no_ktp` varchar(1000) NOT NULL,
  `tempat_lahir` varchar(1000) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` varchar(1) NOT NULL,
  `alamat_domisili` varchar(1000) NOT NULL,
  `usia` int(100) NOT NULL,
  `status_perkawinan` varchar(1000) NOT NULL,
  `nomor_hp` varchar(100) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `pendidikan_terakhir` varchar(1000) NOT NULL,
  `nama_sekolah` varchar(1000) NOT NULL,
  `jurusan` varchar(1000) NOT NULL,
  `posisi_dilamar` varchar(1000) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `lampiran_drive_id` varchar(100) NOT NULL,
  `portofolio` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

/*Data for the table `applicant` */

/*Table structure for table `epps_data` */

DROP TABLE IF EXISTS `epps_data`;

CREATE TABLE `epps_data` (
  `test_result_id` bigint(10) NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL COMMENT 'l/p',
  `pendidikan` varchar(255) NOT NULL COMMENT 'sma/smk/s1',
  `kode_epps` int(1) NOT NULL COMMENT '1: college student (M), 2: College student (W), 3: General Adult (M), 4: General Adult (W)',
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`test_result_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `epps_data` */

/*Table structure for table `exam_session` */

DROP TABLE IF EXISTS `exam_session`;

CREATE TABLE `exam_session` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `finish_date` datetime NOT NULL,
  `duration` int(10) NOT NULL COMMENT 'in minutes',
  `test_token` varchar(500) NOT NULL,
  `auth_token` varchar(500) NOT NULL COMMENT 'for authentication',
  `is_logged` int(10) NOT NULL DEFAULT 0 COMMENT '1: logged in, 0: logged out',
  `is_admin` int(10) NOT NULL DEFAULT 0,
  `current_test` bigint(10) NOT NULL DEFAULT 0,
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

/*Data for the table `exam_session` */

/*Table structure for table `exam_session_test` */

DROP TABLE IF EXISTS `exam_session_test`;

CREATE TABLE `exam_session_test` (
  `exam_session_id` varchar(255) NOT NULL,
  `test_id` varchar(255) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`exam_session_id`,`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `exam_session_test` */

/*Table structure for table `ist_data` */

DROP TABLE IF EXISTS `ist_data`;

CREATE TABLE `ist_data` (
  `test_result_id` bigint(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `tanggal_tes` date NOT NULL,
  `usia` int(255) NOT NULL,
  `tujuan_tes` varchar(255) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`test_result_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `ist_data` */

/*Table structure for table `job_vacancy` */

DROP TABLE IF EXISTS `job_vacancy`;

CREATE TABLE `job_vacancy` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL,
  `qr_link` varchar(1000) NOT NULL,
  `list_pekerjaan` varchar(1000) NOT NULL,
  `start_date` datetime NOT NULL,
  `status` int(20) NOT NULL DEFAULT 1 COMMENT '1: open, 0: closed',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

/*Data for the table `job_vacancy` */

/*Table structure for table `kreapelin_data` */

DROP TABLE IF EXISTS `kreapelin_data`;

CREATE TABLE `kreapelin_data` (
  `section_result_id` bigint(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pendidikan` varchar(100) NOT NULL COMMENT 'smea/stm-smk/sma/sarjana muda/sarjana',
  `jurusan` varchar(100) NOT NULL COMMENT 'ipa/ips',
  `jenis_kelamin` varchar(100) NOT NULL COMMENT 'L/P',
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`section_result_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `kreapelin_data` */

/*Table structure for table `question` */

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` bigint(10) NOT NULL AUTO_INCREMENT,
  `instruction` varchar(1000) NOT NULL,
  `section_id` bigint(20) NOT NULL,
  `option_num` int(10) NOT NULL,
  `option_a` text DEFAULT NULL,
  `option_b` text DEFAULT NULL,
  `option_c` text DEFAULT NULL,
  `option_d` text DEFAULT NULL,
  `option_e` text DEFAULT NULL,
  `answer` varchar(100) NOT NULL,
  `option_type` int(10) NOT NULL DEFAULT 1 COMMENT '1: text,  2: image',
  `instruction_type` int(10) NOT NULL DEFAULT 1 COMMENT '1: text,  2: image',
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `question` */

/*Table structure for table `question_result` */

DROP TABLE IF EXISTS `question_result`;

CREATE TABLE `question_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `section_result_id` bigint(20) NOT NULL,
  `question_id` bigint(20) NOT NULL,
  `answer` varchar(100) NOT NULL,
  `status_correct` int(10) NOT NULL DEFAULT 0 COMMENT '1: correct, 0: false',
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `question_result` */

/*Table structure for table `registrant` */

DROP TABLE IF EXISTS `registrant`;

CREATE TABLE `registrant` (
  `email` varchar(255) NOT NULL,
  `biodata` longtext NOT NULL,
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `registrant` */

/*Table structure for table `section` */

DROP TABLE IF EXISTS `section`;

CREATE TABLE `section` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `test_id` bigint(20) NOT NULL,
  `section_number` int(20) NOT NULL,
  `instruction` varchar(1000) NOT NULL,
  `duration` int(10) NOT NULL COMMENT 'in minutes',
  `section_type` varchar(255) NOT NULL COMMENT '1: essay, 2 : multiple choice',
  `question_type` varchar(255) NOT NULL COMMENT '1: text,  2: image',
  `option_num` int(10) NOT NULL,
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4;

/*Data for the table `section` */

insert  into `section`(`id`,`test_id`,`section_number`,`instruction`,`duration`,`section_type`,`question_type`,`option_num`,`status`,`createdAt`,`updatedAt`) values 
(1,1,1,'Di persoalan pertama sudah terdapat 10 nomor. Tugas anda adalah menjawab dengan JELAS, SINGKAT, TETAPI LENGKAP. silahkan jawabannya anda tuliskan di lembar jawaban yang sudah disediakan',10,'1','1',1,1,'2022-01-17 16:51:30','2022-01-17 16:51:30'),
(2,1,2,'Untuk persoalan berikutnya. sudah terdapat 40 soal. Di tiap soal sudah disediakan pilihan jawabannya. Tugas anda tinggal memilih satu yang paling benar',7,'2','1',4,1,'2022-01-23 14:06:16','2022-01-23 16:06:32'),
(3,1,3,'Di persoalan ke 3 sudah terdapat 40 soal. Di tiap soal juga sudah disediakan pilihan jawabannya. Tugas anda adalah memilih PASANGAN KATA YANG SESUAI DENGAN POLA PASANGAN KATA YANG ADA DI DEPANNYA.',5,'2','1',4,1,'2022-01-17 16:51:30','2022-01-17 16:51:30'),
(4,1,4,'Di persoalan berikutnya, sudah terdapat 20 soal. Di tiap soal sudah di sediakan pilihan jawabannya. Tugas anda tinggal memilih 1 yang paling benar.',3,'2','1',3,1,'2022-01-23 07:32:48','2022-01-23 07:32:48'),
(5,1,5,'Di persoalan ke 5 merupakan soal cerita hitungan. Nanti silahkan di baca, dihitung, dan ditulis jawabannya di lembar jawaban yang sudah disediakan. silahkan di tulis angkanya saja, satuannya tidak perlu.',7,'1','1',1,1,'2022-01-23 07:33:13','2022-01-23 07:33:13'),
(6,1,6,'Sudah terdapat 30 soal deret hitung. Dimana setiap soal terdiri dari deretan angka. Tugas anda adalah melanjutkan angka tersebut akan menjadi angka berapa dan berapa.',10,'1','1',2,1,'2022-01-23 07:36:53','2022-01-23 07:36:53'),
(7,1,7,'Di persoalan berikutnya sudah terdapat 20 soal. Di setiap soal sudah disediakan pilihan jawabannya. Tugas anda tinggal memilih 1 yang paling benar',5,'2','1',5,1,'2022-01-23 14:40:14','2022-01-23 14:40:14'),
(8,1,8,'Di tiap nomor sudah terdapat 5 kata. Tugas anda adalah memilih 1 kata yang artinya paling berbeda. kita ke contoh no 1. di sana sudah terdapat jurusan, timur, perjalanan, arah dan selatan. 1 kata yang artinya paling berbeda yang mana? ya benar jawabannya adalah PERJALANAN. karena jurusan, timur, arah dan selatan menunjukkan suatu arah.',6,'2','1',5,1,'2022-01-23 14:40:22','2022-01-23 14:40:22'),
(9,1,9,'Nanti di atas sudah terdapat 5 gambar, itu merupakan pilihan jawabannya. Sedangkan pola pola yang terpisah di dalam kotak merupakan soalnya.',6,'2','2',5,1,'2022-02-01 18:03:14','2022-02-01 18:03:14'),
(10,1,10,'Nanti di setiap nomor sudah terdapat 2 gambar. Tugas anda adalah membandingkan apakah keduanya sama persis atau tidak. silahkan dilihat dari bentuknya, arsiran nya, maupun bila posisinya di ubah.',7,'2','2',2,1,'2022-02-01 18:03:42','2022-02-01 18:03:42'),
(11,2,1,'Di test ini anda akan diperhadapkan dengan 225 butir pernyataan, dimana masing-masing nomor terdapat 2 pernyataan. Tugas Anda adalah memilih satu pernyataan yang paling menggambarkan diri anda pada masing-masing nomor.',60,'2','1',2,1,'2022-02-19 10:17:06','2022-02-19 10:17:06'),
(44,6,1,'Sudah terdapat 40 soal hitungan. Setiap soal sudah diberi keterangan harus diapakan, silahkan dibaca dan di hitung, kemudian pilihlah 1 jawaban yang paling benar. JANGAN MENGGUNAKAN KALKULATOR. DAN KERTAS BURAM BISA D UPLOAD DI KOLOM YANG NANTI TELAH DISEDIAKAN. ',30,'2','1',5,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(45,7,1,'Setiap soal dalam tes ini telah menyajikan 3 macam susunan kalimat untuk menyatakan isi pikiran yang sama. <b>Tugas anda adalah memilih 1 pernyataan yang paling baik yaitu pernyataan yang paling kena, jelas dan lancar</b>.  Klik lah tanda O terlebih dahulu dan pilihlah pernyataan mana yang baik. <b>Kemudian pilihlah 1 lagi pernyataan yang paling jelek yaitu pernyataan yang paling tidak kena, paling tidak jelas, dan paling kurang lancar</b>. Klik lah tanda X dan pilihlah pernyataan yang jelek. <b>Jadi nanti di tiap nomer akan ada 2 jawaban, yaitu satu lingkaran dan satu silang.</b>',35,'2','1',3,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(46,8,1,'Dalam tes ini anda akan melihat satu deretan pola atau gambar. Tiap-tiap deret merupakan suatu soal yang terdiri atas 4 gambar. 4 gambar ini merupakan suatu rangkaian yang telah tersusun menurut pedoman tertentu. Tugas anda adalah mencari gambar kelima yang merupakan kelanjutan dari rangkaian pola yang ada di depannya. Pilihlah 1 jawaban yang paling tepat. ',25,'2','1',5,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(47,9,1,'Dalam tes ini tiap-tiap soal didahului oleh suatu naskah/ bacaan singkat. Bacalah baik-baik dan fahami dahulu naskah itu, kemudian pilihlah satu jawaban yang cocok dengan isi naskah di atasnya. ',40,'2','1',4,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(48,11,1,'Pada persoalan berikutnya, Di tiap soal sudah ada 2 gambar. Gambar di sebelah kiri yang merupakan gambar soal, dan di sebelah kanan yang merupakan gambar pilihan jawaban. Tugas anda adalah memilih 1 jawaban yang paling tepat bilamana pola di sebelah kiri dilipat/disatukan. ',8,'2','1',4,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(49,12,1,'Di tiap soal terdiri dari gambar dan pertanyaan. Bacalah dulu pertanyaannya dengan teliti dan periksalah gambarnya dengan hati-hati, kemudian pilihlah 1 jawaban yang paling benar. ',20,'2','1',4,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(50,13,1,'Dalam tes ini telah diketahui sejumlah lima buah gambar yang sederhana dan sejumlah gambar yang lebih kompleks. Periksalah tiap-tiap gambar yang kompleks itu, kemudian carilah gambar sederhana mana yang terdapat dalam gambar yang kompleks itu. <b>Gambar sederhana yang telah anda temukan itu harus sama bentuknya, sama luasnya dan sama letak posisinya seperti dalam gambar sederhana yang diketahui. Pilihlah 1 gambar yang paling benar.</b>',24,'2','1',5,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(51,14,1,'Ini adalah tes tentang kecakapan membayangkan merakit bagian-bagian mesin. Bagian-bagian mesin yang masih terpisah-pisah ditunjukkan di bagian kiri dari tiap-tiap soal. <b>Tugas anda adalah memilih rakitan yang tepat bilamana bagian-bagian mesin itu sudah dirakit.</b> Dalam tes ini ada beberapa bagian yang harus dirakit tempat-tempat yang ditandai dengan huruf yang sama harus dirakit berimpit. <b>Bagian-bagian yang akan dirakit boleh diputar-putar atau dibolak-balik. Kemudian pilihlah 1 jawaban yang paling tepat bilamana bagian mesin itu telah dirakit.</b>',20,'2','1',5,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(52,15,1,'Di tiap soal terdiri dari gambar dan pertanyaan. Bacalah dulu pertanyaannya dengan teliti dan periksalah gambarnya dengan hati-hati, kemudian pilihlah 1 jawaban yang paling benar. ',20,'2','1',4,1,'2022-02-23 14:19:44','2022-02-23 14:19:44'),
(53,5,1,'Tes ini merupakan tes penjumlahan sederhana. Tulislah angka satuannya saja. Misalnya penjumlahan 5+9 adalah 14, maka yang Anda tulis cukup angka 4 nya saja.',13,'2','1',0,1,'2022-03-12 20:32:57','2022-03-12 20:32:57'),
(54,3,1,'Rangkaian pertanyaan berikut ini adalah untuk mengetahui pendapat anda tentang hal-hal tertentu. Tidak ada jawaban yang salah ataupun yang benar. Anda harus menjawab pertanyaan-pertanyaan tersebut dengan menggunakan tanggapan pertama anda.  Jawablah pertanyaan-pertanyaan tersebut dengan melingkari \" YA\", \" TIDAK\". Jawablah semua pertanyaan yang ada. ',-1,'2','1',2,1,'2022-04-06 10:12:03','2022-04-06 10:12:03'),
(55,4,1,'Jawablah pernyataan dibawah ini dengan memilih positif (+) bila pernyataan tersebut sesuai dengan diri anda, atau jawablah negatif (-) bila pernyataan tersebut tidak sesuai dengan diri anda',-1,'2','1',2,1,'2022-04-06 10:12:03','2022-04-06 10:12:03'),
(56,10,1,'Ada 150 soal. Tugas anda adalah memperhatikan setiap pernyataan di sebelah kiri dan kanan sama persis atau tidak. Jika sama pilihlah O. Jika tidak sama pilih X',6,'2','1',2,1,'2022-04-09 03:53:15','2022-04-09 03:53:15'),
(57,10,2,'Ada 50 soal hitungan.  Di tiap soal sudah ada perintah tentang apa yang harus dikerjakan.  Pilihlah 1 jawaban yang paling benar. <b>NB: Tidak Boleh menggunakan kalkulator.</b>',6,'2','1',5,1,'2022-04-09 03:55:03','2022-04-09 03:55:03'),
(58,10,3,'Sudah tersedia 25 soal cerita hitungan.  Silahkan di baca dan di hitung. Silahkan tuliskan jawabannya di tempat yang sudah disediakan. <b>NB: Tidak Boleh menggunakan kalkulator.</b>',6,'1','1',0,1,'2022-04-09 03:59:37','2022-04-09 03:59:37'),
(59,10,4,'Terdiri dari 40 soal. Perhatikan di atas sudah terdapat 8 kategori dari A hingga H,  peganglah itu sebagai pedoman Anda. Tugas Anda adalah memilih pernyataan pada setiap soal termasuk dalam kategori yang mana.  Pilihlah satu jawaban yang paling benar.',5,'2','1',8,1,'2022-04-09 04:29:29','2022-04-09 04:29:29'),
(60,10,5,'Sudah terdapat 40 soal. Tugas anda adalah memilih 1 jawaban yang paling benar.',6,'2','1',4,1,'2022-04-09 04:30:18','2022-04-09 04:30:18'),
(61,17,1,'Terdiri dari 20 soal yang terdiri atas kalimat-kalimat. Pada setiap kalimat ada satu kata yang hilang. Tugas Anda adalah mencari pengganti kata tersebut.',6,'2','1',5,1,'2022-04-09 08:09:39','2022-04-09 08:09:39'),
(62,17,2,'Di persoalan berikutnya sudah 5 kata. Tugas anda adalah carilah 1 kata yang artinya paling berbeda.',6,'2','1',5,1,'2022-04-09 08:10:00','2022-04-09 08:10:00'),
(63,17,3,'Sudah terdapat 3 kata. Antara kata pertama dan kedua terdapat suatu hubungan yang tertentu. Antara kata ketiga dan salah satu dari 5 kata pilihan harus pula terdapat hubungan yang sama itu. Carilah kata itu.',7,'2','1',5,1,'2022-04-09 08:10:46','2022-04-09 08:10:46'),
(64,17,4,'Sudah ditentukan 2 kata. Tugas Anda adalah mencari 1 perkataan yang meliputi pengertian kedua kata tersebut.',8,'1','1',1,1,'2022-04-09 08:11:38','2022-04-09 08:11:38'),
(65,17,5,'Persoalan berikutnya merupakan soal hitungan cerita. Tulislah jawaban di kolom yang sudah disediakan.',10,'1','1',1,1,'2022-04-09 08:12:04','2022-04-09 08:12:04'),
(66,17,6,'Pada persoalan berikutnya akan diberikan deret angka. Setiap deret tersusun menurut suatu aturan yang tertentu dan dapat dilanjutkan menurut aturan itu.',10,'1','1',1,1,'2022-04-09 08:12:31','2022-04-09 08:12:31'),
(67,17,7,'Pada persoalan berikutnya, setiap soal memperlihatkan sesuatu bentuk tertentu yang terpotong menjadi beberapa bagian. Bila bentuk yang terpotong itu disatukan akan menjadi yang mana.',7,'2','2',5,1,'2022-04-09 08:12:57','2022-04-09 08:12:57'),
(68,17,8,'Ditentukan 5 buah kubus a,b,c,d,e. Pada tiap-tiap kubus terdapat enam tanda yang berlainan pada setiap sisinya. Tiga dari tanda itu dapat dilihat. Tiap kubus dapat mempunyai tanda-tanda yang sama, akan tetapi susunannya berlainan. Pilihlah pasangan kubus yang bila diputar/digulingkan akan menunjukkan kesamaan tanda dan posisinya.',9,'2','2',5,1,'2022-04-09 08:13:27','2022-04-09 08:13:27'),
(69,17,9,'Disediakan waktu 3 menit untuk menghafalkan kata-kata. Pada persoalan berikutnya, terdapat sejumlah pertanyaan mengenai kata-kata yang anda hafalkan. Tugas anda adalah menjawab soal sesuai dengan yang anda hafalkan.',3,'2','1',5,1,'2022-04-09 08:14:03','2022-04-09 08:14:03'),
(70,21,1,'Perhatikan nanti di atas sudah terdapat 5 kotak yaitu Kotak Rokok, Penerbangan, Juru Bayar, Nomor Telepon, dan Buku Gudang. Nanti di setiap kotak sudah terdapat nama anggota beserta kodenya. Di setiap nomor sudah terdapat namanya apa. Tugas Anda adalah mencari kodenya berapa. Kita ke contoh no.1. Di situ ada sabun, kodenya berapa? kodenya 2B. Di depan 2B ada kotak kecil, silahkan di silang di dalam kotak.',3,'2','1',3,1,'2022-04-09 12:24:15','2022-04-09 12:24:15'),
(71,21,2,'Cara mengerjakannya sama seperti tadi, hanya kotak yang di atas sekarang dihilangkan. Silahkan dikerjakan seingatnya saja.',3,'2','1',10,1,'2022-04-09 12:25:01','2022-04-09 12:25:01'),
(72,16,1,'Tersedia 10 soal, tugas Anda adalah menjawab dengan jelas, singkat tetapi lengkap. Silahkan tulis jawabannya di kolom yang sudah disediakan.',10,'1','1',1,1,'2022-04-09 15:20:26','2022-04-09 15:20:26'),
(73,16,2,'Di setiap soal sudah disediakan pilihan jawabannya. Tugas Anda memilih 1 yang paling benar.',5,'2','1',4,1,'2022-04-09 15:21:13','2022-04-09 15:21:13'),
(74,16,3,'Di setiap soal sudah terdiri dari sepasang kata yang berlawanan. Tugas Anda tinggal mencari pasangan kata yang sesuai dengan pola yang ada di depannya. Contoh: Burung : terbang   = ikan :   ?   . Jawabannya adalah berenang. Karena hewan burung berpindah tempat dengan terbang, maka ikan berpindah tempat dengan cara berenang.',4,'2','1',4,1,'2022-04-09 15:23:02','2022-04-09 15:23:02'),
(75,16,4,'Setiap soal sudah terdiri dari sepasang kata, mungkin pasangan kata itu berlawanan, mungkin merupakan kesamaan atau sinonim. Pilihlah tanda X jika kedua kata itu berlawanan atau pilih tanda O jika kedua kata itu kesamaan atau sinonim.  Contoh: Marah  - murka. Itu merupakan kesamaan atau berlawanan? Jawabannya kesamaan jadi pilihlah tanda O.',4,'2','1',2,1,'2022-04-09 15:23:42','2022-04-09 15:23:42'),
(76,16,5,'Sudah terdapat 15 soal hitungan cerita. Silahkan dibaca dan ditulis hasilnya di tempat yang sudah disediakan.  <b>NB: TIDAK BOLEH MENGGUNAKAN KALKULATOR..  GUNAKAN KERTAS BURAM, DAN KERTAS BURAM BISA DI UPLOAD DI TEMPAT YANG SUDAH DISEDIAKAN.</b>',5,'1','1',1,1,'2022-04-09 15:24:18','2022-04-09 15:24:18'),
(77,16,6,'Sudah terdapat 20 soal deret hitung dimana di setiap soal terdiri dari deretan angka. Tugas Anda adalah melanjutkan angka tersebut akan menjadi angka berapa. Contoh soal: 6  10  14  18  22 26 ... selanjutnya berapa??? Jawabannya adalah 30. Tulislah angka 30 pada tempat yang sudah disediakan',7,'1','1',1,1,'2022-04-09 15:24:54','2022-04-09 15:24:54'),
(78,16,7,'Di tiap soal sudah terdiri dari 1 kata yang diikuti dengan beberapa kata sebagai pilihan jawabannya. Tugas anda mencari persamaan katanya. Contoh soal : Terbahak-bahak, a.  Terbalik-balik, b.  Tertahan-tahan, c.  Tertawa, d. Sakit, e.  Menurut, f.  Menarik. Jawaban yang benar adalah C',5,'2','1',6,1,'2022-04-09 15:25:58','2022-04-09 15:25:58'),
(79,16,8,'Tersedia 20 soal yang terdiri dari gambar yang bertandakan A, B, C yang merupakan soalnya. Sedangkan gambar yang di sebelah kanan yang bernomor 1, 2, 3, 4 merupakan pilihan jawabannya. Tugas Anda adalah mencari kelanjutan dari 3 gambar yang berhurufkan A, B, dan C. Perhatikan lah pola  masing-masing gambar.',5,'2','2',4,1,'2022-04-09 15:27:02','2022-04-09 15:27:02'),
(80,16,9,'Di setiap soal sudah terdapat 2 gambar, tugas Anda adalah membandingkan kedua gambar tersebut sama persis atau tidak.',4,'2','2',2,1,'2022-04-09 15:27:44','2022-04-09 15:27:44'),
(81,18,1,'Sudah terdapat 90 soal. Setiap soal sudah terdapat 2 pernyataan. Tugas Anda adalah memilih satu pernyataan yang paling menggambarkan diri anda pada masing-masing nomor.',-1,'2','1',2,1,'2022-04-09 16:56:42','2022-04-09 16:56:42'),
(82,20,1,'Gambar lah manusia lengkap dari ujung kepala sampai ujung kakinya. Setelah digambar, silahkan gambarnya diberi nama, usia, jenis kelamin, dan aktivitasnya sedang apa. Setelah di gambar di kertas, silahkan di upload ke sini. NB: kertas folio dengan posisi kertas <b>PORTRAIT</b>. Gambar menggunakan <b>PENSIL</b>',-1,'2','2',1,1,'2022-04-09 17:04:42','2022-04-09 17:04:42'),
(83,20,2,'Silahkan gambar pohon yang bisa dipanjat dan pohonnya harus bercabang. Nama-nama yang disebutkan di bawah ini <b>TIDAK BOLEH DIGAMBAR</b>: beringin, cemara / pinus, kelapa, pisang, pepaya, randu, perdu, bambu, bunga. Tugas Anda adalah menggambar pohon yang bisa dipanjat dan pohonnya harus bercabang. Setelah digambar, berikan keterangan itu gambar pohon apa. NB: kertas folio dengan posisi kertas <b>PORTRAIT</b>. Gambar menggunakan <b>PENSIL</b>',-1,'2','2',1,1,'2022-04-09 17:07:23','2022-04-09 17:07:23'),
(84,20,3,'Di lembar berikutnya ini, tugas Anda menggambar rumah, orang dan pohon. Terserah letaknya bagaimana, asalkan dalam 1 kertas muat 3 gambar tersebut. NB: kertas folio posisi <b>LANDSCAPE</b>. Gambarlah menggunakan <b>PENSIL</b> Setelah di gambar di kertas, silahkan di upload ke sini.',-1,'2','2',1,1,'2022-04-09 17:09:02','2022-04-09 17:09:02'),
(85,20,4,'Unduh dan cetaklah file template dibawah ini. Nanti di sini sudah terdapat 8 kotak. Di tiap kotak sudah terdapat gambarnya masing-masing. Tugas Anda adalah melanjutkan gambar tersebut. Terserah mau menggambar apa, gambar yang terlintas di pikiran pertama kali itu saja yang di gambar. Cara mengerjakannya, boleh dimulai dari kotak manapun asalkan ditulis nomor pengerjaannya. Yang pertama diberi no 1, no 2 dan seterusnya sampai nomer ke 8. Setelah semuanya selesai di gambar, berilah keterangan di lembar putih di bawah gambar no 1-8 itu gambar apa. Setelah itu pilihlah 1 gambar yang paling disukai, 1 gambar yang paling tidak disukai, 1 gambar yang paling mudah, dan 1 gambar yang paling susah. NB: Gambar Menggunakan <b>PENSIL</b> Setelah di gambar di kertas, silahkan di upload ke sini.',-1,'2','2',1,1,'2022-04-09 17:10:16','2022-04-09 17:10:16');

/*Table structure for table `section_ongoing` */

DROP TABLE IF EXISTS `section_ongoing`;

CREATE TABLE `section_ongoing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `section_id` bigint(20) NOT NULL,
  `exam_session_id` bigint(20) NOT NULL,
  `start_status` int(10) NOT NULL DEFAULT 0 COMMENT '0: not started, 1: running, 2: finished',
  `temp_answers` longtext NOT NULL,
  `start_time` datetime NOT NULL,
  `finish_time` datetime NOT NULL,
  `duration` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `section_ongoing` */

/*Table structure for table `section_result` */

DROP TABLE IF EXISTS `section_result`;

CREATE TABLE `section_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `section_id` bigint(20) NOT NULL,
  `test_result_id` bigint(20) NOT NULL,
  `exam_session` bigint(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `finish_date` datetime NOT NULL,
  `num_correct` int(20) NOT NULL DEFAULT 0,
  `status` int(20) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `section_result` */

/*Table structure for table `test` */

DROP TABLE IF EXISTS `test`;

CREATE TABLE `test` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `test_order` varchar(255) NOT NULL COMMENT '1: in sequence, 2 : not in sequence',
  `test_type` varchar(255) NOT NULL COMMENT 'normal, EPPS, or else',
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

/*Data for the table `test` */

insert  into `test`(`id`,`name`,`test_order`,`test_type`,`status`,`createdAt`,`updatedAt`) values 
(1,'Tintum','2','1',1,'2022-01-22 22:40:20','2022-01-23 06:49:35'),
(2,'EPPS','2','2',1,'2022-01-22 22:40:20','2022-01-23 06:49:35'),
(3,'SDI','2','3',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(4,'MMPI','2','4',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(5,'Kraepelin','2','5',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(6,'Berhitung','2','6',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(7,'Ekspresi','2','7',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(8,'Penalaran','2','8',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(9,'Pemahaman','2','9',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(10,'Akudak','2','10',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(11,'Ruang Bidang','2','11',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(12,'DPM','2','12',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(13,'Komponen','2','13',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(14,'Merakit','2','14',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(15,'Penalaran Mekanik','2','15',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(16,'Tintum Anak','2','16',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(17,'IST','2','17',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(18,'Papi Kostik','2','18',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(19,'Biodata','2','19',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(20,'Gambar','2','20',1,'2022-02-23 14:10:51','2022-02-23 14:10:51'),
(21,'Hafalan','2','21',1,'2022-04-09 15:55:38','2022-04-09 15:55:38');

/*Table structure for table `test_result` */

DROP TABLE IF EXISTS `test_result`;

CREATE TABLE `test_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `test_id` bigint(20) NOT NULL,
  `exam_session` bigint(20) NOT NULL,
  `start_date` datetime NOT NULL,
  `finish_date` datetime NOT NULL,
  `result` longtext DEFAULT NULL,
  `status` int(10) NOT NULL DEFAULT 1 COMMENT '1: available, 0: deleted',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `test_result` */

/* Procedure structure for procedure `semuaPegawai` */

/*!50003 DROP PROCEDURE IF EXISTS  `semuaPegawai` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` PROCEDURE `semuaPegawai`(
 IN nama VARCHAR(50) 
)
BEGIN 
DECLARE a VARCHAR(50);
SET a=CONCAT('%',nama,'%');
 SELECT nama_pegawai FROM pegawai WHERE nama_pegawai LIKE a;
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
