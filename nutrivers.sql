-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 11, 2025 at 10:16 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutrivers`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikels`
--

CREATE TABLE `artikels` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artikels`
--

INSERT INTO `artikels` (`id`, `user_id`, `title`, `desc`, `img`, `tag`, `slug`, `created_at`, `updated_at`) VALUES
(1, 1, 'Padi Toleran Garam', 'Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik yang toleran dengan garam, dalam kondisi rumah kaca, menunjukkan pertumbuhan dan hasil gabah yang normal.', '/images/article/article1.png', 'IRRI', 'padi-toleran-garam', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(2, 2, 'Beras Daging', 'Beras hasil inovasi peneliti Korea Selatan yang mengandung protein hewani, yaitu sel daging sapi dan lemak ikan yang ditumbuhkan di dalam butiran beras melalui proses kultur sel di laboratorium.', '/images/article/article2.png', 'BBC', 'beras-daging', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(3, 1, 'Melon Hitam', 'Mahasiswi program doktoral Universitas Brawijaya (UB) bernama Astrid Ika Paramitha berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan metode iradiasi sinar gamma.', '/images/article/article3.png', 'Univ. Brawijaya', 'melon-hitam', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(4, 2, 'Melon Transgenik', 'Aplikasi telah dikembangkan pada Tanaman Transgenik. Beberapa tanaman transgenik telah diaplikasikan untuk menghasilkan tiga macam sifat unggul, yaitu tahan hama, tahan herbisida, dan tidak mudah busuk.', '/images/article/article4.png', 'Mutiarosa', 'melon-transgenik', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(5, 1, 'Kapas BT', 'Kapas menghasilkan toksin yang aktivitasnya hampir terbatas hanya pada hama ulat (Lepidoptera) dan galur Bacillus thuringiensis lainnya memiliki gen yang mengkode toksin dengan aktivitas insektisida.', '/images/article/article5.png', 'Utcrops', 'kapas-bt', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(6, 2, 'Tebu PRG NXI-4T', 'Tebu Produk Rekayasa Genetika (PRG) toleran kekeringan klon NXI-4T merupakan varietas tebu baru hasil perakitan melalui proses transformasi genetika menggunakan bakteri Agrobacterium tumefaciens.', '/images/article/article6.png', 'Pgpradjekan', 'tebu-prg-nxi-4t', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(7, 1, 'Beras Emas', 'Beras Emas hadir sebagai alternatif pangan yang dikembangkan pemerintah. Rekayasa genetika sekarang memainkan peran penting dalam memodifikasi susunan genetik organisme hidup untuk memenuhi kebutuhan manusia.', '/images/article/article7.png', 'IPB', 'beras-emas', '2025-10-11 07:32:35', '2025-10-11 07:32:35');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint UNSIGNED NOT NULL,
  `post_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fruits`
--

CREATE TABLE `fruits` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stages` json NOT NULL,
  `points` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fruits`
--

INSERT INTO `fruits` (`id`, `name`, `img`, `stages`, `points`, `created_at`, `updated_at`) VALUES
(1, 'Jeruk', 'gameicon/jeruk.png', '[\"storage/fruits/stages/tanah1.png\", \"storage/fruits/stages/bibit_jeruk.png\", \"storage/fruits/stages/tunas_jeruk.png\", \"storage/fruits/stages/pohon_jeruk.png\", \"storage/fruits/stages/pohonbesar_jeruk.png\"]', 100, '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(2, 'Wortel', 'gameicon/wortel.png', '[\"storage/fruits/stages/tanah1.png\", \"storage/fruits/stages/bibit_wortel.png\", \"storage/fruits/stages/tunas_wortel.png\", \"storage/fruits/stages/pohon_wortel.png\", \"storage/fruits/stages/pohonbesar_wortel.png\"]', 100, '2025-10-11 07:32:35', '2025-10-11 07:32:35');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `fruit_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item_games`
--

CREATE TABLE `item_games` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_games`
--

INSERT INTO `item_games` (`id`, `name`, `img_path`, `created_at`, `updated_at`) VALUES
(1, 'Tomat', '/gamesicon/tomatt.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(2, 'Kedelai', '/gamesicon/ubi.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(3, 'Kacang Panjang', '/gamesicon/buncis.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(4, 'Jagung', '/gamesicon/jagung.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(5, 'Pisang', '/gamesicon/pisang.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(6, 'Semangka', '/gamesicon/semangka.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(7, 'Sawi', '/gamesicon/sawi.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(8, 'Jeruk', '/gamesicon/jerukk.png', '2025-10-11 07:32:35', '2025-10-11 07:32:35');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mails`
--

CREATE TABLE `mails` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `story` text COLLATE utf8mb4_unicode_ci,
  `media` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_09_23_014101_create_schools_table', 1),
(5, '2025_09_23_014145_add_school_id_to_users_table', 1),
(6, '2025_09_23_014421_create_user_points_table', 1),
(7, '2025_09_29_125048_create_fruits_table', 1),
(8, '2025_09_30_014356_create_plants_table', 1),
(9, '2025_09_30_073918_create_mails_table', 1),
(10, '2025_10_01_125520_create_seminars_table', 1),
(11, '2025_10_01_125535_create_registrations_table', 1),
(12, '2025_10_02_145301_add_points_to_users_table', 1),
(13, '2025_10_03_042759_create_quizzes_table', 1),
(14, '2025_10_03_083245_create_item_games_table', 1),
(15, '2025_10_03_083312_create_questations_table', 1),
(16, '2025_10_03_180226_create_artikels_table', 1),
(17, '2025_10_05_090416_create_posts_table', 1),
(18, '2025_10_05_093743_create_comments_table', 1),
(19, '2025_10_07_035602_add_energy_and_upgrades_to_users', 1),
(20, '2025_10_10_102237_create_inventories_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plants`
--

CREATE TABLE `plants` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `fruit_id` bigint UNSIGNED NOT NULL,
  `grow_time` int NOT NULL DEFAULT '60',
  `planted_at` timestamp NOT NULL,
  `harvested` tinyint(1) NOT NULL DEFAULT '0',
  `boost_time` int NOT NULL DEFAULT '0',
  `stage` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plants`
--

INSERT INTO `plants` (`id`, `user_id`, `fruit_id`, `grow_time`, `planted_at`, `harvested`, `boost_time`, `stage`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 120, '2025-10-11 07:32:39', 0, 0, 0, '2025-10-11 07:32:39', '2025-10-11 07:32:39'),
(2, 1, 1, 180, '2025-10-11 07:31:39', 0, 10, 0, '2025-10-11 07:32:39', '2025-10-11 07:32:39');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questations`
--

CREATE TABLE `questations` (
  `id` bigint UNSIGNED NOT NULL,
  `item_game_id` bigint UNSIGNED NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` json NOT NULL,
  `answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questations`
--

INSERT INTO `questations` (`id`, `item_game_id`, `question`, `options`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 'Tomat kaya akan zat apa yang baik untuk kesehatan mata?', '[\"Vitamin A\", \"Vitamin D\", \"Protein\", \"Zat Besi\"]', 'Vitamin A', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(2, 1, 'Tomat adalah sumber utama dari zat apa yang memberi warna merah?', '[\"Likopen\", \"Kalsium\", \"Zat Besi\", \"Vitamin B12\"]', 'Likopen', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(3, 1, 'Manfaat lain tomat bagi tubuh adalah ...', '[\"Menurunkan risiko kanker\", \"Meningkatkan kolesterol jahat\", \"Meningkatkan gula darah\", \"Menyebabkan dehidrasi\"]', 'Menurunkan risiko kanker', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(4, 2, 'Kedelai merupakan sumber utama dari zat gizi apa?', '[\"Protein Nabati\", \"Karbohidrat\", \"Vitamin C\", \"Air\"]', 'Protein Nabati', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(5, 2, 'Salah satu manfaat kedelai ialah ...', '[\"Membantu pembentukan otot\", \"Menambah gula darah cepat\", \"Mengurangi serat\", \"Meningkatkan lemak jahat\"]', 'Membantu pembentukan otot', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(6, 2, 'Produk olahan dari kedelai adalah ...', '[\"Tahu & Tempe\", \"Roti & Keju\", \"Susu Sapi\", \"Minyak Zaitun\"]', 'Tahu & Tempe', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(7, 3, 'Kacang panjang kaya akan serat, bermanfaat untuk apa?', '[\"Melancarkan pencernaan\", \"Membentuk otot\", \"Meningkatkan penglihatan\", \"Menambah energi\"]', 'Melancarkan pencernaan', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(8, 3, 'Vitamin apa yang banyak terdapat pada kacang panjang?', '[\"Vitamin C\", \"Vitamin D\", \"Vitamin B12\", \"Vitamin K\"]', 'Vitamin C', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(9, 3, 'Kacang panjang sering dikonsumsi sebagai ...', '[\"Sayur lalapan\", \"Minuman energi\", \"Buah segar\", \"Makanan instan\"]', 'Sayur lalapan', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(10, 4, 'Zat apa yang ada pada jagung yang membantu menjaga rasa kenyang lebih lama?', '[\"Karbohidrat\", \"Vitamin C\", \"Protein\", \"Serat\"]', 'Karbohidrat', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(11, 4, 'Jagung sering jadi sumber energi karena ...', '[\"Kandungan karbohidratnya\", \"Kandungan vitamin D\", \"Kandungan protein tinggi\", \"Kaya kalsium\"]', 'Kandungan karbohidratnya', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(12, 4, 'Vitamin yang ada di jagung adalah ...', '[\"Vitamin B kompleks\", \"Vitamin K\", \"Vitamin D\", \"Vitamin A\"]', 'Vitamin B kompleks', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(13, 5, 'Zat apa yang ada pada pisang yang membuatnya kaya energi?', '[\"Karbohidrat\", \"Protein\", \"Lemak\", \"Vitamin D\"]', 'Karbohidrat', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(14, 5, 'Pisang juga kaya mineral apa yang membantu fungsi otot?', '[\"Kalium\", \"Zat Besi\", \"Selenium\", \"Yodium\"]', 'Kalium', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(15, 5, 'Pisang dapat membantu pencernaan karena mengandung ...', '[\"Serat\", \"Protein\", \"Vitamin D\", \"Lemak\"]', 'Serat', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(16, 6, 'Apa kandungan utama dalam semangka yang membuatnya menyegarkan?', '[\"Air\", \"Protein\", \"Vitamin B12\", \"Lemak\"]', 'Air', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(17, 6, 'Vitamin apa yang ada dalam semangka?', '[\"Vitamin C\", \"Vitamin D\", \"Vitamin K2\", \"Vitamin B12\"]', 'Vitamin C', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(18, 6, 'Semangka baik dikonsumsi di musim ...', '[\"Panas\", \"Dingin\", \"Hujan\", \"Gugur\"]', 'Panas', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(19, 7, 'Zat apa yang membuat sawi baik untuk sistem imun?', '[\"Vitamin C\", \"Zat Besi\", \"Karbohidrat\", \"Protein\"]', 'Vitamin C', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(20, 7, 'Sawi termasuk kelompok sayur ...', '[\"Cruciferous\", \"Umbi-umbian\", \"Buah\", \"Legum\"]', 'Cruciferous', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(21, 7, 'Sawi juga mengandung ...', '[\"Antioksidan\", \"Kolesterol tinggi\", \"Asam urat\", \"Lemak trans\"]', 'Antioksidan', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(22, 8, 'Buah jeruk dikenal kaya akan vitamin apa?', '[\"Vitamin C\", \"Vitamin A\", \"Vitamin D\", \"Vitamin K\"]', 'Vitamin C', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(23, 8, 'Selain vitamin C, jeruk memiliki antioksidan bernama ...', '[\"Flavonoid\", \"Lemak jenuh\", \"Kolesterol\", \"Asam urat\"]', 'Flavonoid', '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(24, 8, 'Jeruk biasanya dikonsumsi dalam bentuk ...', '[\"Jus\", \"Gorengan\", \"Roti\", \"Bubur\"]', 'Jus', '2025-10-11 07:32:35', '2025-10-11 07:32:35');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint UNSIGNED NOT NULL,
  `item_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` json NOT NULL,
  `answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `id` bigint UNSIGNED NOT NULL,
  `seminar_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `team_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `name`, `team_code`, `points`, `created_at`, `updated_at`) VALUES
(1, 'SD Harapan Bangsa', 'SDHB01', 0, '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(2, 'SMP Cemerlang', 'SMPC01', 0, '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(3, 'SMA Mandiri', 'SMAM01', 0, '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(4, 'SMK Kreatif', 'SMKK01', 0, '2025-10-11 07:32:35', '2025-10-11 07:32:35'),
(5, 'SD Nusantara', 'SDN01', 0, '2025-10-11 07:32:35', '2025-10-11 07:32:35');

-- --------------------------------------------------------

--
-- Table structure for table `seminars`
--

CREATE TABLE `seminars` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `seminars`
--

INSERT INTO `seminars` (`id`, `title`, `date`, `location`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Seminar Gizi Seimbang', '2025-10-10', 'Aula SMKN 24 Jakarta', 'Membahas pentingnya gizi seimbang bagi remaja untuk menunjang prestasi belajar.', '2025-10-11 07:32:34', '2025-10-11 07:32:34'),
(2, 'Seminar Inovasi Pertanian', '2025-11-05', 'Gedung Pertanian Nasional', 'Membahas teknologi pertanian terbaru untuk meningkatkan produktivitas pangan.', '2025-10-11 07:32:34', '2025-10-11 07:32:34');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('pmL4Sn87Z8pOlr1X1OBME7JVCzxUgj0AAof32JSo', 17, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWVBXd1FjRzNNeTVBd0p1UENBVFdVamhKd05zV1dTYjJyYzljZ2hDRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjE6e3M6ODoiaW50ZW5kZWQiO3M6Mjg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1lc3MiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxNzt9', 1760220901),
('pmnq4hOWCfswalcl6f4Ho8E7y5LxoQdoMaArt8bg', 16, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVEdCN3NHc2NjS09qWWtDQnJBdVVhU0ZBSGdqZzJ6SlRJaGY0WHBYRSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTY7fQ==', 1760193375);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `school_id` bigint UNSIGNED DEFAULT NULL,
  `points` int NOT NULL DEFAULT '0',
  `energy` int NOT NULL DEFAULT '10',
  `max_energy` int NOT NULL DEFAULT '10',
  `last_energy_reset` timestamp NULL DEFAULT NULL,
  `pot_capacity` int NOT NULL DEFAULT '4',
  `fertilizer` tinyint(1) NOT NULL DEFAULT '0',
  `fertilizer_boost` int NOT NULL DEFAULT '0',
  `boots_pupuk` int NOT NULL DEFAULT '0',
  `temporary_fertilizer` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `avatar`, `remember_token`, `created_at`, `updated_at`, `school_id`, `points`, `energy`, `max_energy`, `last_energy_reset`, `pot_capacity`, `fertilizer`, `fertilizer_boost`, `boots_pupuk`, `temporary_fertilizer`) VALUES
(1, 'Admin Nutrivers', 'nutriverse@gmail.com', 'user', '2025-10-11 07:32:35', '$2y$12$RHFMU0b5uuGy5q9ZijKSEuQKmWwZ3rCTNbgJCO7MoSFsycyX8wF92', NULL, 'qoOab30i0n', '2025-10-11 07:32:35', '2025-10-11 07:32:35', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0),
(2, 'Admin Nutrivers', 'admin2@gmail.com', 'user', '2025-10-11 07:32:35', '$2y$12$RHFMU0b5uuGy5q9ZijKSEuQKmWwZ3rCTNbgJCO7MoSFsycyX8wF92', NULL, 'eh0S7Hvh17', '2025-10-11 07:32:35', '2025-10-11 07:32:35', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0),
(3, 'Ahmad Fauzi', 'ahmad.fauzi@example.com', 'user', NULL, '$2y$12$blG.EgsgUnSNAopXEaDP4euNZ9Xa4OpTH4prui2jdLJSnvICKrjei', NULL, NULL, '2025-10-11 07:32:35', '2025-10-11 07:32:35', 1, 62, 10, 10, '2025-10-11 07:32:35', 4, 0, 0, 0, 0),
(4, 'Siti Aminah', 'siti.aminah@example.com', 'user', NULL, '$2y$12$qHj.8BVjmpHoPjXffTFB9.lDAXxdNWBF5oS3z9Zll6VWTCozyxNdS', NULL, NULL, '2025-10-11 07:32:36', '2025-10-11 07:32:36', 2, 66, 10, 10, '2025-10-11 07:32:36', 4, 0, 0, 0, 0),
(5, 'Budi Santoso', 'budi.santoso@example.com', 'user', NULL, '$2y$12$Lvz1/6KfD2rvR8B4Avr9l.gI9yA6mSr9lxZPG0E4JLsCMI1GF5vc.', NULL, NULL, '2025-10-11 07:32:36', '2025-10-11 07:32:36', 3, 0, 10, 10, '2025-10-11 07:32:36', 4, 0, 0, 0, 0),
(6, 'Dewi Lestari', 'dewi.lestari@example.com', 'user', NULL, '$2y$12$9DXwA/2IVBL29IfJEjc/feYgkPAUW3m6YSYWSXG0Ak.Up5Dorp4ee', NULL, NULL, '2025-10-11 07:32:36', '2025-10-11 07:32:36', 4, 89, 10, 10, '2025-10-11 07:32:36', 4, 0, 0, 0, 0),
(7, 'Rizky Pratama', 'rizky.pratama@example.com', 'user', NULL, '$2y$12$s5MdWvIgz/EKKc65FdlKT.YMrJElmnwp5NTx2nQ5C3khgv.hkIFiq', NULL, NULL, '2025-10-11 07:32:37', '2025-10-11 07:32:37', 5, 69, 10, 10, '2025-10-11 07:32:37', 4, 0, 0, 0, 0),
(8, 'Indah Permatasari', 'indah.permatasari@example.com', 'user', NULL, '$2y$12$7K4RBabhSvUosYhhS93HL.Frnx7WbThfXPGFf2uikGWADwScNYPPS', NULL, NULL, '2025-10-11 07:32:37', '2025-10-11 07:32:37', 1, 71, 10, 10, '2025-10-11 07:32:37', 4, 0, 0, 0, 0),
(9, 'Agus Setiawan', 'agus.setiawan@example.com', 'user', NULL, '$2y$12$UkNvwJi0G/BNf28PFXA8qeZ6MeJPpuhZTVmBqvfWod0cRuB1ELJlC', NULL, NULL, '2025-10-11 07:32:38', '2025-10-11 07:32:38', 2, 93, 10, 10, '2025-10-11 07:32:38', 4, 0, 0, 0, 0),
(10, 'Lina Marlina', 'lina.marlina@example.com', 'user', NULL, '$2y$12$XkFlRwch5AWSphJLbm5YjelJxCqM9VEUrzEXp7UIFtAwrq3UmDUIe', NULL, NULL, '2025-10-11 07:32:38', '2025-10-11 07:32:38', 3, 84, 10, 10, '2025-10-11 07:32:38', 4, 0, 0, 0, 0),
(11, 'Hendra Wijaya', 'hendra.wijaya@example.com', 'user', NULL, '$2y$12$Nx1bbOcL6NbEqrrIgR5wKeZZl/077e/gWuRYsBhbBh6FgLjneSoyS', NULL, NULL, '2025-10-11 07:32:38', '2025-10-11 07:32:38', 4, 64, 10, 10, '2025-10-11 07:32:38', 4, 0, 0, 0, 0),
(12, 'Nina Kurniawati', 'nina.kurniawati@example.com', 'user', NULL, '$2y$12$BwRYmOpIo4c/zyWYUJ772OMpJXiMkI2EfU5jtuO8fxTxZcBqorNpq', NULL, NULL, '2025-10-11 07:32:39', '2025-10-11 07:32:39', 5, 82, 10, 10, '2025-10-11 07:32:39', 4, 0, 0, 0, 0),
(13, 'Nutrivers Admin', 'nutriverseadmin@gmail.com', 'admin', NULL, '$2y$12$cbMrk.VGBotHjNYtUqum1OQcI5loS7.uIBpK0giyNwdwXlj6Cngay', NULL, NULL, '2025-10-11 07:33:39', '2025-10-11 07:33:39', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0),
(14, 'Bekhyun Aditya', 'bekhyunaditya@gmail.com', 'admin', NULL, '$2y$12$mXv2WSKTskP4ZYv6/k4Z7ODOfiBm3vR6oa4oPPR9JH6guQWXsDeR.', NULL, NULL, '2025-10-11 07:34:27', '2025-10-11 07:34:27', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0),
(15, 'Reynaldo Yusellino', 'reynaldoyusellino@gmail.com', 'admin', NULL, '$2y$12$CefIw/0Gnpre2yK/CTfuyOquTFnNcnQ7p8/.NvrqLg2GQ1XF4sDl6', NULL, NULL, '2025-10-11 07:35:39', '2025-10-11 07:35:39', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0),
(16, 'Zhafirah Naswa', 'zhafirahnaswa@gmail.com', 'admin', NULL, '$2y$12$9wuXyWGp/UXdh40wA5iQ1edON6tmCGTVSKjVg4gfZDgjiYMI6ffCq', NULL, NULL, '2025-10-11 07:36:14', '2025-10-11 07:36:14', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0),
(17, 'Reynaldo Yusellino', 'reynaldoyusellino07@gmail.com', 'admin', NULL, '$2y$12$tWblqUudeEzQn05w47Rhh.YGhgGz/sHUlEWWT.duqffZWaYLSXOIa', NULL, NULL, '2025-10-11 15:14:22', '2025-10-11 15:14:22', NULL, 0, 10, 10, NULL, 4, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_points`
--

CREATE TABLE `user_points` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `points` int NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikels`
--
ALTER TABLE `artikels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `artikels_slug_unique` (`slug`),
  ADD KEY `artikels_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_post_id_foreign` (`post_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `fruits`
--
ALTER TABLE `fruits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventories_user_id_foreign` (`user_id`),
  ADD KEY `inventories_fruit_id_foreign` (`fruit_id`);

--
-- Indexes for table `item_games`
--
ALTER TABLE `item_games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mails`
--
ALTER TABLE `mails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plants_user_id_foreign` (`user_id`),
  ADD KEY `plants_fruit_id_foreign` (`fruit_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `questations`
--
ALTER TABLE `questations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questations_item_game_id_foreign` (`item_game_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registrations_seminar_id_foreign` (`seminar_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `schools_team_code_unique` (`team_code`);

--
-- Indexes for table `seminars`
--
ALTER TABLE `seminars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_school_id_foreign` (`school_id`);

--
-- Indexes for table `user_points`
--
ALTER TABLE `user_points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_points_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artikels`
--
ALTER TABLE `artikels`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fruits`
--
ALTER TABLE `fruits`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_games`
--
ALTER TABLE `item_games`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mails`
--
ALTER TABLE `mails`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `plants`
--
ALTER TABLE `plants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questations`
--
ALTER TABLE `questations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `seminars`
--
ALTER TABLE `seminars`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_points`
--
ALTER TABLE `user_points`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artikels`
--
ALTER TABLE `artikels`
  ADD CONSTRAINT `artikels_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `inventories_fruit_id_foreign` FOREIGN KEY (`fruit_id`) REFERENCES `fruits` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `plants`
--
ALTER TABLE `plants`
  ADD CONSTRAINT `plants_fruit_id_foreign` FOREIGN KEY (`fruit_id`) REFERENCES `fruits` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `plants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `questations`
--
ALTER TABLE `questations`
  ADD CONSTRAINT `questations_item_game_id_foreign` FOREIGN KEY (`item_game_id`) REFERENCES `item_games` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_seminar_id_foreign` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `user_points`
--
ALTER TABLE `user_points`
  ADD CONSTRAINT `user_points_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
