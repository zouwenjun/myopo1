SET NAMES UTF8;
DROP DATABASE IF EXISTS myoppo;
CREATE DATABASE myoppo CHARSET=UTF8;
use myoppo;

CREATE TABLE myopo_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32)
);


 INSERT INTO myopo_user VALUES
 (1, '15012831955', '111111'),
 (2, '15906000782', '111111');


 CREATE TABLE r_phone(
 pid INT PRIMARY KEY AUTO_INCREMENT,
 pdevice VARCHAR(64),
 price FLOAT(8,2),
 pic VARCHAR(32)
);
INSERT INTO r_phone VALUES
(1,'R9s 【99元预定】R9s 新年特别版 1月11日10点开售',2799.00,'images/product/product066.jpg'),
(2,'R9s 黑色版 全新配色',2799.00,'images/product/product022.jpg'),
(3,'R9s Plus 玫瑰金 6G+64GB',3499.00,'images/product/product044.jpg'),
(4,'R9s Plus 黑色版 全新配色',3499.00,'images/product/product033.jpg'),
(5,'R9s R9玫瑰金 4G+64GB内存',1799.00,'images/product/product055.jpg'),
(6,'R9s R9s Plus 黑色版 全新配色',1799.00,'images/product/product044.jpg'),
(7,'R9s A59s 玫瑰金 1600万金属自拍神器',1499.00,'images/product/product011.jpg'),
(8,'R9s A37玫瑰金 5日起直降100',1999.00,'images/product/product022.jpg');

/**购物车表购物车id和用户id**/
CREATE TABLE oppo_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  userId INT
);
INSERT INTO oppo_cart VALUES
(100, 1),
(101, 2);

/**购物车详情表订单id号**/
CREATE TABLE oppo_cart_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT,
  productId INT,
  count INT
);
INSERT INTO oppo_cart_detail VALUES
(NULL, 100, 1, 2),
(NULL, 100, 2, 1),
(NULL, 100, 3, 3);



