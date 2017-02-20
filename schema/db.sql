-- Users
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `password` varchar(256) NOT NULL DEFAULT '',
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS user_tokens CASCADE;
CREATE TABLE `user_tokens` (
  `user_id` int(11) unsigned NOT NULL,
  `token` varchar(40) NOT NULL,
  `created` int(10) unsigned NOT NULL,
  `expires` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`token`),
  UNIQUE KEY `uniq_token` (`token`),
  KEY `k_user_id` (`user_id`),
  KEY `k_expires` (`expires`),
  CONSTRAINT `fk_user_tokens_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- bureau de vote
DROP TABLE IF EXISTS polling_places CASCADE;
CREATE TABLE `polling_places` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  `slug` varchar(254) NOT NULL,
  `zipcode` int(10)  NOT NULL,
  `city` varchar(256) NOT NULL,
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- referal  responsable local
DROP TABLE IF EXISTS referals CASCADE;
CREATE TABLE `referals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `commity_number_id` int(11) unsigned NOT NULL,
  `firstname` varchar(254) NOT NULL,
  `lastname` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `tel_prefix` varchar(64) DEFAULT NULL,
  `tel` varchar(64) DEFAULT NULL,
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_email` (`email`),
  KEY `k_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- taker  mandataire
DROP TABLE IF EXISTS takers CASCADE;
CREATE TABLE `takers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `referal_id` int(11) unsigned NOT NULL,
  `polling_place_id` int(11) unsigned NOT NULL,
  `firstname` varchar(254) NOT NULL,
  `lastname` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `tel_prefix` varchar(64) DEFAULT NULL,
  `tel` varchar(64) DEFAULT NULL,
  `birth_date` int(10) DEFAULT NULL,
  `address_nb` int(10) unsigned DEFAULT NULL,
  `address_nb_spe` varchar(64) DEFAULT NULL,
  `address_type_street` varchar(256) DEFAULT NULL,
  `address_name_street` varchar(256) DEFAULT NULL,
  `zipcode` int(10) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `is_voting_first_tour_p` boolean DEFAULT TRUE,
  `is_voting_second_tour_p` boolean DEFAULT TRUE,
  `is_voting_first_tour_l` boolean DEFAULT TRUE,
  `is_voting_second_tour_l` boolean DEFAULT TRUE,
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_email` (`email`),
  KEY `k_referal_id` (`referal_id`),
  CONSTRAINT `fk_referal_id` FOREIGN KEY (`referal_id`) REFERENCES `referals` (`id`) ON DELETE CASCADE,
   KEY `k_polling_place_id` (`polling_place_id`),
  CONSTRAINT `fk_taker_polling_place_id` FOREIGN KEY (`polling_place_id`) REFERENCES `polling_places` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- giver mandant
DROP TABLE IF EXISTS givers CASCADE;
CREATE TABLE `givers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `polling_place_id` int(11) unsigned NOT NULL,
  `firstname` varchar(254) NOT NULL,
  `lastname` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `tel_prefix` varchar(64) DEFAULT NULL,
  `tel` varchar(64) DEFAULT NULL,
  `birth_date` int(10) DEFAULT NULL,
  `address_nb` int(10) unsigned DEFAULT NULL,
  `address_nb_spe` varchar(64) DEFAULT NULL,
  `address_type_street` varchar(256) DEFAULT NULL,
  `address_name_street` varchar(256) DEFAULT NULL,
  `zipcode` int(10) DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `subscription_commune` varchar(256) DEFAULT NULL,
  `subscription_department` varchar(256) DEFAULT NULL,
  `subscription_consulaire` varchar(256) DEFAULT NULL,
  `subscription_country` varchar(256) DEFAULT NULL,
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_email` (`email`),
  KEY `k_polling_place_id` (`polling_place_id`),
  CONSTRAINT `fk_giver_polling_place_id` FOREIGN KEY (`polling_place_id`) REFERENCES `polling_places` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS giver_dates CASCADE;
CREATE TABLE `giver_dates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `giver_id` int(11) unsigned NOT NULL,
  `name` varchar(254) NOT NULL,
  `date` int(10) unsigned NOT NULL,
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false ,
  PRIMARY KEY (`id`),
    KEY `k_giver_id` (`giver_id`),
  CONSTRAINT `fk_giver_date_giver_id` FOREIGN KEY (`giver_id`) REFERENCES `givers` (`id`) ON DELETE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS giver_date_taker_aff CASCADE;
CREATE TABLE `giver_date_taker_aff` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `giver_date_id` int(11) unsigned NOT NULL,
  `taker_id` int(11) unsigned NOT NULL,
  `cerfa_path` varchar(254) NOT NULL,
  `created` int(10) unsigned NOT NULL,
  `deleted` boolean DEFAULT false,
  PRIMARY KEY (`id`),
    KEY `k_giver_date_id` (`giver_date_id`),
  CONSTRAINT `fk_giver_date_taker_aff_giver_date_id` FOREIGN KEY (`giver_date_id`) REFERENCES `giver_dates` (`id`) ON DELETE CASCADE,
  KEY `k_taker_id` (`taker_id`),
  CONSTRAINT `fk_giver_date_taker_aff_taker_id` FOREIGN KEY (`taker_id`) REFERENCES `takers` (`id`) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;




