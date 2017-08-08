<?php

/*
	Plugin Name: Post Quick-Editor
	Description: Quick edits for your recent posts
	Version:     0.1.0
	Author:      Zach Saffrin
	Author URI:  http://zachsaffrin.com
*/

// Include widget config
include dirname( __FILE__ ) . '/widget.php';

class Post_Quick_Editor_Plugin {

	// Register widget
	static function widgets_init() {
		register_widget('Post_Quick_Editor_Widget');
	}

	// Queue script on page
	function enqueue_scripts() {
		wp_enqueue_script( 'post-quick-editor', plugins_url('./dist/post-quick-editor-bundle.js', __FILE__), array(), 'v0.0.1', true );
	}

}

add_action( 'widgets_init', array(Post_Quick_Editor_Plugin, 'widgets_init') );
add_action( 'wp_enqueue_scripts', array(Post_Quick_Editor_Plugin, 'enqueue_scripts') );

?>
