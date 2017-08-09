<?php

/*
	Plugin Name: Post Quick-Editor
	Description: Quick edits for your recent posts
	Version:     0.1.0
	Author:      Zach Saffrin
	Author URI:  http://zachsaffrin.com
*/

class Post_Quick_Editor_Plugin {

	// Queue and localize app bundle script
	function enqueue_scripts() {
		wp_enqueue_script( 'post-quick-editor', plugins_url('./dist/post-quick-editor-bundle.js', __FILE__), array(), 'v0.0.1', true );
		wp_localize_script('post-quick-editor', 'wpApiSettings', array(
			'root' => esc_url_raw(rest_url()),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		));
	}

	// Add admin page
	function add_admin_page() {
		add_menu_page(
			'Post Quick-Editor', // Page title
			'Quick-Editor', // Menu title
			'manage_options', // Capability required to access tool
			'post-quick-editor', // Menu slug
			array('Post_Quick_Editor_Plugin', 'render_admin_page'), // Function to render page
			'dashicons-admin-page' // Icon
		);
	}

	function render_admin_page() {
		echo '<div id="post-quick-editor" class="wrap"></div>';
	}

}

add_action( 'admin_enqueue_scripts', array(Post_Quick_Editor_Plugin, 'enqueue_scripts') );
add_action( 'admin_menu', array(Post_Quick_Editor_Plugin, 'add_admin_page') );

?>
