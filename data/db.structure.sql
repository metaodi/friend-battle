--
-- Table structure for table `invites`
--
CREATE TABLE IF NOT EXISTS `invites` (
  `inviting_user_id` varchar(100) NOT NULL,
  `invited_user_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `user`
--
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `coins` int(11) NOT NULL DEFAULT '0',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
