<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'justice4all' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'dpufdnqearguhvgc3gturwcxhhlmucebtxpfko9nbwex4xvree1aax12tsq9gbig' );
define( 'SECURE_AUTH_KEY',  'gwyrobyzsqilnyqa3h9gkpgv79291bfwzedkurbdv571jsdpbnlxdal7l6k3p73u' );
define( 'LOGGED_IN_KEY',    'hwqdp5agemtvcev6ocn1dbeulbr54owvkngxuqdjenzmibepsd3fotaumudlaftn' );
define( 'NONCE_KEY',        '8j84ibtpfftjybdhpnmpjdppjt3qrftm17fli36rqhwskroud6kiszo0kkol02bq' );
define( 'AUTH_SALT',        'eaiotvxw12vw3nqs3mkyytovahuo8xjqj8sngmhprytuwr4bhl1vbwgc5afsaonb' );
define( 'SECURE_AUTH_SALT', '20ub3fsn6pkmcmrwtz5pnc5ybqx8itqdiyegtuo8snhdbpdbrvbuok0bl653wykc' );
define( 'LOGGED_IN_SALT',   'y4o3v8knyjnps3rbv61bkoiekfdrt9nl1lycbdm00ebfpxt246mimj1ilgwvihvo' );
define( 'NONCE_SALT',       'ncj1um8jghkyqhoidbitagc94zme44fg28octay3pd9q0xa3ktc9tcukvclq6nf7' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp3v_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
