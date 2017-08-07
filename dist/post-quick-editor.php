<?php

/*
Plugin Name: Post Quick-Editor
Description: Quick edits for your recent posts
Version:     0.0.1
Author:      Zach Saffrin
Author URI:  http://zachsaffrin.com
*/

function include_app() {
	wp_enqueue_script( 'plugin-scripts', plugins_url('./post-quick-editor-bundle.js', __FILE__),array(),  '0.0.1', true );
}

add_action( 'wp_enqueue_scripts', 'include_app' );

?>
