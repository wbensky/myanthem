
INSERT INTO `user` (`id`, `id_number`, `username`, `password`, `role`, `date`, `profile_id`)
VALUES
(1, 'admin', '', '098f6bcd4621d373cade4e832627b4f6', 'admin', 0, 2);


INSERT INTO `profile` (`id`, `name`, `email`, `sex`, `tel_phone`, `job_title`, `student_number`, `grade`, `major`, `class`, `create_time`)
VALUES
(2, '123123', '123', '1', '123231', '教授', '', 0, 0, 0, 1398759303);


INSERT INTO `user_permission` (`id`, `role`, `permission`, `desc`)
VALUES
(1, 'admin', 'admin_page_read', ''),
(8, 'admin', 'score_add', ''),
(18, 'admin', 'student_update', ''),
(20, 'admin', 'teacher_password_update', ''),
(21, 'admin', 'student_password_update', ''),
(23, 'admin', 'teacher_update', ''),
(24, 'admin', 'student_add', ''),
(26, 'admin', 'teacher_add', ''),
(3, 'student', 'student_page_read', ''),
(2, 'teacher', 'teacher_page_read', ''),
(5, 'teacher', 'paper_add', ''),
(7, 'teacher', 'paper_update', ''),
(9, 'teacher', 'score_add', ''),
(11, 'teacher', 'snap_store', ''),
(13, 'teacher', 'snap_add', ''),
(15, 'teacher', 'project_store', ''),
(17, 'teacher', 'project_add', '');

