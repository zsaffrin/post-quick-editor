<?php

/*
	Widget wrapper to place Post Quick-Editor plugin
*/

class Post_Quick_Editor_Widget extends WP_Widget {

	function __construct() {
		$widget_options = array(
			'description' => __('Post Quick-Editor Plugin', 'pqe_widget_domain')
		);
		parent::__construct('pqe-widget', __('Post Quick-Editor'), $widget_options);
	}

	function widget( $args, $instance ) {
		echo $args['before_widget'];
		?>
			<div id="post-quick-editor"></div>
		<?php
		echo $args['after_widget'];
	}

	function update( $new_instance, $old_instance ) {

	}

	function form() {

	}
}

?>
